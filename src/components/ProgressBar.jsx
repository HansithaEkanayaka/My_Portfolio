import { useEffect, useState } from "react";
import "./ProgressBar.css";

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setWidth((window.scrollY / max) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="progress-bar" style={{ width: `${width}%` }} />;
}
