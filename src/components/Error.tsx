import React from "react";

type ErrorType = {
  error: string | null;
};
const Error = ({ error }: ErrorType) => {
  return <div className="text-red-500 text-md">{error}</div>;
};

export default Error;
