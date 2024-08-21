import API from "@/services/API";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timings from "./Timings";
import Moviebanner from "./Moviebanner";

export interface Theater {
    theater_movie_id:string,
  theater_name: string;
  address: string;
  price: number;
}

export default function Theaters() {
    const [theaters,setTheaters] = useState<Theater[]>([]);
    const params = useParams();
    
    // useEffect(() => {
    //     const fetchTheaters = async () => {
    //         try{
    //             const theaters = await API.get.getTheaters(params.movieId);
    //             setTheaters(theaters);
    //             console.log(theaters)
    //         }
    //         catch(err){
    //             console.log(err);
    //         }
    //     }
    //     fetchTheaters();
    // },[])

  return (
    <div>
        {/* <Moviebanner /> */}
        <div className="grid grid-cols-1 p-2 mt-2">
            {
                theaters.map((theater,indx) => <div key={indx} className="shadow-lg max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {theater.theater_name}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {theater.address}
                    </p>
                    <p className="text-green-600">
                        $ {theater.price}
                    </p>
                    <br />
                    <Timings theater_movie_id={theater.theater_movie_id} />
                  </div>)
            }
        </div>

    </div>
  );
}
