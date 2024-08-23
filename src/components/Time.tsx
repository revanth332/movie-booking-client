import API from "@/services/API";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function Time({
  theaterMovieId,
  time,
}: {
  theaterMovieId: string;
  time: string;
}) {
  const [theaterTimeMovieId, setTheaterTimeMovieId] = useState([]);
  const [cookies] = useCookies(["token"]);
  useEffect(() => {
    const fun = async () => {
      try {
        const theaterTimeMovieId = await API.get.getTheaterTimeMovieId(
          theaterMovieId,
          time,
          cookies.token
        );
        setTheaterTimeMovieId(theaterTimeMovieId);
        console.log(theaterTimeMovieId);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, []);

  return (
    <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border-purple-400 border">
      <Link to={`/seats/${theaterTimeMovieId}`}>{time.substring(0, 5)}</Link>
    </span>
  );
}
