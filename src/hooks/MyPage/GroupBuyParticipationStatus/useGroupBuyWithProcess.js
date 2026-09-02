import { useMemo } from "react";

// 공동구매 진행도 게산해서 공동구매 배열에 넣어서 반환해줌
function useGroupBuyWithProcess(groupBuys) {
  const groupBuyWithProcesse = useMemo(() => {
    return groupBuys.map((groupBuy) => ({
      ...groupBuy,
      progress: (groupBuy.current / groupBuy.target) * 100,
    }));
  }, [groupBuys]);

  return { groupBuyWithProcesse };
}

export default useGroupBuyWithProcess;
