export interface EncryptedPayload {
  payload: string;
  iv: string;
  encryptedKey: string;
}

export interface EncryptedData extends Pick<EncryptedPayload, 'payload' | 'iv'> {}

export interface PublicKeyResponse {
  publicKey: string;
}
