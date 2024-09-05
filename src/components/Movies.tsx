/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HMF2VimBZqW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Movie } from "./LandingPage";
import API from "@/services/API";
import MovieCard from "./MovieCard";

export default function Component() {
  const [filters, setFilters] = useState<{
    genre: string[];
    rating: number[];
  }>({
    genre: [],
    rating: []
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fechMovies = async () => {
      try {
        const movies = await API.get.getMovies();
        setMovies(movies);
        console.log(movies);
      } catch (err) {
        console.log(err);
      }
    };
    fechMovies();
  }, []);

  const filteredMovies = () => {
    return movies.filter((movie) => {
      if (
        filters.genre.length > 0 &&
        !filters.genre.some((genre) => movie.genre.includes(genre))
      ) {
        return false;
      }
      if (
        filters.rating.length > 0 &&
        !filters.rating.some((rating) => movie.rating >= rating)
      ) {
        return false;
      }
      if (
        searchTerm.trim().length > 0 &&
        !movie.movie_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  };

  const handleFilterChange = (type : string, value : string ) => {
    setFilters((prevFilters) => {
      if (type === "genre") {
        return {
          ...prevFilters,
          genre: prevFilters.genre.includes(value)
            ? prevFilters.genre.filter((item) => item !== value)
            : [...prevFilters.genre, value],
        };
      } else if (type === "rating") {
        return {
          ...prevFilters,
          rating: prevFilters.rating.includes(Number(value))
            ? prevFilters.rating.filter((item) => item !== Number(value))
            : [...prevFilters.rating, Number(value)],
        };
      }
      return prevFilters;
    });
  };

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 mt-16">
      <div className="bg-background rounded-lg shadow-lg p-4 md:p-6 flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Genre</h3>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={filters.genre.includes("Drama")}
                  onCheckedChange={() => handleFilterChange("genre", "Drama")}
                />
                Drama
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={filters.genre.includes("Action")}
                  onCheckedChange={() => handleFilterChange("genre", "Action")}
                />
                Action
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={filters.genre.includes("Comedy")}
                  onCheckedChange={() => handleFilterChange("genre", "Comedy")}
                />
                Comedy
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={filters.genre.includes("Sci-Fi")}
                  onCheckedChange={() => handleFilterChange("genre", "Sci-Fi")}
                />
                Sci-Fi
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={filters.genre.includes("Romance")}
                  onCheckedChange={() => handleFilterChange("genre", "Romance")}
                />
                Romance
              </Label>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Rating</h3>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={filters.rating.includes(8)}
                  onCheckedChange={() => handleFilterChange("rating", "8")}
                />
                8+
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={filters.rating.includes(8.5)}
                  onCheckedChange={() => handleFilterChange("rating", "8.5")}
                />
                8.5+
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={filters.rating.includes(9)}
                  onCheckedChange={() => handleFilterChange("rating", "9")}
                />
                9+
              </Label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-background rounded-lg shadow-lg p-4 md:p-6 mb-6">
          <div className="relative">
            <form >
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8 w-full"
            />
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies().length > 0 ? filteredMovies().map((movie,indx) => (
            <MovieCard key={indx} movie={movie} />
          )) : <h2 className="font-bold">No movies found</h2>}
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props:{className:string}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
