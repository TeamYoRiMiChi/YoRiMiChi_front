import heroImage2 from '../../assets/images/purchase_background2_yomi.png';
import heroImage3 from '../../assets/images/Overseas_banner.png';
import heroImage4 from '../../assets/images/guideCat.png';
import newArrivalsBanner from '../../assets/images/purchase_new_arrivals_banner.png';
// import cardDiscountBanner from '../../assets/images/purchase_card_discount_banner.png';
// import premiumWeekBanner from '../../assets/images/purchase_premium_week_natural_banner.png';

export const heroSlides = [
     {
         image: heroImage3,
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
         image: heroImage2,
         alt: 'カード決済割引の案内',
         eyebrow: 'CARD BENEFIT',
         title: 'カード決済でさらにお得',
         description: '対象カードのご利用で5%OFF',
         tone: 'light',
         layout: 'copy-right photo-left',
     },
     {
         image: heroImage4,
         alt: 'プレミアムウィーク限定商品の案内',
         eyebrow: 'PREMIUM WEEK',
         title: '週末だけの特別企画\n自分へのご褒美をお得に',
         description: '厳選アイテムを期間限定の特別価格で',
         tone: 'premium',
         layout: 'copy-center premium-slide',
     },
 ];