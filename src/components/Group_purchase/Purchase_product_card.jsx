import '../../assets/styles/Group_purchase/purchase_product_card.css';
import { Link } from 'react-router-dom';

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

            <div className="products_container">
                {products.length === 0 ? (
                    <p className="empty_message">
                        条件に一致する商品がありません。
                    </p>
                ) : (
                    products.map((product) => (
                        <Link
                            className="products_box"
                            key={product.id}
                            to={`/groupbuy/${product.id}`}
                        >
                            <div className="product_image_box">

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
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                >
                                    ♡
                                </button>

                                {/* 상품 이미지 */}
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

                            </div>

                            <div className="product_info">

                                {/* 상품명 */}
                                <h3>
                                    {product.nameJp
                                        || product.name
                                        || '商品名なし'}
                                </h3>

                                {/* 브랜드 */}
                                <p className="product_period">
                                    {product.brand || 'ブランド情報なし'}
                                </p>

                                {/* 가격 */}
                                <div className="price_box">
                                    <strong>
                                        {product.price || '価格情報なし'}
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
                        </Link>
                    ))
                )}
            </div>

        </div>
    );
}

export default Purchase_product_card;