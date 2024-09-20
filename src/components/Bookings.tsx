import API from "@/services/API";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Card, CardContent, CardFooter } from "./ui/card";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
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
import { convertTo12HourFormat } from "./Time";

export interface Booking {
  theater_name: string;
  movie_name: string;
  price: string;
  time: string;
  booking_id: string;
  date: string;
  seats_count: number;
}

export default function Bookings() {
  const [cookies] = useCookies(["token", "userId"]);
  const [bookings, setBookings] = React.useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await API.get.getBookings(
          cookies.token,
          cookies.userId
        );
        setBookings(bookings);
        console.log(bookings);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await API.post.cancelMovie(bookingId, cookies.token);
      setBookings(
        bookings.filter((booking) => booking.booking_id != bookingId)
      );
      notify("success")
      // console.log(res);
    } catch (err) {
      notify("error");
      // console.log(err);
    }
  };

  const notify = (type : string) => {
    if(type === "success") return toast.success("Successfully canceled movie");
    else return toast.error("Failed to cancel the movie")
  }

  return (
    <main className="flex-1">
      <ToastContainer />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8">
            Your Booked Movies
          </h1>
          {bookings.length === 0 ? (
            <h1 className="text-xl text-center">You have no current bookings.</h1>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <Card key={booking.booking_id} className="booking-card flex flex-col">
                  <CardContent className="flex-grow p-6">
                    <h2 className="text-2xl font-bold mb-2">
                      {booking.movie_name}
                    </h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{booking.date.substring(0, 10)}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="mr-2 h-4 w-4" />
                        <span>{convertTo12HourFormat(booking.time.substring(0, 5))}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="mr-2 h-4 w-4" />
                        <span>{booking.theater_name}</span>
                      </div>
                    </div>
                    <p className="mt-4">Seats: {booking.seats_count}</p>
                    <p className="font-semibold mt-2">
                      Total Price: $
                      {Number(booking.seats_count) * Number(booking.price)}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                      <Button
                      variant="destructive"
                      className="w-full"
                      // onClick={() => handleCancelBooking(booking.booking_id)}
                    >
                      Cancel Booking
                    </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Confirm</DialogTitle>
                          <DialogDescription>
                            Do you want to cancel the ticket ?
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="sm:justify-start">
                        <Button type="button" variant="default" onClick={() => handleCancelBooking(booking.booking_id)}>
                              Yes
                            </Button>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
