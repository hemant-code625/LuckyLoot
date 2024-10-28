import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { Loader2, Plus, Trash, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Sector {
  color: string;
  label: string;
  probability: number;
}

const initialSectors: Sector[] = [
  { color: "#FF6B6B", label: "10% OFF", probability: 0.4 },
  { color: "#6A0572", label: "15% OFF", probability: 0.15 },
  { color: "#FFD93D", label: "40% OFF", probability: 0.1 },
  { color: "#007965", label: "60% OFF", probability: 0.04 },
  { color: "#3ABEFF", label: "80% OFF", probability: 0.01 },
  { color: "#F2545B", label: "90% OFF", probability: 0 },
  { color: "#56E39F", label: "FREE ITEM", probability: 0.3 },
];

function getWeightedRandom(segments: Sector[]): number {
  const totalWeight = segments.reduce(
    (acc, segment) => acc + segment.probability,
    0
  );
  const random = Math.random() * totalWeight;
  let cumulativeProbability = 0;

  for (const [index, segment] of segments.entries()) {
    cumulativeProbability += segment.probability;
    if (random <= cumulativeProbability) {
      return index;
    }
  }
  return segments.length - 1;
}

const CustomizableWheel: React.FC = () => {
  const [sectors, setSectors] = useState<Sector[]>(initialSectors);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [remaining, setRemaining] = useState(10);
  const wheelRef = useRef<HTMLDivElement>(null);
  const baseRotation = 3600;
  const sectorAngle = 360 / sectors.length;

  const spinWheel = async () => {
    if (spinning) return;

    setSpinning(true);
    setResult("");
    setRemaining(10);

    const selectedIndex = await getWeightedRandom(sectors);
    const targetAngle =
      baseRotation + 360 - (selectedIndex * sectorAngle + sectorAngle / 2);

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
          spread: 160,
          origin: { x: 0.5, y: 0.6 },
        });
      }
    }, 5000);
  };

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;
    if (remaining > 0 && !spinning) {
      countdownTimer = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    } else if (remaining === 0 && !spinning) {
      if (!spinning && wheelRef.current) {
        wheelRef.current.style.transition = "none";
        wheelRef.current.style.transform = `rotate(0deg)`;
      }
      setResult("");
      setRemaining(10);
    }

    return () => clearInterval(countdownTimer);
  }, [remaining, spinning]);

  const handleFeedback = () => {
    const message = encodeURIComponent(
      "Hi! I just tried your Spin the Wheel product and I'd like to share my feedback:"
    );
    window.open(`https://wa.me/7559228490?text=${message}`, "_blank");
  };

  const handleReset = () => {
    if (!spinning && wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(0deg)`;
    }
    setResult("");
    setRemaining(10);
  };

  const handleSectorChange = (
    index: number,
    field: keyof Sector,
    value: string | number
  ) => {
    const updatedSectors = [...sectors];
    updatedSectors[index] = { ...updatedSectors[index], [field]: value };
    setSectors(updatedSectors);
  };

  const addSector = () => {
    setSectors([
      ...sectors,
      { color: "#000000", label: "New Sector", probability: 0.1 },
    ]);
  };

  const removeSector = (index: number) => {
    setSectors(sectors.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 min-w-full bg-slate-900 rounded-xl">
      <div className="flex-1">
        <div className="select-none w-full max-w-md bg-slate-800 backdrop-blur-sm shadow-xl rounded-2xl p-6">
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

          {!result && (
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
          )}

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
                className="mt-4 p-2 bg-green-500 text-black rounded hover:bg-green-600"
              >
                Click to Continue
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-fit mt-10">
          <button
            onClick={handleFeedback}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition duration-300"
            aria-label="Give feedback on WhatsApp"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            We value your feedback!
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-800 p-6 rounded-xl overflow-y-auto max-h-[600px]">
        <h2 className="text-2xl font-bold text-white mb-4">
          Customize Wheel (For Shop Owners)
        </h2>
        {sectors.map((sector, index) => (
          <div key={index} className="mb-4 p-4 bg-slate-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">
                Sector {index + 1}
              </h3>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeSector(index)}
              >
                <Trash className="h-4 w-4 text-white" />
              </Button>
            </div>
            <div className="space-y-2">
              <div>
                <Label htmlFor={`label-${index}`} className="text-white">
                  Label
                </Label>
                <Input
                  id={`label-${index}`}
                  value={sector.label}
                  onChange={(e) =>
                    handleSectorChange(index, "label", e.target.value)
                  }
                  className="bg-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor={`color-${index}`} className="text-white">
                  Color
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id={`color-${index}`}
                    type="color"
                    value={sector.color}
                    onChange={(e) =>
                      handleSectorChange(index, "color", e.target.value)
                    }
                    className="w-12 h-12 p-1 bg-slate-600"
                  />
                  <Input
                    value={sector.color}
                    onChange={(e) =>
                      handleSectorChange(index, "color", e.target.value)
                    }
                    className="bg-slate-600 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`probability-${index}`} className="text-white">
                  Probability
                </Label>
                <Input
                  id={`probability-${index}`}
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={sector.probability}
                  onChange={(e) =>
                    handleSectorChange(
                      index,
                      "probability",
                      parseFloat(e.target.value)
                    )
                  }
                  className="bg-slate-600 text-white"
                />
              </div>
            </div>
          </div>
        ))}
        <Button onClick={addSector} className="w-full mt-4 text-white ">
          <Plus className="mr-2 h-4 w-4 " /> Add Sector
        </Button>
      </div>
    </div>
  );
};

export default CustomizableWheel;
