import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";

const sectors = [
  { color: "#FF6B6B", label: "10% OFF" },
  { color: "#FFD93D", label: "15% OFF" },
  { color: "#6A0572", label: "20% OFF" },
  { color: "#007965", label: "25% OFF" },
  { color: "#3ABEFF", label: "30% OFF" },
  { color: "#F2545B", label: "FREE ITEM" },
  { color: "#56E39F", label: "5% OFF" },
  { color: "#A29BFE", label: "TRY AGAIN" },
];

// Simulate getting the winning segment from the backend
const getSegmentFromBackend = async () => {
  const responseIndex = Math.floor(Math.random() * sectors.length);
  return responseIndex;
};

const Wheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [remaining, setRemaining] = useState(10); // Countdown timer
  const wheelRef = useRef<HTMLDivElement>(null);
  const baseRotation = 3600; // Fixed large rotation for each spin
  const sectorAngle = 360 / sectors.length;

  const spinWheel = async () => {
    if (spinning) return;

    setSpinning(true);
    setResult("");
    setRemaining(10); // Reset the countdown

    // Get winning segment from backend
    const selectedIndex = await getSegmentFromBackend();

    // Calculate target angle for the selected segment (base rotation + target offset)
    const targetAngle =
      baseRotation + 360 - (selectedIndex * sectorAngle + sectorAngle / 2); // Center pointer

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)";
      wheelRef.current.style.transform = `rotate(${targetAngle}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      setResult(sectors[selectedIndex].label);
      if (sectors[selectedIndex].label !== "TRY AGAIN") {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }, 5000);
  };

  // Handle countdown timer
  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (remaining > 0 && !spinning) {
      countdownTimer = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    } else if (remaining === 0 && !spinning) {
      if (!spinning && wheelRef.current) {
        // Reset rotation to zero without animation for next spin setup
        wheelRef.current.style.transition = "none";
        wheelRef.current.style.transform = `rotate(0deg)`;
      }
      setResult("");
      setRemaining(10);
    }

    return () => clearInterval(countdownTimer);
  }, [remaining, spinning]);

  const handleReset = () => {
    if (!spinning && wheelRef.current) {
      // Reset rotation to zero without animation for next spin setup
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(0deg)`;
    }
    setResult(""); // Clear result
    setRemaining(10); // Reset the countdown
  };

  return (
    <>
      <div className="w-full max-w-md bg-slate-800 backdrop-blur-sm shadow-xl rounded-2xl p-6">
        <div className="relative w-full pb-[100%] mb-8">
          <div className="absolute inset-0">
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full shadow-lg relative overflow-hidden"
              style={{
                background: `conic-gradient(${sectors
                  .map(
                    (sector, index) =>
                      `${sector.color} ${index * (360 / sectors.length)}deg ${
                        (index + 1) * (360 / sectors.length)
                      }deg`
                  )
                  .join(", ")})`,
              }}
            >
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${index * (360 / sectors.length)}deg)`,
                  }}
                >
                  <span
                    className="absolute left-1/2 ml-4 top-[10%] transform -translate-x-1/2 text-white font-bold text-sm text-center"
                    style={{
                      transform: `rotate(${180 / sectors.length}deg)`,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {sector.label}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="absolute top-1/2 left-1/2 w-4 h-8 bg-white -translate-x-1/2 -translate-y-full"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            ></div>
          </div>
        </div>
        <button
          onClick={spinWheel}
          disabled={spinning}
          className="w-full text-lg p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 disabled:bg-gray-400 flex justify-center items-center"
          aria-label={spinning ? "Wheel is spinning" : "Spin the wheel"}
        >
          {spinning ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Spinning...
            </>
          ) : (
            "Spin the Wheel!"
          )}
        </button>
        {result && (
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-white">
              {result === "TRY AGAIN"
                ? "Better luck next time!"
                : `You won: ${result}`}
            </p>
            <p className="mt-2 text-lg text-gray-300">
              Getting ready for the next spin in {remaining} seconds...
            </p>
            <button
              onClick={handleReset}
              className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Click to Continue
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Wheel;
