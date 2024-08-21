import axios from "axios";
import { Movie } from "@/components/LandingPage";
import { Theater } from "@/components/Theaters";
import { Showtime } from "@/components/Timings";
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MTdlMzM2Yi01ZTNjLTExZWYtODI2Mi04Y2VjNGJjOTkxNGQiLCJpYXQiOjE3MjQyNTkzNjAsImV4cCI6MTcyNDM0NTc2MH0.75lwFrvM6_zUomL3FlzZOZO2PJK5mqu5pxQmrFg7TzQ"
const URL = "http://localhost:8000/v1/user";

export default {
  post: {
    signin: () => {
      return axios.post(`${URL}/loginUser`);
    }
  },
  get:{
    getMovies: async () : Promise<Movie[]> => {
      try{
        const response = await axios.get<Movie[]>(`${URL}/getMovies`,{
          headers:{
            "Authorization":token
          }
        });
        return response.data;
      }
      catch(err){
        throw err;
      }
    },
    getTheaters : async (movieId : string) => {
      try{
        const response = await axios.get<Theater[]>(`${URL}/getTheaters?movieId=${movieId}`,{
          headers:{
            "Authorization":token
          }
        });
        return response.data;
      }
      catch(err){
        throw err;
      }
    },
    getShowTimes : async (theaterMovieId : string | undefined) => {
      try{
        const response = await axios.get<Showtime[]>(`${URL}/getShowTimes?theaterMovieId=${theaterMovieId}`,{
          headers:{
            "Authorization":token
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
