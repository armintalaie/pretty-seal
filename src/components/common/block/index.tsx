import "./index.scss";
import { useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";
import { motion } from "framer-motion";

export default function Block({ children }: { children: JSX.Element }) {
  const theme = useContext(ThemeContext).currentTheme;
  return (
    <motion.div
      layout
      className={`block ${theme.isLightMode ? "light" : "dark"}`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
