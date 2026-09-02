import { useMemo } from "react";

// 카트 내 물건 총 금액 반환해줌
function useCart(cartItems) {
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + item.price * item.qty;
    }, 0);
  }, [cartItems]);

  return { totalPrice };
}

export default useCart;
