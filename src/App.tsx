import { BrowserRouter,Routes,Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import Signup from "./components/Signup";
import { CookiesProvider, useCookies } from 'react-cookie'
import Theaters from "./components/Theaters";

function App() : JSX.Element {
  const [isAuthenticated,setAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    console.log(isAuthenticated)
  }) 
  return (
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<LandingPage />} />
          {
            isAuthenticated ? <Route path="/:movieId" element={<Theaters />} /> : null
          }    
        </Route>
        <Route path="/signup" element={<Signup  />} />
        <Route path="/signin" element={<Signin setAuthenticated={setAuthenticated} />} />  
      </Routes>
    </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;