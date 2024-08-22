import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "./LandingPage";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }: { movie: Movie }): JSX.Element {
  return (
    <Card className="h-[330px] bg-slate-200">
      <CardHeader>
        <img src="src\assets\movie.jpg" alt="" />
      </CardHeader>

      <CardContent>
        <CardTitle>
          {movie.movie_name.length > 20
            ? movie.movie_name.substring(0, 20) + "..."
            : movie.movie_name}
        </CardTitle>
        <br />
        <CardDescription>
          <div className="flex justify-between">
            <Button>
              <Link to={movie.movie_id} state={movie}>
                Watch
              </Link>
            </Button>
            <p className="text-red-500 font-bold flex items-center">
              {" "}
              Rating : {movie.rating}
            </p>
          </div>
        </CardDescription>
      </CardContent>
      {/* <CardFooter>
            <p className="text-red-500"> Rating : {movie.rating}</p>
        </CardFooter> */}
    </Card>
  );
}
