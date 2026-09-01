import '../../assets/styles/Home/HomeStatistics.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faCartShopping,
    faFaceSmile,
    faBoxOpen,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons';

const STATISTICS = [
  {
    id: 1,
    icon: faUsers,
    value: '10,000+',
    label: '累計会員数',
    color: 'purple',
  },
  {
    id: 2,
    icon: faCartShopping,
    value: '5,000+',
    label: '累計注文数',
    color: 'pink',
  },
  {
    id: 3,
    icon: faFaceSmile,
    value: '98%',
    label: '顧客満足度',
    color: 'green',
  },
  {
    id: 4,
    icon: faBoxOpen,
    value: '100%',
    label: '検品・梱包',
    color: 'blue',
  },
  {
    id: 5,
    icon: faTruckFast,
    value: '7～10日',
    label: '平均配送期間',
    color: 'violet',
  },
];

function HomeStatistics() {
    return (
        <section className="home_statistics">
            <div className="home_inner">
                <h2 className="home_section_title">
                    数字で見るYoRiMiChi
                </h2>

                <div className="home_statistic_list">
                    {STATISTICS.map((statistic) => (
                    <article className="home_statistic_item" key={statistic.id}>
                        <div
                        className={`home_statistic_icon home_statistic_icon_${statistic.color}`}
                        >
                            <FontAwesomeIcon icon={statistic.icon} />
                        </div>

                        <div className="home_statistic_content">
                            <strong className="home_statistic_value">
                                {statistic.value}
                            </strong>

                        <p className="home_statistic_label">
                            {statistic.label}
                        </p>
                        </div>
                    </article>
                    ))}
                </div>
            </div>
      </section>
    );
}

export default HomeStatistics;