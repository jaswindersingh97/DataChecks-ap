import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-sky-300 w-screen h-screen p-12 flex flex-col gap-5 box-border ">
      <div className="mb-4">
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto my-auto w-1/4 relative z-10 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
