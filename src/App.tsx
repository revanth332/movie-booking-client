import { BrowserRouter,Routes,Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import Layout from "./components/Layout";
import { useState } from "react";
import Signup from "./components/Signup";
import Movie from "./components/Moviebanner";
import Theaters from "./components/Theaters";

function App() : JSX.Element {
  const [authenticated,setAuthenticated] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} /> 
        <Route path="/:movieId" element={<Theaters />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;