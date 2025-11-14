import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CustomCursor.css";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitters, setGlitters] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const newGlitter = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 0.5 + 0.5,
        angle: Math.random() * 360,
        distance: Math.random() * 30 + 20,
      };

      setGlitters((prev) => [...prev, newGlitter]);

      setTimeout(() => {
        setGlitters((prev) => prev.filter((g) => g.id !== newGlitter.id));
      }, 1000);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />

      {glitters.map((glitter) => {
        const radians = (glitter.angle * Math.PI) / 180;
        const offsetX = Math.cos(radians) * glitter.distance;
        const offsetY = Math.sin(radians) * glitter.distance;

        return (
          <motion.div
            key={glitter.id}
            className="glitter-particle"
            style={{
              width: glitter.size,
              height: glitter.size,
              left: glitter.x,
              top: glitter.y,
            }}
            initial={{
              opacity: 1,
              scale: 0,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            animate={{
              opacity: 0,
              scale: 1,
              x: offsetX,
              y: offsetY,
              rotate: 360,
            }}
            transition={{
              duration: glitter.duration,
              ease: "easeOut",
            }}
          />
        );
      })}
    </>
  );
};

export default CustomCursor;