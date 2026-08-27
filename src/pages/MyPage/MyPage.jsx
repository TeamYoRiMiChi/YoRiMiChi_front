import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faWarehouse,
  faPlaneUp,
  faFileShield,
  faHouseChimney,
  faBoxOpen,
  faTruckFast,
  faHeart,
  faCartShopping,
  faUsers,
  faStar,
  faUserPen,
  faLocationDot,
  faIdCard,
  faRightFromBracket,
  faChevronRight,
  faPen,
  faTrash,
  faCartPlus,
  faCircleCheck,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/MyPage.css';

/* ===== 주문 진행 현황 ===== */
const ORDER_STATUS = [
  { icon: faCreditCard, label: '결제완료', count: 1 },
  { icon: faWarehouse, label: '현지창고', count: 2 },
  { icon: faPlaneUp, label: '국제배송', count: 1 },
  { icon: faFileShield, label: '통관중', count: 0 },
  { icon: faHouseChimney, label: '배송완료', count: 5 },
];

/* ===== 사이드 메뉴 ===== */
const MENU_GROUPS = [
  {
    title: '쇼핑 정보',
    items: [
      { key: 'orders', icon: faBoxOpen, label: '주문 내역' },
      { key: 'shipping', icon: faTruckFast, label: '배송 조회' },
      { key: 'groupbuy', icon: faUsers, label: '공동구매 참여' },
    ],
  },
  {
    title: '관심 상품',
    items: [
      { key: 'wishlist', icon: faHeart, label: '찜한 상품' },
      { key: 'cart', icon: faCartShopping, label: '장바구니' },
      { key: 'reviews', icon: faStar, label: '내 리뷰' },
    ],
  },
  {
    title: '내 정보',
    items: [
      { key: 'profile', icon: faUserPen, label: '회원정보 수정' },
      { key: 'address', icon: faLocationDot, label: '배송지 관리' },
      { key: 'customs', icon: faIdCard, label: '통관고유부호' },
      { key: 'withdraw', icon: faRightFromBracket, label: '회원 탈퇴' },
    ],
  },
];

/* ===== 임시 데이터 ===== */
const ORDERS = [
  {
    id: 1,
    orderNumber: 'YM-20260827-0012',
    date: '2026.08.25',
    status: '국제배송',
    statusType: 'shipping',
    items: [{ name: '무인양품 수납 박스 L', qty: 2, price: 48000 }],
    total: 52500,
  },
  {
    id: 2,
    orderNumber: 'YM-20260820-0008',
    date: '2026.08.20',
    status: '배송완료',
    statusType: 'done',
    items: [
      { name: '시세이도 선크림 SPF50', qty: 1, price: 19800 },
      { name: '일본 한정 과자 박스', qty: 3, price: 55500 },
    ],
    total: 79800,
  },
];

const WISH_ITEMS = [
  { id: 11, name: '무인양품 수납 박스 L', price: 24000, soldOut: false },
  { id: 12, name: '시세이도 선크림 SPF50', price: 19800, soldOut: false },
  { id: 13, name: '일본 문구 세트 (한정판)', price: 12500, soldOut: true },
];

const CART_ITEMS = [
  { id: 21, name: '베이비 아기용품 세트', price: 32000, qty: 1 },
  { id: 22, name: '일본 한정 과자 박스', price: 18500, qty: 2 },
];

const GROUP_BUYS = [
  {
    id: 31,
    title: '무인양품 수납용품 공동구매',
    status: '모집중',
    statusType: 'ing',
    current: 12,
    target: 20,
    myQty: 2,
    endDate: '2026.09.05',
  },
  {
    id: 32,
    title: '일본 과자 종합 선물세트',
    status: '목표달성',
    statusType: 'done',
    current: 30,
    target: 30,
    myQty: 1,
    endDate: '2026.08.18',
  },
];

const MY_REVIEWS = [
  {
    id: 41,
    product: '시세이도 선크림 SPF50',
    rating: 5,
    content: '일본 현지 가격 그대로라 만족스러워요. 배송도 생각보다 빨랐습니다.',
    date: '2026.08.22',
  },
  {
    id: 42,
    product: '일본 한정 과자 박스',
    rating: 4,
    content: '포장이 꼼꼼했어요. 다만 통관이 조금 오래 걸린 점은 아쉬웠습니다.',
    date: '2026.08.10',
  },
];

const ADDRESSES = [
  {
    id: 51,
    name: '집',
    receiver: '유영수',
    phone: '010-1234-5678',
    zip: '34141',
    addr: '대전광역시 유성구 대학로 99',
    detail: '3층 301호',
    isDefault: true,
  },
  {
    id: 52,
    name: '회사',
    receiver: '유영수',
    phone: '010-1234-5678',
    zip: '35242',
    addr: '대전광역시 서구 둔산로 100',
    detail: '5층',
    isDefault: false,
  },
];

function MyPage() {
  const [menu, setMenu] = useState('orders');

  const user = {
    name: '유영수',
    email: 'abcdefg@gmail.com',
    joinDate: '2026.07.15',
    grade: 'GOLD',
  };

  const currentLabel = MENU_GROUPS
    .flatMap((g) => g.items)
    .find((i) => i.key === menu)?.label;

  return (
    <div className="mypage">

      {/* ===== 히어로 ===== */}
      <section className="mp_hero">
        <div className="mp_hero_inner">
          <div className="mp_profile">
            <div className="mp_avatar">{user.name.charAt(0)}</div>
            <div className="mp_profile_text">
              <p className="mp_greet">
                <strong>{user.name}</strong>님, 안녕하세요
              </p>
              <p className="mp_email">{user.email}</p>
              <div className="mp_meta">
                <span className="mp_grade">{user.grade}</span>
                <span className="mp_join">가입일 {user.joinDate}</span>
              </div>
            </div>
          </div>

          {/* 주문 진행 현황 */}
          <div className="mp_status">
            {ORDER_STATUS.map((s) => (
              <div className="mp_status_item" key={s.label}>
                <div className={`mp_status_icon ${s.count > 0 ? 'on' : ''}`}>
                  <FontAwesomeIcon icon={s.icon} />
                </div>
                <span className="mp_status_count">{s.count}</span>
                <span className="mp_status_label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 본문 ===== */}
      <div className="mp_body">

        {/* 사이드 메뉴 */}
        <aside className="mp_side">
          {MENU_GROUPS.map((group) => (
            <div className="mp_side_group" key={group.title}>
              <h3 className="mp_side_title">{group.title}</h3>
              <ul className="mp_side_list">
                {group.items.map((item) => (
                  <li key={item.key}>
                    <button
                      className={`mp_side_bt ${menu === item.key ? 'active' : ''} ${
                        item.key === 'withdraw' ? 'danger' : ''
                      }`}
                      onClick={() => setMenu(item.key)}
                    >
                      <FontAwesomeIcon icon={item.icon} className="mp_side_icon" />
                      <span>{item.label}</span>
                      <FontAwesomeIcon icon={faChevronRight} className="mp_side_arrow" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* 콘텐츠 */}
        <main className="mp_content">
          <h2 className="mp_content_title">{currentLabel}</h2>

          {/* ---- 주문 내역 ---- */}
          {menu === 'orders' && (
            <div className="mp_panel">
              {ORDERS.map((order) => (
                <div className="order_card" key={order.id}>
                  <div className="order_head">
                    <div>
                      <span className="order_date">{order.date}</span>
                      <span className="order_num">{order.orderNumber}</span>
                    </div>
                    <span className={`badge badge_${order.statusType}`}>
                      {order.status}
                    </span>
                  </div>

                  <ul className="order_items">
                    {order.items.map((it, i) => (
                      <li key={i}>
                        <div className="order_thumb" />
                        <div className="order_item_info">
                          <p className="order_item_name">{it.name}</p>
                          <p className="order_item_sub">
                            {it.price.toLocaleString()}원 · {it.qty}개
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="order_foot">
                    <span className="order_total">
                      결제금액 <strong>{order.total.toLocaleString()}원</strong>
                    </span>
                    <div className="order_btns">
                      <button className="mini_bt">배송 조회</button>
                      <button className="mini_bt mini_bt_line">주문 상세</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---- 배송 조회 ---- */}
          {menu === 'shipping' && (
            <div className="mp_panel">
              <div className="ship_card">
                <div className="ship_head">
                  <div>
                    <span className="order_num">YM-20260827-0012</span>
                    <p className="ship_carrier">
                      Yamato Transport · 1234-5678-9012
                    </p>
                  </div>
                  <span className="badge badge_shipping">국제배송</span>
                </div>

                <div className="ship_track">
                  {[
                    { icon: faWarehouse, label: '현지창고', date: '08.25', done: true },
                    { icon: faPlaneUp, label: '국제배송', date: '08.27', done: true, now: true },
                    { icon: faFileShield, label: '통관중', date: '-', done: false },
                    { icon: faHouseChimney, label: '국내배송', date: '-', done: false },
                    { icon: faCircleCheck, label: '배송완료', date: '-', done: false },
                  ].map((s, i, arr) => (
                    <div className="track_item" key={s.label}>
                      <div className={`track_dot ${s.done ? 'done' : ''} ${s.now ? 'now' : ''}`}>
                        <FontAwesomeIcon icon={s.icon} />
                      </div>
                      <span className="track_label">{s.label}</span>
                      <span className="track_date">{s.date}</span>
                      {i < arr.length - 1 && (
                        <div className={`track_line ${s.done ? 'done' : ''}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mp_tip">
                <FontAwesomeIcon icon={faCircleInfo} />
                <p>
                  통관 단계에서 개인통관고유부호가 일치하지 않으면 배송이 지연될 수 있어요.
                  등록된 정보를 미리 확인해 주세요.
                </p>
              </div>
            </div>
          )}

          {/* ---- 공동구매 참여 ---- */}
          {menu === 'groupbuy' && (
            <div className="mp_panel">
              {GROUP_BUYS.map((gb) => (
                <div className="gb_card" key={gb.id}>
                  <div className="gb_head">
                    <h4>{gb.title}</h4>
                    <span className={`badge badge_${gb.statusType}`}>{gb.status}</span>
                  </div>

                  <div className="gb_progress">
                    <div className="gb_bar">
                      <div
                        className="gb_bar_fill"
                        style={{ width: `${(gb.current / gb.target) * 100}%` }}
                      />
                    </div>
                    <span className="gb_count">
                      {gb.current} / {gb.target}개
                    </span>
                  </div>

                  <div className="gb_foot">
                    <span>내 참여 수량 <strong>{gb.myQty}개</strong></span>
                    <span className="gb_date">마감 {gb.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ---- 찜한 상품 ---- */}
          {menu === 'wishlist' && (
            <div className="mp_panel">
              <div className="grid_list">
                {WISH_ITEMS.map((item) => (
                  <div className="grid_card" key={item.id}>
                    <div className="grid_thumb">
                      {item.soldOut && <span className="soldout">품절</span>}
                    </div>
                    <p className="grid_name">{item.name}</p>
                    <p className="grid_price">{item.price.toLocaleString()}원</p>
                    <div className="grid_btns">
                      <button className="mini_bt" disabled={item.soldOut}>
                        <FontAwesomeIcon icon={faCartPlus} /> 담기
                      </button>
                      <button className="icon_bt">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- 장바구니 ---- */}
          {menu === 'cart' && (
            <div className="mp_panel">
              <ul className="line_list">
                {CART_ITEMS.map((item) => (
                  <li className="line_item" key={item.id}>
                    <div className="order_thumb" />
                    <div className="order_item_info">
                      <p className="order_item_name">{item.name}</p>
                      <p className="order_item_sub">
                        {item.price.toLocaleString()}원 · {item.qty}개
                      </p>
                    </div>
                    <button className="icon_bt">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart_sum">
                <span>총 결제 예상금액</span>
                <strong>
                  {CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()}원
                </strong>
              </div>

              <Link to="/order" className="wide_bt">주문하러 가기</Link>
            </div>
          )}

          {/* ---- 내 리뷰 ---- */}
          {menu === 'reviews' && (
            <div className="mp_panel">
              {MY_REVIEWS.map((rv) => (
                <div className="review_card" key={rv.id}>
                  <div className="review_head">
                    <div>
                      <p className="review_product">{rv.product}</p>
                      <div className="review_stars">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <FontAwesomeIcon
                            key={n}
                            icon={faStar}
                            className={n <= rv.rating ? 'on' : ''}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="review_btns">
                      <button className="icon_bt"><FontAwesomeIcon icon={faPen} /></button>
                      <button className="icon_bt"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                  <p className="review_content">{rv.content}</p>
                  <span className="review_date">{rv.date}</span>
                </div>
              ))}
            </div>
          )}

          {/* ---- 회원정보 수정 ---- */}
          {menu === 'profile' && (
            <div className="mp_panel">
              <form className="form_box">
                <div className="form_row">
                  <label>이메일</label>
                  <input type="email" value={user.email} disabled />
                  <span className="form_hint">이메일은 변경할 수 없어요</span>
                </div>

                <div className="form_row">
                  <label>이름</label>
                  <input type="text" defaultValue={user.name} />
                </div>

                <div className="form_row">
                  <label>휴대폰 번호</label>
                  <div className="form_inline">
                    <input type="tel" defaultValue="010-1234-5678" />
                    <button type="button" className="mini_bt mini_bt_line">인증</button>
                  </div>
                </div>

                <div className="form_divider" />

                <div className="form_row">
                  <label>새 비밀번호</label>
                  <input type="password" placeholder="영문·숫자 포함 8자 이상" />
                </div>

                <div className="form_row">
                  <label>새 비밀번호 확인</label>
                  <input type="password" placeholder="한 번 더 입력해 주세요" />
                </div>

                <button type="submit" className="wide_bt">저장하기</button>
              </form>
            </div>
          )}

          {/* ---- 배송지 관리 ---- */}
          {menu === 'address' && (
            <div className="mp_panel">
              {ADDRESSES.map((ad) => (
                <div className={`addr_card ${ad.isDefault ? 'default' : ''}`} key={ad.id}>
                  <div className="addr_head">
                    <div className="addr_name">
                      {ad.name}
                      {ad.isDefault && <span className="addr_tag">기본 배송지</span>}
                    </div>
                    <div className="review_btns">
                      <button className="icon_bt"><FontAwesomeIcon icon={faPen} /></button>
                      <button className="icon_bt"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                  <p className="addr_receiver">{ad.receiver} · {ad.phone}</p>
                  <p className="addr_text">
                    ({ad.zip}) {ad.addr} {ad.detail}
                  </p>
                </div>
              ))}

              <button className="wide_bt wide_bt_line">+ 새 배송지 추가</button>
            </div>
          )}

          {/* ---- 통관고유부호 ---- */}
          {menu === 'customs' && (
            <div className="mp_panel">
              <div className="mp_tip">
                <FontAwesomeIcon icon={faCircleInfo} />
                <p>
                  해외직구 상품은 통관 시 개인통관고유부호가 반드시 필요해요.
                  관세청 홈페이지에서 무료로 발급받을 수 있습니다.
                </p>
              </div>

              <form className="form_box">
                <div className="form_row">
                  <label>개인통관고유부호</label>
                  <input type="text" defaultValue="P123456789012" placeholder="P로 시작하는 13자리" />
                  <span className="form_hint">
                    주문서 작성 시 자동으로 입력됩니다
                  </span>
                </div>

                <a
                  className="text_link"
                  href="https://unipass.customs.go.kr"
                  target="_blank"
                  rel="noreferrer"
                >
                  관세청에서 발급받기 <FontAwesomeIcon icon={faChevronRight} />
                </a>

                <button type="submit" className="wide_bt">저장하기</button>
              </form>
            </div>
          )}

          {/* ---- 회원 탈퇴 ---- */}
          {menu === 'withdraw' && (
            <div className="mp_panel">
              <div className="withdraw_box">
                <h3>정말 탈퇴하시겠어요?</h3>
                <ul className="withdraw_list">
                  <li>보유하신 쿠폰과 적립금은 모두 소멸됩니다.</li>
                  <li>진행 중인 주문과 공동구매는 탈퇴 후에도 계속 진행돼요.</li>
                  <li>작성하신 리뷰와 댓글은 삭제되지 않습니다.</li>
                  <li>동일한 이메일로 재가입이 가능합니다.</li>
                </ul>

                <label className="withdraw_check">
                  <input type="checkbox" />
                  <span>위 내용을 모두 확인했습니다</span>
                </label>

                <button className="wide_bt wide_bt_danger">회원 탈퇴하기</button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default MyPage;