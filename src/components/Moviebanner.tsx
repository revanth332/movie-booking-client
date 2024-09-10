import { Movie } from "./LandingPage";
import { CalendarIcon, ClockIcon, StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { tempImage } from "@/App";

export default function Moviebanner({ movie }: { movie: Movie }) {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900 opacity-90"></div>
      <div className="container flex px-4 md:px-6 relative z-10">
        <div>
          <img
            width={300}
            src={movie.poster_url === "N/A" ? tempImage : movie.poster_url}
            alt=""
          />
        </div>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-4">
            {movie.movie_name}
          </h1>
          <p className="text-xl text-gray-200 mb-6">{movie.description}</p>
          <div className="flex flex-wrap gap-4 text-sm mb-6">
            <div className="flex items-center bg-black bg-opacity-50 rounded-full px-3 py-1">
              <StarIcon className="mr-1 h-4 w-4 text-yellow-400" />
              <span>{movie.rating}/10</span>
            </div>
            <div className="flex items-center bg-black bg-opacity-50 rounded-full px-3 py-1">
              <ClockIcon className="mr-1 h-4 w-4" />
              <span>{movie.duration}</span>
            </div>
            <div className="flex items-center bg-black bg-opacity-50 rounded-full px-3 py-1">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <span>{movie.release_date.substring(0, 10)}</span>
            </div>
          </div>
          <div className="space-y-2 mb-6 text-gray-200">
            <p>
              <strong>Genre:</strong> {movie.genre}
            </p>
            {/* <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Cast:</strong> {movie.cast}
                </p> */}
          </div>
          <Link to="https://www.youtube.com/watch?v=NhSz86YpihM">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Watch Trailer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
