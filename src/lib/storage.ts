const storagePrefix = 'tic_tac_toe_';

export const storage = {
  getToken: () => {
    return window.localStorage.getItem(`${storagePrefix}token`) as string;
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, token);
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },

  getUserId: () => {
    return window.localStorage.getItem(`${storagePrefix}user_id`) as string;
  },
  setUserId: (id: string) => {
    window.localStorage.setItem(`${storagePrefix}user_id`, id);
  },
  clearUserId: () => {
    window.localStorage.removeItem(`${storagePrefix}user_id`);
  }
};
