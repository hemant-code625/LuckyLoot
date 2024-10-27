// src/utils/wheelUtils.ts

export const wheelSegments = [
    { label: "10% Off", discount: 10, probability: 0.4 },
    { label: "50% Off", discount: 50, probability: 0.1 },
    { label: "60% Off", discount: 60, probability: 0.15 },
    { label: "80% Off", discount: 80, probability: 0.04 },
    { label: "90% Off", discount: 90, probability: 0.01 },
    { label: "100% Off", discount: 100, probability: 0 },
    { label: "No Discount", discount: 0, probability: 0.3 },
];

// Function to get weighted random outcome
export function getWeightedRandom(segments: typeof wheelSegments) {
    const totalWeight = segments.reduce(
        (acc, segment) => acc + segment.probability,
        0
    );

    const random = Math.random() * totalWeight;
    let cumulativeProbability = 0;

    for (const segment of segments) {
        cumulativeProbability += segment.probability;
        if (random <= cumulativeProbability) {
            return segment;
        }
    }
    return segments[segments.length - 1]; // Fallback in case of rounding issues
}
