import { useState } from "react";
import Star from "./Star";

export default function StarRating({
  maxRating = 5,
  size = 20,
  defaultRating = 0,
  onSetRating,
  messages = [],
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div className="">
      <div className="d-flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}
