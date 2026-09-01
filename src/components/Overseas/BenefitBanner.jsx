import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faPercent, faWallet } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Overseas/components/BenefitBanner.css';

const BENEFITS = [
  {
    tag: '初めての方へ',
    title: 'ご利用ガイド',
    desc: '初めてでも簡単にご利用いただけます。',
    icon: faBoxOpen,
  },
  {
    tag: '新規会員特典',
    title: '2,000ポイントプレゼント',
    desc: '会員登録で2,000ポイントを進呈します。',
    icon: faWallet,
  },
  {
    tag: '配送料クーポン',
    title: '最大10％OFF',
    desc: 'お得なクーポンをご利用ください。',
    icon: faPercent,
  },
];

function BenefitBanner() {
  return (
    <section className="overseas-benefits" aria-label="ご利用特典">
      {BENEFITS.map((b) => (
        <article className="benefit-item" key={b.title}>
          <div>
            <span>{b.tag}</span>
            <h2>{b.title}</h2>
            <p>{b.desc}</p>
          </div>
          <FontAwesomeIcon icon={b.icon} />
        </article>
      ))}
    </section>
  );
}

export default BenefitBanner;
