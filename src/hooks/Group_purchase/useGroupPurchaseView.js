import { useState } from 'react';

export function useGroupPurchaseView() {
  // 현재 선택된 탭
  const [activeTab, setActiveTab] = useState('detail');

  // 탭 버튼을 눌렀을 때 실행
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return {
    activeTab,
    handleTabChange,
  };
}

export default useGroupPurchaseView;