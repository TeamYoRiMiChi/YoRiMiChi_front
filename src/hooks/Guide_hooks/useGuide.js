import { useState } from 'react';

export function useGuide(directSteps, groupSteps) {
  const [tab, setTab] = useState('direct');

  //  이용 단계
  const steps = tab === 'direct'
    ? directSteps
    : groupSteps;

  // 해외직송 탭 클릭
  const handleDirectTab = () => {
    setTab('direct');
  };

  // 공동구매 탭 클릭
  const handleGroupTab = () => {
    setTab('group');
  };

  return {
    tab,
    steps,
    handleDirectTab,
    handleGroupTab,
  };
}

export default useGuide;