dimport '../../assets/styles/Group_purchase/Purchase_product_card.css';
import { Link } from 'react-router-dom';

import usePurchaseProductCard
    from '../../hooks/Group_purchase/components/usePurchase_product_card';

// DB 상태값 → 화면 표시 문구
const STATUS_LABELS = {
    RECRUITING: '進行中',
    CLOSING_SOON: '締切間近',
    SUCCESS: '完了',
    FAILED: '未成立',
    CANCELLED: '中止',
};

function Purchase_product_card({ products = [] }) {

    return (
        <div className="group_purchase_container">

            {/* 백엔드가 상태별로 보내준 상품을 그대로 출력 */}
            <div className="products_container">
                {products.length === 0 ? (
                    <p className="empty_message">
                        条件に一致する商品がありません。
                    </p>
                ) : (
                    products.map((product) => (
                        <div
                            className="products_box"
                            key={product.id}
                        >
                            <div className="product_image_box">

                                {/* ACTIVE 등을 일본어로 바꿔서 표시 */}
                               <span
    className={`product_badge ${
        product.status === 'CLOSING_SOON'
            ? 'product_badge_closing'
            : product.status === 'SUCCESS'
                ? 'product_badge_completed'
                : ''
    }`}
>
    {STATUS_LABELS[product.status]
        ?? product.status
        ?? '進行中'}
</span>

                                <button
                                    type="button"
                                    className="heart_btn"
                                >
                                    ♡
                                </button>

                                {/* 상품 이미지 */}
                                <Link
                                    className="product_detail_image_link"
                                    to={`/groupbuy/${product.id}`}
                                    aria-label={`${product.nameJp || product.name}の詳細を見る`}
                                >
                                    {product.thumbnailUrl ? (
                                        <img
                                            className="product_image"
                                            src={product.thumbnailUrl}
                                            alt={
                                                product.nameJp
                                                || product.name
                                                || '商品画像'
                                            }
                                        />
                                    ) : (
                                        <div className="product_image_placeholder">
                                            {product.nameJp || product.name || '商品画像'}
                                        </div>
                                    )}
                                </Link>
                            </div>

                            <div className="product_info">

                                {/* 상품명 */}
                                <Link className="product_detail_name_link" to={`/groupbuy/${product.id}`}>
                                    <h3>
                                        {product.nameJp
                                            || product.name
                                            || '商品名なし'}
                                    </h3>
                                </Link>

                                {/* 브랜드 */}
                                <p className="product_period">
                                    {product.brand
                                        || 'ブランド情報なし'}
                                </p>

                                {/* 가격 */}
                                <div className="price_box">
                                    <strong>
                                        {product.price
                                            || '価格情報なし'}
                                    </strong>

                                    {product.originalPrice && (
                                        <span className="old_price">
                                            {product.originalPrice}
                                        </span>
                                    )}

                                    {product.discount && (
                                        <span className="sale_badge">
                                            {product.discount} OFF
                                        </span>
                                    )}
                                </div>

                                {/* 재고 */}
                                <p className="shipping_date">
                                    在庫：{product.stock ?? 0}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 기존 훅의 더 보기 함수 사용 */}
            
        </div>
    );
}

export default Purchase_product_card;
