import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import API from "@/services/API";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';

export interface UserSignup {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  gender: string;
  email: string;
  dob: string;
}

export default function Signup({
  setAuthenticated,
}: {
  setAuthenticated: (isAuthenticated: boolean) => void;
}) {
  const [, setCookie] = useCookies(["token", "userId", "userName","role"]);
    const navigate = useNavigate();
  const [user, setUser] = useState<UserSignup>({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    gender: "",
    email: "",
    dob: "",
  });

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    try{
        const res = await API.post.signup(user);
        setCookie("token", res.token);
        setCookie("userId", res.userId);
        setCookie("userName", res.userName);
        setCookie("role",res.role)
        setAuthenticated(true);
        navigate("/");
    }
    catch(err){
      notify(err as Error)
        console.log(err);
    }
  }

  const notify = (err : Error) => toast.error("Failed to Signup : "+err.message);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
          <ToastContainer /> 
        <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="First name"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Last name"
                 value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  } required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dob">DOB</Label>
              <Input
                id="dob"
                type="date"
                placeholder="Date Of Birth"
                value={user.dob}
                  onChange={(e) =>
                    setUser({ ...user, dob: e.target.value })
                  }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Phone number"
                value={user.phone}
                  onChange={(e) =>
                    setUser({ ...user, phone: e.target.value })
                  }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={user.email}
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" 
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
               required />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      </form>
    </div>
  );
}
