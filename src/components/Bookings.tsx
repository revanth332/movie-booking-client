import API from "@/services/API";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

export interface Booking {
  theater_name: string;
  movie_name: string;
  price: string;
  time: string;
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

  return (
    <>
      {bookings.map((booking, indx) => (
        <div key={indx} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold">{booking.theater_name}</h2>
          <p className="text-gray-700">{booking.movie_name}</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Price: ₹{booking.price}</p>
            <p className="text-gray-700">Time: {booking.time}</p>
          </div>
        </div>
      ))}
    </>
  );
}
