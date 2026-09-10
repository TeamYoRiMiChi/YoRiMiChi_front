import '../../assets/styles/Group_purchase/group_purchase.css';

import Hero_slide from '../../components/common/Hero_slide';
import Purchase_status from '../../components/Group_purchase/Purchase_status';
import Purchase_product_card from '../../components/Group_purchase/Purchase_product_card';
import { heroSlides } from '../../data/Group_purchase/Group_purchase';
import useGroupPurchase from '../../hooks/Group_purchase/useGroup_purchase';
function GroupPurchase() {




    const {
        page,
        setPage,
        totalPages,

        activeFilter,
        categories,
        products,
        listRef,
        selectedCategoryId,
        selectedSort,
        handleFilterClick,
        handleCategoryChange,
        handleSortChange,
        handleSearch,
    } = useGroupPurchase();


const handlePageChange = (nextPage) => {
    setPage(nextPage);

    if (listRef.current) {
        const top =
            listRef.current.getBoundingClientRect().top
            + window.scrollY
            - 50;

        window.scrollTo({
            top,
            behavior: 'smooth',
        });
    }
};


    return (
        <>

            <div className="group_purchase_container">

                <Hero_slide slides={heroSlides} />

                <Purchase_status />



                {/* =========================
         search/filter
      ========================= */}
                <div className="group_purchase_search" ref={listRef}>

                    <div className="filter_left">
                        {['すべて', '進行中', '締切間近', '完了'].map((filter) => (
                            <button
                                key={filter}
                                className={activeFilter === filter
                                    ? 'filter_btn active'
                                    : 'filter_btn'
                                }
                                onClick={() => handleFilterClick(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>


                    <div className="filter_right">

                        <select
                            className="filter_select"
                            value={selectedCategoryId}
                            onChange={handleCategoryChange}
                        >
                            <option value="">すべてのカテゴリー</option>

                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className="filter_select"
                            name="sort"
                            value={selectedSort}
                            onChange={handleSortChange}
                        >
                            <option value="newest">新着順</option>
                            <option value="popular">人気順</option>
                            <option value="priceAsc">価格順</option>
                        </select>

                        





                    </div>

                </div>


                {/* product card */}

                <Purchase_product_card activeFilter={activeFilter} products={products} />
                {/* =========================
         purchase_footer_1
      ========================= */}
             <div className="pagination">
    <button
        className="page_btn"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
    >
        前へ
    </button>

    {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
            <button
                key={pageNumber}
                className={
                    page === pageNumber
                        ? 'page_btn active'
                        : 'page_btn'
                }
                onClick={() => handlePageChange(pageNumber)}
            >
                {pageNumber}
            </button>
        );
    })}

    <button
        className="page_btn"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
    >
        次へ
    </button>
</div>

                <div className="purchase_footer_1">

                    <h2 className="footer_title">
                        共同購入の進め方
                    </h2>


                    <div className="footer_list">

                        <div className="footer_content">

                            <span className="step_number">
                                01
                            </span>

                            <div className="step_text">
                                <h3>商品を選ぶ</h3>
                                <p>
                                    気になる商品を見つけて
                                    詳細を確認します。
                                </p>
                            </div>

                        </div>


                        <div className="footer_content">

                            <span className="step_number">
                                02
                            </span>

                            <div className="step_text">
                                <h3>参加する</h3>
                                <p>
                                    目標人数に達するまで
                                    参加者を待ちます。
                                </p>
                            </div>

                        </div>


                        <div className="footer_content">

                            <span className="step_number">
                                03
                            </span>

                            <div className="step_text">
                                <h3>決済する</h3>
                                <p>
                                    成立したらメールでお知らせ。
                                    決済を行います。
                                </p>
                            </div>

                        </div>


                        <div className="footer_content">

                            <span className="step_number">
                                04
                            </span>

                            <div className="step_text">
                                <h3>商品を受け取る</h3>
                                <p>
                                    日本国内から発送され、
                                    ご自宅にお届けします。
                                </p>
                            </div>

                        </div>

                    </div>

                </div>



                {/* =========================
          purchase_footer_2
      ========================= */}
                <div className="purchase_footer_2">

                    <h2 className="footer_title">
                        YOMIの共同購入が選ばれる理由
                    </h2>


                    <div className="footer_list">

                        <div className="benefit_content">

                            <div className="benefit_icon">
                                %
                            </div>

                            <div>
                                <h3>最大50%OFF</h3>
                                <p>
                                    一緒に買うことで
                                    お得な価格を実現！
                                </p>
                            </div>

                        </div>


                        <div className="benefit_content">

                            <div className="benefit_icon">
                                ↗
                            </div>

                            <div>
                                <h3>進捗が見える</h3>
                                <p>
                                    リアルタイムで進捗状況を
                                    確認できます。
                                </p>
                            </div>

                        </div>


                        <div className="benefit_content">

                            <div className="benefit_icon">
                                ✓
                            </div>

                            <div>
                                <h3>安心・安全取引</h3>
                                <p>
                                    安全な決済システムで
                                    安心して利用できます。
                                </p>
                            </div>

                        </div>


                        <div className="benefit_content">

                            <div className="benefit_icon">
                                🚚
                            </div>

                            <div>
                                <h3>日本国内配送</h3>
                                <p>
                                    国内からの発送で
                                    早くて確実にお届け。
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </>
    );
}

export default GroupPurchase;
