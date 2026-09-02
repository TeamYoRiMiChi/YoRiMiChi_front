import { useRef, useState } from 'react';

export function usePurchaseProductCard() {

    // 변수명 지정
    const listRef = useRef(null);
    const [showMore, setShowMore] = useState(false);
    const handleMore = () => {
        // console.log('more clicked');
        setShowMore(!showMore);
    };

    // 내보낼 변수
    return ({ listRef, showMore, handleMore })
};

export default usePurchaseProductCard;

