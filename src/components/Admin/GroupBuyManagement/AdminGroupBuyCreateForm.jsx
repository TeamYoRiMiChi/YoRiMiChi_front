import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const initialForm = {
  title: "",
  description: "",
  targetQuantity: "",
  startDate: "",
  endDate: "",
};

// "공동구매 등록" 버튼을 누르면 카테고리 관리 페이지처럼 헤더 아래에 펼쳐지는 등록 폼.
// 상품을 새로 만들지 않고, 이미 판매유형이 GROUP_BUY로 등록된 기존 상품을 검색해서
// 골라 새 모집 라운드(GROUP_BUY 행)만 생성합니다 (POST /admin/group-buys).
function AdminGroupBuyCreateForm({ products = [], isSaving, onSubmit, onClose }) {
  const [productKeyword, setProductKeyword] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const filteredProducts = useMemo(() => {
    const normalized = productKeyword.trim().toLowerCase();

    if (!normalized) {
      return products;
    }

    return products.filter((product) =>
      [product.productName, product.productNameJp, product.brand]
        .filter(Boolean)
        .some((text) => text.toLowerCase().includes(normalized)),
    );
  }, [products, productKeyword]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setIsPickerOpen(false);
    setProductKeyword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedProduct) {
      alert("共同購入を行う商品を選択してください。");
      return;
    }

    if (!formData.title.trim()) {
      alert("共同購入タイトルを入力してください。");
      return;
    }

    if (formData.targetQuantity === "" || Number(formData.targetQuantity) < 1) {
      alert("目標数量は1個以上にしてください。");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      alert("募集期間を入力してください。");
      return;
    }

    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      alert("募集終了日は開始日より後にしてください。");
      return;
    }

    const ok = await onSubmit({
      productId: selectedProduct.productId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      targetQuantity: Number(formData.targetQuantity),
      startDate: formData.startDate,
      endDate: formData.endDate,
    });

    if (ok) {
      setFormData(initialForm);
      setSelectedProduct(null);
    }
  };

  return (
    <section className="agb-form-panel">
      <div className="agb-form-header">
        <div>
          <h3>共同購入登録</h3>
          <p>すでに登録されている共同購入商品を選んで新しい募集ラウンドを開始します。</p>
        </div>

        <button
          type="button"
          className="agb-form-close"
          onClick={onClose}
          disabled={isSaving}
          aria-label="フォームを閉じる"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <form className="agb-create-form" onSubmit={handleSubmit}>
        <div className="agb-form-product-picker">
          <span className="agb-form-picker-label">商品</span>

          {selectedProduct ? (
            <div className="agb-form-selected-product">
              <img
                src={selectedProduct.thumbnailUrl || undefined}
                alt={selectedProduct.productName}
              />

              <div>
                <strong>{selectedProduct.productName}</strong>
                <span>{selectedProduct.productNameJp}</span>
                <span>¥{Number(selectedProduct.priceJpy ?? 0).toLocaleString()}</span>
              </div>

              <button
                type="button"
                className="agb-form-picker-change"
                onClick={() => {
                  setSelectedProduct(null);
                  setIsPickerOpen(true);
                }}
                disabled={isSaving}
              >
                変更
              </button>
            </div>
          ) : (
            <div className="agb-form-picker-box">
              <label className="agb-search-box">
                <FontAwesomeIcon icon={faMagnifyingGlass} />

                <input
                  type="search"
                  value={productKeyword}
                  onChange={(event) => {
                    setProductKeyword(event.target.value);
                    setIsPickerOpen(true);
                  }}
                  onFocus={() => setIsPickerOpen(true)}
                  placeholder="商品名、日本語商品名またはブランドで検索"
                  disabled={isSaving}
                />
              </label>

              {isPickerOpen && (
                <ul className="agb-form-picker-list">
                  {filteredProducts.length === 0 && (
                    <li className="agb-form-picker-empty">
                      販売種別が「共同購入」の商品がありません。
                    </li>
                  )}

                  {filteredProducts.map((product) => (
                    <li key={product.productId}>
                      <button
                        type="button"
                        onClick={() => handleSelectProduct(product)}
                      >
                        <img
                          src={product.thumbnailUrl || undefined}
                          alt={product.productName}
                        />

                        <div>
                          <strong>{product.productName}</strong>
                          <span>{product.productNameJp}</span>
                        </div>

                        <b>¥{Number(product.priceJpy ?? 0).toLocaleString()}</b>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="agb-form-grid">
          <label className="agb-form-full">
            <span>共同購入タイトル</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="共同購入タイトル"
              disabled={isSaving}
              required
            />
          </label>

          <label className="agb-form-full">
            <span>共同購入の説明</span>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="共同購入の説明"
              disabled={isSaving}
            />
          </label>

          <label>
            <span>目標数量</span>
            <input
              type="number"
              name="targetQuantity"
              value={formData.targetQuantity}
              onChange={handleChange}
              min="1"
              placeholder="100"
              disabled={isSaving}
              required
            />
          </label>

          <label>
            <span>募集開始日</span>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              disabled={isSaving}
              required
            />
          </label>

          <label>
            <span>募集終了日</span>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={isSaving}
              required
            />
          </label>
        </div>

        <div className="agb-form-actions">
          <button
            type="button"
            className="agb-form-cancel-button"
            onClick={onClose}
            disabled={isSaving}
          >
            キャンセル
          </button>

          <button type="submit" className="agb-form-save-button" disabled={isSaving}>
            {isSaving ? "登録中..." : "登録"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminGroupBuyCreateForm;
