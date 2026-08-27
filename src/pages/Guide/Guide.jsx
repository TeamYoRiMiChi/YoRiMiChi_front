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
  faTriangleExclamation,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Guide.css';

/* 해외직구 이용 순서 */
const DIRECT_STEPS = [
  {
    icon: faMagnifyingGlass,
    title: '상품 검색',
    desc: '원하는 일본 상품을 검색하거나 카테고리에서 찾아보세요.',
  },
  {
    icon: faCartShopping,
    title: '장바구니 담기',
    desc: '수량을 선택하고 장바구니에 담아 한 번에 주문할 수 있어요.',
  },
  {
    icon: faCreditCard,
    title: '주문 · 결제',
    desc: '배송지와 개인통관고유부호를 입력하고 결제를 진행합니다.',
  },
  {
    icon: faBoxOpen,
    title: '검수 후 배송',
    desc: '일본 현지에서 상품을 검수한 뒤 안전하게 포장해 발송합니다.',
  },
];

/* 공동구매 이용 순서 */
const GROUP_STEPS = [
  {
    icon: faUsers,
    title: '공동구매 찾기',
    desc: '진행 중인 공동구매를 둘러보고 마음에 드는 상품을 고르세요.',
  },
  {
    icon: faHandshake,
    title: '참여 신청',
    desc: '수량을 정해 참여하면 목표 인원 달성까지 함께 기다립니다.',
  },
  {
    icon: faCheckDouble,
    title: '목표 달성',
    desc: '모집 인원이 채워지면 공동구매가 확정되고 주문이 진행돼요.',
  },
  {
    icon: faTruckFast,
    title: '일괄 배송',
    desc: '한 번에 묶어 배송하기 때문에 배송비를 크게 아낄 수 있어요.',
  },
];

/* 배송 단계 */
const SHIPPING_STEPS = [
  {
    icon: faWarehouse,
    title: '일본 현지 창고 입고',
    desc: '주문한 상품이 일본 물류창고에 도착해 검수를 받습니다.',
    days: '2~3일',
  },
  {
    icon: faPlaneUp,
    title: '국제 배송',
    desc: '검수와 포장을 마친 상품이 한국으로 출발합니다.',
    days: '2~4일',
  },
  {
    icon: faFileShield,
    title: '통관 진행',
    desc: '세관에서 통관 절차가 진행됩니다. 개인통관고유부호가 필요해요.',
    days: '1~2일',
  },
  {
    icon: faHouseChimney,
    title: '국내 배송',
    desc: '국내 택배사를 통해 입력하신 주소로 배송됩니다.',
    days: '1~2일',
  },
];

/* 유의사항 */
const NOTICES = [
  {
    title: '개인통관고유부호는 필수예요',
    desc: '해외직구 상품은 통관 시 개인통관고유부호가 반드시 필요합니다. 관세청 홈페이지에서 무료로 발급받을 수 있어요.',
  },
  {
    title: '관세 · 부가세가 발생할 수 있어요',
    desc: '목록통관 기준 금액을 초과하면 관세와 부가세가 부과됩니다. 주문 시 예상 금액을 미리 안내해 드려요.',
  },
  {
    title: '환율에 따라 가격이 달라져요',
    desc: '상품 가격은 엔화 기준이며, 주문 시점의 환율이 적용됩니다. 결제 전 최종 금액을 꼭 확인해 주세요.',
  },
  {
    title: '공동구매는 목표 미달 시 자동 취소돼요',
    desc: '모집 기간 내 목표 수량에 도달하지 못하면 공동구매가 취소되고 결제 금액은 전액 환불됩니다.',
  },
];

function Guide() {
  const [tab, setTab] = useState('direct');
  const steps = tab === 'direct' ? DIRECT_STEPS : GROUP_STEPS;

  return (
    <div className="guide">

      {/* ===== 히어로 ===== */}
      <section className="guide_hero">
        <div className="guide_hero_inner">
          <span className="guide_hero_badge">GUIDE</span>
          <h1 className="guide_hero_title">
            처음이어도 괜찮아요,<br />
            <strong>이렇게만 하시면 돼요</strong>
          </h1>
          <p className="guide_hero_desc">
            상품을 고르는 것부터 문 앞에 도착하기까지,<br />
            요리미치가 전 과정을 함께합니다.
          </p>
        </div>
      </section>

      <div className="guide_body">

        {/* ===== 이용 순서 (탭) ===== */}
        <section className="guide_section">
          <h2 className="guide_section_title">
            <span className="deco">✦</span>
            이용 순서
            <span className="deco">✦</span>
          </h2>
          <p className="guide_section_sub">
            원하는 방식을 선택해서 순서를 확인해 보세요.
          </p>

          <div className="guide_tabs">
            <button
              className={`guide_tab ${tab === 'direct' ? 'active' : ''}`}
              onClick={() => setTab('direct')}
            >
              해외직구
            </button>
            <button
              className={`guide_tab ${tab === 'group' ? 'active' : ''}`}
              onClick={() => setTab('group')}
            >
              공동구매
            </button>
          </div>

          <ol className="step_list">
            {steps.map((step, i) => (
              <li className="step_card" key={step.title}>
                <span className="step_num">STEP {i + 1}</span>
                <div className="step_icon">
                  <FontAwesomeIcon icon={step.icon} />
                </div>
                <h3 className="step_title">{step.title}</h3>
                <p className="step_desc">{step.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ===== 배송 단계 ===== */}
        <section className="guide_section">
          <h2 className="guide_section_title">
            <span className="deco">✦</span>
            배송은 이렇게 진행돼요
            <span className="deco">✦</span>
          </h2>
          <p className="guide_section_sub">
            결제 완료부터 수령까지 평균 <strong>7~10일</strong> 정도 걸려요.
          </p>

          <div className="ship_flow">
            {SHIPPING_STEPS.map((s, i) => (
              <div className="ship_item" key={s.title}>
                <div className="ship_card">
                  <div className="ship_icon">
                    <FontAwesomeIcon icon={s.icon} />
                  </div>
                  <span className="ship_days">{s.days}</span>
                  <h3 className="ship_title">{s.title}</h3>
                  <p className="ship_desc">{s.desc}</p>
                </div>
                {i < SHIPPING_STEPS.length - 1 && (
                  <div className="ship_arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===== 관세 안내 ===== */}
        <section className="guide_section">
          <h2 className="guide_section_title">
            <span className="deco">✦</span>
            관세 · 통관 안내
            <span className="deco">✦</span>
          </h2>

          <div className="customs_wrap">
            <div className="customs_card">
              <div className="customs_head">
                <FontAwesomeIcon icon={faCircleInfo} />
                <h3>개인통관고유부호란?</h3>
              </div>
              <p>
                해외직구 시 주민등록번호 대신 사용하는 13자리 번호예요.
                개인정보 보호를 위해 관세청에서 발급하며, 한 번 발급받으면
                계속 사용할 수 있습니다.
              </p>
              <a
                className="customs_link"
                href="https://unipass.customs.go.kr"
                target="_blank"
                rel="noreferrer"
              >
                관세청에서 발급받기
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            <div className="customs_card">
              <div className="customs_head">
                <FontAwesomeIcon icon={faFileShield} />
                <h3>관세는 언제 붙나요?</h3>
              </div>
              <ul className="customs_list">
                <li>
                  <span className="tag tag_free">면세</span>
                  물품가액 150달러 이하 (미국은 200달러)
                </li>
                <li>
                  <span className="tag tag_pay">과세</span>
                  150달러 초과 시 관세 + 부가세 부과
                </li>
                <li>
                  <span className="tag tag_warn">주의</span>
                  식품 · 화장품 등은 별도 기준이 적용돼요
                </li>
              </ul>
              <p className="customs_note">
                주문서에서 예상 관세를 미리 계산해 보여드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* ===== 유의사항 ===== */}
        <section className="guide_section">
          <h2 className="guide_section_title">
            <span className="deco">✦</span>
            꼭 확인해 주세요
            <span className="deco">✦</span>
          </h2>

          <ul className="notice_list">
            {NOTICES.map((n) => (
              <li className="notice_item" key={n.title}>
                <div className="notice_icon">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                </div>
                <div className="notice_text">
                  <h3>{n.title}</h3>
                  <p>{n.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ===== CTA ===== */}
        <section className="guide_cta">
          <h2>아직 궁금한 점이 있으신가요?</h2>
          <p>고객센터에서 자주 묻는 질문을 확인하거나 직접 문의해 주세요.</p>
          <div className="guide_cta_btns">
            <Link to="/support" className="cta_bt cta_bt_primary">
              고객센터 바로가기
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/overseas" className="cta_bt cta_bt_outline">
              해외직구 시작하기
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Guide;
