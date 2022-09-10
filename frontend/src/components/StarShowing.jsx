import { FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';
const StarShowing = ({ ratingNo }) => {
  if (ratingNo < 1) {return};
  return (
    <div className="star-showing">
      {
        [...Array(ratingNo)].map((star, idx) => {
          return <FaStar key = {idx} className="orange-color" />;
        })
      }
    </div>
  )
}

StarShowing.propTypes = {
  ratingNo: PropTypes.number.isRequired,
}

export default StarShowing;
