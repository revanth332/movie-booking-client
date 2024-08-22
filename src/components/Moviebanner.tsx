import Rating from "./Rating";
import { Movie } from "./LandingPage";

export default function Moviebanner({ movie }: { movie: Movie }) {
  return (
    <div>
      <div className="w-screen h-[500px] relative">
        <div className=" top-0 w-screen h-[500px] absolute backdrop-brightness-50"></div>
        <img
          className="w-full h-full"
          src="src\assets\movie-banner.jpg"
          alt=""
        />
        <div className="absolute top-0 text-white flex w-screen h-[500px] justify-evenly items-center">
          <div>
            <img
              className="w-[400px] rounded-xl "
              src="src\assets\movie-reel.jpg"
              alt=""
            />
          </div>
          <div className="w-1/3">
            <h1 className="text-7xl ">{movie.movie_name}</h1>
            <br />
            <p>{movie.description}</p>
            <br />
            <Rating rating={movie.rating} />
          </div>
        </div>
      </div>
    </div>
  );
}
