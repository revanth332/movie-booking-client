import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export interface UserSignin {
  phone: string;
  password: string;
}

export default function Signin({
  setAuthenticated,
}: {
  setAuthenticated: (isAuthenticated: boolean) => void;
}) {
  const [user, setUser] = useState<UserSignin>({ phone: "", password: "" });
  const [, setCookie] = useCookies(["token", "userId", "userName","role"]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post.signin(user);
      console.log(res);
      setCookie("token", res.token);
      setCookie("userId", res.userId);
      setCookie("userName", res.userName);
      setCookie("role", res.role);
      setAuthenticated(true);
      if(res.role === "user") navigate("/");
      else navigate("/publishedMovies")
      // console.log(res.token);
    } catch (err) {
      notify(err as Error)
      console.log(err);
    }
  };

  const notify = (err : Error) => toast.error("Failed to Signin : "+err.message);

  return (
    <div className="w-screen h-screen flex justify-center items-center">  
        <ToastContainer /> 
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your phone number below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="text"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  placeholder="+91 111 222 3334"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
