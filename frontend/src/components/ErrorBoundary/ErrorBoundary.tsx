import { useRouteError } from 'react-router-dom';
import React from 'react';

const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);

  return <h2>Something wrong!</h2>;
};

export default ErrorBoundary;
