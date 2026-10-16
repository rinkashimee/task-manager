import { authApi } from './authApi';

const verificationRequests = new Map<string, Promise<void>>();

export function verifyEmailRequest(token: string, retry = false): Promise<void> {
  if (!retry) {
    const existingRequest = verificationRequests.get(token);

    if (existingRequest) {
      return existingRequest;
    }
  }

  const request = authApi.verifyEmail({ token }).then(() => undefined);

  verificationRequests.set(token, request);

  return request;
}
