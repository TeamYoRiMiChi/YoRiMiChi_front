import '../../assets/styles/Home/HomeReasons.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTag,
    faEye,
    faGift,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';

const REASONS = [
  {
    id: 1,
    icon: faTag,
    title: '納得できる価格',
    description: '海外購入と共同購入の割引で、お得な価格を実現します。',
  },
  {
    id: 2,
    icon: faEye,
    title: '透明な進行状況',
    description: '注文から配送まで、商品の状況を分かりやすくご案内します。',
  },
  {
    id: 3,
    icon: faGift,
    title: 'さまざまなイベント',
    description: '会員特典や割引クーポンなど、多様なイベントを実施します。',
  },
  {
    id: 4,
    icon: faHeart,
    title: '高いリピート満足度',
    description: '安心できるサービスで、また利用したい体験をお届けします。',
  },
];

function HomeReasons() {
    return (
        <section className="home_reasons">
            <div className="home_inner">
                <h2 className="home_section_title">
                    なぜYoRiMiChiなのか？
                </h2>
        
                <div className="home_reason_list">
                    {REASONS.map((reason) => (
                    <article className="home_reason_item" key={reason.id}>
                        <div className="home_reason_icon">
                            <FontAwesomeIcon icon={reason.icon} />
                        </div>
        
                        <div className="home_reason_content">
                            <h3 className="home_reason_title">
                                {reason.title}
                            </h3>
        
                            <p className="home_reason_description">
                                {reason.description}
                            </p>
                        </div>
                    </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HomeReasons;