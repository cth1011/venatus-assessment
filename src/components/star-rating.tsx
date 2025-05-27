import React, { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const displayValue = hoveredStar ?? value;
  return (
    <div className="flex gap-1 py-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(null)}
          className={`text-2xl transition-colors duration-150 ease-in-out ${
            star <= displayValue
              ? "text-yellow-500"
              : "text-gray-300 hover:text-yellow-300"
          }`}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
