const errorLogger = (error) => {
  console.log('An error was encountered: ', error);
};

const errorHandler = (error) => {
  errorLogger(error);
  const e = new Error(error);
  throw e;
};

export default errorHandler;
