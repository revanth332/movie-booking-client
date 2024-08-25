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
  const [selectedSeats, setSelectedSeats] = useState<Number[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [cookies, ] = useCookies();
  const navigate = useNavigate();

  const params = useParams();

  const totalPrice = selectedSeats.length * 150;

  useEffect(() => {
    console.log(params);
    const getSeats = async () => {
      try {
        const seats = await API.get.getSeats(
          params.theaterTimeMovieId,
          cookies.token
        );
        // console.log(seats);
        setSeats(seats);
      } catch (err) {
        console.log(err);
      }
    };
    getSeats();
  }, []);

  const handleSelection = (seatNumber: number, seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
    setSelectedSeatIds((prev) =>
      prev.includes(seatId)
        ? prev.filter((seatid) => seatid !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    try {
      const res = await API.post.bookMovie(
        cookies.userId,
        selectedSeatIds,
        params.theaterTimeMovieId,
        cookies.token
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const SeatButton = ({
    number,
    seat,
    isSelected,
    onSelect,
  }: {
    number: number;
    isSelected: boolean;
    seat: Seat;
    onSelect: (number: number, seatId: string) => void;
  }) =>
    seat.status_id !== 1 ? (
      <button
        className={`w-10 h-10 m-1 flex items-center justify-center border rounded ${
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-background hover:bg-secondary"
        }`}
        onClick={() => onSelect(number, seat.seat_id)}
      >
        {number}
      </button>
    ) : (
      <button
        className={`w-10 h-10 m-1 flex items-center justify-center border rounded bg-secondary`}
      >
        {number}
      </button>
    );

  const SeatRow = ({
    start,
    end,
    selectedSeats,
    onSeatSelect,
  }: {
    start: number;
    end: number;
    selectedSeats: Number[];
    onSeatSelect: (seatNumber: number, seatId: string) => void;
  }) => (
    <div className="flex justify-center">
      {seats.slice(start, end + 1).map((seat, index) => {
        const seatNumber = start + index;
        return (
          <SeatButton
            key={seatNumber}
            number={seatNumber}
            seat={seat}
            isSelected={selectedSeats.includes(seatNumber)}
            onSelect={onSeatSelect}
          />
        );
      })}
    </div>
  );

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 text-center">
            Select Your Seats
          </h1>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-center">
                Front Section
              </h2>
              <div className="bg-muted p-4 rounded-lg">
                <SeatRow
                  start={1}
                  end={10}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
                <SeatRow
                  start={11}
                  end={20}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
                <SeatRow
                  start={21}
                  end={30}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-center">
                Back Section
              </h2>
              <div className="bg-muted p-4 rounded-lg">
                <SeatRow
                  start={31}
                  end={40}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
                <SeatRow
                  start={41}
                  end={50}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
                <SeatRow
                  start={51}
                  end={60}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
                <SeatRow
                  start={61}
                  end={70}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
                <SeatRow
                  start={71}
                  end={80}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
                <SeatRow
                  start={81}
                  end={90}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
                <SeatRow
                  start={91}
                  end={100}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSelection}
                />
              </div>
            </div>
            <div className="text-center space-y-4">
              <p>
                Selected Seats:{" "}
                {selectedSeats.sort((a, b) => Number(a) - Number(b)).join(", ")}
              </p>
              <p className="text-xl font-semibold">
                Total Price: ₹{totalPrice}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    onClick={handleBooking}
                    disabled={selectedSeats.length === 0}
                  >
                    Confirm Selection
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
                          navigate("/bookings");
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
        </div>
      </section>
    </main>

    // <div className="flex items-center justify-evenly flex-col h-screen">
    //   <div className="grid grid-cols-10 w-1/2 gap-2">
    //     {seats.slice(0, 21).map((seat, indx) =>
    //       seat.status_id == 1 ? (
    //         <div
    //           key={indx}
    //           className="border-2 text-center border-gray-400 bg-gray-400 text-white h-[30px] w-[30px]"
    //         >
    //           {seat.seat_nmber}
    //         </div>
    //       ) : (
    //         <div
    //           key={indx}
    //           onClick={() => handleSelection(seat.seat_nmber, seat.seat_id)}
    //           style={
    //             selectedSeats[seat.seat_nmber]
    //               ? { backgroundColor: "green", color: "white" }
    //               : { border: "2px solid green", color: "black" }
    //           }
    //           className="border-2 text-center h-[30px] w-[30px]"
    //         >
    //           {seat.seat_nmber}
    //         </div>
    //       )
    //     )}
    //   </div>
    //   <div className="grid grid-cols-10 w-1/2 gap-2">
    //     {seats.slice(21).map((seat, indx) =>
    //       seat.status_id == 1 ? (
    //         <div
    //           key={indx}
    //           className="border-2 text-center border-gray-400 bg-gray-400 text-white h-[30px] w-[30px]"
    //         >
    //           {seat.seat_nmber}
    //         </div>
    //       ) : (
    //         <div
    //           key={indx}
    //           onClick={() => handleSelection(seat.seat_nmber, seat.seat_id)}
    //           style={
    //             selectedSeats[seat.seat_nmber]
    //               ? { backgroundColor: "green", color: "white" }
    //               : { border: "2px solid green", color: "black" }
    //           }
    //           className="border-2 text-center h-[30px] w-[30px]"
    //         >
    //           {seat.seat_nmber}
    //         </div>
    //       )
    //     )}
    //   </div>
    //   <div>
    //     <Dialog>
    //       <DialogTrigger asChild>
    //         <Button onClick={handleBooking} variant="outline">
    //           Book Tickets
    //         </Button>
    //       </DialogTrigger>
    //       <DialogContent className="sm:max-w-md">
    //         <DialogHeader>
    //           <DialogTitle>Message</DialogTitle>
    //           <DialogDescription className="text-green-600">
    //             Movie Booked successfully
    //           </DialogDescription>
    //         </DialogHeader>
    //         <DialogFooter className="sm:justify-start">
    //           <DialogClose asChild>
    //             <Button
    //               onClick={() => {
    //                 navigate("/bookings");
    //               }}
    //               type="button"
    //               variant="secondary"
    //             >
    //               Close
    //             </Button>
    //           </DialogClose>
    //         </DialogFooter>
    //       </DialogContent>
    //     </Dialog>
    //   </div>
    // </div>
  );
}
