let forceLogout = null;

export const registerForceLogout = (handler) => {
  forceLogout = handler;
};

export const executeForceLogout = () => {
  if (forceLogout) {
    forceLogout();
  }
};
