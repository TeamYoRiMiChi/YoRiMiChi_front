import '../../assets/styles/Faq/Faq.css';
import { useFaq } from '../../hooks/Faq_hooks/useFaq';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import faqVisual from '../../assets/images/yomi_faq_logo.png';
import goSupport from '../../assets/images/goCustomer_Service.png';
import { Link } from 'react-router-dom';
import FaqItem from '../../components/Faq_components/FaqItem';


const faqData = [
  {
    question: '海外購入と共同購入の違いは何ですか？',
    answer:
      '海外購入はお客様が希望する商品を個別に購入するサービスです。共同購入は複数のお客様と一緒に商品を購入することで、よりお得な価格で購入できるサービスです。',
  },
  {
    question: '送料はいくらですか？',
    answer:
      '送料は商品の重量やサイズ、配送先によって異なります。正確な送料は注文画面でご確認いただけます。',
  },
  {
    question: 'どのような支払い方法が利用できますか？',
    answer:
      'クレジットカードなど、サービスで提供している各種決済方法をご利用いただけます。利用可能な決済方法は注文時にご確認ください。',
  },
  {
    question: '注文後にキャンセルできますか？',
    answer:
      '商品の購入手続きが完了する前であればキャンセルできる場合があります。購入完了後のキャンセルについては、注文状況をご確認のうえカスタマーセンターへお問い合わせください。',
  },
  {
    question: '商品はどのくらいで届きますか？',
    answer:
      '配送期間は商品や発送元によって異なります。海外から発送される商品の場合、通常の国内配送よりお時間がかかる場合があります。',
  },
  {
    question: '返品・交換はできますか？',
    answer:
      '商品に不良や破損がある場合は、商品の状態を確認したうえで返品・交換をご案内いたします。お客様都合による返品については条件が異なる場合があります。',
  },
  {
    question: '会員登録をしなくても利用できますか？',
    answer:
      '一部のサービスはご覧いただけますが、商品の購入や注文履歴の確認などの機能をご利用いただくには会員登録が必要です。',
  },
];
function Faq() {
   const {
              openIndexes,
              searchText,
              filteredFaqData,
              handleSearchTextChange,
              handleSearch,
              handleToggle,
            } = useFaq(faqData);
  return (
    <div className="faq_page">
      <section className="faq_hero">
        <div className="faq_hero_inner">

                <div className="faq_hero_text">
                    <h1>
                        よくあるご質問 <span>(FAQ)</span>
                    </h1>

                    <p>YOMI(よりみち)をご利用いただく際によくあるご質問と回答をまとめました。</p>
                    <p>ご不明な点がございましたら、こちらをご確認ください。</p>
                </div>

                <div className="faq_hero_visual">
                    <img src={faqVisual} alt="FAQ img" />
                </div>

        </div>
        </section>
        
        <section className="faq_search_section">
            <div className="faq_search_box">

    
                <div className="faq_search_input_wrap">

                    <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="faq_search_icon"/>

                    <input type="text" placeholder="キーワードで検索 （例：送料、支払い、キャンセル）"
                    value={searchText} onChange={handleSearchTextChange}/>

                </div>

                <button type="button" onClick={handleSearch}>
                    検索</button>

            </div>
        </section>
   
    {/* FAQ 질문 목록 */}
    <section className="faq_list">

        {filteredFaqData.map((faq, index) => (
        <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndexes.includes(index)}
            onToggle={() => handleToggle(index)}
        />
        ))}
    </section>
    {/* 문의 */}
    <section className="faq_contact">

    <div className="faq_contact_left">
            <div className="faq_contact_image">
                <img src={goSupport} alt="customer support cat" />
            </div>
            <div className="faq_contact_text">
                <h2>解決しない場合は、お気軽にお問い合わせください</h2>
                    <p>
                        お客様のお困りごとを迅速に解決するため、サポートチームが対応いたします。
                    </p>
            </div>
    </div>
       <Link to="/support" className="faq_contact_button"> お問い合わせ ➜</Link>
    </section>

    </div>
  );
}

export default Faq;
