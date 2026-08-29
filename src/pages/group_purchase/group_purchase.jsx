import '../../assets/styles/group_purchase.css';
import heroImage from '../../assets/images/purchase_hero_v2.png';
import heroImage2 from '../../assets/images/purchase_background2.png';
import { useState } from 'react';
function GroupPurchase() {
    const [activeFilter, setActiveFilter] = useState('すべて');

const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const [showMore, setShowMore] = useState(true);

    const handleMore = () => {
        // console.log('more clicked');
        setShowMore(!showMore);
    };


    return (
        <>

            <div className="group_purchase_container">

                {/* =========================
          HERO
      ========================= */}
                <div className="hero_box">
                    <img
                        className="hero_image"
                        src={heroImage2}
                        alt="共同購入"
                    />
                </div>


                {/* =========================
          my_purchase_status
      ========================= */}
                <div className="group_purchase_my">

                    <div className="purchase_my_title_box">
                        <h4>私の共同購入状況</h4>

                        <button className="detail_btn">
                            詳細を見る
                        </button>
                    </div>


                    <div className="my_purchase_list">

                        <div className="my_purchase_1">
                            <div className="status_item">
                                <span className="status_icon">⌛</span>
                                <span className="status_title">進行中</span>
                                <strong>3</strong>
                            </div>
                        </div>


                        <div className="my_purchase_1">
                            <div className="status_item">
                                <span className="status_icon">💳</span>
                                <span className="status_title">入金待ち</span>
                                <strong>1</strong>
                            </div>
                        </div>


                        <div className="my_purchase_1">
                            <div className="status_item">
                                <span className="status_icon">📦</span>
                                <span className="status_title">発送準備中</span>
                                <strong>2</strong>
                            </div>
                        </div>


                        <div className="my_purchase_1">
                            <div className="status_item">
                                <span className="status_icon">🚚</span>
                                <span className="status_title">発送中</span>
                                <strong>1</strong>
                            </div>
                        </div>


                        <div className="my_purchase_1">
                            <div className="status_item">
                                <span className="status_icon">✓</span>
                                <span className="status_title">完了</span>
                                <strong>0</strong>
                            </div>
                        </div>

                    </div>
                </div>


                {/* =========================
         search/filter
      ========================= */}
                <div className="group_purchase_search">

                    <div className="filter_left">
                            {['すべて', '進行中', '締切間近', '完了'].map((filter) => (
                            <button
                                key={filter}
                                className={`filter_btn ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => handleFilterClick(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>


                    <div className="filter_right">

                        <select className="filter_select">
                            <option>すべてのカテゴリ</option>
                            <option>ファッション</option>
                            <option>食品</option>
                            <option>美容</option>
                            <option>生活用品</option>
                        </select>


                        <select className="filter_select">
                            <option>新着順</option>
                            <option>人気順</option>
                            <option>価格順</option>
                        </select>


                        <button className="create_purchase_btn">
                            ＋ 共同購入を作る
                        </button>

                    </div>

                </div>


                {/* =========================
         product card
      ========================= */}


                {showMore ?  <div className="products_container">
                         {/* 상품 1 */}
                        <div className="products_box">

                            <div className="product_image_box">
                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>
                            </div>


                            <div className="product_info">

                                <h3>
                                    日本人気ブランド バッグ共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.15 ～ 05.22
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_78"></div>
                                </div>

                                <div className="progress_info">
                                    <span>78%</span>
                                    <span>23 / 30名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥18,900</strong>
                                    <span className="old_price">
                                        ¥29,800
                                    </span>

                                    <span className="sale_badge">
                                        36% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.05
                                </p>

                            </div>

                        </div>



                        {/* product2  */}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    SK-II スキンケアセット共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.14 ～ 05.21
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_62"></div>
                                </div>

                                <div className="progress_info">
                                    <span>62%</span>
                                    <span>31 / 50名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥15,900</strong>

                                    <span className="old_price">
                                        ¥25,600
                                    </span>

                                    <span className="sale_badge">
                                        37% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.03
                                </p>

                            </div>

                        </div>



                        {/* product3*/}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge orange">
                                    締切間近 D-2
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    人気お菓子 詰め合わせセット
                                </h3>

                                <p className="product_period">
                                    参加期間 05.10 ～ 05.21
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_90"></div>
                                </div>

                                <div className="progress_info">
                                    <span>90%</span>
                                    <span>45 / 50名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥3,980</strong>

                                    <span className="old_price">
                                        ¥6,500
                                    </span>

                                    <span className="sale_badge">
                                        39% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 05.28
                                </p>

                            </div>

                        </div>



                        {/* product4 */}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    韓国ブランド パーカー共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.13 ～ 05.20
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_40"></div>
                                </div>

                                <div className="progress_info">
                                    <span>40%</span>
                                    <span>12 / 30名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥6,500</strong>

                                    <span className="old_price">
                                        ¥9,800
                                    </span>

                                    <span className="sale_badge">
                                        34% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.02
                                </p>

                            </div>

                        </div>
                        </div>
                    :
                    <div className="products_container">
                         {/* 상품 1 */}
                        <div className="products_box">

                            <div className="product_image_box">
                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>
                            </div>


                            <div className="product_info">

                                <h3>
                                    日本人気ブランド バッグ共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.15 ～ 05.22
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_78"></div>
                                </div>

                                <div className="progress_info">
                                    <span>78%</span>
                                    <span>23 / 30名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥18,900</strong>
                                    <span className="old_price">
                                        ¥29,800
                                    </span>

                                    <span className="sale_badge">
                                        36% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.05
                                </p>

                            </div>

                        </div>



                        {/* product2  */}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    SK-II スキンケアセット共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.14 ～ 05.21
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_62"></div>
                                </div>

                                <div className="progress_info">
                                    <span>62%</span>
                                    <span>31 / 50名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥15,900</strong>

                                    <span className="old_price">
                                        ¥25,600
                                    </span>

                                    <span className="sale_badge">
                                        37% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.03
                                </p>

                            </div>

                        </div>



                        {/* product3*/}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge orange">
                                    締切間近 D-2
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    人気お菓子 詰め合わせセット
                                </h3>

                                <p className="product_period">
                                    参加期間 05.10 ～ 05.21
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_90"></div>
                                </div>

                                <div className="progress_info">
                                    <span>90%</span>
                                    <span>45 / 50名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥3,980</strong>

                                    <span className="old_price">
                                        ¥6,500
                                    </span>

                                    <span className="sale_badge">
                                        39% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 05.28
                                </p>

                            </div>

                        </div>



                        {/* product4 */}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    韓国ブランド パーカー共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.13 ～ 05.20
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_40"></div>
                                </div>

                                <div className="progress_info">
                                    <span>40%</span>
                                    <span>12 / 30名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥6,500</strong>

                                    <span className="old_price">
                                        ¥9,800
                                    </span>

                                    <span className="sale_badge">
                                        34% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.02
                                </p>

                            </div>

                        </div>


                        {/* 상품 1 */}
                        <div className="products_box">

                            <div className="product_image_box">
                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>
                            </div>


                            <div className="product_info">

                                <h3>
                                    日本人気ブランド バッグ共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.15 ～ 05.22
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_78"></div>
                                </div>

                                <div className="progress_info">
                                    <span>78%</span>
                                    <span>23 / 30名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥18,900</strong>
                                    <span className="old_price">
                                        ¥29,800
                                    </span>

                                    <span className="sale_badge">
                                        36% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.05
                                </p>

                            </div>

                        </div>



                        {/* product2  */}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    SK-II スキンケアセット共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.14 ～ 05.21
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_62"></div>
                                </div>

                                <div className="progress_info">
                                    <span>62%</span>
                                    <span>31 / 50名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥15,900</strong>

                                    <span className="old_price">
                                        ¥25,600
                                    </span>

                                    <span className="sale_badge">
                                        37% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.03
                                </p>

                            </div>

                        </div>



                        {/* product3*/}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge orange">
                                    締切間近 D-2
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    人気お菓子 詰め合わせセット
                                </h3>

                                <p className="product_period">
                                    参加期間 05.10 ～ 05.21
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_90"></div>
                                </div>

                                <div className="progress_info">
                                    <span>90%</span>
                                    <span>45 / 50名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥3,980</strong>

                                    <span className="old_price">
                                        ¥6,500
                                    </span>

                                    <span className="sale_badge">
                                        39% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 05.28
                                </p>

                            </div>

                        </div>



                        {/* product4 */}
                        <div className="products_box">

                            <div className="product_image_box">

                                <span className="product_badge">
                                    進行中
                                </span>

                                <button className="heart_btn">
                                    ♡
                                </button>

                                <div className="product_image_placeholder">
                                    商品画像
                                </div>

                            </div>


                            <div className="product_info">

                                <h3>
                                    韓国ブランド パーカー共同購入
                                </h3>

                                <p className="product_period">
                                    参加期間 05.13 ～ 05.20
                                </p>

                                <div className="progress_bar">
                                    <div className="progress progress_40"></div>
                                </div>

                                <div className="progress_info">
                                    <span>40%</span>
                                    <span>12 / 30名</span>
                                </div>

                                <div className="price_box">
                                    <strong>¥6,500</strong>

                                    <span className="old_price">
                                        ¥9,800
                                    </span>

                                    <span className="sale_badge">
                                        34% OFF
                                    </span>
                                </div>

                                <p className="shipping_date">
                                    発送予定日 06.02
                                </p>

                            </div>

                        </div>



                    </div>}


                

                {/* =========================
          see more
      ========================= */}
                <div className="my_purchase_more">

                    <button className="more_bt" onClick={handleMore}>
                        もっと見る

                    </button>

                </div>


                {/* =========================
         purchase_footer_1
      ========================= */}
                <div className="purchase_footer_1">

                    <h2 className="footer_title">
                        共同購入の進め方
                    </h2>


                    <div className="footer_list">

                        <div className="footer_content">

                            <span className="step_number">
                                01
                            </span>

                            <div className="step_text">
                                <h3>商品を選ぶ</h3>
                                <p>
                                    気になる商品を見つけて
                                    詳細を確認します。
                                </p>
                            </div>

                        </div>


                        <div className="footer_content">

                            <span className="step_number">
                                02
                            </span>

                            <div className="step_text">
                                <h3>参加する</h3>
                                <p>
                                    目標人数に達するまで
                                    参加者を待ちます。
                                </p>
                            </div>

                        </div>


                        <div className="footer_content">

                            <span className="step_number">
                                03
                            </span>

                            <div className="step_text">
                                <h3>決済する</h3>
                                <p>
                                    成立したらメールでお知らせ。
                                    決済を行います。
                                </p>
                            </div>

                        </div>


                        <div className="footer_content">

                            <span className="step_number">
                                04
                            </span>

                            <div className="step_text">
                                <h3>商品を受け取る</h3>
                                <p>
                                    日本国内から発送され、
                                    ご自宅にお届けします。
                                </p>
                            </div>

                        </div>

                    </div>

                </div>



                {/* =========================
          purchase_footer_2
      ========================= */}
                <div className="purchase_footer_2">

                    <h2 className="footer_title">
                        YOMIの共同購入が選ばれる理由
                    </h2>


                    <div className="footer_list">

                        <div className="benefit_content">

                            <div className="benefit_icon">
                                %
                            </div>

                            <div>
                                <h3>最大50%OFF</h3>
                                <p>
                                    一緒に買うことで
                                    お得な価格を実現！
                                </p>
                            </div>

                        </div>


                        <div className="benefit_content">

                            <div className="benefit_icon">
                                ↗
                            </div>

                            <div>
                                <h3>進捗が見える</h3>
                                <p>
                                    リアルタイムで進捗状況を
                                    確認できます。
                                </p>
                            </div>

                        </div>


                        <div className="benefit_content">

                            <div className="benefit_icon">
                                ✓
                            </div>

                            <div>
                                <h3>安心・安全取引</h3>
                                <p>
                                    安全な決済システムで
                                    安心して利用できます。
                                </p>
                            </div>

                        </div>


                        <div className="benefit_content">

                            <div className="benefit_icon">
                                🚚
                            </div>

                            <div>
                                <h3>日本国内配送</h3>
                                <p>
                                    国内からの発送で
                                    早くて確実にお届け。
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </>
    );
}

export default GroupPurchase;
