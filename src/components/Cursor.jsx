import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const Cursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = {
    damping: 25,
    stiffness: 300,
  };

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    window.addEventListener("mousemove", moveCursor);

    const elements = document.querySelectorAll("button, a, .interactive");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", () => setHovering(true));
      el.addEventListener("mouseleave", () => setHovering(false));
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="custom-cursor"
        style={{
          translateX: x,
          translateY: y,
        }}
        animate={{
          scale: hovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />

      {/* Glow */}
      <motion.div
        className="cursor-glow"
        style={{
          translateX: x,
          translateY: y,
        }}
        animate={{
          scale: hovering ? 3 : 1.5,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      />
    </>
  );
};

export default Cursor;
