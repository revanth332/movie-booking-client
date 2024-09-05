import axios from "axios";
import { Movie } from "@/components/LandingPage";
import { Theater } from "@/components/Theaters";
import { Showtime } from "@/components/Timings";
import { UserSignin } from "@/components/Signin";
import { UserSignup } from "@/components/Signup";
import "react-toastify/dist/ReactToastify.css";
import { Publisher } from "@/components/PublisherSignUp";
import { Pmovie, PublishingMovie } from "@/components/PublishMovie";
import { PublishedMovie } from "@/components/PublishedMovies";
const USER_URL = import.meta.env.VITE_USER_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const PUBLISHER_URL = import.meta.env.VITE_PUBLISHER_URL;
const VITE_URL = import.meta.env.VITE_URL;

export default {
  post: {
    signin: async (user: UserSignin) => {
      try {
        const response = await axios.post(`${AUTH_URL}/loginUser`, user);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    publisherSignin: async (user: UserSignin) => {
      try {
        const response = await axios.post(`${AUTH_URL}/loginPublisher`, user);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    signup: async (user: UserSignup) => {
      try {
        const response = await axios.post(`${AUTH_URL}/registerUser`, user);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    publisherSignup: async (user: Publisher) => {
      try {
        const response = await axios.post(`${AUTH_URL}/registerTheater`, user);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    bookMovie: async (
      userId: string,
      seats: string[],
      theaterTimeMovieId: string | undefined,
      token: string
    ) => {
      try {
        const response = await axios.post(
          `${USER_URL}/bookMovie`,
          {
            userId,
            seats,
            theaterTimeMovieId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    cancelMovie: async (bookingId: string, token: string) => {
      try {
        const response = await axios.post(
          `${USER_URL}/cancelBooking`,
          {
            bookingId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    addMovie: async (movie: PublishingMovie, token: string) => {
      try {
        // console.log(movie)
        const response = await axios.post(`${PUBLISHER_URL}/addMovie`, movie, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  get: {
    getMovies: async (): Promise<Movie[]> => {
      try {
        const response = await axios.get<Movie[]>(
          `${USER_URL}/getTrendingMovies`
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    getExternalMovies : async (name : string): Promise<Pmovie[]> => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?s=${name}&y=2024&type=movie&page=1&apikey=658d4be7`
        );
        return response.data.Search;
      } catch (err) {
        throw err;
      }
    },
    getPublishedMovies: async (
      theaterId: string,
      token: string
    ): Promise<PublishedMovie[]> => {
      try {
        const response = await axios.get<PublishedMovie[]>(
          `${PUBLISHER_URL}/getPublishedMovies?theaterId=${theaterId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    getTheaters: async (token: string, movieId: string | undefined) => {
      try {
        const response = await axios.get<Theater[]>(
          `${USER_URL}/getTheaters?movieId=${movieId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    getShowTimes: async (token: string, theaterMovieId: string | undefined) => {
      try {
        const response = await axios.get<Showtime[]>(
          `${USER_URL}/getShowTimes?theaterMovieId=${theaterMovieId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    getTheaterTimeMovieId: async (
      theater_movie_id: string,
      time: string,
      token: string
    ) => {
      try {
        const response = await axios.get(
          `${USER_URL}/getTheaterTimeMovieId?theaterMovieId=${theater_movie_id}&time=${time}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        return response.data[0].theater_movie_time_id;
      } catch (err) {
        throw err;
      }
    },
    getSeats: async (theaterTimeMovieId: string | undefined, token: string) => {
      try {
        const response = await axios.get(
          `${USER_URL}/getSeats?theaterMovieTimeId=${theaterTimeMovieId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    getBookings: async (token: string, userId: string) => {
      try {
        const response = await axios.get(
          `${USER_URL}/getBookings?userId=${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    getMoviesByGenre: async (token: string,genre:string) => {
      try {
        const response = await axios.get(
          `${USER_URL}/getMoviesByGenre?genre=${genre}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
  delete:{
    cancelPublishedMovie: async (token: string, theaterMovieTimeId: string,date:string) => {
      try {
        const response = await axios.delete(
          `${PUBLISHER_URL}/cancelPublishedMovie?theaterMovieTimeId=${theaterMovieTimeId}&date=${date}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response);
        return response.data;
      } catch (err) {
        throw err;
      }
    } 
  }
};
