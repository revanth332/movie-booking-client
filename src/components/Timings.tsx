import { useState, useEffect } from "react";
import API from "@/services/API";
import { useCookies } from "react-cookie";
import Time from "./Time";
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
    <div className="flex gap-2">
      {timings.map((time, timeIndex) => (
        <Time
          key={timeIndex}
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
