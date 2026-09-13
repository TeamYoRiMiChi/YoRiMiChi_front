//AdminProducts.훅
import { useMemo, useState } from "react";

function getDisplayedStatus(product) {
  if (product.status === "HIDDEN") {
    return "HIDDEN";
  }

  if (
    product.status === "SOLD_OUT" ||
    product.stock <= 0
  ) {
    return "SOLD_OUT";
  }

  return "ACTIVE";
}

function useProductFilter(products, setPage) {
  const [keyword, setKeyword] = useState("");
  const [saleType, setSaleType] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const keywordMatches =
        !normalizedKeyword ||
        product.productName
          .toLowerCase()
          .includes(normalizedKeyword) ||
        product.productNameJp
          .toLowerCase()
          .includes(normalizedKeyword) ||
        product.brand
          .toLowerCase()
          .includes(normalizedKeyword);

      const saleTypeMatches =
        !saleType ||
        product.saleType === saleType;

      const categoryMatches =
        !categoryId ||
        product.categoryId === Number(categoryId);

      const statusMatches =
        !status ||
        getDisplayedStatus(product) === status;

      return (
        keywordMatches &&
        saleTypeMatches &&
        categoryMatches &&
        statusMatches
      );
    });
  }, [
    products,
    keyword,
    saleType,
    categoryId,
    status,
  ]);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    setPage(1);
  };

  const handleSaleTypeChange = (event) => {
    setSaleType(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleReset = () => {
    setKeyword("");
    setSaleType("");
    setCategoryId("");
    setStatus("");
    setPage(1);
  };

  return {
    keyword,
    saleType,
    categoryId,
    status,
    filteredProducts,
    handleKeywordChange,
    handleSaleTypeChange,
    handleCategoryChange,
    handleStatusChange,
    handleReset,
    getDisplayedStatus,
  };
}

export default useProductFilter;