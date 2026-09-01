import '../../assets/styles/Guide/ShippingStepCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ShippingStepCard({
  icon,
  title,
  description,
  days,
  showArrow,
}) {
  return (
    <div className="ship_item">
      <div className="ship_card">
        <div className="ship_icon">
          <FontAwesomeIcon icon={icon} />
        </div>

        <span className="ship_days">{days}</span>
        <h3 className="ship_title">{title}</h3>
        <p className="ship_desc">{description}</p>
      </div>

      {showArrow && (
        <div className="ship_arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      )}
    </div>
  );
}

export default ShippingStepCard;