import { useState,useEffect } from "react";
import API from "@/services/API";
import { useCookies } from "react-cookie";
import Time from "./Time";

export interface Showtime {
    time:string
}

export default function Timings({theater_movie_id}:{theater_movie_id:string}) {
    const [timings,setTimings] = useState<Showtime[]>([]);
    const [cookies] = useCookies(["token"])

    useEffect(() => {
        const fetchTheaters = async () => {
            try{
                const showTimes = await API.get.getShowTimes(cookies.token,theater_movie_id);
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
            timings.map((time,indx) => <Time theaterMovieId={theater_movie_id} time={time.time} />)
        }
    </div>
  )
}
