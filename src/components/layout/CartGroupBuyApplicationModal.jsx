import { useEffect, useState } from 'react';
import { getGroupBuy, participateGroupBuy, toGroupBuyDetailView } from '../../api/groupBuyApi';

function CartGroupBuyApplicationModal({ isOpen, items, onClose, onComplete }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;

    let ignore = false;
    Promise.all(items.map((item) => getGroupBuy(item.productId)))
      .then((responses) => {
        if (ignore) return;
        setProducts(responses.map((response, index) => ({
          ...toGroupBuyDetailView(response.data.data),
          quantity: items[index].quantity,
        })));
      })
      .catch((requestError) => {
        if (!ignore) {
          setError(requestError.response?.data?.message || '共同購入情報を読み込めませんでした。');
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [isOpen, items]);

  if (!isOpen) return null;

  const totalPrice = products.reduce(
    (sum, product) => sum + product.groupPriceValue * product.quantity,
    0,
  );

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      for (const product of products) {
        await participateGroupBuy(product.productId, product.quantity);
      }
      setIsComplete(true);
      onComplete();
    } catch (requestError) {
      setError(requestError.response?.data?.message || '共同購入への申し込みに失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !isSubmitting) onClose();
  };

  return (
    <div className="group_buy_modal_backdrop" onMouseDown={handleBackdropClick}>
      <section className="group_buy_modal cart_group_buy_modal" role="dialog" aria-modal="true">
        <button
          type="button"
          className="group_buy_modal_close"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="閉じる"
        >
          ×
        </button>

        {isComplete ? (
          <div className="group_buy_modal_complete" role="status">
            <span>✓</span>
            <h2>申し込み完了</h2>
            <p>選択した共同購入への申し込みが完了しました。</p>
            <button type="button" onClick={onClose}>確認</button>
          </div>
        ) : (
          <>
            <header>
              <span className="group_buy_modal_badge">共同購入</span>
              <h2>申し込み内容の確認</h2>
              <p>カートで選択した商品を申し込みます。</p>
            </header>

            {isLoading ? (
              <p className="cart_group_buy_status">読み込み中...</p>
            ) : (
              <ul className="cart_group_buy_list">
                {products.map((product) => {
                  const progress = product.targetParticipants > 0
                    ? Math.min(product.currentParticipants / product.targetParticipants * 100, 100)
                    : 0;

                  return (
                    <li key={product.productId}>
                      <div className="cart_group_buy_name">
                        <strong>{product.name}</strong>
                        <span>{product.quantity}個 · ¥{(product.groupPriceValue * product.quantity).toLocaleString()}</span>
                      </div>
                      <div className="group_buy_modal_progress_bar">
                        <div style={{ width: `${progress}%` }} />
                      </div>
                      <div className="cart_group_buy_progress_text">
                        <span>参加状況</span>
                        <strong>{product.currentParticipants} / {product.targetParticipants}</strong>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="cart_group_buy_total">
              <span>お支払い予定額</span>
              <strong>¥{totalPrice.toLocaleString()}</strong>
            </div>

            {error && <p className="group_buy_modal_error" role="alert">{error}</p>}

            <div className="group_buy_modal_actions">
              <button type="button" className="cancel" onClick={onClose} disabled={isSubmitting}>
                キャンセル
              </button>
              <button
                type="button"
                className="confirm"
                onClick={handleConfirm}
                disabled={isLoading || isSubmitting || products.length === 0}
              >
                {isSubmitting ? '申し込み中...' : '共同購入を申し込む'}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default CartGroupBuyApplicationModal;
