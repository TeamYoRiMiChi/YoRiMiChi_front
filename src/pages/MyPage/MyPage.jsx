import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/MyPage.css";
import OrderStatusSummary from "../../components/MyPage/OrderStatusSummary/OrderStatusSummary";
import OrderHistory from "../../components/MyPage/OrderHistory/OrderHistory";
import GroupBuyParticipationStatus from "../../components/MyPage/GroupBuyParticipationStatus/GroupBuyParticipationStatus";
import Wishlist from "../../components/MyPage/Wishlist/Wishlist";
import Cart from "../../components/MyPage/Cart/Cart";
import DeliveryTracking from "../../components/MyPage/DeliveryTracking/DeliveryTracking";
import MyReview from "../../components/MyPage/MyReview/MyReview";
import ProfileManagement from "../../components/MyPage/ProfileManagement/ProfileManagement";
import AddressManagement from "../../components/MyPage/AddressManagement/AddressManagement";
import PCCCManagement from "../../components/MyPage/PCCCManagement/PCCCManagement";
import MembershipWithdrawal from "../../components/MyPage/MembershipWithdrawal/MembershipWithdrawal";

/* ===== 주문 진행 현황 ===== */
const ORDER_STATUS = [
  { icon: faCreditCard, label: "결제완료", count: 1 },
  { icon: faWarehouse, label: "현지창고", count: 1 },
  { icon: faPlaneUp, label: "국제배송", count: 1 },
  { icon: faFileShield, label: "통관중", count: 3 },
  { icon: faHouseChimney, label: "배송완료", count: 5 },
];

/* ===== 사이드 메뉴 ===== */
const MENU_GROUPS = [
  {
    title: "쇼핑 정보",
    items: [
      { key: "orders", icon: faBoxOpen, label: "주문 내역" },
      { key: "shipping", icon: faTruckFast, label: "배송 조회" },
      { key: "groupbuy", icon: faUsers, label: "공동구매 참여" },
    ],
  },
  {
    title: "관심 상품",
    items: [
      { key: "wishlist", icon: faHeart, label: "찜한 상품" },
      { key: "cart", icon: faCartShopping, label: "장바구니" },
      { key: "reviews", icon: faStar, label: "내 리뷰" },
    ],
  },
  {
    title: "내 정보",
    items: [
      { key: "profile", icon: faUserPen, label: "회원정보 수정" },
      { key: "address", icon: faLocationDot, label: "배송지 관리" },
      { key: "customs", icon: faIdCard, label: "통관고유부호" },
      { key: "withdraw", icon: faRightFromBracket, label: "회원 탈퇴" },
    ],
  },
];

/* ===== 임시 데이터 ===== */
const ORDERS = [
  {
    id: 1,
    orderNumber: "YM-20260827-0012",
    date: "2026.08.25",
    status: "국제배송",
    statusType: "shipping",
    items: [{ name: "[小山園] 雲鶴 100g", qty: 1, price: 222500 }],
    total: 222500,
  },
  {
    id: 2,
    orderNumber: "YM-20260820-0008",
    date: "2026.08.20",
    status: "배송완료",
    statusType: "done",
    items: [
      { name: "正広作 MV-本焼 牛刀 300mm", qty: 1, price: 425000 },
      { name: "クァンチョンキム 味付けのり30g *2缶", qty: 3, price: 61500 },
    ],
    total: 486500,
  },
];

const WISH_ITEMS = [
  { id: 11, name: "八咫鏡", price: 93500, soldOut: false },
  { id: 12, name: "天叢雲剣", price: 121000, soldOut: false },
  { id: 13, name: "八尺瓊勾玉", price: 60500, soldOut: false },
];

const CART_ITEMS = [
  {
    id: 21,
    name: "Ｆａｔｅ／ｓｔｒａｎｇｅ　Ｆａｋｅ １０/ 成田良悟 (文庫)",
    price: 4800,
    qty: 1,
  },
  { id: 22, name: "クァンチョンキム 味付けのり30g *2缶", price: 20500, qty: 1 },
];

const GROUP_BUYS = [
  {
    id: 31,
    title: "페스페 전권 공동구매",
    status: "모집중",
    statusType: "ing",
    current: 12,
    target: 20,
    myQty: 2,
    endDate: "2026.09.05",
  },
  {
    id: 32,
    title: "虎屋羊羹",
    status: "목표달성",
    statusType: "done",
    current: 10,
    target: 10,
    myQty: 5,
    endDate: "2026.08.18",
  },
];

const ORDER_STATUSES = [
  {
    orderNumber: "YM-20260827-0012",
    shipCarrier: "Yamato Transport",
    trackingNumber: "1234-5678-9012",
    deliveryType: "국제배송",
    statuses: [
      {
        icon: faWarehouse,
        label: "현지창고",
        date: "08.25",
        done: true,
      },
      {
        icon: faPlaneUp,
        label: "국제배송",
        date: "08.27",
        done: true,
        now: true,
      },
      {
        icon: faFileShield,
        label: "통관중",
        date: "-",
        done: false,
      },
      {
        icon: faHouseChimney,
        label: "국내배송",
        date: "-",
        done: false,
      },
      {
        icon: faCircleCheck,
        label: "배송완료",
        date: "-",
        done: false,
      },
    ],
  },

  {
    orderNumber: "YM-20260901-0123",
    shipCarrier: "Takeru Transport",
    trackingNumber: "9012-5678-1234",
    deliveryType: "행성간배송",
    statuses: [
      {
        icon: faWarehouse,
        label: "현지창고",
        date: "09.01",
        done: true,
      },
      {
        icon: faPlaneUp,
        label: "행성간배송",
        date: "09.01",
        done: true,
      },
      {
        icon: faFileShield,
        label: "통관중",
        date: "09.02",
        done: false,
        now: true,
      },
      {
        icon: faHouseChimney,
        label: "대륙간배송",
        date: "-",
        done: false,
      },
      {
        icon: faCircleCheck,
        label: "배송완료",
        date: "-",
        done: false,
      },
    ],
  },
];

const MY_REVIEWS = [
  {
    id: 41,
    product: "Ｆａｔｅ／ｓｔｒａｎｇｅ　Ｆａｋｅ ９/ 成田良悟 (文庫)",
    rating: 5,
    content: "개꿀잼이에요",
    date: "2026.08.22",
  },
  {
    id: 42,
    product: "Ｆａｔｅ／ｓｔｒａｎｇｅ　Ｆａｋｅ ８/ 成田良悟 (文庫)",
    rating: 4,
    content: "개꿀잼이에요",
    date: "2026.08.10",
  },
];

const ADDRESSES = [
  {
    id: 51,
    name: "家",
    receiver: "安徳",
    phone: "010-1234-5678",
    zip: "111-0053",
    addr: "東京都台東区浅草橋",
    detail: "四丁目1-1",
    isDefault: true,
  },
  {
    id: 52,
    name: "実家",
    receiver: "安徳",
    phone: "010-1234-5678",
    zip: "163-8001",
    addr: "東京都新宿区西新宿2-8-1",
    detail: "15階",
    isDefault: false,
  },
];

function MyPage() {
  const [menu, setMenu] = useState("orders");

  const user = {
    name: "安徳",
    email: "antoku@yahoo.com",
    joinDate: "1178.12.22",
    grade: "VIP",
  };

  const currentLabel = MENU_GROUPS.flatMap((g) => g.items).find(
    (i) => i.key === menu,
  )?.label;

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
          <OrderStatusSummary orderStatus={ORDER_STATUS} />
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
                      className={`mp_side_bt ${menu === item.key ? "active" : ""} ${
                        item.key === "withdraw" ? "danger" : ""
                      }`}
                      onClick={() => setMenu(item.key)}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="mp_side_icon"
                      />
                      <span>{item.label}</span>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="mp_side_arrow"
                      />
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
          {menu === "orders" && <OrderHistory orders={ORDERS} />}

          {/* ---- 배송 조회 ---- */}
          {menu === "shipping" && (
            <DeliveryTracking orderStatuses={ORDER_STATUSES} />
          )}

          {/* ---- 공동구매 참여 ---- */}
          {menu === "groupbuy" && (
            <GroupBuyParticipationStatus groupBuys={GROUP_BUYS} />
          )}

          {/* ---- 찜한 상품 ---- */}
          {menu === "wishlist" && <Wishlist wishItems={WISH_ITEMS} />}

          {/* ---- 장바구니 ---- */}
          {menu === "cart" && <Cart cartItems={CART_ITEMS} />}

          {/* ---- 내 리뷰 ---- */}
          {menu === "reviews" && <MyReview myReviews={MY_REVIEWS} />}

          {/* ---- 회원정보 수정 ---- */}
          {menu === "profile" && <ProfileManagement user={user} />}

          {/* ---- 배송지 관리 ---- */}
          {menu === "address" && <AddressManagement addresses={ADDRESSES} />}

          {/* ---- 통관고유부호 ---- */}
          {menu === "customs" && <PCCCManagement />}

          {/* ---- 회원 탈퇴 ---- */}
          {menu === "withdraw" && <MembershipWithdrawal />}
        </main>
      </div>
    </div>
  );
}

export default MyPage;
