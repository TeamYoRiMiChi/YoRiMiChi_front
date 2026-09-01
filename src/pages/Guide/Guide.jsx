import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCartShopping,
  faCreditCard,
  faBoxOpen,
  faUsers,
  faHandshake,
  faCheckDouble,
  faTruckFast,
  faWarehouse,
  faPlaneUp,
  faFileShield,
  faHouseChimney,
  faCircleInfo,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Guide.css';
import GuideStepCard from '../../components/Guide_components/GuideStepCard';
import ShippingStepCard from '../../components/Guide_components/ShippingStepCard';
import GuideNoticeItem from '../../components/Guide_components/GuideNoticeItem';

/* 海外直送のご利用の流れ */
const DIRECT_STEPS = [
  {
    icon: faMagnifyingGlass,
    title: '商品検索',
    desc: 'お探しの日本商品を検索するか、カテゴリーから探してみてください。',
  },
  {
    icon: faCartShopping,
    title: 'カートに入れる',
    desc: '数量を選択してカートに入れ、まとめて注文できます。',
  },
  {
    icon: faCreditCard,
    title: '注文・決済',
    desc: 'お届け先と個人通関固有符号を入力して決済を進めます。',
  },
  {
    icon: faBoxOpen,
    title: '検品後に発送',
    desc: '日本現地で商品を検品した後、安全に梱包して発送します。',
  },
];

/* 共同購入のご利用の流れ */
const GROUP_STEPS = [
  {
    icon: faUsers,
    title: '共同購入を探す',
    desc: '進行中の共同購入を見て、気に入った商品を選んでください。',
  },
  {
    icon: faHandshake,
    title: '参加申し込み',
    desc: '数量を決めて参加すると、目標人数の達成まで一緒に待ちます。',
  },
  {
    icon: faCheckDouble,
    title: '目標達成',
    desc: '募集人数が満たされると共同購入が確定し、注文が進行します。',
  },
  {
    icon: faTruckFast,
    title: '一括配送',
    desc: 'まとめて配送するため、送料を大幅に節約できます。',
  },
];

/* 配送ステップ */
const SHIPPING_STEPS = [
  {
    icon: faWarehouse,
    title: '日本現地倉庫へ入庫',
    desc: 'ご注文の商品が日本の物流倉庫に到着し、検品を受けます。',
    days: '2〜3日',
  },
  {
    icon: faPlaneUp,
    title: '国際配送',
    desc: '検品と梱包を終えた商品が韓国へ向けて出発します。',
    days: '2〜4日',
  },
  {
    icon: faFileShield,
    title: '通関手続き',
    desc: '税関で通関手続きが行われます。個人通関固有符号が必要です。',
    days: '1〜2日',
  },
  {
    icon: faHouseChimney,
    title: '国内配送',
    desc: '国内の配送業者を通じて、ご入力いただいた住所へ配送されます。',
    days: '1〜2日',
  },
];

/* 注意事項 */
const NOTICES = [
  {
    title: '個人通関固有符号は必須です',
    desc: '海外直送商品は通関時に個人通関固有符号が必ず必要です。関税庁のホームページから無料で発給を受けられます。',
  },
  {
    title: '関税・付加価値税が発生することがあります',
    desc: '目録通関の基準金額を超えると、関税と付加価値税が課されます。注文時に概算金額を事前にご案内します。',
  },
  {
    title: '為替レートによって価格が変わります',
    desc: '商品価格は円建てで、注文時点の為替レートが適用されます。決済前に最終金額を必ずご確認ください。',
  },
  {
    title: '共同購入は目標未達の場合、自動キャンセルされます',
    desc: '募集期間内に目標数量に達しない場合、共同購入はキャンセルされ、決済金額は全額返金されます。',
  },
];

const Guide = () => {
  const [tab, setTab] = useState('direct');
  const steps = tab === 'direct' ? DIRECT_STEPS : GROUP_STEPS;

  return (
    <div className="guide">

      {/* ===== ヒーロー ===== */}
      <section className="guide_hero">
        <div className="guide_hero_inner">
          <span className="guide_hero_badge">GUIDE</span>
          <h1 className="guide_hero_title">
            初めてでも大丈夫です、<br />
            <strong>こうするだけでOKです</strong>
          </h1>
          <p className="guide_hero_desc">
            商品を選ぶことから玄関先に届くまで、<br />
            ヨリミチが全過程を共にします。
          </p>
        </div>
      </section>

      <div className="guide_body">

        {/* ===== ご利用の流れ（タブ） ===== */}
        <section className="guide_section">
          <h2 className="guide_section_title">
            <span className="deco">✦</span>
            ご利用の流れ
            <span className="deco">✦</span>
          </h2>
          <p className="guide_section_sub">
            ご希望の方法を選んで、流れをご確認ください。
          </p>

          <div className="guide_tabs">
            <button
              className={`guide_tab ${tab === 'direct' ? 'active' : ''}`}
              onClick={() => setTab('direct')}
            >
              海外直送
            </button>
            <button
              className={`guide_tab ${tab === 'group' ? 'active' : ''}`}
              onClick={() => setTab('group')}
            >
              共同購入
            </button>
          </div>

          <ol className="step_list">
            {steps.map((step, index) => (
              <GuideStepCard
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.desc}
                stepNumber={index + 1}
              />
            ))}
          </ol>
        </section>

        {/* ===== 配送ステップ ===== */}
        <section className="guide_section">
          <h2 className="guide_section_title">
            <span className="deco">✦</span>
            配送はこのように進みます
            <span className="deco">✦</span>
          </h2>
          <p className="guide_section_sub">
            決済完了から受け取りまで平均<strong>7〜10日</strong>ほどかかります。
          </p>

            <div className="ship_flow">
              {SHIPPING_STEPS.map((step, index) => (
                <ShippingStepCard
                  key={step.title}
                  icon={step.icon}
                  title={step.title}
                  description={step.desc}
                  days={step.days}
                  showArrow={index < SHIPPING_STEPS.length - 1}
                />
              ))}
          </div>
        </section>

        {/* ===== 関税案内 ===== */}
        <section className="guide_section">
          <h2 className="guide_section_title">
            <span className="deco">✦</span>
            関税・通関案内
            <span className="deco">✦</span>
          </h2>

          <div className="customs_wrap">
            <div className="customs_card">
              <div className="customs_head">
                <FontAwesomeIcon icon={faCircleInfo} />
                <h3>個人通関固有符号とは？</h3>
              </div>
              <p>
                海外直送の際、住民登録番号の代わりに使用する13桁の番号です。
                個人情報保護のため関税庁が発給しており、一度発給を受ければ
                継続して使用できます。
              </p>
              <a
                className="customs_link"
                href="https://unipass.customs.go.kr"
                target="_blank"
                rel="noreferrer"
              >
                関税庁で発給を受ける
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            <div className="customs_card">
              <div className="customs_head">
                <FontAwesomeIcon icon={faFileShield} />
                <h3>関税はいつかかりますか？</h3>
              </div>
              <ul className="customs_list">
                <li>
                  <span className="tag tag_free">免税</span>
                  物品価額150ドル以下（アメリカは200ドル）
                </li>
                <li>
                  <span className="tag tag_pay">課税</span>
                  150ドル超過時に関税＋付加価値税が賦課
                </li>
                <li>
                  <span className="tag tag_warn">注意</span>
                  食品・化粧品などは別途基準が適用されます
                </li>
              </ul>
              <p className="customs_note">
                注文書で概算関税を事前に計算してお見せします。
              </p>
            </div>
          </div>
        </section>

        {/* ===== 注意事項 ===== */}
        <section className="guide_section">
          <h2 className="guide_section_title">
            <span className="deco">✦</span>
            必ずご確認ください
            <span className="deco">✦</span>
          </h2>

          <ul className="notice_list">
            {NOTICES.map((notice) => (
              <GuideNoticeItem
                key={notice.title}
                title={notice.title}
                description={notice.desc}
              />
            ))}
          </ul>
        </section>

        {/* ===== CTA ===== */}
        <section className="guide_cta">
          <h2>まだ気になる点はありますか？</h2>
          <p>カスタマーセンターでよくある質問をご確認いただくか、直接お問い合わせください。</p>
          <div className="guide_cta_btns">
            <Link to="/support" className="cta_bt cta_bt_primary">
              カスタマーセンターへ
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/overseas" className="cta_bt cta_bt_outline">
              海外直送を始める
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Guide;