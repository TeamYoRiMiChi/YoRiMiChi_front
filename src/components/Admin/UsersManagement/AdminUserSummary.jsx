import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faShieldHalved,
    faUserCheck,
    faUserGroup,
    faUserXmark,
} from "@fortawesome/free-solid-svg-icons";

function AdminUserSummary({ summary }){
    const cards = [
        {
            label: "全会員",
            count: summary.total,
            icon: faUserGroup,
            color: "am-summary-blue",
        },
        {
            label: "有効な会員",
            count: summary.active,
            icon: faUserCheck,
            color: "am-summary-green",
        },
        {
            label: "退会した会員",
            count: summary.withdrawn,
            icon: faUserXmark,
            color: "am-summary-red",
        },
        {
            label: "管理者",
            count: summary.admin,
            icon: faShieldHalved,
            color: "am-summary-orange",
        },
    ];

    return (
        <section className="am-summary-grid">
            {cards.map((card) => (
                <div className="am-summary-card" key={card.label}>
                    <div className={`am-summary-icon ${card.color}`}>
                        <FontAwesomeIcon icon={card.icon} />
                    </div>

                    <div>
                        <span>{card.label}</span>
                        <strong>{card.count}</strong>
                    </div>
                </div>
            ))}
            </section>
    );
}

export default AdminUserSummary;