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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import API from "@/services/API";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export interface PublishingMovie {
  movieName: string;
  price: number;
  date: string;
  time: string;
}

export default function PublishMovie() {
  const [movie, setMovie] = useState<PublishingMovie>({
    movieName: "",
    price: 0,
    date: "",
    time: "",
  });
  const [cookies] = useCookies(["token", "theaterId", "theaterName"]);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await API.post.addMovie(movie, cookies.token);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMovie({ ...movie, movieName: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, price: +e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, date: e.target.value });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMovie({ ...movie, time: e.target.value });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Add Movie</CardTitle>
            <CardDescription>Enter movie details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="movieName">Movie Name</Label>
                <select
                  id="movieName"
                  value={movie.movieName}
                  onChange={handleMovieNameChange}
                  required
                  className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-black focus:border-black"
                >
                  <option value="">Select Movie</option>
                  <option value="movie1">Movie 1</option>
                  <option value="movie2">Movie 2</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={movie.price}
                  onChange={handlePriceChange}
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={movie.date}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <select
                  id="time"
                  value={movie.time}
                  onChange={handleTimeChange}
                  required
                  className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-black focus:border-black"
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
