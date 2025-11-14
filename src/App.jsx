import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import GalleryPage from "./pages/Gallery";
import EventPage from "./pages/EventPage/EventPage";
import Hero2 from "./components/Hero/Hero2";
import { Route, Routes, useLocation } from "react-router";
import CustomCursor from "./components/CustomCursor/CustomCursor";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [hasPlayedAnimation, setHasPlayedAnimation] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const animationPlayed = sessionStorage.getItem("animationPlayed");
    if (animationPlayed === "true") {
      setHasPlayedAnimation(true);
      setShowNavbar(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowNavbar(true);
    setHasPlayedAnimation(true);
    sessionStorage.setItem("animationPlayed", "true");
  };

  return (
    <div className="App">
      <CustomCursor />
      {/* <Navbar show={isHomePage ? showNavbar : true} /> */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Hero2 
              onAnimationComplete={handleAnimationComplete}
              skipAnimation={hasPlayedAnimation}
            />
          } 
        />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </div>
  );
}

export default App;