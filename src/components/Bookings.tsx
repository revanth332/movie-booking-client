import API from "@/services/API";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export interface Booking {
  theater_name: string;
  movie_name: string;
  price: string;
  time: string;
  booking_id:string,
  seat_nmber:number
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

  const handleCancelBooking = async (bookingId :string) => {
    try{
      const res = await API.post.cancelMovie(bookingId,cookies.token);
      setBookings(bookings.filter((booking) => booking.booking_id != bookingId))
      console.log(res)
    }
    catch(err){
      notify();
      console.log(err);
    }
  }

  const notify = () => toast("Internal server error");

  return (
    bookings.length > 0 ? 
    <div className="flex justify-start p-2 bg-slate-50 flex-col items-center h-screen gap-2">
      <ToastContainer />
      {bookings.map((booking, index) => (
  <div key={index} className="bg-white w-2/3 shadow-md rounded-lg p-4 flex justify-between items-center">
    <div className="flex flex-col">
      <h2 className="text-lg font-bold">{booking.theater_name}</h2>
      <p className="text-gray-700">{booking.movie_name}</p>
      <div className="flex justify-between items-center text-gray-700">
        <p>Price: ₹{booking.price}</p>
        <p>Time: {booking.time}</p>
        <p>Seat: {booking.seat_nmber}</p>
      </div>
    </div>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-sm" onClick={() => handleCancelBooking(booking.booking_id)}>
      Cancel
    </button>
  </div>
))}
    </div>
    :
    <div
    className="flex flex-col items-center 
justify-center h-screen bg-gray-100"
  >
    <h1 className="text-4xl font-bold text-red-500">No Bookings yet!</h1>
    <p
      className="text-lg 
text-gray-500"
    >
      You can book movies instantly in home page
    </p>
  </div>
  );
}
