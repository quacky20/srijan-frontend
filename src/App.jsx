import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import GalleryPage from "./pages/Gallery";
import EventPage from "./pages/EventPage/EventPage";
import { Route, Routes } from "react-router";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </div>
  );
}

export default App;
