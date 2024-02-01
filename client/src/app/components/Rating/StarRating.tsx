import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { GoStarFill } from "react-icons/go";

interface StarRatingInterface {
  count: number,
  rating: number,
  color: string,
  onRating: Function
}

const StarRating: React.FC<StarRatingInterface> = ({ count, rating, color, onRating }) => {

  interface StarAttributes {
    index: number,
    filled: string,
    unfilled: string
  }

  const [hoverRating, setHoverRating] = useState<number>(0);

  const getColor  = (index) => {
      if (hoverRating >= index) {
        return color.filled;
      } else if (!hoverRating && rating >= index) {
        return color.filled;
      }

      return color.unfilled;
    };

  const starRating: any = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map( idx => (
        <GoStarFill
        key={idx}
        className="cursor-pointer"
        icon="star"
        onClick={() => onRating(idx)}
        style={{color: getColor(idx)}}
        // onMouseEnter={() => setHoverRating(idx)}
        // onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [ count, rating, hoverRating ])

  return (
    <>
    <div className="star">{starRating}</div>
    </>
  )
};

StarRating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    filled: PropTypes.string,
    unfilled: PropTypes.string
  }
}

StarRating.defaultProps = { 
  count: 5, 
  rating: 0,
  color: {
    filled: "#F5EB3B",
    unfilled: "#DCDCDC"
  }
}

export default StarRating;