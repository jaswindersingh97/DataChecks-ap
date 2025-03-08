import React, { useState } from 'react'
import { toast } from "react-toastify";
import Form from '../../components/Form/Form';
import { Link } from 'react-router-dom';
import Api from './../../Api/Api'
import AuthLayout from '../../components/AuthPageLayout/AuthPageLayout';
import Loading from './../../assets/Loading.gif'
function SignIn() {
    const from = location.state?.from?.pathname || `/workspace`;
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
          endpoint: "/users/login",
          method: "POST",
          data,
        });
        setLoading(false);
        if(response.status === 200){
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("id", response.data.id);
          toast.success("logged-in Succesfully");
          window.location.href = from;
        }
      };
        
  return (
    <>
      <h1 className='font-bold'>SignIn Page</h1>
      <Form fields={formFields} onSubmit={handleSubmit} buttonLabel={"Log In"}/>
       <p>Don’t have an account? <mark><Link to={"/register"}>Register now</Link></mark></p>
       {loading?<div style={{alignSelf:'center'}}> <img src={Loading} className='loading' alt="loading"/></div> : null}
    </>
  )
}
const SignInPage = () => (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );

export default SignInPage
