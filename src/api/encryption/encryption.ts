import axios from 'axios';
import type { ApiResponse } from '../api.types';
import type { EncryptedData, EncryptedPayload, PublicKeyResponse } from './encryption.types';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

let publicKeyPromise: Promise<CryptoKey> | null = null;

function toBase64(bytes: Uint8Array): string {
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function fromBase64(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

async function getPublicKey(): Promise<CryptoKey> {
  if (!publicKeyPromise) {
    publicKeyPromise = (async () => {
      const { data } = await axios.get<ApiResponse<PublicKeyResponse>>(
        `${import.meta.env.VITE_API_BASE_URL}/encryption/public-key`
      );

      if (!data.success || !data.data?.publicKey) {
        throw new Error('Unable to retrieve encryption public key.');
      }

      return crypto.subtle.importKey(
        'spki',
        fromBase64(data.data.publicKey),
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256',
        },
        false,
        ['encrypt']
      );
    })().catch((error) => {
      publicKeyPromise = null;
      throw error;
    });
  }

  return publicKeyPromise;
}

export async function encryptPayload(
  data: unknown
): Promise<{ encrypted: EncryptedPayload; aesKey: CryptoKey }> {
  const publicKey = await getPublicKey();

  const aesKey = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    aesKey,
    encoder.encode(JSON.stringify(data))
  );

  const rawKey = await crypto.subtle.exportKey('raw', aesKey);

  const encryptedKey = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    publicKey,
    rawKey
  );

  return {
    encrypted: {
      payload: toBase64(new Uint8Array(ciphertext)),
      iv: toBase64(iv),
      encryptedKey: toBase64(new Uint8Array(encryptedKey)),
    },
    aesKey,
  };
}

export async function decryptPayload(
  encrypted: EncryptedData,
  aesKey: CryptoKey
): Promise<unknown> {
  const plaintext = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: fromBase64(encrypted.iv),
    },
    aesKey,
    fromBase64(encrypted.payload)
  );

  return JSON.parse(decoder.decode(plaintext));
}

export async function generateEncryptionKey(): Promise<{
  encryptedKey: string;
  aesKey: CryptoKey;
}> {
  const publicKey = await getPublicKey();

  const aesKey = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );

  const rawKey = await crypto.subtle.exportKey('raw', aesKey);

  const encryptedKey = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    publicKey,
    rawKey
  );

  return {
    encryptedKey: toBase64(new Uint8Array(encryptedKey)),
    aesKey,
  };
}
