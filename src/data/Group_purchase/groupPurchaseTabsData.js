// 공동구매 상세 탭에서 사용하는 임시 데이터
const groupPurchaseTabsData = {
  features: [
    'ミルクティーの風味を活かしたサクサク食感',
    'わさびのやさしい味わいで食べやすい',
    'おやつやおつまみにぴったりの定番商品',
    '個包装でシェアにも便利',
  ],
  productInformation: [
    { label: 'ブランド', value: 'Calbee（カルビー）' },
    { label: '内容量', value: '1袋 57g' },
    { label: '原産国', value: '日本' },
    { label: '賞味期限', value: '製造日より6ヶ月' },
    { label: '保存方法', value: '直射日光・高温多湿を避けて保存' },
  ],
  shipping: [
    '日本国内から発送し、最短3〜5営業日でお届けします。',
    '送料はご注文内容と配送地域によって異なります。',
  ],
  review: {
    count: 245,
    average: 4.8,
    stars: '★★★★★',
    statistics: [
      { score: 5, percentage: 92 },
      { score: 4, percentage: 6 },
      { score: 3, percentage: 2 },
      { score: 2, percentage: 0 },
      { score: 1, percentage: 0 },
    ],
    items: [
      {
        id: 1,
        avatar: 'ほ',
        name: 'ファイ さん',
        ratingText: '★★★★★ 5',
        content: 'サクサクで美味しい！家族みんな大好きな味です。',
        date: '2024.05.15',
      },
      {
        id: 2,
        avatar: 'ゆ',
        name: 'とうや さん',
        ratingText: '★★★★★ 5',
        content: '安定の美味しさ！まとめ買いできて助かります。',
        date: '2024.05.14',
      },
      {
        id: 3,
        avatar: 'ミ',
        name: 'アナ さん',
        ratingText: '★★★★☆ 4',
        content: 'ミルクティー味が一番好きです',
        date: '2024.05.13',
      },
    ],
  },
  faq: '共同購入の成立後に、ご登録のメールアドレスへお知らせします。',
};

export default groupPurchaseTabsData;
