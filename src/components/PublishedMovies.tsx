import API from "@/services/API";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export interface PublishedMovie{
  movie_name:string;
  description:string;
  price:number;
  date:Date;
}

export default function PublishedMovies() {
    const [movies,setMovies] = useState<PublishedMovie[]>([]);
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
    <div className="mt-5">
      <h1 className="text-2xl mb-5 font-bold leading-7 text-center text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Published Movies</h1>

<div className="relative w-3/4 overflow-x-auto mx-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Movie Name
                </th>
                <th scope="col" className="px-6 py-3">
                Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                Date
                </th>
                <th scope="col" className="px-6 py-3">
                Price
                </th>
            </tr>
        </thead>
        <tbody>
            {
              movies.map((movie,indx) => <tr key={indx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {movie.movie_name}
              </th>
              <td className="px-6 py-4">
                  {movie.description}
              </td>
              <td className="px-6 py-4">
                  {movie.date.toString().substring(0,10)}
              </td>
              <td className="px-6 py-4">
                  Rs.{movie.price}
              </td>
              <td className="px-6 py-4">
                  <a href="#" className="font-medium text-red-600  hover:underline">Cancel</a>
              </td>
          </tr>)
            }
            
        </tbody>
    </table>
</div>

        {/* {
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
        } */}

    </div>
  )
}
