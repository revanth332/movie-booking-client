import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  PlayCircleIcon,
  SearchIcon,
  TicketIcon,
} from "lucide-react";
import { Movie } from "./LandingPage";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function MovieCard({ movie }: { movie: Movie }): JSX.Element {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/theaters/${movie.movie_id}`,{state:movie});
  };

  return (
    <Card className="flex-shrink-0 w-[300px] relative overflow-hidden group">
      <img
        alt={`Movie poster`}
        className="object-cover w-full transition-transform duration-300 group-hover:scale-110"

        src={movie.poster_url}
        style={{
          aspectRatio: "300/400",
          objectFit: "cover",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-lg mb-2">{movie.movie_name}</h3>
          <p className="text-sm mb-4">
            {movie.genre} • {movie.duration}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <PlayCircleIcon className="h-4 w-4" />
            <span className="text-sm"><Link to="https://www.youtube.com/watch?v=NhSz86YpihM">Watch Trailer</Link></span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="h-4 w-4" />
            <span className="text-sm">
              {movie.release_date.substring(0, 10)}
            </span>
          </div>
          <Button
            onClick={handleBooking}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
