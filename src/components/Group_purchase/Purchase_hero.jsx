import '../../assets/styles/Group_purchase/Purchase_hero.css';
import { useEffect, useState } from 'react';
import heroImage2 from '../../assets/images/purchase_background2_yomi.png';
import newArrivalsBanner from '../../assets/images/purchase_new_arrivals_banner.png';
import cardDiscountBanner from '../../assets/images/purchase_card_discount_banner.png';
import premiumWeekBanner from '../../assets/images/purchase_premium_week_natural_banner.png';




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
function Purchase_hero() {
   
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
 
 
     
     

return(<>
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

               




</>);
}
 export default Purchase_hero;