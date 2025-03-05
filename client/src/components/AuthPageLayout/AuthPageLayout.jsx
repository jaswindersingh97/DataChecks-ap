import React from "react";
import { Link } from "react-router-dom";

function AuthLayout({ children }) {
  return (
    <div className="w-screen h-screen p-12 flex flex-col gap-5 box-border ">
      <div className="mb-4">
      </div>
      <div className="mx-auto my-auto w-1/4 relative z-10 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
