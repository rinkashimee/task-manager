let accessToken: string | null = null;
let sessionVersion = 0;
let loggingOut = false;

export const tokenManager = {
  getToken: (): string | null => accessToken,

  setToken: (token: string): void => {
    accessToken = token;
  },

  clearToken: (): void => {
    accessToken = null;
  },

  getSessionVersion: () => sessionVersion,

  isLoggingOut: () => loggingOut,

  startLogout: () => {
    loggingOut = true;
    accessToken = null;
    sessionVersion++;
  },

  finishLogout: () => {
    loggingOut = false;
  },
};
