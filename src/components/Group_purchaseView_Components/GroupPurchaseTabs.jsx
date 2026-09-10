import '../../assets/styles/Group_purchase/GroupPurchaseTabs.css';
import groupPurchaseTabsData from '../../data/Group_purchase/groupPurchaseTabsData';
import useGroupPurchaseView from '../../hooks/Group_purchase/useGroupPurchaseView';

function GroupPurchaseTabs({ product }) {
  const { activeTab, handleTabChange } = useGroupPurchaseView();
  const tabData = groupPurchaseTabsData;
  const productInformation = [
    { label: '商品名', value: product.name || '情報なし' },
    { label: 'ブランド', value: product.brand || '情報なし' },
    { label: '商品コード', value: product.productCode || '情報なし' },
    { label: '内容量', value: product.options?.[0] || '1セット' },
    { label: '販売方式', value: product.badge || '共同購入' },
  ];

  return (
    <section className="group_purchase_detail_content">
      {/* 공동구매 상세 탭 버튼 영역 */}
      <nav className="group_purchase_tabs">
        <button
          type="button"
          className={`detail_tab ${activeTab === 'detail' ? 'active' : ''}`}
          onClick={() => handleTabChange('detail')}
        >
          商品詳細
        </button>

        <button
          type="button"
          className={`detail_tab ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => handleTabChange('info')}
        >
          商品情報
        </button>

        <button
          type="button"
          className={`detail_tab ${activeTab === 'shipping' ? 'active' : ''}`}
          onClick={() => handleTabChange('shipping')}
        >
          配送・送料
        </button>

        <button
          type="button"
          className={`detail_tab ${activeTab === 'review' ? 'active' : ''}`}
          onClick={() => handleTabChange('review')}
        >
          レビュー（{tabData.review.count}）
        </button>

        <button
          type="button"
          className={`detail_tab ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => handleTabChange('faq')}
        >
          よくある質問
        </button>
      </nav>

      {/* 상품 상세 내용 */}
      {activeTab === 'detail' && (
        <div className="group_purchase_tab_panel">
          <div className="product_feature_section">
            <h2>商品の特徴</h2>

            <ul>
              {tabData.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 상품 기본 정보 내용 */}
      {activeTab === 'info' && (
        <div className="group_purchase_tab_panel">
          <div className="product_information_section">
            <h2>商品情報</h2>

            <dl>
              {productInformation.map((information) => (
                <div key={information.label}>
                  <dt>{information.label}</dt>
                  <dd>{information.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {/* 배송 및 운임 내용 */}
      {activeTab === 'shipping' && (
        <div className="group_purchase_tab_panel">
          <div>
            <h2>配送・送料</h2>
            {tabData.shipping.map((shippingText) => (
              <p key={shippingText}>{shippingText}</p>
            ))}
          </div>
        </div>
      )}

      {/* 상품 리뷰 전체 내용 */}
      {activeTab === 'review' && (
        <div className="group_purchase_tab_panel review_tab_panel">
          <div className="review_tab_content">
            <h2>レビュー（{tabData.review.count}件）</h2>

            <div className="review_content">
              {/* 리뷰 평균 점수 */}
              <div className="review_summary">
                <strong className="review_score">{tabData.review.average}</strong>
                <span className="review_stars">{tabData.review.stars}</span>
                <p>{tabData.review.count}件のレビュー</p>

                <button type="button" className="review_more_button">
                  すべてのレビューを見る
                </button>
              </div>

              {/* 별점별 리뷰 비율 */}
              <div className="review_statistics">
                {tabData.review.statistics.map((statistic) => (
                  <div key={statistic.score}>
                    <span>{statistic.score} ★</span>
                    <progress value={statistic.percentage} max="100"></progress>
                    <span>{statistic.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 작성된 리뷰 카드 목록 */}
            <div className="review_card_list">
              {tabData.review.items.map((review) => (
                <article className="review_card" key={review.id}>
                  <div className="review_user">
                    <span className="review_avatar">{review.avatar}</span>
                    <div>
                      <strong>{review.name}</strong>
                      <span>{review.ratingText}</span>
                    </div>
                  </div>
                  <p>{review.content}</p>
                  <time>{review.date}</time>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 자주 묻는 질문 내용 */}
      {activeTab === 'faq' && (
        <div className="group_purchase_tab_panel">
          <div>
            <h2>よくある質問</h2>
            <p>{tabData.faq}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default GroupPurchaseTabs;
