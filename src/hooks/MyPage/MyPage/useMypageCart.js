import { useEffect, useMemo, useState} from 'react';
import { getMypageCart} from '../../../api/MyPage/mypageCartApi';

function useMypageCart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        async function loadMypageCart() {
            try {
                const response = await getMypageCart();
                const list = response.data?.data ?? [];

                if (!ignore) {
                    setCartItems(Array.isArray(list) ? list : []);
                    setError(null);
                }
            } catch (err) {
                if (!ignore) {
                    setCartItems([]);
                    setError(
                        err.response?.data?.message ??
                        'カートの取得に失敗しました。'
                    );
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        loadMypageCart();

        return () => {
            ignore = true;
        };
    }, []);

    const totalPrice = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const price = Number(item.price ?? 0);
            const quantity = Number(item.qty ?? 0);

            return sum + price * quantity;
        }, 0);
    }, [cartItems]);

    return {
        cartItems,
        totalPrice,
        isLoading,
        error,
    };
}

export default useMypageCart;