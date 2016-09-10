const isAuthorised = (next) => {
  // console.log('authorizing');
  // throw new Error('unauthorised');

  next();
};

export { isAuthorised };
