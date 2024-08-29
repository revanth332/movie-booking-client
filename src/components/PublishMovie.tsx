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
import { useEffect, useState } from "react";
import API from "@/services/API";
import { useNavigate } from "react-router-dom";
import { Movie } from "./LandingPage";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export interface PublishingMovie {
  imdbID: string;
  price: number;
  date: string;
  time: string[];
  theaterId: string;
}

export interface Pmovie{
  Title:string,
  imdbID:string
}

export default function PublishMovie() {
  const [availableMovies, setAvailableMovies] = useState<Pmovie[]>([]);
  const [cookies] = useCookies(["token", "userId"]);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [movie, setMovie] = useState<PublishingMovie>({
    imdbID: "",
    price: 0,
    date: "",
    time: [],
    theaterId: cookies.userId,
  });

  const fechMovies = async (name : string) => {
    try {
      const movies = await API.get.getExternalMovies(name);
      setAvailableMovies(movies);
      console.log(movies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fechMovies("hello");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log(movie)
      const res = await API.post.addMovie(movie, cookies.token);
      if(res){
        setSubmitting(false);
      }
      notify("success", new Error());
      setMovie({
        imdbID: "",
        price: 0,
        date: "",
        time: [],
        theaterId: cookies.userId,
      });
      console.log(res);
    } catch (err) {
      setSubmitting(false);
      notify("error", err as Error);
      console.log(err);
    }
  };

  const handleMovieNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imdbID = availableMovies?.filter(item => item.Title === e.target.value)[0]?.imdbID;
    fechMovies(e.target.value);
    setMovie({ ...movie, imdbID });
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
      setMovie((prevMovie) => ({
        ...prevMovie,
        time: [...prevMovie.time, value],
      }));
    } else {
      setMovie((prevMovie) => ({
        ...prevMovie,
        time: prevMovie.time.filter((time) => time !== value),
      }));
    }
  };

  const notify = (type: string, err: Error) => {
    if (type === "success") {
      toast.success("Successfully Added show!");
    } else {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ToastContainer />
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
                {/* <select
                  id="movieName"
                  value={movie.movieId}
                  onChange={handleMovieNameChange}
                  required
                  className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-black focus:border-black"
                >
                  <option value="">Select Movie</option>
                  {availableMovies.map((item, indx) => (
                    <option key={indx} value={item.movie_id}>
                      {item.movie_name}
                    </option>
                  ))}
                </select> */}
                <Input
                  id="movieName"
                  type="text"
                  placeholder="Choose movie"
                  required
                  list="movies"
                  onChange={handleMovieNameChange}
                />
                <datalist id="movies">
                  {availableMovies?.map((item, indx) => (
                      <option key={indx} value={item.Title} />
                    ))}
                </datalist>
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
                      value="13:00"
                      checked={movie.time.includes("13:00")}
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
                      value="19:30"
                      checked={movie.time.includes("19:30")}
                      onChange={handleTimeChange}
                      className="mr-2"
                    />
                    Night
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="22:30"
                      checked={movie.time.includes("22:30")}
                      onChange={handleTimeChange}
                      className="mr-2"
                    />
                    Late Night
                  </label>
                </div>
              </div>
              {!submitting ? (
                <Button type="submit" className="w-full">
                  Add Movie
                </Button>
              ) : (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
