import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

import ART from "./Images/ART.jpg";
import CINEMA from "./Images/CINEMA.jpg";
import COMEDY from "./Images/COMEDY.jpg";
import DANCE from "./Images/DANCE.jpg";
import DRAMA from "./Images/DRAMA.jpg";
import LITERACY from "./Images/LITERACY.jpg";
import MUSIC from "./Images/MUSIC.jpg";

export default function Display({ category }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const demoEvents = [
    { name: "REFLECTION", category: "DANCE", image: DANCE },
    { name: "HOONKAR", category: "DRAMA", image: DRAMA },
    { name: "SAAP TANK", category: "COMEDY", image: COMEDY },
    { name: "DOODLE DASH", category: "ART", image: ART },
    { name: "HARMONY", category: "MUSIC", image: MUSIC },
    { name: "PODFEST", category: "LITERACY", image: LITERACY },
    { name: "STORY-TELLER", category: "CINEMA", image: CINEMA },
  ];

  async function getEvents(selectedCategory) {
    if (selectedCategory === "ALL") {
      setEvents(demoEvents);
      return;
    }
    const filtered = demoEvents.filter((ev) => ev.category === selectedCategory);
    setEvents(filtered);
  }

  useEffect(() => {
    getEvents(category);
  }, [category]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 px-32">
        {events.length === 0 && (
          <motion.p
            key="no-data"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[#FED000] font-['Cinzel_Decorative'] text-center col-span-full font-semibold"
          >
            NO EVENTS FOUND FOR {category}
          </motion.p>
        )}

        {events.map((event, index) => (
          <EventCard
            key={event.name}
            event={event}
            index={index}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      <EventModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        eventData={selectedEvent}
      />
    </>
  );
}