"use client"
import { useUserContext } from '@/app/context/Userinfo';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast"
import { useEffect } from 'react';

import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import Link from "next/link";

import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { useRouter } from "next/navigation"
import { useSession, signIn } from 'next-auth/react';

function Login() {
  const { data: session } = useSession()

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { contextsetIsLoggedIn, contextsetEmail, contextsetName, contextemail, contextname, } = useUserContext(); // Updated hook
  const [loggedin, setLoggedin] = useState()
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Update email context if it's empty


  const Getuserinfo = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      toast({
        title: "No authentication token found",
      });
      console.log("no token")
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          "Authorization": token,
          'Content-Type': "application/json",
        },
        credentials: 'include',
      });
      console.log(token)
      // Log the response status and status text
      console.log('Response Status:', response.status, response.statusText);

      // Check if the response is not OK (status code 200-299)
      if (!response.ok) {
        // Log more detailed error information
        const errorText = await response.text();
        console.error('Error Response:', errorText);

        // Handle specific HTTP error codes
        if (response.status === 401) {
          console.error('Unauthorized: Check your token and permissions.');
        } else if (response.status === 404) {
          console.error('Not Found: The requested resource does not exist.');
        } else {
          console.error(`HTTP Error: ${response.statusText}`);
        }

        // Optionally, throw an error to be caught by the catch block
        throw new Error(`HTTP Error: ${response.statusText}`);
      }

      // Parse the JSON response if the request was successful
      const result = await response.json();
      console.log('User Info:', result);

      // Proceed with handling the successful response
      // ...






      // Update context with user information
      contextsetIsLoggedIn(true);
      contextsetEmail(result.email);
      contextsetName(result.name);

      toast({
        title: "You are Successfully Logged In",
      });

      // Redirect to the home page
      router.push("/");

    } catch (error) {
      toast({
        title: "There was an error",
        description: error.message,
      });
      console.error("Error fetching Organisation info:", error);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password,is_company:true }),
      });

      // Log the response status and status text
      console.log('Response Status:', response.status, response.statusText);

      if (!response.ok) {
        // Check for specific status codes and handle them accordingly
        if (response.status === 401) {
          toast({
            title: "Wrong Password",
          });
        } else {
          toast({
            title: "Failed to login",
            description: `Error ${response.status}: ${response.statusText}`,
          });
        }
        return;
      }

      const result = await response.json();
      console.log('Login Successful:', result);

      // Store the JWT token in local storage
      localStorage.setItem('authToken', result.jwt);

      // Fetch user information
      await Getuserinfo();

    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
      });
      console.error("Error submitting form:", error);
    }
  };


  // const OAuth = async()=>{
  //   try {
  //     const response = await fetch(`http://0.0.0.0:8000/api/oauth2/login/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({ name, email }),
  //       if( response){
  //         console.log(name,email)
  //         router.push('/')
  //         toast({
  //           title: "You are Successfully Logged In",

  //         });
  //       }
  //     },

  //   );


  //   } catch (error) {
  //     toast({
  //       title: "An error occurred",
  //     });
  //     console.error("Error submitting form:", error);
  //   }
  // }





  async function loginWithGoogle() {
    setLoading(true);
    console.log("hello")
    try {
      await signIn('google')
    } catch (error) {
      // display error message to user
      toast.error('Something went wrong with your login.')
    } finally {
      setLoading(false)
      OAuth();
    }

  }
  async function loginWithGithub() {
    setLoading(true);



    try {


      await signIn('github')
    } catch (error) {
      // display error message to user
      toast.error('Something went wrong with your login.')
    } finally {
      setLoading(false)
    }

  }
  useEffect(() => {
    console.log("session", session)
    if (session) {
      contextsetIsLoggedIn(true)
      contextsetEmail(session.user.email);
      contextsetName(session.user.name);
      setName(session.user.name)
      setEmail(session.user.email)
    }
  }, [session]);
  // useEffect(() => {
  //   if(name !==""){
  //     OAuth();
  //   }
  // },[name,email])
  console.log(name, email)

  const OAuth = async () => {

    try {
      const response = await fetch('http://localhost:8000/api/oauth2/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email,is_company:true }),
      });

      // Log the response status and status text
      console.log('Response Status:', response, response.statusText);

      if (!response.ok) {
        // Check for specific status codes and handle them accordingly

        throw new Error('Failed to login');
      }

      const result = await response.json();
      console.log('Login Successful:', result);

      // Store the JWT token in local storage
      localStorage.setItem('authToken', result.jwt);

      // Redirect to the home page and show a success message
      router.push('/');
      toast({
        title: "You are Successfully Logged In",
      });

      // Fetch user information
      await Getuserinfo();


    } catch (error) {
      toast({
        title: "There was an error",
        description: error.message,
      });
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    console.log("name", name)
    console.log("email", email)
    if (session && name && email) {
      OAuth();

      console.log("name", name)
    }
  }, [name, email, session])
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-[#050A0F] mt-[7%]">
      <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-lg w-full max-w-sm">
  <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
    Login to this Website
  </h2>
  <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300 text-center">
    Welcome back! Please sign in to continue.
  </p>
  
  <Link
    href="/Login"
    className="mt-4 w-full"
  >
    <button className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 transition-all rounded-lg font-medium">
      Continue as User
    </button>
  </Link>
</div>


      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </LabelInputContainer>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
          <Link href="/ForgotPassword">
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="button"
            >
              ForgotPassword &rarr;
              <BottomGradient />
            </button>
          </Link>
          <Label htmlFor="password">Don't have an account ?</Label>
          <Link href='/Signup'>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"

            >
              SignUp &rarr;
              <BottomGradient />
            </button>
          </Link>
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">

          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" onClick={loginWithGoogle}// Changed type to "button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button" onClick={loginWithGithub}// Changed type to "button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
export default Login;