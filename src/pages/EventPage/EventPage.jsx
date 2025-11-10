import Display from "./Categoryrender";
import ALL from "./EventIcons/ALL.png";
import ART from "./EventIcons/ART.png";
import CINEMA from "./EventIcons/CINEMA.png";
import COMEDY from "./EventIcons/COMEDY.png";
import DANCE from "./EventIcons/DANCE.png";
import DRAMA from "./EventIcons/DRAMA.png";
import FASHION from "./EventIcons/FASHION.png";
import LITERACY from "./EventIcons/LITERACY.png";
import MUSIC from "./EventIcons/MUSIC.png";
import { useState } from "react";
import Bg from "./Images/EventPageBg.jpg";
import Navbar from "../../components/Navbar/Navbar";

// ✅ Import Framer Motion
import { motion } from "framer-motion";

const categories = [
  { icon: ALL, categoryname: "ALL" },
  { icon: DANCE, categoryname: "DANCE" },
  { icon: ART, categoryname: "ART" },
  { icon: MUSIC, categoryname: "MUSIC" },
  { icon: LITERACY, categoryname: "LITERACY" },
  { icon: DRAMA, categoryname: "DRAMA" },
  { icon: CINEMA, categoryname: "CINEMA" },
  { icon: FASHION, categoryname: "FASHION" },
  { icon: COMEDY, categoryname: "COMEDY" },
];

export default function EventPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <img src={Bg} className="absolute top-0 left-0 w-full h-full object-cover z-0" />

      <nav className="w-full py-4 pt-15 relative z-10">
        <div className="max-w-screen-2xl mx-auto flex justify-center gap-10 flex-wrap">

          {categories.map((cat, index) => (
            <motion.div
              key={index}
              onClick={() => setActiveCategory(cat.categoryname)}
              className={`flex font-['Cinzel_Decorative'] flex-col items-center cursor-pointer ${activeCategory === cat.categoryname ? "text-[#FED001]" : "text-[#FED000]"
                }`}

              // ✅ Smooth fade + rise animation
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}

              // ✅ Slight bounce when clicked
              whileTap={{ scale: 0.9 }}
            >

              <motion.img
                src={cat.icon}
                alt={cat.categoryname}
                className="w-18 h-18 rounded-full border-1 border-[#FED000] mb-1"

                // ✅ Hover animation
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 200 }}

                animate={{
                  scale: activeCategory === cat.categoryname ? 1.15 : 1,
                  boxShadow:
                    activeCategory === cat.categoryname
                      ? "0px 0px 10px #FED000"
                      : "0px 0px 0px #00000000",
                }}
              />

              <motion.p
                className="text-sm font-semibold tracking-wide"
                animate={{
                  scale: activeCategory === cat.categoryname ? 1.1 : 1,
                  color: activeCategory === cat.categoryname ? "#FED000" : "#FED000"
                }}
              >
                {cat.categoryname}
              </motion.p>

              {activeCategory === cat.categoryname && (
                <motion.div
                  className="w-8 h-1 bg-[#FED000] mt-1 rounded-full"
                  layoutId="underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </nav>

      <div className="px-4 mt-6 relative z-10">
        <Display category={activeCategory} />
      </div>
    </div>
  );
}
