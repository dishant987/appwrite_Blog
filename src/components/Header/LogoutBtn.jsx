import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutHandler = () => {
    
    authService.logout().then(() => {
    
      dispatch(logout());
      toast.success("Logout Successfull!")
      navigate('/login')

    });
 
  };
  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
