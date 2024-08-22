import { useState,useEffect } from "react";
import API from "@/services/API";

export interface Showtime {
    time:string
}

export default function Timings({theater_movie_id}:{theater_movie_id:string}) {
    const [timings,setTimings] = useState<Showtime[]>([]);
    
    useEffect(() => {
        const fetchTheaters = async () => {
            try{
                const showTimes = await API.get.getShowTimes(theater_movie_id);
                setTimings(showTimes);
                console.log(showTimes)
            }
            catch(err){
                console.log(err);
            }
        }
        fetchTheaters();
    },[])
  return (
    <div>
        {
            timings.map((time,indx) => <span key={indx} className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border-purple-400 border">
            {time.time.substring(0,5)}
                </span>)
        }
    </div>
  )
}
