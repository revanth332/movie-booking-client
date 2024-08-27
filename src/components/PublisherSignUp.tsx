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

export interface Publisher {
  theaterName: string;
  theaterAddress: string;
  email: string;
  phone: string;
  password: string;
  capacity: number;
  city: string;
}

export default function PublisherSignUp({
  setAuthenticated,
}: {
  setAuthenticated: (isAuthenticated: boolean) => void;
}) {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["theaterToken", "theaterId", "theaterName","role"]);
  const [publisher, setPublisher] = useState<Publisher>({
    theaterName: "",
    theaterAddress: "",
    email: "",
    phone: "",
    password: "",
    capacity: 0,
    city: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post.publisherSignup(publisher);
      console.log(res)
      console.log(res);
      setCookie("theaterToken", res.token);
      setCookie("theaterId", res.theaterId);
      setCookie("theaterName", res.theaterName);
      setCookie("role", res.role);
      setAuthenticated(true);
      navigate("/publishedMovies");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center p-5">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Publisher Sign Up</CardTitle>
            <CardDescription>
              Enter your theater information to create a publisher account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="theater-name">Theater Name</Label>
                <Input
                  id="theater-name"
                  placeholder="Theater name"
                  value={publisher.theaterName}
                  onChange={(e) =>
                    setPublisher({ ...publisher, theaterName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="theater-address">Theater Address</Label>
                <Input
                  id="theater-address"
                  placeholder="Full address of the theater"
                  value={publisher.theaterAddress}
                  onChange={(e) =>
                    setPublisher({ ...publisher, theaterAddress: e.target.value })
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
                  value={publisher.email}
                  onChange={(e) =>
                    setPublisher({ ...publisher, email: e.target.value })
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
                  value={publisher.phone}
                  onChange={(e) =>
                    setPublisher({ ...publisher, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={publisher.password}
                  onChange={(e) =>
                    setPublisher({ ...publisher, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Total number of seats in your theater"
                  value={publisher.capacity}
                  onChange={(e) =>
                    setPublisher({ ...publisher, capacity: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="string"
                  placeholder="City"
                  value={publisher.city}
                  onChange={(e) =>
                    setPublisher({ ...publisher, city: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/pubisherSignin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      </form>
    </div>
      );
    }
    