import React from "react";
import classNames from "classnames";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={classNames(
        "w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300",
        className
      )}
    />
  );
};
