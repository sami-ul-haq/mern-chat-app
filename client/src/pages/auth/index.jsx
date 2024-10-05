import React, { useState } from "react";
import victory from "@/assets/victory.svg";
import background from "@/assets/auth-image.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    if (!email.length) {
      toast.error("Email is Required");
      return;
    }

    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      toast.error("Email format is wrong");
      return;
    }

    if (!password.length) {
      toast.error("Password is Required");
      return;
    }

    // make request
    try {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (response.status == "200") {
        toast.message(response.data.message);
        setEmail("");
        setPassword("");
        if (response.data.message.user._id) {
          if (response.data.message.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        }
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      return;
    }
  };

  const handleSignUp = async () => {
    if (!email.length) {
      toast.error("Email is Requiredl");
      return;
    }

    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      toast.error("Email format is wrong");
      return;
    }

    if (!password.length) {
      toast.error("Password is Requiredl");
      return;
    }

    if (password.length < 4) {
      toast.error("Password is too short");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords are Not Matching.");
      return;
    }

    // make request
    try {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        {
          withCredentials: true,
        }
      );

      if (response.status == "201") {
        toast.message(response.data.message);
        navigate("/profile");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }

      console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return;
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="min-h-[80vh] bg-white border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-60vw rounded-3xl grid xl:grid-cols-2 py-3">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl leading font-bold md:text-5xl">
                Welcome
              </h1>
              <img src={victory} alt="victory" className="h-[100px]" />
            </div>
            <p>Fill in the details to get started with the best chat app!</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="flex flex-col gap-5 mt-10">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center ">
          <img
            src={background}
            alt="background"
            className="w-full h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
