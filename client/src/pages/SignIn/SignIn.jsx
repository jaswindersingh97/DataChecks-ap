import React, { useState } from 'react'
import { toast } from "react-toastify";
import Form from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import Api from './../../Api/Api'
import AuthLayout from '../../components/AuthPageLayout/AuthPageLayout';
function SignIn() {
    const from = "Posts";
    const formFields = [
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
          errorMessage: "Please enter a valid email address",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          validate: (value) => value.length >= 6,
          errorMessage: "Password must be at least 6 characters long",
        },
      ];
      const handleSubmit = async(data) => {
        const response =await Api({
          endpoint: "/users/login",
          method: "POST",
          data,
        });
        if(response.status === 200){
          console.log(response.data)
          localStorage.setItem("token",response.data.access_token);
          toast.success("logged-in Succesfully");
          window.location.href = from;
        }
      };
        
  return (
    <>
      <h1 className='font-bold text-2xl self-center'>SignIn Page</h1>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Log In"}/>
       <p className='py-2' >Don’t have an account? <span className='underline text-blue-500'><Link to={"/register"}>Register now</Link></span></p>
    </>
  )
}
const SignInPage = () => (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );

export default SignInPage
