import API from "@/services/API";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { convertTo12HourFormat } from "./Time";

export interface PublishedMovie{
  movie_name:string;
  description:string;
  price:number;
  date:string;
  time:string,
  theater_movie_time_id:string,
  theater_movie_id:string,
  movie_id:string,
}

export default function PublishedMovies() {
    const [movies,setMovies] = useState<PublishedMovie[]>([]);
    const [cookies] = useCookies(["userId","token"]);
    useEffect(() => {
        const fechMovies = async () => {
            try{
                const movies  = await API.get.getPublishedMovies(cookies.userId,cookies.token);
                setMovies(movies);
                console.log(movies)
            }
            catch(err){
                console.log(err)
            }
        } 
        fechMovies();
    },[])

    const cancelPublishedMovie = async (theaterMovieTimeId : string,date:string,theaterMovieId:string,movieId:string) => {
        try{
            const res = await API.delete.cancelPublishedMovie(cookies.token,theaterMovieTimeId,date.substring(0,10),theaterMovieId,movieId)
            console.log(res);
            setMovies((prev) => prev.filter(movie => movie.theater_movie_time_id != theaterMovieTimeId))
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div className="mt-5">
      <h1 className="text-2xl mt-20 mb-5 font-bold leading-7 text-center text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Published Movies</h1>

<div id="publishedMovies" className="relative lg:w-3/4 h-[600px] overflow-x-auto mx-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400 sticky top-0">
            <tr>
                <th scope="col" className="px-6 py-3">
                Movie Name
                </th>
                <th scope="col" className="px-6 py-3">
                Date
                </th>
                <th scope="col" className="px-6 py-3">
                Time
                </th>
                <th scope="col" className="px-6 py-3">
                Price
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
              movies ? movies.map((movie,indx) => <tr key={indx} className="odd:bg-white even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {movie.movie_name}
              </th>
              <td className="px-6 py-4">
                  {movie.date.toString().substring(0,10)}
              </td>
              <td className="px-6 py-4">
                  {convertTo12HourFormat(movie.time.toString().substring(0,5))}
              </td>
              <td className="px-6 py-4">
                  Rs.{movie.price}
              </td>
              <td className="px-6 py-4">
                  <button className="font-medium text-red-600" onClick={() => cancelPublishedMovie(movie.theater_movie_time_id,movie.date,movie.theater_movie_id,movie.movie_id)}>Cancel</button>
              </td>
          </tr>) : <tr>
            <td colSpan={5} className="text-center font-bold text-xl p-2">{"No published movies"}</td></tr>
            }
            
        </tbody>
    </table>
</div>

    </div>
  )
}
