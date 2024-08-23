import API from "@/services/API";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Seat {
  seat_id: string;
  seat_nmber: number;
  status_id: number;
}

export default function Seats() {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<boolean[]>([]);
  const [confirmedSeats, setConfirmedSeats] = useState<string[]>([]);
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    console.log(params);
    const getSeats = async () => {
      try {
        const seats = await API.get.getSeats(
          params.theaterTimeMovieId,
          cookies.token
        );
        console.log(seats);
        setSeats(seats);
        setSelectedSeats(seats.map((seat: boolean) => false));
      } catch (err) {
        console.log(err);
      }
    };
    getSeats();
  }, []);

  const handleSelection = (seatNumber: number, seatId: string) => {
    setSelectedSeats(
      selectedSeats.map((item, indx) => {
        indx == seatNumber ? (item == true ? false : true) : item;
        if (indx == seatNumber) {
          if (item == true) {
            setConfirmedSeats(confirmedSeats.filter((item) => item != seatId));
            return false;
          } else {
            setConfirmedSeats([...confirmedSeats, seatId]);
            return true;
          }
        }
        console.log(confirmedSeats);
        return item;
      })
    );
  };

  const handleBooking = async () => {
    try {
      const res = await API.post.bookMovie(
        cookies.userId,
        confirmedSeats,
        cookies.token
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-evenly flex-col h-screen">
      <div className="grid grid-cols-10 w-1/2 gap-2">
        {seats.slice(0, 21).map((seat, indx) =>
          seat.status_id == 1 ? (
            <div
              key={indx}
              className="border-2 text-center border-gray-400 bg-gray-400 text-white h-[30px] w-[30px]"
            >
              {seat.seat_nmber}
            </div>
          ) : (
            <div
              key={indx}
              onClick={() => handleSelection(seat.seat_nmber, seat.seat_id)}
              style={
                selectedSeats[seat.seat_nmber]
                  ? { backgroundColor: "green", color: "white" }
                  : { border: "2px solid green", color: "black" }
              }
              className="border-2 text-center h-[30px] w-[30px]"
            >
              {seat.seat_nmber}
            </div>
          )
        )}
      </div>
      <div className="grid grid-cols-10 w-1/2 gap-2">
        {seats.slice(21).map((seat, indx) =>
          seat.status_id == 1 ? (
            <div
              key={indx}
              className="border-2 text-center border-gray-400 bg-gray-400 text-white h-[30px] w-[30px]"
            >
              {seat.seat_nmber}
            </div>
          ) : (
            <div
              key={indx}
              onClick={() => handleSelection(seat.seat_nmber, seat.seat_id)}
              style={
                selectedSeats[seat.seat_nmber]
                  ? { backgroundColor: "green", color: "white" }
                  : { border: "2px solid green", color: "black" }
              }
              className="border-2 text-center h-[30px] w-[30px]"
            >
              {seat.seat_nmber}
            </div>
          )
        )}
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleBooking} variant="outline">
              Book Tickets
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Message</DialogTitle>
              <DialogDescription className="text-green-600">
                Movie Booked successfully
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
