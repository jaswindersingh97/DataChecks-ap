import React, { useState } from 'react'
import { toast } from "react-toastify";
import Form from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import Api from './../../Api/Api'
import AuthLayout from '../../components/AuthPageLayout/AuthPageLayout';
import Loading from './../../assets/Loading.gif'
function Register() {
    const [loading,setLoading] = useState(false)
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
        setLoading(true);
        const response =await Api({
          endpoint: "/login",
          method: "POST",
          data,
        });
        setLoading(false);
        if(response.status === 200){
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("id", response.data.id);
          toast.success("Registered Succesfully");
          window.location.href = from;
        }
      };
        
  return (
    <>
      <h1 className='font-bold'>Register Page</h1>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Register"}/>
       <p>Don’t have an account? <mark><Link to={"/signIn"}>SignIn now</Link></mark></p>
       {loading?<div style={{alignSelf:'center'}}> <img src={Loading} className='loading' alt="loading"/></div> : null}
    </>
  )
}
const RegisterPage = () => (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );

export default RegisterPage
