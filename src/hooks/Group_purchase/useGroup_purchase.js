import { useRef, useState, useEffect } from 'react';
import { getGpCategories } from '../../api/Group_purchase/categoryPurchaseApi';
import { getProducts, toProductView } from '../../api/productApi';



export function useGroupPurchase(fallback = []) {
    const listRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState('すべて');
    const [categories, setCategories] = useState(fallback);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSort, setSelectedSort] = useState('newest');
    const [products, setProducts] = useState([]);

    const handleFilterClick = (filter) => {

        setActiveFilter(filter);

    };

    const handleCategoryChange = (event) => {
        setSelectedCategoryId(event.target.value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    const handleSearch = () => {
        const searchCondition = {
            status: activeFilter,
            categoryId: selectedCategoryId,
            sort: selectedSort,
        };

        console.log('검색 조건:', searchCondition);
    };

    useEffect(() => {
        let ignore = false; // 컴포넌트가 사라진 뒤 setState 하는 걸 막습니다

        async function load() {
            try {
                const res = await getGpCategories();

                // 서버 응답: { success, data: [...], message }
                const list = res.data.data ?? [];
                // DB 값 + 화면용 아이콘을 합칩니다
                const withIcons = list.map((c) => ({
                    id: c.id,
                    name: c.name,
                }));

                // console.log('list', withIcons);
                if (!ignore) {
                    setCategories(withIcons);
                    setError(null);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.response?.data?.message ?? 'カテゴリの取得に失敗しました。');
                    setCategories(fallback); // 실패해도 화면은 보이도록
                }
            } finally {
                if (!ignore) setIsLoading(false);
            }
        }

        load();

        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    //공동구매 화면이 백엔드 상품 api에 보내는조건
    useEffect(() => {
        async function loadProducts() {
            try {
                const res = await getProducts({
                    categoryId: selectedCategoryId
                    ? Number(selectedCategoryId) 
                    : undefined,
                    // 공동구매 화면에서 선택한 정렬값을 전송합니다.
                    // newest, popular, priceAsc 중 하나가 들어갑니다
                    sort: selectedSort,
                    page: 1,
                    size: 50,
                  
                });
                const pageData = res.data.data;
                const productList = (pageData.content ??[]).map(toProductView);
               
                setProducts(productList);
            }catch (err) {
                console.error('상품 조회 실패:', err);
                setProducts([]);
            }
        }

        loadProducts();
    },[selectedCategoryId, selectedSort]);





    return {
        products,
        listRef,
        activeFilter,
        categories,
        isLoading,
        error,

        selectedCategoryId,
        selectedSort,

        handleFilterClick,
        handleCategoryChange,
        handleSortChange,
        handleSearch,
    };





}; export default useGroupPurchase;