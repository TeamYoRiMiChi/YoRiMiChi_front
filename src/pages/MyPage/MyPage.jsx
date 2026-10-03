import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";
import {
  faBoxOpen,
  faTruckFast,
  faHeart,
  faCartShopping,
  faUsers,
  faStar,
  faUserPen,
  faLocationDot,
  faRightFromBracket,
  faChevronRight,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/MyPage.css";
import DeliveryStatusSummary from "../../components/MyPage/DeliveryStatusSummary/DeliveryStatusSummary";
import OrderHistory from "../../components/MyPage/OrderHistory/OrderHistory";
import GroupBuyParticipationStatus from "../../components/MyPage/GroupBuyParticipationStatus/GroupBuyParticipationStatus";
import Wishlist from "../../components/MyPage/Wishlist/Wishlist";
import MypageCart from "../../components/MyPage/MypageCart/MypageCart";
import MyCoupons from "../../components/MyPage/MyCoupons/MyCoupons";
import DeliveryTracking from "../../components/MyPage/DeliveryTracking/DeliveryTracking";
import MyReview from "../../components/MyPage/MyReview/MyReview";
import ProfileManagement from "../../components/MyPage/ProfileManagement/ProfileManagement";
import AddressManagement from "../../components/MyPage/AddressManagement/AddressManagement";
import MembershipWithdrawal from "../../components/MyPage/MembershipWithdrawal/MembershipWithdrawal";
import useMyPageSideMenus from "../../hooks/MyPage/MyPage/useMyPageSideMenus";
import MyPageProfile from "../../components/MyPage/MyPageProfile/MyPageProfile";

/* ===== 사이드 메뉴 ===== */
const MENU_GROUPS = [
  {
    title: "ショッピング情報",
    items: [
      { key: "orders", icon: faBoxOpen, label: "注文履歴" },
      { key: "shipping", icon: faTruckFast, label: "配送状況確認" },
      { key: "groupbuy", icon: faUsers, label: "共同購入参加状況" },
    ],
  },
  {
    title: "マイショッピング",
    items: [
      { key: "wishlist", icon: faHeart, label: "お気に入り商品" },
      { key: "cart", icon: faCartShopping, label: "カート" },
      { key: "coupons", icon: faTicket, label: "クーポン" },
      { key: "reviews", icon: faStar, label: "マイレビュー" },
    ],
  },
  {
    title: "会員情報",
    items: [
      { key: "profile", icon: faUserPen, label: "会員情報修正" },
      { key: "address", icon: faLocationDot, label: "配送先管理" },
      { key: "withdraw", icon: faRightFromBracket, label: "会員退会" },
    ],
  },
];

const WISH_ITEMS = [
  { id: 11, name: "八咫鏡", price: 93500, soldOut: false },
  { id: 12, name: "天叢雲剣", price: 121000, soldOut: false },
  { id: 13, name: "八尺瓊勾玉", price: 60500, soldOut: false },
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

const MY_REVIEWS = [
  {
    id: 41,
    product: "Ｆａｔｅ／ｓｔｒａｎｇｅ　Ｆａｋｅ １０/ 成田良悟 (文庫)",
    rating: 4,
    content: "안나왔어요",
    date: "2026.08.22",
  },
  {
    id: 42,
    product: "Ｆａｔｅ／ｓｔｒａｎｇｅ　Ｆａｋｅ ９/ 成田良悟 (文庫)",
    rating: 5,
    content: "개꿀잼이에요",
    date: "2026.08.10",
  },
];

function MyPage() {
  const [searchParams] = useSearchParams();

  const { menu, setMenu, currentLabel } = useMyPageSideMenus(
    MENU_GROUPS,
    searchParams.get("menu") ?? "orders",
  );

  return (
    <div className="mypage">
      {/* ===== 히어로 ===== */}
      <section className="mp_hero">
        <div className="mp_hero_inner">
          {/* 간략 프로필 */}
          <MyPageProfile />
          {/* 배송 진행 현황 */}
          <DeliveryStatusSummary />
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
          {menu === "orders" && <OrderHistory />}

          {/* ---- 배송 조회 ---- */}
          {menu === "shipping" && <DeliveryTracking />}

          {/* ---- 공동구매 참여 ---- */}
          {menu === "groupbuy" && (
            <GroupBuyParticipationStatus groupBuys={GROUP_BUYS} />
          )}

          {/* ---- 찜한 상품 ---- */}
          {menu === "wishlist" && <Wishlist wishItems={WISH_ITEMS} />}

          {/* ---- 장바구니 ---- */}
          {menu === "cart" && <MypageCart />}

          {/* ---- 쿠폰함 ---- */}
          {menu === "coupons" && <MyCoupons />}

          {/* ---- 내 리뷰 ---- */}
          {menu === "reviews" && <MyReview myReviews={MY_REVIEWS} />}

          {/* ---- 회원정보 수정 ---- */}
          {menu === "profile" && <ProfileManagement user={user} />}

          {/* ---- 배송지 관리 ---- */}
          {menu === "address" && <AddressManagement />}

          {/* ---- 회원 탈퇴 ---- */}
          {menu === "withdraw" && <MembershipWithdrawal />}
        </main>
      </div>
    </div>
  );
}

export default MyPage;
