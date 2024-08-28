import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import { CookiesProvider, useCookies } from "react-cookie";
import Theaters from "./components/Theaters";
import Notfound from "./components/Notfound";
import Seats from "./components/Seats";
import Bookings from "./components/Bookings";
import PublisherSignIn from "./components/PublisherSignIn";
import PublishedMovies from "./components/PublishedMovies";
import PublishMovie from "./components/PublishMovie";
import PublisherSignUp from "./components/PublisherSignUp";
import ReactTask from "./components/ReactTask";
import Cloudinary from "./components/Cloudinary";

function App(): JSX.Element {
  const [cookies] = useCookies();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = cookies.token;
    if (token !== undefined) {
      setAuthenticated(true);
      console.log(token, isAuthenticated);
    }
    // console.log(token,isAuthenticated);
  },[cookies]);
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isAuthenticated={isAuthenticated}
                setAuthenticated={setAuthenticated}
              />
            }
          >
            <Route index element={<LandingPage />} />
            <Route
              path="/theaters/:movieId"
              element={<Theaters isAuthenticated={isAuthenticated} />}
            />
            <Route path="/publishMovie" element={<PublishMovie />} />
            <Route path="/publishedMovies" element={<PublishedMovies />} />
            <Route path="/seats/:theaterTimeMovieId" element={<Seats />} />
            <Route path="/bookings" element={<Bookings />} />
          </Route>
          <Route
            path="/signup"
            element={<Signup setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/signin"
            element={<Signin setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/publisherSignin"
            element={<PublisherSignIn setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/publisherSignup"
            element={<PublisherSignUp setAuthenticated={setAuthenticated} />}
          />
          <Route path="/task" element={<ReactTask />} />
          <Route path="/upload" element={<Cloudinary />} />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
