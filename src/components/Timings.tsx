import { useState, useEffect } from "react";
import API from "@/services/API";
import { useCookies } from "react-cookie";
import Time from "./Time";
import { Button } from "./ui/button";
import { Theater } from "./Theaters";

export interface Showtime {
  time: string;
}

export default function Timings({
  theaterMovieId,
  selectedTime,
  setSelectedTime,
  theater,
  setSelectedMovieTimeId
}: {
  theaterMovieId: string;
  selectedTime: string;
  setSelectedTime: (selectedTime: string) => void;
  theater: Theater;
  setSelectedMovieTimeId: (item: string) => void;
}) {
  const [timings, setTimings] = useState<Showtime[]>([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const showTimes = await API.get.getShowTimes(
          cookies.token,
          theaterMovieId
        );
        setTimings(showTimes);
        console.log(showTimes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTheaters();
  }, []);
  return (
    <div>
      {/* {
            timings.map((time,indx) => <Time theaterMovieId={theater_movie_id} time={time.time} />)
        } */}
      {timings.map((time, timeIndex) => (
        // <Button
        //   key={timeIndex}
        //   variant={
        //     selectedTime === `${theater.theater_name}-${time.time}` ? "default" : "outline"
        //   }
        //   onClick={() => setSelectedTime(`${theater.theater_name}-${time.time}`)}
        // >
        //   {time.time}
        // </Button>
        <Time
          setSelectedMovieTimeId={setSelectedMovieTimeId}
          theaterName={theater.theater_name}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          theaterMovieId={theater.theater_movie_id}
          time={time.time}
        />
      ))}
    </div>
  );
}
