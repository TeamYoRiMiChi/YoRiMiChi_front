import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/MyPage/MyReview.css";

function MyReview({ myReviews }) {
  return (
    <div className="mp_panel">
      {myReviews.map((rv) => (
        <div className="review_card" key={rv.id}>
          <div className="review_head">
            <div>
              <p className="review_product">{rv.product}</p>
              <div className="review_stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <FontAwesomeIcon
                    key={n}
                    icon={faStar}
                    className={n <= rv.rating ? "on" : ""}
                  />
                ))}
              </div>
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
          <p className="review_content">{rv.content}</p>
          <span className="review_date">{rv.date}</span>
        </div>
      ))}
    </div>
  );
}

export default MyReview;
