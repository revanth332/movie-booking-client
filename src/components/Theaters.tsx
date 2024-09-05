import API from "@/services/API";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Timings from "./Timings";
import Moviebanner from "./Moviebanner";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Theater {
  theater_movie_id: string;
  theater_name: string;
  theater_address: string;
  price: number;
  date:string;
}

export default function Theaters({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMovieTimeId, setSelectedMovieTimeId] = useState("");
  const location = useLocation();
  const [cookies] = useCookies(["token"]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    console.log(location.state)
    const fetchTheaters = async () => {
      try {
        const theaters = await API.get.getTheaters(
          cookies.token,
          params.movieId
        );
        setTheaters(theaters);
        console.log(theaters);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTheaters();
  }, []);

  const handleBooking = () => {
    navigate(`/seats/${selectedMovieTimeId}`);
  };

  return (

    <main className="flex-1">
      <Moviebanner movie={location.state} />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">

          {
            theaters.filter((theater) => new Date(theater.date) >= new Date()).length > 0 ? <>
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Available Theaters
          </h2> <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {theaters.filter((theater) => new Date(theater.date) >= new Date()).map((theater, index) => (
              <Card key={index} className="w-full">
                <CardContent className="p-6">
                  <div className="flex justify-between">
                  <h3 className="text-2xl font-bold mb-2">
                    {theater.theater_name}
                  </h3>
                  <p className="text-sm font-mono font-bold text-gray-500 mb-4">{theater.date.substring(0,10)}</p>
                  </div>
                  <p className="text-gray-800 mb-4">{theater.theater_address}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    <Timings
                      theater={theater}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      theaterMovieId={theater.theater_movie_id}
                      setSelectedMovieTimeId={setSelectedMovieTimeId}
                    />
                  </div>
                  <Button
                    className="w-full"
                    disabled={!selectedTime.startsWith(theater.theater_name)}
                    onClick={handleBooking}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div></> :
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
                    No Available Available Theaters
                  </h2>
          }

        </div>
      </section>
    </main>
  );
}
