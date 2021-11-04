import { FC } from "react";

const Alert: FC<{ message: string }> = ({ message }) => {
  return (
    <>
      {message && (
        <div className="alert alert-danger">
          <div className="alert__message">
            <pre>{message}</pre>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
