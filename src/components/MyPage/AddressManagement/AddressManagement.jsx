import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/styles/MyPage/AddressManagement.css';
import useAddressManagement from '../../../hooks/MyPage/AddressManagement/useAddressManagement';

/** 새 배송지 추가 / 수정 폼 — 목록 안에 카드 모양으로 펼쳐집니다 (모달 아님) */
function AddressForm({
  title,
  form,
  onChange,
  onCancel,
  onSave,
  isSaving,
  onSearchPostal,
  isSearchingPostal,
}) {
  return (
    <div className="addr_card addr_card_new">
      <div className="addr_head">
        <div className="addr_name">{title}</div>
      </div>

      <div className="addr_form_grid">
        <label className="addr_form_field">
          <span>배송지 별명</span>
          <input
            className="addr_input"
            placeholder="예: 家"
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </label>

        <label className="addr_form_field">
          <span>받는 분</span>
          <input
            className="addr_input"
            placeholder="받는 분 성함"
            value={form.receiver}
            onChange={(e) => onChange('receiver', e.target.value)}
          />
        </label>

        <label className="addr_form_field">
          <span>연락처</span>
          <input
            className="addr_input"
            placeholder="010-1234-5678"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </label>

        <label className="addr_form_field">
          <span>우편번호</span>
          <div className="addr_postal_row">
            <input
              className="addr_input"
              placeholder="111-0053"
              value={form.zip}
              onChange={(e) => onChange('zip', e.target.value)}
            />
            <button
              type="button"
              className="addr_postal_search_bt"
              onClick={onSearchPostal}
              disabled={isSearchingPostal}
            >
              {isSearchingPostal ? '검색 중...' : '우편번호 검색'}
            </button>
          </div>
        </label>

        <label className="addr_form_field addr_form_field_wide">
          <span>주소</span>
          <input
            className="addr_input"
            placeholder="우편번호 검색을 누르면 자동으로 채워집니다"
            value={form.addr}
            onChange={(e) => onChange('addr', e.target.value)}
          />
        </label>

        <label className="addr_form_field addr_form_field_wide">
          <span>상세 주소</span>
          <input
            className="addr_input"
            placeholder="四丁目1-1"
            value={form.detail}
            onChange={(e) => onChange('detail', e.target.value)}
          />
        </label>
      </div>

      <div className="addr_form_actions">
        <button
          className="addr_form_bt addr_form_bt_ghost"
          onClick={onCancel}
          disabled={isSaving}
        >
          취소
        </button>
        <button
          className="addr_form_bt addr_form_bt_primary"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
}

/* 한 번에 보여줄 최대 개수 — 넘으면 "더보기"로 접어둡니다 */
const VISIBLE_COUNT = 5;

function AddressManagement() {
  const {
    addresses,
    isLoading,
    error,

    isAdding,
    editingId,
    form,
    handleChange,
    openAddForm,
    openEditForm,
    cancelForm,
    handleSave,
    isSaving,

    handleDelete,
    deletingId,

    handleSearchPostal,
    isSearchingPostal,

    handleSetDefault,
    settingDefaultId,

    showAll,
    setShowAll,
  } = useAddressManagement();

  const visibleAddresses = showAll
    ? addresses
    : addresses.slice(0, VISIBLE_COUNT);
  const hiddenCount = addresses.length - visibleAddresses.length;

  return (
    <div className="mp_panel">
      {isLoading && (
        <p className="addr_status addr_status_loading">読み込み中です...</p>
      )}

      {!isLoading && error && (
        <p className="addr_status addr_status_error">{error}</p>
      )}

      {!isLoading && !error && (
        <>
          {addresses.length === 0 && !isAdding && (
            <p className="addr_empty">登録された配送先がありません。</p>
          )}

          {visibleAddresses.map((address) =>
            editingId === address.id ? (
              <AddressForm
                key={address.id}
                title="배송지 수정"
                form={form}
                onChange={handleChange}
                onCancel={cancelForm}
                onSave={handleSave}
                isSaving={isSaving}
                onSearchPostal={handleSearchPostal}
                isSearchingPostal={isSearchingPostal}
              />
            ) : (
              <div
                className={`addr_card ${address.isDefault ? 'default' : ''}`}
                key={address.id}
              >
                <div className="addr_head">
                  <div className="addr_name">
                    {address.name}
                    {address.isDefault ? (
                      <span className="addr_tag">기본 배송지</span>
                    ) : (
                      <button
                        type="button"
                        className="addr_default_bt"
                        onClick={() => handleSetDefault(address.id)}
                        disabled={settingDefaultId === address.id}
                      >
                        {settingDefaultId === address.id
                          ? '변경 중...'
                          : '기본으로 설정'}
                      </button>
                    )}
                  </div>
                  <div className="review_btns">
                    <button
                      className="icon_bt"
                      onClick={() => openEditForm(address)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className="icon_bt"
                      onClick={() => handleDelete(address.id)}
                      disabled={deletingId === address.id}
                    >
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
            ),
          )}

          {!showAll && hiddenCount > 0 && (
            <button
              type="button"
              className="wide_bt wide_bt_line"
              onClick={() => setShowAll(true)}
            >
              더보기 (+{hiddenCount})
            </button>
          )}

          {isAdding && (
            <AddressForm
              title="새 배송지 추가"
              form={form}
              onChange={handleChange}
              onCancel={cancelForm}
              onSave={handleSave}
              isSaving={isSaving}
              onSearchPostal={handleSearchPostal}
              isSearchingPostal={isSearchingPostal}
            />
          )}

          {!isAdding && !editingId && (
            <button className="wide_bt wide_bt_line" onClick={openAddForm}>
              + 새 배송지 추가
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default AddressManagement;
