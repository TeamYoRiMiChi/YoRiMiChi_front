import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faRotateRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function AdminUserTable({
  pagedMembers,
  selectedIds,
  isAllSelected,
  handleSelectAll,
  handleSelectItem,
  handleStatusChange,
  handleDemoteAdmin,
  formatDate,
  currentMemberId,
}) {
  const [openRoleMemberId, setOpenRoleMemberId] = useState(null);
  return (
    <div className="am-table-scroll">

      <table className="am-table">


        <thead>

          <tr>

            <th className="am-checkbox-cell">

              <input
                type="checkbox"
                checked={
                  isAllSelected
                }
                onChange={
                  handleSelectAll
                }
              />

            </th>


            <th>
              会員情報
            </th>

            <th>
              会員ID
            </th>

            <th>
              電話番号
            </th>

            <th>
              権限
            </th>

            <th>
              会員状態
            </th>

            <th>
              退会日
            </th>

            <th>
              管理
            </th>

          </tr>

        </thead>



        <tbody>


          {pagedMembers.map(
            (member) => (

              <tr
                key={
                  member.memberId
                }
              >


                <td className="am-checkbox-cell">

                  <input
                    type="checkbox"
                    disabled={
                      currentMemberId == null ||
                      String(member.memberId) === String(currentMemberId)
                    }
                    checked={selectedIds.includes(member.memberId)}
                    onChange={() => handleSelectItem(member.memberId)}
                  />

                </td>



                {/* 회원 정보 */}

                <td>

                  <div className="am-member-info">


                    <div className="am-avatar">

                      <FontAwesomeIcon
                        icon={faUser}
                      />

                    </div>


                    <div>

                      <strong>
                        {member.name}
                      </strong>

                      <span>
                        {member.email}
                      </span>

                    </div>


                  </div>

                </td>



                <td>

                  <strong className="am-member-id">

                    {member.memberId}

                  </strong>

                </td>



                <td>

                  <span className="am-phone">

                    {member.phone}

                  </span>

                </td>

                {/* 권한 */}
                
                <td>
                  {member.role === "ADMIN" ? (
                    <span className="am-role-control">
                      <button
                        type="button"
                        className="am-role-badge am-role-admin am-role-button"
                        onClick={() =>
                          setOpenRoleMemberId((previousId) =>
                            previousId === member.memberId
                              ? null
                              : member.memberId
                          )
                        }
                      >
                        管理者
                      </button>

                      {openRoleMemberId === member.memberId && (
                        <span className="am-role-popover">
                          {currentMemberId != null &&
                            String(member.memberId) ===
                            String(currentMemberId) ? (
                            <span>自分の管理者権限は変更できません。</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setOpenRoleMemberId(null);
                                handleDemoteAdmin(member.memberId);
                              }}
                            >
                              一般会員に変更
                            </button>
                          )}
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="am-role-badge am-role-user">
                      一般会員
                    </span>
                  )}
                </td>



                {/* 상태 */}

                <td>

                  <span
                    className={
                      member.status ===
                        "ACTIVE"
                        ? "am-status-badge am-status-active"
                        : "am-status-badge am-status-withdrawn"
                    }
                  >

                    {member.status ===
                      "ACTIVE"
                      ? "有効"
                      : "退会"}

                  </span>

                </td>



                {/* 탈퇴일 */}

                <td>

                  <span className="am-date">

                    {formatDate(
                      member.withdrawnAt
                    )}

                  </span>

                </td>



                {/* 관리 */}

                <td>

                  {member.memberId === currentMemberId ? (
                    <span className="am-self-action-note">
                      本人は変更できません
                    </span>) : member.status === "ACTIVE" ? (

                      <button
                        type="button"
                        className="am-withdraw-button"
                        onClick={() =>
                          handleStatusChange(
                            member.memberId,
                            "INACTIVE"
                          )
                        }
                      >

                        <FontAwesomeIcon
                          icon={faBan}
                        />

                        退会処理

                      </button>

                    ) : (

                    <button
                      type="button"
                      className="am-restore-button"
                      onClick={() =>
                        handleStatusChange(
                          member.memberId,
                          "ACTIVE"
                        )
                      }
                    >

                      <FontAwesomeIcon
                        icon={faRotateRight}
                      />

                      復元

                    </button>

                  )}

                </td>


              </tr>

            )
          )}



          {pagedMembers.length ===
            0 && (

              <tr>

                <td
                  colSpan={8}
                  className="am-empty"
                >

                  条件に一致する会員がいません。

                </td>

              </tr>

            )}


        </tbody>


      </table>

    </div>
  );
}

export default AdminUserTable;