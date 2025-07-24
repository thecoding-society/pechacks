import React from "react";

const Loader = () => {
  const loaderStyle = {
    width: "fit-content",
    fontSize: "40px",
    fontFamily: "system-ui, sans-serif",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "transparent",
    WebkitTextStroke: "1px white",
    "--l": "transparent 45%, white 0 55%, transparent 0",
    "--g": "0 / 300% 100% no-repeat",
    background: `
      linear-gradient(-60deg, var(--l)) var(--g),
      linear-gradient(60deg, var(--l)) var(--g)
    `,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    animation: "l7 4s linear infinite",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>
        {`
          @keyframes l7 {
            0%  { background-position: 100%, 0; }
            50% { background-position: 0, 0; }
            100% { background-position: 0, 100%; }
          }
        `}
      </style>
      <div className="loader" style={loaderStyle}>
        PECHACKS 3.0
      </div>
    </div>
  );
};

export default Loader;
