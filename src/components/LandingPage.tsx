import { useEffect,useState } from "react";
import MovieCard from "./MovieCard";
import API from '../services/API'

export interface Movie{
    movie_id:string,
    movie_name : string,
    description : string,
    rating:number
}

function LandingPage() : JSX.Element {
    const [movies,setMovies] = useState<Movie[]>([])

    useEffect(() => {
        const fechMovies = async () => {
            try{
                const movies  = await API.get.getMovies();
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
    <div className="h-screen w-screen">
      <div className="absolute w-full h-full backdrop-brightness-50"></div>
      <div className="absolute w-full h-full flex flex-col items-center">
        <div className="w-3/4 mt-32">
          <h1 className="text-9xl font-bold text-white">MOVIE <br /> BOOKING</h1>
            <div className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem eaque blanditiis, voluptatem
              explicabo fugiat illum non nihil vero deleniti, architecto quibusdam a vitae eligendi eveniet
              accusantium ullam soluta nulla molestias.Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem eaque blanditiis, voluptatem
              explicabo fugiat illum non nihil vero deleniti, architecto quibusdam a vitae eligendi eveniet
              accusantium ullam soluta nulla molestias.
            </div>
            <div className="mt-4">
              <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">SignIn</button>
              <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"><a href="#trending-movies">Show Movies</a></button>
            </div>
        </div>
      </div>
      <img src="src\assets\movie-bg.jpg" className="h-full w-full" alt="df" />
    </div>
    <div className="p-2 mt-5 h-screen w-screen">
      <h1 className="text-center font-bold text-3xl text-red-500">Trending Movies </h1>
      <br />
      <div id="trending-movies" className="grid grid-cols-5 grid-rows-2 place-items-center gap-5">
        {
          movies.map((movie,indx) => <MovieCard key={indx} movie={movie}/>)
        }
      </div>
    </div>
    </div>
  );
}

export default LandingPage;