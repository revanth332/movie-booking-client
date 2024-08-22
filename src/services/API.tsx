import axios from "axios";
import { Movie } from "@/components/LandingPage";
import { Theater } from "@/components/Theaters";
import { Showtime } from "@/components/Timings";
import { UserSignin } from "@/components/Signin";
// const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNDk4NTk3YS02MDYzLTExZWYtOTM1YS04Y2VjNGJjOTkxNGQiLCJpYXQiOjE3MjQzMjI1NDYsImV4cCI6MTcyNDQwODk0Nn0.t6mGy1Vp-l6fFJmGsT0zEXitPbcrQ8vF9FT5yhjCsig"
const USER_URL = "http://localhost:8000/v1/user";
const AUTH_URL = "http://localhost:8000/v1/auth";

export default {
  post: {
    signin: async (user : UserSignin) => {
      try{
        const response = await axios.post(`${AUTH_URL}/loginUser`,user);
        return response.data;
      }
      catch(err){
        throw err;
      }
    }
  },
  get:{
    getMovies: async () : Promise<Movie[]> => {
      try{
        const response = await axios.get<Movie[]>(`http://localhost:8000/v1/getTrendingMovies`);
        return response.data;
      }
      catch(err){
        throw err;
      }
    },
    getTheaters : async (token:string,movieId : string | undefined) => {
      try{
        const response = await axios.get<Theater[]>(`${USER_URL}/getTheaters?movieId=${movieId}`,{
          headers:{
            "Authorization":"Bearer "+token
          }
        });
        return response.data;
      }
      catch(err){
        throw err;
      }
    },
    getShowTimes : async (token:string,theaterMovieId : string | undefined) => {
      try{
        const response = await axios.get<Showtime[]>(`${USER_URL}/getShowTimes?theaterMovieId=${theaterMovieId}`,{
          headers:{
            "Authorization":"Bearer "+token
          }
        });
        return response.data;
      }
      catch(err){
        throw err;
      }
    }
  }
};
