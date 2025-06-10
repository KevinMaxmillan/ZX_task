export const TransformModeControls = ({
    setMode,
  }: {
    setMode: (mode: "translate" | "rotate" | "scale") => void;
  }) => {
    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1000,
          marginTop: "40px",
        }}
      >
        <button onClick={() => setMode("translate")}>Move</button>
        <button onClick={() => setMode("rotate")}>Rotate</button>
        <button onClick={() => setMode("scale")}>Scale</button>
      </div>
    );
  };