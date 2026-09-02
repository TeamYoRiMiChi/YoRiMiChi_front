import { useState } from 'react';

export function useFaq(faqData) {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 검색 결과
  const filteredFaqData = faqData.filter((faq) => {
    const keyword = searchKeyword.toLowerCase();

    return (
      faq.question.toLowerCase().includes(keyword) ||
      faq.answer.toLowerCase().includes(keyword)
    );
  });

  // 검색창 입력
  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  // 검색 버튼 클릭
  const handleSearch = () => {
    setSearchKeyword(searchText.trim());
  };

  // FAQ 답변 열기·닫기
  const handleToggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  // Faq.jsx에서 사용할 값과 함수
  return {
    openIndexes,
    searchText,
    filteredFaqData,
    handleSearchTextChange,
    handleSearch,
    handleToggle,
  };
}

export default useFaq;