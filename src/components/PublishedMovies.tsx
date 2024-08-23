import API from "@/services/API";
import { useEffect, useState } from "react";
import { Movie } from "./LandingPage";
import { useCookies } from "react-cookie";

export default function PublishedMovies() {
    const [movies,setMovies] = useState<Movie[]>([]);
    const [cookies] = useCookies();
    useEffect(() => {
        const fechMovies = async () => {
            try{
                const movies  = await API.get.getPublishedMovies(cookies.theaterId,cookies.token);
                setMovies(movies);
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
        {
            movies.map((movie) => <div className="relative h-full w-full">
            <img
              src="src\assets\devara2.jpg"
              alt={movie.movie_name}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
              <h2 className="text-white text-2xl font-bold">{movie.movie_name}</h2>
              <p className="text-white text-lg mt-2">{movie.description}</p>
            </div>
          </div>)
        }

    </div>
  )
}
