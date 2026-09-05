import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faHeart,
  faCartShopping,
  faTruckFast,
  faShieldHalved,
  faHeadset,
  faSeedling,
  faCircleCheck,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useProductInfo } from '../../hooks/Overseas/useProductInfo';
import '../../assets/styles/Overseas/ProductInfo.css';

/* 하단 특징 배너 */
const BENEFITS = [
  { icon: faSeedling, title: '日本現地で購入', desc: '現地スタッフが直接購入し\n検品してお届けします。' },
  { icon: faShieldHalved, title: '安心・安全の取引', desc: '安全な決済システムで\n安心してご利用いただけます。' },
  { icon: faTruckFast, title: 'スピード配送', desc: '通関手続きまで代行し\n早く確実にお届けします。' },
  { icon: faHeadset, title: 'サポート体制', desc: 'ご不明な点はサポートが\n丁寧に対応します。' },
];

/* 탭 정의 */
const TABS = [
  { key: 'detail', label: '商品詳細' },
  { key: 'info', label: '商品情報' },
  { key: 'shipping', label: '配送・送料' },
  { key: 'review', label: 'レビュー' },
  { key: 'faq', label: 'よくある質問' },
];

/* 리뷰는 아직 API가 없어서 임시 데이터입니다 */
const REVIEWS = [
  { id: 1, name: 'はるか', rating: 5, content: '思っていたより早く届きました。梱包も丁寧で満足です。', date: '2026.08.15' },
  { id: 2, name: 'ゆうた', rating: 5, content: '日本で買うのと同じ価格で助かります。また利用します。', date: '2026.08.14' },
  { id: 3, name: 'ミナ', rating: 4, content: '商品は良かったです。通関に少し時間がかかりました。', date: '2026.08.13' },
];

const RATING_BARS = [
  { star: 5, percent: 92 },
  { star: 4, percent: 6 },
  { star: 3, percent: 2 },
  { star: 2, percent: 0 },
  { star: 1, percent: 0 },
];

function ProductInfo() {
  const {
    product,
    related,
    isLoading,
    error,
    images,
    imageIndex,
    setImageIndex,
    moveImage,
    quantity,
    changeQuantity,
    activeTab,
    setActiveTab,
    isWished,
    handleToggleWish,
    handleAddToCart,
  } = useProductInfo();

  if (isLoading) {
    return (
      <div className="pinfo-page">
        <div className="pinfo-loading">読み込み中...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pinfo-page">
        <div className="pinfo-error">
          <p>{error ?? '商品が見つかりませんでした。'}</p>
          <Link to="/overseas" className="pinfo-btn-line">商品一覧に戻る</Link>
        </div>
      </div>
    );
  }

  const productCode = `YM-${String(product.id).padStart(6, '0')}`;
  const totalPrice = product.priceNum * quantity;

  return (
    <div className="pinfo-page">

      {/* ===== 빵부스러기 ===== */}
      <nav className="pinfo-breadcrumb" aria-label="現在地">
        <Link to="/">ホーム</Link>
        <span>/</span>
        <Link to="/overseas">海外直購</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      {/* ===== 상단: 갤러리 + 정보 ===== */}
      <section className="pinfo-top">

        {/* 썸네일 목록 */}
        <div className="pinfo-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              className={`pinfo-thumb ${imageIndex === i ? 'active' : ''}`}
              onClick={() => setImageIndex(i)}
              aria-label={`画像${i + 1}を表示`}
            >
              {img ? <img src={img} alt="" /> : <span>{product.brand}</span>}
            </button>
          ))}
          <button type="button" className="pinfo-thumb-more" aria-label="もっと見る">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>

        {/* 메인 이미지 */}
        <div className="pinfo-gallery">
          {images[imageIndex] ? (
            <img src={images[imageIndex]} alt={product.name} />
          ) : (
            <div className="pinfo-noimage">{product.brand || product.name}</div>
          )}

          <button
            type="button"
            className="pinfo-gallery-arrow prev"
            onClick={() => moveImage(-1)}
            aria-label="前の画像"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            type="button"
            className="pinfo-gallery-arrow next"
            onClick={() => moveImage(1)}
            aria-label="次の画像"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          <span className="pinfo-gallery-count">
            {imageIndex + 1} / {images.length}
          </span>
        </div>

        {/* 상품 정보 */}
        <div className="pinfo-summary">
          <span className="pinfo-badge">海外直購</span>

          <h1 className="pinfo-title">
            {product.brand && <em>{product.brand}</em>} {product.name}
          </h1>

          <p className="pinfo-code">商品コード：{productCode}</p>

          <div className="pinfo-rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <FontAwesomeIcon key={n} icon={faStar} className={n <= 5 ? 'on' : ''} />
            ))}
            <strong>4.8</strong>
            <span>（128件のレビュー）</span>
          </div>

          <p className="pinfo-desc">{product.nameJp || product.name}</p>

          {/* 가격 */}
          <div className="pinfo-pricebox">
            <div className="pinfo-price-row">
              <div className="pinfo-price-main">
                <span className="label">販売価格</span>
                <strong>{product.price}</strong>
                <em>（税込）</em>
              </div>

              {product.originalPrice && (
                <div className="pinfo-price-origin">
                  <span className="label">参考価格</span>
                  <del>{product.originalPrice}</del>
                </div>
              )}

              {product.discount && (
                <span className="pinfo-discount">{product.discount} OFF</span>
              )}
            </div>

            <div className="pinfo-stock">
              <span>在庫状況</span>
              <strong className={product.inStock ? 'ok' : 'out'}>
                {product.inStock ? `残り ${product.stock} 点` : '在庫切れ'}
              </strong>
            </div>
          </div>

          {/* 옵션 + 수량 */}
          <div className="pinfo-options">
            <div className="pinfo-option">
              <label htmlFor="option-select">オプション</label>
              <select id="option-select" className="pinfo-select">
                <option>標準（1点）</option>
              </select>
            </div>

            <div className="pinfo-option">
              <label>数量</label>
              <div className="pinfo-qty">
                <button
                  type="button"
                  onClick={() => changeQuantity(-1)}
                  disabled={quantity <= 1}
                  aria-label="数量を減らす"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => changeQuantity(1)}
                  disabled={quantity >= product.stock}
                  aria-label="数量を増やす"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>

          {/* 합계 */}
          <div className="pinfo-total">
            <span>合計</span>
            <strong>¥{totalPrice.toLocaleString()}</strong>
          </div>

          {/* 버튼 */}
          <div className="pinfo-actions">
            <button
              type="button"
              className="pinfo-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {product.inStock ? 'カートに入れる' : '在庫切れ'}
            </button>

            <button
              type="button"
              className={`pinfo-wish-btn ${isWished ? 'active' : ''}`}
              onClick={handleToggleWish}
              aria-pressed={isWished}
              aria-label="お気に入り"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>

          {/* 배송 안내 */}
          <div className="pinfo-notes">
            <div className="pinfo-note">
              <FontAwesomeIcon icon={faTruckFast} />
              <div>
                <strong>日本国内配送対応</strong>
                <span>最短 5〜7営業日でお届け</span>
              </div>
            </div>

            <div className="pinfo-note">
              <FontAwesomeIcon icon={faShieldHalved} />
              <div>
                <strong>安心・安全の取引システム</strong>
                <span>YoRiMiChiの保護で安心</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 특징 배너 ===== */}
      <section className="pinfo-benefits">
        {BENEFITS.map((b) => (
          <article className="pinfo-benefit" key={b.title}>
            <FontAwesomeIcon icon={b.icon} />
            <div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          </article>
        ))}
      </section>

      {/* ===== 탭 ===== */}
      <section className="pinfo-tabs-section">
        <div className="pinfo-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              className={activeTab === tab.key ? 'active' : ''}
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {tab.key === 'review' && <em>（128）</em>}
            </button>
          ))}
        </div>

        <div className="pinfo-tab-body">

          {activeTab === 'detail' && (
            <div className="pinfo-detail-grid">
              <div className="pinfo-detail-col">
                <h3>商品の特徴</h3>
                <ul className="pinfo-check-list">
                  <li><FontAwesomeIcon icon={faCircleCheck} />日本現地で購入した正規品です</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} />検品後、丁寧に梱包して発送します</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} />通関手続きまで代行いたします</li>
                  <li><FontAwesomeIcon icon={faCircleCheck} />配送状況をリアルタイムで確認できます</li>
                </ul>
              </div>

              <div className="pinfo-detail-col">
                <h3>商品情報</h3>
                <table className="pinfo-spec">
                  <tbody>
                    <tr><th>ブランド</th><td>{product.brand || '-'}</td></tr>
                    <tr><th>商品名</th><td>{product.nameJp || product.name}</td></tr>
                    <tr><th>原産国</th><td>日本</td></tr>
                    <tr><th>商品コード</th><td>{productCode}</td></tr>
                    <tr><th>在庫</th><td>{product.stock} 点</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pinfo-detail-col">
                <h3>注意事項</h3>
                <ul className="pinfo-dot-list">
                  <li>商品パッケージは予告なく変更される場合があります。</li>
                  <li>写真はイメージです。</li>
                  <li>個人通関固有符号の登録が必要です。</li>
                  <li>150ドルを超える場合、関税が発生します。</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <table className="pinfo-spec wide">
              <tbody>
                <tr><th>ブランド</th><td>{product.brand || '-'}</td></tr>
                <tr><th>商品名（日本語）</th><td>{product.nameJp || '-'}</td></tr>
                <tr><th>販売価格</th><td>{product.price}（税込）</td></tr>
                <tr><th>参考価格</th><td>{product.originalPrice ?? '-'}</td></tr>
                <tr><th>在庫数</th><td>{product.stock} 点</td></tr>
                <tr><th>累計販売数</th><td>{product.sales} 点</td></tr>
                <tr><th>商品コード</th><td>{productCode}</td></tr>
              </tbody>
            </table>
          )}

          {activeTab === 'shipping' && (
            <div className="pinfo-shipping">
              <ol className="pinfo-steps">
                <li><span>01</span><div><strong>ご注文・お支払い</strong><p>ご注文後、現地スタッフが商品を購入します。</p></div></li>
                <li><span>02</span><div><strong>現地倉庫へ入荷</strong><p>日本の倉庫で検品・梱包を行います。（2〜3日）</p></div></li>
                <li><span>03</span><div><strong>国際配送</strong><p>韓国へ向けて発送します。（2〜4日）</p></div></li>
                <li><span>04</span><div><strong>通関手続き</strong><p>個人通関固有符号で通関を行います。（1〜2日）</p></div></li>
                <li><span>05</span><div><strong>国内配送</strong><p>ご指定の住所へお届けします。（1〜2日）</p></div></li>
              </ol>

              <div className="pinfo-shipping-note">
                <strong>送料について</strong>
                <p>重量とサイズにより変動します。ご注文画面で最終金額をご確認ください。</p>
              </div>
            </div>
          )}

          {activeTab === 'review' && (
            <div className="pinfo-review-block">
              <div className="pinfo-review-summary">
                <div className="pinfo-review-score">
                  <strong>4.8</strong>
                  <div className="pinfo-review-stars">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <FontAwesomeIcon key={n} icon={faStar} className="on" />
                    ))}
                  </div>
                  <span>128件のレビュー</span>
                </div>

                <ul className="pinfo-review-bars">
                  {RATING_BARS.map((b) => (
                    <li key={b.star}>
                      <span className="star">{b.star}</span>
                      <FontAwesomeIcon icon={faStar} />
                      <div className="bar"><i style={{ width: `${b.percent}%` }} /></div>
                      <span className="percent">{b.percent}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="pinfo-review-list">
                {REVIEWS.map((r) => (
                  <li key={r.id}>
                    <div className="pinfo-review-head">
                      <div className="pinfo-review-user">
                        <span className="avatar">{r.name.charAt(0)}</span>
                        <strong>{r.name} さん</strong>
                      </div>
                      <div className="pinfo-review-stars small">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <FontAwesomeIcon key={n} icon={faStar} className={n <= r.rating ? 'on' : ''} />
                        ))}
                      </div>
                    </div>
                    <p>{r.content}</p>
                    <span className="date">{r.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'faq' && (
            <ul className="pinfo-faq">
              <li>
                <strong>Q. 個人通関固有符号は必ず必要ですか？</strong>
                <p>A. はい。海外直購商品の通関には必ず必要です。関税庁のサイトで無料で発行できます。</p>
              </li>
              <li>
                <strong>Q. 関税はいつ発生しますか？</strong>
                <p>A. 物品価額が150ドルを超える場合に発生します。ご注文画面で概算をご確認いただけます。</p>
              </li>
              <li>
                <strong>Q. 返品・交換はできますか？</strong>
                <p>A. 商品到着後7日以内であれば可能です。ただし、개封済みの食品・化粧品は対象外です。</p>
              </li>
              <li>
                <strong>Q. 配送状況はどこで確認できますか？</strong>
                <p>A. マイページの「配送照会」から確認できます。</p>
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* ===== 추천 상품 ===== */}
      {related.length > 0 && (
        <section className="pinfo-related">
          <div className="pinfo-related-head">
            <h2>おすすめ商品</h2>
            <Link to="/overseas">もっと見る <FontAwesomeIcon icon={faChevronRight} /></Link>
          </div>

          <ul className="pinfo-related-list">
            {related.map((item) => (
              <li key={item.id}>
                <Link to={`/overseas/${item.id}`} className="pinfo-related-card">
                  <div className="pinfo-related-thumb">
                    {item.thumbnailUrl
                      ? <img src={item.thumbnailUrl} alt="" />
                      : <span>{item.brand}</span>}
                  </div>
                  <p className="name">{item.name}</p>
                  <div className="price-row">
                    <strong>{item.price}</strong>
                    <span className="cart-icon"><FontAwesomeIcon icon={faCartShopping} /></span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default ProductInfo;