import '../../assets/styles/Faq/Faq.css';
import { useFaq } from '../../hooks/Faq_hooks/useFaq';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import faqVisual from '../../assets/images/yomi_faq_logo.png';
import goSupport from '../../assets/images/goCustomer_Service.png';
import { Link } from 'react-router-dom';
import FaqItem from '../../components/Faq_components/FaqItem';
import { faqData } from '../../data/Faq_data/faqData';


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
