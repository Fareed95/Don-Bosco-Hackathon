"use client";
import React, { useEffect } from 'react';
import { useUserContext } from '@/app/context/Userinfo';
import { useToast } from "@/hooks/use-toast";

function GetUserInfo() {
  const { toast } = useToast();
  const { contextsetIsLoggedIn, contextsetEmail, contextsetName,contextorganisation, contextisLoggedIn,contextsetorganisation } = useUserContext();

  const getUserInfo = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.warn("No authentication token found");
      return; // Early return if no token exists
    }
    console.log('Token:', token); 
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          "Authorization": token,
          'Content-Type': "application/json",
        },
        credentials: 'include',
      });

      // Log the response status and status text
      console.log('Response Status:', response.status, response.statusText);

      if (!response.ok) {
        // Check for specific status codes and handle them accordingly
        if (response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "Your session may have expired. Please log in again.",
          });
        } else {
          toast({
            title: "Failed to fetch user info",
            description: `Error ${response.status}: ${response.statusText}`,
          });
        }
  
      }

      const result = await response.json();
      console.log('ID', result);
      if(result.is_company==true){
        contextsetorganisation(result.companies)
      }

      // contextsetId(result.userdetails[0].id);
      // Update context with user information
      contextsetIsLoggedIn(true);
      contextsetEmail(result.email);
      contextsetName(result.name);

      toast({
        title: "Successfully logged in",
        description: `Welcome back, ${result.name}!`,
      });
    } catch (error) {
      toast({
        title: "There was an error",
        description: error.message,
      });
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [contextisLoggedIn]);

  return <div></div>;
}

export default GetUserInfo;


