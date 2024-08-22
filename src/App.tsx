import { BrowserRouter,Routes,Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import { CookiesProvider, useCookies } from 'react-cookie'
import Theaters from "./components/Theaters";
import Notfound from "./components/Notfound";
import Seats from "./components/Seats";

function App() : JSX.Element {
  const [cookies] = useCookies();
  const [isAuthenticated,setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = cookies.token;
    if(token !== undefined && token !== null && token != ""){
      setAuthenticated(true);
      console.log(token)
    }
    console.log(token)
    console.log(isAuthenticated)
  },[]) 
  return (
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />}>
          <Route index element={<LandingPage />} />
            <Route path="/:movieId" element={<Theaters isAuthenticated={isAuthenticated} />} /> 
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/seats/:theaterMovieId" element={<Seats />} />
        <Route path="/signin" element={<Signin setAuthenticated={setAuthenticated} />} /> 
        {/* <Route path="*" element={<Notfound />} /> */}
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;