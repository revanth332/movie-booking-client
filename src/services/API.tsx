import axios from "axios";
import { Movie } from "@/components/LandingPage";
import { Theater } from "@/components/Theaters";
import { Showtime } from "@/components/Timings";
import { UserSignin } from "@/components/Signin";
import { UserSignup } from "@/components/Signup";
import 'react-toastify/dist/ReactToastify.css';
import { Publisher } from "@/components/PublisherSignUp";
import { PublishingMovie } from "@/components/PublishMovie";
// const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNDk4NTk3YS02MDYzLTExZWYtOTM1YS04Y2VjNGJjOTkxNGQiLCJpYXQiOjE3MjQzMjI1NDYsImV4cCI6MTcyNDQwODk0Nn0.t6mGy1Vp-l6fFJmGsT0zEXitPbcrQ8vF9FT5yhjCsig"
const USER_URL = "http://localhost:8000/v1/user";
const AUTH_URL = "http://localhost:8000/v1/auth";
const PUBLISHER_URL = "http://localhost:8000/v1/publisher";

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
    bookMovie: async (userId: string, seats: string[], token: string) => {
      try {
        const response = await axios.post(
          `${USER_URL}/bookMovie`,
          {
            userId,
            seats,
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
    addMovie: async (movie : PublishingMovie,token:string) => {
      try {
        const response = await axios.post(
          `${USER_URL}/cancelBooking`,
          movie,
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
  },
  get: {
    getMovies: async (): Promise<Movie[]> => {
      try {
        const response = await axios.get<Movie[]>(
          `http://localhost:8000/v1/getTrendingMovies`
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    getPublishedMovies: async (theaterId:string,token:string): Promise<Movie[]> => {
      try {
        const response = await axios.get<Movie[]>(
          `${PUBLISHER_URL}/getPublishedMovies?theaterId=${theaterId}`,{
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

  },
};
