import { useRef, useState } from 'react';


export function useGroupPurchase() {
 const listRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState('すべて');

    const handleFilterClick = (filter) => {
     
        setActiveFilter(filter);

    };
return({ listRef, activeFilter, handleFilterClick })





}; export default useGroupPurchase;