import '../../assets/styles/Group_purchase/group_purchase.css';
import heroImage2 from '../../assets/images/purchase_background2_yomi.png';
import newArrivalsBanner from '../../assets/images/purchase_new_arrivals_banner.png';
import cardDiscountBanner from '../../assets/images/purchase_card_discount_banner.png';
import premiumWeekBanner from '../../assets/images/purchase_premium_week_banner.png';
import { useEffect, useState } from 'react';
import Purchase_status from '../../components/auth/Group_purchase/Purchase_status';
import Purchase_product_card from '../../components/auth/Group_purchase/purchase_product_card';
const heroSlides = [
    {
        image: heroImage2,
        alt: '共同購入のメイン案内',
    },
    {
        image: newArrivalsBanner,
        alt: '新着商品の案内',
        eyebrow: 'NEW ARRIVALS',
        title: '新着アイテム、続々入荷中',
        description: '今週追加された共同購入をチェック',
        tone: 'dark',
        layout: 'copy-left',
    },
    {
        image: cardDiscountBanner,
        alt: 'カード決済割引の案内',
        eyebrow: 'CARD BENEFIT',
        title: 'カード決済でさらにお得',
        description: '対象カードのご利用で5%OFF',
        tone: 'light',
        layout: 'copy-right photo-left',
    },
    {
        image: premiumWeekBanner,
        alt: 'プレミアムウィーク限定商品の案内',
        eyebrow: 'PREMIUM WEEK',
        title: '週末だけの特別企画\n自分へのご褒美をお得に',
        description: '厳選アイテムを期間限定の特別価格で',
        tone: 'premium',
        layout: 'copy-center premium-slide',
    },
];

function GroupPurchase() {
    const [activeFilter, setActiveFilter] = useState('すべて');
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((current) => (current + 1) % heroSlides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, []);

    const moveSlide = (direction) => {
        setActiveSlide((current) =>
            (current + direction + heroSlides.length) % heroSlides.length
        );
    };


    const handleFilterClick = (filter) => {
        console.log('filter clicked:', filter);
        setActiveFilter(filter);
    };

    return (
        <>

            <div className="group_purchase_container">

                {/* =========================
          HERO
      ========================= */}
                <section className="hero_box" aria-label="共同購入のお知らせ" lang="ja">
                    <div className="hero_slider">
                        {heroSlides.map((slide, index) => (
                            <article
                                className={`hero_slide ${slide.layout ?? ''} ${activeSlide === index ? 'active' : ''}`}
                                aria-hidden={activeSlide !== index}
                                key={slide.alt}
                            >
                                <img
                                    className="hero_image"
                                    src={slide.image}
                                    alt={slide.alt}
                                />

                                {slide.title && (
                                    <div className={`hero_copy ${slide.tone}`}>
                                        <span>{slide.eyebrow}</span>
                                        <h2>{slide.title}</h2>
                                        <p>{slide.description}</p>
                                    </div>
                                )}
                            </article>
                        ))}

                        <button
                            type="button"
                            className="hero_arrow prev"
                            onClick={() => moveSlide(-1)}
                            aria-label="前のスライド"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className="hero_arrow next"
                            onClick={() => moveSlide(1)}
                            aria-label="次のスライド"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M9 6l6 6-6 6" />
                            </svg>
                        </button>

                        <div className="hero_dots">
                            {heroSlides.map((slide, index) => (
                                <button
                                    type="button"
                                    className={activeSlide === index ? 'active' : ''}
                                    onClick={() => setActiveSlide(index)}
                                    aria-label={`${index + 1}番目のスライドを表示`}
                                    aria-current={activeSlide === index ? 'true' : undefined}
                                    key={slide.alt}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <Purchase_status />
                


                {/* =========================
         search/filter
      ========================= */}
                <div className="group_purchase_search">

                    <div className="filter_left">
                        {['すべて', '進行中', '締切間近', '完了'].map((filter) => (
                            <button
                                key={filter}
                                className={activeFilter === filter
                                    ? 'filter_btn active'
                                    : 'filter_btn'
                                }
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

                
                <Purchase_product_card  />

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
