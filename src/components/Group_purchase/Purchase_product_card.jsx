import '../../assets/styles/Group_purchase/Purchase_product_card.css';

import { useState } from 'react';
function Purchase_product_card({ activeFilter = 'すべて' }) {
    const [showMore, setShowMore] = useState(false);


    const handleMore = () => {
        // console.log('more clicked');
        setShowMore(!showMore);
    };


    return (
        <>

            <div className="group_purchase_container">


                    {/* =========================
         product card
      ========================= */}

                    {activeFilter === 'すべて' && (
                        <div className="products_container">
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
                        </div>

                    )}
                    {activeFilter === '進行中' && (
                        <div className="products_container">
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
                            <div className="products_box" >

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

                        </div>
                    )}
                    {activeFilter === '締切間近' && (
                        <div className="products_container">
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
                            <div className="products_box" >

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

                        </div>
                    )}
                    {activeFilter === '完了' && (
                        <div className="products_container">
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
                            <div className="products_box" >

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


                    )}
















                    {/* =========================
          see more
      ========================= */}
                    <div className="my_purchase_more">

                        <button className="more_bt" onClick={handleMore}>
                            もっと見る

                        </button>

                    </div>






</div>
                
            </>
            );
}

            export default Purchase_product_card;
