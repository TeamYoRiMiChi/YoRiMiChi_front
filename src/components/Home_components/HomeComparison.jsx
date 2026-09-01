import '../../assets/styles/Home/HomeComparison.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBagShopping,
    faUsers,
    faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

const COMPARISON_ITEMS = [
  {
    id: 1,
    type: 'overseas',
    icon: faBagShopping,
    title: '海外購入',
    description: '欲しい商品をいつでも自由に購入できます。',
    points: [
      '商品を1点から注文可能',
      '在庫を確認してすぐに注文',
      '幅広い商品から自由に選択',
    ],
  },
  {
    id: 2,
    type: 'group',
    icon: faUsers,
    title: '共同購入',
    description: 'みんなでまとめて、もっとお得に購入できます。',
    points: [
      '参加者が集まるほどお得',
      '目標人数の達成後に購入',
      '同じ商品をみんなで注文',
    ],
  }
];

function HomeComparison() {
    return(
        <section className="home_comparison">
            <div className="home_inner">
            <h2 className="home_section_title">
                海外購入と共同購入
            </h2>

            <div className="home_comparison_list">
                {COMPARISON_ITEMS.map((item) => (
                <article
                    className={`home_comparison_card home_comparison_card_${item.type}`}
                    key={item.id}
                >
                    <div
                    className={`home_comparison_icon home_comparison_icon_${item.type}`}
                    >
                    <FontAwesomeIcon icon={item.icon} />
                    </div>

                    <h3 className="home_comparison_card_title">
                    {item.title}
                    </h3>

                    <p className="home_comparison_description">
                    {item.description}
                    </p>

                    <ul className="home_comparison_points">
                    {item.points.map((point) => (
                        <li key={point}>
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="home_comparison_check"
                        />

                        <span>{point}</span>
                        </li>
                    ))}
                    </ul>
                </article>
                ))}

                <span className="home_comparison_vs">VS</span>
            </div>
            </div>
        </section>
    );
}

export default HomeComparison;