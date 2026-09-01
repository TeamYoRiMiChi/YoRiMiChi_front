import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function AddressManagement({ addresses }) {
  return (
    <div className="mp_panel">
      {addresses.map((address) => (
        <div
          className={`addr_card ${address.isDefault ? "default" : ""}`}
          key={address.id}
        >
          <div className="addr_head">
            <div className="addr_name">
              {address.name}
              {address.isDefault && (
                <span className="addr_tag">기본 배송지</span>
              )}
            </div>
            <div className="review_btns">
              <button className="icon_bt">
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button className="icon_bt">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
          <p className="addr_receiver">
            {address.receiver} · {address.phone}
          </p>
          <p className="addr_text">
            ({address.zip}) {address.addr} {address.detail}
          </p>
        </div>
      ))}

      <button className="wide_bt wide_bt_line">+ 새 배송지 추가</button>
    </div>
  );
}

export default AddressManagement;
