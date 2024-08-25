import API from "@/services/API";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Timings from "./Timings";
import Moviebanner from "./Moviebanner";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon, ClockIcon, CalendarIcon } from "lucide-react";

export interface Theater {
  theater_movie_id: string;
  theater_name: string;
  address: string;
  price: number;
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
  const movieData = location.state;
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
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
    // <div>
    //   <Moviebanner movie={movieData} />
    //   <div className="grid grid-cols-4 gap-5 p-2 mt-2">
    //     {theaters.map((theater, indx) => (
    //       <div
    //         key={indx}
    //         className="shadow-lg bg-slate-200 max-w-sm p-6  border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    //       >
    //         <a href="#">
    //           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //             {theater.theater_name}
    //           </h5>
    //         </a>
    //         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //           {theater.address}
    //         </p>
    //         <p className="text-green-600">$ {theater.price}</p>
    //         <br />
    //         <Timings theater_movie_id={theater.theater_movie_id} />
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <main className="flex-1">
      {/* <Moviebanner movie={movieData} /> */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Available Theaters
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {theaters.map((theater, index) => (
              <Card key={index} className="w-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {theater.theater_name}
                  </h3>
                  <p className="text-gray-500 mb-4">{theater.address}</p>
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
          </div>
        </div>
      </section>
    </main>
  );
}
