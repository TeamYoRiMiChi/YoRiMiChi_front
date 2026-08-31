import '../../assets/styles/CustomerService/CustomerServiceCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function CustomerServiceCard({
  icon,
  title,
  description,
  subDescription,
  to,
}) {
  const cardContent = (
  <>
    <div className="customer_service_card_icon">
      <FontAwesomeIcon icon={icon} />
    </div>

    <div className="customer_service_card_text">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{subDescription}</p>
    </div>

    <div className="customer_service_card_arrow">
      ›
    </div>
  </>
);

if (to) {
  return (
    <Link
      to={to}
      className="customer_service_card customer_service_card_link"
    >
      {cardContent}
    </Link>
  );
}

return (
  <div className="customer_service_card">
    {cardContent}
  </div>
);
}

export default CustomerServiceCard;