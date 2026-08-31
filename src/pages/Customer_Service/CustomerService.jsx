import '../../assets/styles/CustomerService.css';
import supportImg from '../../assets/images/support_img.png';
import guideCat from '../../assets/images/guideCat.png';
import { faEnvelope, faComments, faPhone, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CustomerServiceCard from '../../components/CustomerService_components/CustomerServiceCard';


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
        {/* 메일 문의 */}
        <CustomerServiceCard
            icon={faEnvelope}
            title="メールでのお問い合わせ"
            description="24時間いつでもご利用いただけます。"
            subDescription="通常、1〜3営業日以内にご返信いたします。"
        />
        
        {/* 채팅 문의 */}
        <CustomerServiceCard
        icon={faComments}
        title="チャットでのお問い合わせ"
        description="チャットでお気軽にご相談いただけます。"
        subDescription="受付時間内にスタッフが対応いたします。"
        />

       {/* 전화 문의 */}
        <CustomerServiceCard
        icon={faPhone}
        title="電話でのお問い合わせ"
        description="お電話で直接ご相談いただけます。"
        subDescription="受付時間内にスタッフが対応いたします。"
        />

        {/* FAQ */}
        <CustomerServiceCard
        icon={faCircleQuestion}
        title="よくあるご質問（FAQ）"
        description="よくあるご質問と回答をご確認いただけます。"
        subDescription="お問い合わせの前にぜひご確認ください。"
        to="/faq"
        />
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