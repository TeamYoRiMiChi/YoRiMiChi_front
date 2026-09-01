import '../../assets/styles/Guide/GuideNoticeItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function GuideNoticeItem({
  title,
  description,
}) {
  return (
    <li className="notice_item">
      <div className="notice_icon">
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </div>

      <div className="notice_text">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
}

export default GuideNoticeItem;