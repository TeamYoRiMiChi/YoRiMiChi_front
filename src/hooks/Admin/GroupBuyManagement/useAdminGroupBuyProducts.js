import { useEffect, useState } from "react";

import { getAdminProducts } from "../../../api/Admin/ProductManagement/adminProductApi";

// 공동구매 등록 폼의 상품 선택지: 이미 판매유형이 "공동구매"로 등록된 상품만 보여줍니다.
function useAdminGroupBuyProducts() {
  const [groupBuyProducts, setGroupBuyProducts] = useState([]);

  useEffect(() => {
    const loadGroupBuyProducts = async () => {
      try {
        const response = await getAdminProducts();
        const allProducts = response.data?.data ?? [];

        setGroupBuyProducts(
          allProducts.filter((product) => product.saleType === "GROUP_BUY"),
        );
      } catch {
        setGroupBuyProducts([]);
      }
    };

    loadGroupBuyProducts();
  }, []);

  return {
    groupBuyProducts,
  };
}

export default useAdminGroupBuyProducts;
