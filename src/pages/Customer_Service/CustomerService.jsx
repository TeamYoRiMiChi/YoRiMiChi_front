import '../../assets/styles/CustomerService.css';
import supportImg from '../../assets/images/support_img.png';
import guideCat from '../../assets/images/guideCat.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faComments, faPhone, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



function CustomerService() {
  return (
    <div className="customer_service_page">

      {/* 상단 */}
      <section className="customer_service_hero">

        <div className="customer_service_hero_inner">

          {/* 왼쪽 설명 */}
          <div className="customer_service_hero_text">
            <h1>カスタマーサポート</h1>

            <p>ご不明な点がございましたら、</p>
            <p>こちらからお気軽にお問い合わせください。</p>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="customer_service_hero_visual">
            <img src={supportImg} alt="Customer Support" />
          </div>

        </div>
        

      </section>
      {/* 문의 */}
    <section className="customer_service_contact">

        <div className="customer_service_contact_header">
            <h2>お問い合わせ</h2>

            <p>
            ご質問・ご相談などがございましたら、
            以下の方法からお問い合わせください。
            </p>
        </div>
        <div className="customer_service_cards">
        <div className="customer_service_card">
            {/* 이메일 */}
            <div className="customer_service_card_icon">
                <FontAwesomeIcon icon={faEnvelope} />
            </div>

            <div className="customer_service_card_text">
                <h3>メールでのお問い合わせ</h3>
                    <p>24時間いつでもご利用いただけます。</p>
                    <p>通常、1〜3営業日以内にご返信いたします。</p>
            </div>

            <div className="customer_service_card_arrow">
                ›
            </div>

        </div>
        
        <div className="customer_service_card">
            {/* 말풍성 */}
            <div className="customer_service_card_icon">
                <FontAwesomeIcon icon={faComments} />
            </div>

            <div className="customer_service_card_text">
                <h3>チャットでのお問い合わせ</h3>
                    <p>チャットでお気軽にご相談いただけます。</p>
                    <p>受付時間内にスタッフが対応いたします。</p>
            </div>

            <div className="customer_service_card_arrow">
                ›
            </div>

        </div>

        <div className="customer_service_card">
            <div className="customer_service_card_icon">
                <FontAwesomeIcon icon={faPhone} />
            </div>

            <div className="customer_service_card_text">
                <h3>電話でのお問い合わせ</h3>
                    <p>お電話で直接ご相談いただけます。</p>
                    <p>受付時間内にスタッフが対応いたします。</p>
            </div>

            <div className="customer_service_card_arrow">
                ›
            </div>
        </div>

        <Link to="/faq" className="customer_service_card customer_service_card_link">
            {/* FAQ */}
            <div className="customer_service_card_icon">
             <FontAwesomeIcon icon={faCircleQuestion} />
            </div>

            <div className="customer_service_card_text">
                <h3>よくあるご質問（FAQ）</h3>
                    <p>よくあるご質問と回答をご確認いただけます。</p>
                    <p>お問い合わせの前にぜひご確認ください。</p>
            </div>

            <div className="customer_service_card_arrow">
                ›
            </div>
        </Link>
    </div>
    {/* 이용 가이드 안내 */}
    <div className="customer_service_notice">

    <div className="customer_service_notice_left">

        <div className="customer_service_notice_image">
            {/* 제가 그린거 아닙니다  */}
            <img src={guideCat} alt="guideCat" />
        </div>

            <div className="customer_service_notice_text">
            <h3>ご利用ガイド</h3>
            <p>
                YOMIのご利用方法について詳しくご案内しています。
                初めてご利用の方はこちらをご確認ください。
            </p>
            </div>
        </div>

        <Link to="/guide" className="customer_service_notice_button"> ご利用ガイドを見る➜  </Link>

    </div>

    </section>

    

    </div>
  );
}

export default CustomerService;