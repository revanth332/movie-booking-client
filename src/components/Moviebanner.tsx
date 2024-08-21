import Rating from "./Rating";
import { useEffect, useState } from "react";
import { Movie } from "./LandingPage";
import API from "@/services/API";

export default function Moviebanner({movieId}:{movieId:string}) {
    const [movie,setMovie] = useState<Movie>();

    useEffect(() => {
      const fechMovies = async () => {
          try{
              const movies  = await API.get.getMovies();
              setMovie(movies.filter((movie) => movie.movie_id === movieId)[0]);
              console.log(movies)
          }
          catch(err){
              console.log(err)
          }
      } 
      fechMovies();
  },[])

  return (
    <div>
        <div className="w-screen h-[500px] relative">
        <div className=" top-0 w-screen h-[500px] absolute backdrop-brightness-50"></div>
          <img className="w-full h-full" src="src\assets\movie-banner.jpg" alt="" />
          <div className="absolute top-0 text-white flex w-screen h-[500px] justify-evenly items-center">
            <div >
                <img className="w-[400px] rounded-xl " src="src\assets\devara.jpg" alt="" />
            </div>
            <div className="w-1/3">
            <h1 className="text-7xl ">
                {movie?.movie_name}
            </h1>
            <br />
            <p>
              {movie?.description}
            </p>
            <br />
            <Rating rating={movie} />
            </div>
          </div>
        </div>
        
    </div>
  )
}
