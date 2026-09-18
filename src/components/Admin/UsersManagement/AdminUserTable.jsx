import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBan,
    faRotateRight,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

function AdminUserTable({
    pagedMembers,
    selectedIds,
    isAllSelected,
    handleSelectAll,
    handleSelectItem,
    handleStatusChange,
    formatDate,
}) {
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
                  회원 정보
                </th>

                <th>
                  회원 ID
                </th>

                <th>
                  전화번호
                </th>

                <th>
                  권한
                </th>

                <th>
                  회원 상태
                </th>

                <th>
                  탈퇴일
                </th>

                <th>
                  관리
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
                        checked={
                          selectedIds.includes(
                            member.memberId
                          )
                        }
                        onChange={() =>
                          handleSelectItem(
                            member.memberId
                          )
                        }
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

                      <span
                        className={
                          member.role ===
                          "ADMIN"
                            ? "am-role-badge am-role-admin"
                            : "am-role-badge am-role-user"
                        }
                      >

                        {member.role ===
                        "ADMIN"
                          ? "관리자"
                          : "일반 회원"}

                      </span>

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
                          ? "정상"
                          : "탈퇴"}

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

                      {member.status ===
                      "ACTIVE" ? (

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

                          탈퇴 처리

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

                          복구

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

                    조건에 맞는
                    회원이 없습니다.

                  </td>

                </tr>

              )}


            </tbody>


          </table>

        </div>
    );
}

export default AdminUserTable;