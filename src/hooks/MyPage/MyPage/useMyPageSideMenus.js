import { useState } from "react";

// MyPage.jsx에서 onclick할 때 key값이 들어오면
// key의 값으로 menu를 변경시키고 거기에 맞는 label값을 반환
function useMyPageSideMenus(menuGroups, initialMenu = "orders") {
  const validMenu = menuGroups
    .flatMap((group) => group.items)
    .some((item) => item.key === initialMenu)
    ? initialMenu
    : "orders";
  const [menu, setMenu] = useState(validMenu);

  const currentLabel = menuGroups
    .flatMap((group) => group.items)
    .find((item) => item.key === menu)?.label;

  return { menu, setMenu, currentLabel };
}

export default useMyPageSideMenus;
