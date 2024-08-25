import API from "@/services/API";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Time({
  theaterMovieId,
  selectedTime,
  setSelectedTime,
  theaterName,
  time,
  setSelectedMovieTimeId,
}: {
  theaterMovieId: string;
  selectedTime: string;
  setSelectedTime: (selectedTime: string) => void;
  theaterName: string;
  time: string;
  setSelectedMovieTimeId: (item: string) => void;
}) {
  const [theaterTimeMovieId, setTheaterTimeMovieId] = useState("");
  const [cookies] = useCookies(["token"]);

  const handleSelection = () => {
    setSelectedTime(`${theaterName}-${time}`);
    setSelectedMovieTimeId(theaterTimeMovieId);
  };

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
    <Button
      variant={
        selectedTime === `${theaterName}-${time}` ? "default" : "outline"
      }
      onClick={handleSelection}
    >
      {time}
    </Button>
  );
}
