import "../../../assets/styles/MyPage/GroupBuyParticipationStatus.css";
import useGroupBuyWithProcess from "../../../hooks/MyPage/GroupBuyParticipationStatus/useGroupBuyWithProcess";

function GroupBuyPartitionStatus({ groupBuys }) {
  const { groupBuyWithProgress } = useGroupBuyWithProcess(groupBuys);
  return (
    <div className="mp_panel">
      {groupBuyWithProgress.map((gb) => (
        <div className="gb_card" key={gb.id}>
          <div className="gb_head">
            <h4>{gb.title}</h4>
            <span className={`badge badge_${gb.statusType}`}>{gb.status}</span>
          </div>

          <div className="gb_progress">
            <div className="gb_bar">
              <div
                className="gb_bar_fill"
                style={{ width: `${gb.progress * 100}%` }}
              />
            </div>
            <span className="gb_count">
              {gb.current} / {gb.target}개
            </span>
          </div>

          <div className="gb_foot">
            <span>
              내 참여 수량 <strong>{gb.myQty}개</strong>
            </span>
            <span className="gb_date">마감 {gb.endDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupBuyPartitionStatus;
