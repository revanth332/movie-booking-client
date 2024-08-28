import API from "@/services/API";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "./ui/button";

export function convertTo12HourFormat(time24 : string) {
  let [hours, minutes] = time24.split(":");
  let num_hours:number = parseInt(hours);

  let period = num_hours >= 12 ? "PM" : "AM";
  num_hours = num_hours % 12 || 12; // Convert 0 or 12 to 12, and 13-23 to 1-11

  return `${num_hours}:${minutes} ${period}`;
}

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

  const getCurrentTime =  () => {
    const d = new Date();
    return d.getHours()+":"+d.getMinutes();
  }

  return (
    <p>
      {
        getCurrentTime() < time ? <Button
        variant={
          selectedTime === `${theaterName}-${time}` ? "default" : "outline"
        }
        onClick={handleSelection}
      >
        {convertTo12HourFormat(time)}
      </Button> :
      <Button
      variant="secondary"
    >
      {convertTo12HourFormat(time)}
    </Button>
      }
    </p>
  );
}
