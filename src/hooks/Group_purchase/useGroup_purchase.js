import { useRef, useState, useEffect } from 'react';
import { getGpCategories } from '../../api/Group_purchase/categoryPurchaseApi';
import { getGroupBuyProducts } from '../../api/Group_purchase/groupBuyProductApi';
import { toProductView } from '../../api/productApi';


const FILTER_MAP = {
    'すべて': '',
    '進行中': 'ACTIVE',
    '締切間近': 'CLOSING_SOON',
    '完了': 'SUCCESS'


};

export function useGroupPurchase(fallback = []) {
    const listRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState('すべて');
    const [categories, setCategories] = useState(fallback);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSort, setSelectedSort] = useState('newest');
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);






    const handleFilterClick = (filter) => {

        setActiveFilter(filter);
        setPage(1); // 필터 변경 시 페이지를 1로 초기화

    };

    const handleCategoryChange = (event) => {
        setSelectedCategoryId(event.target.value);
        setPage(1); // 카테고리 변경 시 페이지를 1로 초기화
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
        setPage(1); // 정렬 변경 시 페이지를 1로 초기화
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
        let ignore = false; // 컴포넌트가 사라진 뒤 setState 하는 걸 막기

        async function load() {
            try {
                const res = await getGpCategories();

                // 서버 응답: { success, data: [...], message }
                const list = res.data.data ?? [];
                // DB 값 + 화면용 아이콘을 합
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
                // 서버가 saleType을 GROUP_BUY로 고정하므로 따로 보내지 않습니다
                const res = await getGroupBuyProducts({
                    status: FILTER_MAP[activeFilter] || undefined,
                    categoryId: selectedCategoryId
                        ? Number(selectedCategoryId)
                        : undefined,

                    sort: selectedSort,
                    page,
                    size: 8,
                });
                const pageData = res.data.data;
                const productList = (pageData.content ?? []).map(toProductView);
                console.log('pageData 전체:', pageData);
                console.log('상품 조회 성공:', productList);
                console.log('전체 페이지 수:', pageData.totalPages);
                console.log('현재 페이지:', pageData.page);
                setProducts(productList);
                setTotalPages(pageData.totalPages);
            } catch (err) {
                console.error('상품 조회 실패:', err);
                setProducts([]);
            }
        }

        loadProducts();
    }, [selectedCategoryId, selectedSort, activeFilter, page]);





    return {
        products,
        page,
        setPage,
        totalPages,


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
