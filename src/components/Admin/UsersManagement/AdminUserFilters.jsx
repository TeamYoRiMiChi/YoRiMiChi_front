import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

function AdminUserFilters({
    keyword,
    roleFilter,
    statusFilter,
    onKeywordChange,
    onRoleFilterChange,
    onStatusFilterChange,
    onReset,
}) {
    return (
        <div className="am-filter-bar">
            <label className="am-search-box">
                <FontAwesomeIcon icon={faMagnifyingGlass} />

                <input
                    type="search"
                    value={keyword}
                    placeholder="氏名・メール・電話番号・会員IDで検索"
                    onChange={(event) => onKeywordChange(event.target.value)}/>
            </label>

            <div className="am-filter-item">
                <span>権限</span>

                <select 
                    value={roleFilter}
                    onChange={(event) => onRoleFilterChange(event.target.value)}>
                    <option value="">すべて</option>
                    <option value="USER">一般会員</option>
                    <option value="ADMIN">管理者</option>
                </select>
            </div>

            <div className="am-filter-item">
                <span>会員状態</span>

                <select
                    value={statusFilter}
                    onChange={(event) => onStatusFilterChange(event.target.value)}>
                    <option value="">すべて</option>
                    <option value="ACTIVE">有効</option>
                    <option value="WITHDRAWN">退会</option>
                </select>
            </div>

            <button
                className="am-reset-button"
                type="button"
                onClick={onReset}
            >
                <FontAwesomeIcon icon={faRotateRight} />
                リセット
            </button>
        </div>
    );
}

export default AdminUserFilters;