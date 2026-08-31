import '../../../assets/styles/Group_purchase/purchase_status.css';

function Purchase_status() {


    return (
        <>
            {/* =========================
          my_purchase_status
      ========================= */}
            <div className="group_purchase_my">

                <div className="purchase_my_title_box">
                    <h4>私の共同購入状況</h4>

                    <button className="detail_btn">
                        詳細を見る
                    </button>
                </div>


                <div className="my_purchase_list">

                    <div className="my_purchase_1">
                        <div className="status_item">
                            <span className="status_icon">⌛</span>
                            <span className="status_title">進行中</span>
                            <strong>3</strong>
                        </div>
                    </div>


                    <div className="my_purchase_1">
                        <div className="status_item">
                            <span className="status_icon">💳</span>
                            <span className="status_title">入金待ち</span>
                            <strong>1</strong>
                        </div>
                    </div>


                    <div className="my_purchase_1">
                        <div className="status_item">
                            <span className="status_icon">📦</span>
                            <span className="status_title">発送準備中</span>
                            <strong>2</strong>
                        </div>
                    </div>


                    <div className="my_purchase_1">
                        <div className="status_item">
                            <span className="status_icon">🚚</span>
                            <span className="status_title">発送中</span>
                            <strong>1</strong>
                        </div>
                    </div>


                    <div className="my_purchase_1">
                        <div className="status_item">
                            <span className="status_icon">✓</span>
                            <span className="status_title">完了</span>
                            <strong>0</strong>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );

}





export default Purchase_status;