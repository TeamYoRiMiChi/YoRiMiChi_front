import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/MyPage/GroupBuyParticipationStatus.css";
import useGroupBuyWithProgress from "../../../hooks/MyPage/GroupBuyParticipationStatus/useGroupBuyWithProgress";

function GroupBuyPartitionStatus() {
  const groupBuys = [
    {
      id: 31,
      title: '페스페 전권 공동구매',
      status: '모집중',
      statusType: 'ing',
      current: 12,
      target: 20,
      myQty: 2,
      endDate: '2026.09.05',
    },
    {
      id: 32,
      title: '虎屋羊羹',
      status: '목표달성',
      statusType: 'done',
      current: 10,
      target: 10,
      myQty: 5,
      endDate: '2026.08.18',
    },
  ];

  const { groupBuyWithProgress } = useGroupBuyWithProgress(groupBuys);

  if (groupBuyWithProgress.length === 0) {
    return (
      <div className="mp_panel">
        <div className="mp_empty">
          <div className="mp_empty_icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <p className="mp_empty_title">参加中の共同購入がありません</p>
          <p className="mp_empty_desc">
            共同購入に参加すると、ここで進行状況を確認できます。
          </p>
        </div>
      </div>
    );
  }

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
                style={{ width: `${gb.progress}%` }}
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
