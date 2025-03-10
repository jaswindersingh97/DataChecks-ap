import React, { useState } from 'react'
import { toast } from "react-toastify";
import Form from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import Api from './../../Api/Api'
import AuthLayout from '../../components/AuthPageLayout/AuthPageLayout';
function Register() {
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
          name: "name",
          label: "Username",
          type: "text",
          required: true,
          validate: (value) =>value.length >= 3,
          errorMessage: "Username should be at least 3 characters",
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
          endpoint: "/users/register",
          method: "POST",
          data,
        });
        if(response.status === 200){
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("id", response.data.id);
          toast.success("Registered Succesfully");
        }
      };
        
  return (
    <>
      <h1 className='font-bold text-2xl self-center'>Register Page</h1>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Register"}/>
       <p className='py-2' >Don’t have an account? <span className='underline text-blue-500'><Link to={"/signIn"}>SignIn now</Link></span></p>
    </>
  )
}
const RegisterPage = () => (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );

export default RegisterPage
