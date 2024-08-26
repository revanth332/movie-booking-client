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
import { useEffect, useState } from "react";
import API from "@/services/API";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Movie } from "./LandingPage";

export interface PublishingMovie {
  movieId: string;
  price: number;
  date: string;
  time: string[];
  theaterId:string;
}

export default function PublishMovie() {
  const [availableMovies, setAvailableMovies] = useState<Movie[]>([]);
  const [cookies] = useCookies(["theaterToken", "theaterId", "theaterName"]);
  const navigate = useNavigate();
  const [movie, setMovie] = useState<PublishingMovie>({
    movieId: "",
    price: 0,
    date: "",
    time: [],
    theaterId:cookies.theaterId
  });


  useEffect(() => {
    const fechMovies = async () => {
      try {
        const movies = await API.get.getMovies();
        setAvailableMovies(movies);
        console.log(movies);
      } catch (err) {
        console.log(err);
      }
    };
    fechMovies();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(movie);
    try {
      const res = await API.post.addMovie(movie, cookies.theaterToken);
      setMovie({
        movieId: "",
        price: 0,
        date: "",
        time: [],
        theaterId:cookies.theaterId
      })
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMovie({ ...movie, movieId: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, price: +e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, date: e.target.value });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add the selected time to the array
      setMovie((prevMovie) => ({
        ...prevMovie,
        time: [...prevMovie.time, value],
      }));
    } else {
      // Remove the unselected time from the array
      setMovie((prevMovie) => ({
        ...prevMovie,
        time: prevMovie.time.filter((time) => time !== value),
      }));
    }
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
                  value={movie.movieId}
                  onChange={handleMovieNameChange}
                  required
                  className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-black focus:border-black"
                >
                  <option value="">Select Movie</option>
                  {availableMovies.map((item) => (
                    <option value={item.movie_id}>{item.movie_name}</option>
                  ))}
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
                <div id="time" className="flex flex-col">
                  <label>
                    <input
                      type="checkbox"
                      value="09:30"
                      checked={movie.time.includes("09:30")}
                      onChange={handleTimeChange}
                      className="mr-2"
                    />
                    Morning
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="01:00"
                      checked={movie.time.includes("01:00")}
                      onChange={handleTimeChange}
                      className="mr-2"
                    />
                    Afternoon
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="16:00"
                      checked={movie.time.includes("16:00")}
                      onChange={handleTimeChange}
                      className="mr-2"
                    />
                    Evening
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="19:00"
                      checked={movie.time.includes("19:00")}
                      onChange={handleTimeChange}
                      className="mr-2"
                    />
                    Night
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Add Movie
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
