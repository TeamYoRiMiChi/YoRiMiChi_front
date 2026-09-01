import '../../assets/styles/Guide/GuideStepCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GuideStepCard({
  icon,
  title,
  description,
  stepNumber,
}) {
  return (
    <li className="step_card">
      <span className="step_num">
        STEP {stepNumber}
      </span>

      <div className="step_icon">
        <FontAwesomeIcon icon={icon} />
      </div>

      <h3 className="step_title">{title}</h3>
      <p className="step_desc">{description}</p>
    </li>
  );
}


export default GuideStepCard;