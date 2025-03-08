import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Api from '../../Api/Api';
import { useUser } from '../../context/userContext';

function NavBar() {
    const {user, setUser}= useUser();

    const fetchUser = async () => {
        try {
            const response = await Api({
                endpoint: "/users/fetch",
                method: 'get',
                includeToken: true
            });
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
        return () => {
            console.log("Cleanup on unmount");
        };
    }, []);

    return (
        <nav className="bg-gray-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/posts" className="text-lg font-semibold">
                    Home
                </Link>

                <div>
                    {user && (
                        <span className="mr-4">Welcome, {user.name}</span>
                    ) }
                    <Link to={"/signIn"} onClick={()=>{
                        localStorage.removeItem("token")
                    }} className='text-lg p-1 rounded-xl cursor-pointer bg-red-500 font-semibold'>Logout</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
