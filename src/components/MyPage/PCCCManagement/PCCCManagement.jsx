import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function PCCCManagement() {
  return (
    <div className="mp_panel">
      <div className="mp_tip">
        <FontAwesomeIcon icon={faCircleInfo} />
        <p>
          해외직구 상품은 통관 시 개인통관고유부호가 반드시 필요해요. 관세청
          홈페이지에서 무료로 발급받을 수 있습니다.
        </p>
      </div>

      <form className="form_box">
        <div className="form_row">
          <label>개인통관고유부호</label>
          <input
            type="text"
            defaultValue="P123456789012"
            placeholder="P로 시작하는 13자리"
          />
          <span className="form_hint">주문서 작성 시 자동으로 입력됩니다</span>
        </div>

        <a
          className="text_link"
          href="https://unipass.customs.go.kr"
          target="_blank"
          rel="noreferrer"
        >
          관세청에서 발급받기 <FontAwesomeIcon icon={faChevronRight} />
        </a>

        <button type="submit" className="wide_bt">
          저장하기
        </button>
      </form>
    </div>
  );
}

export default PCCCManagement;
