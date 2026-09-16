import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminStatusBox({ items }) {
  return (
    <section className="ap-summary-grid">
      {items.map((item) => (
        <article
          key={item.key}
          className={`ap-summary-card ap-summary-${item.color}`}
        >
          <div className="ap-summary-icon">
            <FontAwesomeIcon icon={item.icon} />
          </div>

          <div>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        </article>
      ))}
    </section>
  );
}

export default AdminStatusBox;