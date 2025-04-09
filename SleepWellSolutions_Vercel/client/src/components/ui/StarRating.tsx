import { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import { ratingToArray } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviews?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating = ({
  rating,
  reviews,
  showCount = true,
  size = "md",
  interactive = false,
  onRatingChange,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = ratingToArray(interactive ? hoverRating || rating : rating);
  
  // Determine star size based on prop
  const starSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size];
  
  // Determine text size based on star size
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size];

  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex text-accent">
        {stars.map((value, i) => (
          <span
            key={i}
            className={interactive ? "cursor-pointer" : ""}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(i)}
          >
            {value === 1 ? (
              <Star className={`fill-current ${starSize}`} />
            ) : value === 0.5 ? (
              <StarHalf className={`fill-current ${starSize}`} />
            ) : (
              <Star className={`${starSize} text-neutral-300`} />
            )}
          </span>
        ))}
      </div>
      {showCount && reviews !== undefined && (
        <span className={`ml-2 text-neutral-500 ${textSize}`}>
          {rating.toFixed(1)} ({reviews})
        </span>
      )}
    </div>
  );
};

export default StarRating;
