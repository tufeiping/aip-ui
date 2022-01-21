import React, { useEffect, useState } from "react";

const HEIGHT_THRESHOLD = 120;

const bodyStyle = {
  color: "#fafafa",
  letterSpacing: 0,
  textShadow:
    "0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135",
};

const getWindowHeight = () => {
  return window.innerHeight;
};

export default function App(props: any) {
  const [mgtop, setMgtop] = useState((getWindowHeight() - HEIGHT_THRESHOLD) / 2);

  useEffect(() => {
    const handleResize = () => {
      setMgtop((getWindowHeight() - HEIGHT_THRESHOLD) / 2);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={bodyStyle}>
      <h1 style={{ textAlign: "center", marginTop: mgtop, color: '#2c5d87', }}>
        Hello, AIP Web UI library!
      </h1>
    </div>
  );
}
