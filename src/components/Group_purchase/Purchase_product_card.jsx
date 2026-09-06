import '../../assets/styles/Group_purchase/Purchase_product_card.css';

// 수정 1: 사용하지 않는 useState import를 삭제했습니다.
import usePurchaseProductCard
    from '../../hooks/Group_purchase/components/usePurchase_product_card';


function Purchase_product_card({
    // 현재 선택된 상태 필터
    activeFilter = 'すべて',

    // useGroup_purchase.js에서 전달받은 DB 상품 목록
    products = [],
}) {
    const {
        handleMore,
    } = usePurchaseProductCard();


    return (
        <>
            <div className="group_purchase_container">

                {/* =========================================
                    상품 카드 영역
                ========================================= */}


                {/* =========================================
                    수정 2: 「すべて」를 선택했을 때
                    DB에서 받아온 상품 전체를 출력합니다.
                ========================================= */}
                {activeFilter === 'すべて' && (
                    <div className="products_container">

                        {/* 상품이 하나도 없는 경우 */}
                        {products.length === 0 ? (
                            <p className="empty_message">
                                商品が見つかりませんでした。
                            </p>
                        ) : (

                            /*
                             * 수정 3:
                             * DB에서 받아온 products 배열을 반복합니다.
                             *
                             * 상품이 5개면 products_box가 5개 만들어집니다.
                             */
                            products.map((product) => (
                                <div
                                    className="products_box"
                                    key={product.id}
                                >

                                    {/* 상품 이미지 영역 */}
                                    <div className="product_image_box">

                                        {/* 
                                            현재는 PRODUCT의 status를 보여줍니다.
                                            나중에는 공동구매 상태값으로 변경해야 합니다.
                                        */}
                                        <span className="product_badge">
                                            {product.status || '販売中'}
                                        </span>

                                        <button
                                            type="button"
                                            className="heart_btn"
                                        >
                                            ♡
                                        </button>


                                        {/* =================================
                                            수정 4: 상품 이미지 출력
                                            
                                            thumbnailUrl이 있으면 이미지 출력,
                                            없으면 商品画像 문구를 출력합니다.
                                        ================================= */}
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
                                                商品画像
                                            </div>
                                        )}

                                    </div>


                                    {/* 상품 정보 영역 */}
                                    <div className="product_info">

                                        {/* =================================
                                            수정 5: DB 상품명 출력
                                            
                                            일본어 이름이 있으면 nameJp,
                                            없으면 name을 출력합니다.
                                        ================================= */}
                                        <h3>
                                            {product.nameJp
                                                || product.name
                                                || '商品名なし'}
                                        </h3>


                                        {/* =================================
                                            수정 6:
                                            아직 공동구매 기간 데이터가 없으므로
                                            브랜드를 이 위치에 출력합니다.
                                        ================================= */}
                                        <p className="product_period">
                                            {product.brand
                                                || 'ブランド情報なし'}
                                        </p>


                                        {/* =================================
                                            공동구매 진행률
                                            
                                            현재 PRODUCT API에는
                                            목표 인원, 참여 인원이 없으므로
                                            임시로 출력하지 않습니다.
                                        ================================= */}

                                        {/*
                                        <div className="progress_bar">
                                            <div className="progress"></div>
                                        </div>

                                        <div className="progress_info">
                                            <span>진행률</span>
                                            <span>참여 인원 / 목표 인원</span>
                                        </div>
                                        */}


                                        {/* 상품 가격 영역 */}
                                        <div className="price_box">

                                            {/* 현재 상품 가격 */}
                                            <strong>
                                                {product.price || '価格情報なし'}
                                            </strong>


                                            {/* 
                                                할인 전 가격이 존재할 때만 출력
                                            */}
                                            {product.originalPrice && (
                                                <span className="old_price">
                                                    {product.originalPrice}
                                                </span>
                                            )}


                                            {/* 
                                                할인율이 0보다 클 때만 출력
                                            */}
                                            {Number(product.discount) > 0 && (
                                                <span className="sale_badge">
                                                    {product.discount}% OFF
                                                </span>
                                            )}

                                        </div>


                                        {/* =================================
                                            수정 7:
                                            현재 배송 예정일 데이터가 없으므로
                                            PRODUCT의 재고를 출력합니다.
                                        ================================= */}
                                        <p className="shipping_date">
                                            在庫：
                                            {product.stock ?? 0}
                                        </p>

                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                )}


                {/* =========================================
                    「進行中」 영역
                    
                    아직 공동구매 상태 데이터와 연결하지 않았으므로
                    임시 안내 문구만 출력합니다.
                ========================================= */}
                {activeFilter === '進行中' && (
                    <div className="products_container">
                        <p className="empty_message">
                            進行中の商品データを準備しています。
                        </p>
                    </div>
                )}


                {/* =========================================
                    「締切間近」 영역
                    
                    나중에 공동구매의 endDate를 이용해서
                    마감 임박 상품을 출력할 부분입니다.
                ========================================= */}
                {activeFilter === '締切間近' && (
                    <div className="products_container">
                        <p className="empty_message">
                            締切間近の商品データを準備しています。
                        </p>
                    </div>
                )}


                {/* =========================================
                    「完了」 영역
                    
                    나중에 공동구매 status가 완료인 상품을
                    출력할 부분입니다.
                ========================================= */}
                {activeFilter === '完了' && (
                    <div className="products_container">
                        <p className="empty_message">
                            完了した商品データを準備しています。
                        </p>
                    </div>
                )}


                {/* =========================================
                    더 보기 버튼
                ========================================= */}
                <div className="my_purchase_more">
                    <button
                        type="button"
                        className="more_bt"
                        onClick={handleMore}
                    >
                        もっと見る
                    </button>
                </div>

            </div>
        </>
    );
}


export default Purchase_product_card;