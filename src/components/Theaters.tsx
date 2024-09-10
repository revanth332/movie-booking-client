import API from "@/services/API";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Timings from "./Timings";
import Moviebanner from "./Moviebanner";
import { useCookies } from "react-cookie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";

export interface Theater {
  theater_movie_id: string;
  theater_name: string;
  theater_address: string;
  price: number;
  date: string;
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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<Date[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log(location.state);

    const today = new Date();
    const dateArray = Array.from({ length: 30 }, (_, i) => addDays(today, i));
    setDates(dateArray);

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
    console.log(selectedDate.toISOString().substring(0, 10));
    fetchTheaters();
  }, []);

  const handleBooking = () => {
    navigate(`/seats/${selectedMovieTimeId}`);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? Math.max(0, currentScroll - scrollAmount)
          : Math.min(
              scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
              currentScroll + scrollAmount
            );

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="flex-1">
      <Moviebanner movie={location.state} />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Available Theaters
          </h2>{" "}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-10" />
            </Button>
            <ScrollArea className="w-full rounded-md border">
              <div
                ref={scrollRef}
                className="flex p-4 space-x-2 overflow-x-auto"
              >
                {dates.map((date) => (
                  <Button
                    key={date.toISOString()}
                    variant={
                      isSameDay(date, selectedDate) ? "default" : "outline"
                    }
                    className="flex-shrink-0"
                    onClick={() => setSelectedDate(date)}
                  >
                    {format(date, "MMM d")}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-10" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Select from calendar"
                >
                  <CalendarIcon className="h-4 w-10" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="text-center mb-16">
            <p>Selected Date: {format(selectedDate, "MMMM d, yyyy")}</p>
          </div>
          {theaters.filter(
            (theater) =>
              new Date(theater.date).toISOString().substring(0, 10) ===
              selectedDate.toISOString().substring(0, 10)
          ).length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {theaters
                .filter(
                  (theater) =>
                    new Date(theater.date).toISOString().substring(0, 10) ===
                    selectedDate.toISOString().substring(0, 10)
                )
                .map((theater, index) => (
                  <Card key={index} className="w-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between">
                        <h3 className="text-2xl font-bold mb-2">
                          {theater.theater_name}
                        </h3>
                        <p className="text-sm font-mono font-bold text-gray-500 mb-4">
                          {theater.date.substring(0, 10)}
                        </p>
                      </div>
                      <p className="text-gray-800 mb-4">
                        {theater.theater_address}
                      </p>
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
                        disabled={
                          !selectedTime.startsWith(theater.theater_name)
                        }
                        onClick={handleBooking}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
              No Available Available Theaters
            </h2>
          )}
        </div>
      </section>
    </main>
  );
}
