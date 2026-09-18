import { useCallback, useEffect, useState } from 'react';
import {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  toAddressView,
  toAddressRequest,
} from '../../../api/MyPage/addressApi';
import { searchPostalCode, toPostalAddressView } from '../../../api/postalApi';

const EMPTY_FORM = {
  name: '',
  receiver: '',
  phone: '',
  zip: '',
  addr: '',
  detail: '',
};

/**
 * 마이페이지 - 배송지 관리 로직
 *
 * 새 배송지 추가/수정은 모달이 아니라, 목록 안에 카드 모양의 입력 폼이
 * 그 자리(추가는 맨 아래, 수정은 해당 카드 자리)에 펼쳐지는 형태입니다.
 */
export function useAddressManagement() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 새로 추가 중인지 / 어떤 배송지를 수정 중인지 */
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [settingDefaultId, setSettingDefaultId] = useState(null);
  const [isSearchingPostal, setIsSearchingPostal] = useState(false);

  /* 5개 넘으면 처음엔 5개만, "더보기" 누르면 전체 표시 */
  const [showAll, setShowAll] = useState(false);

  const loadAddresses = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await getMyAddresses();
      const list = res.data?.data ?? [];
      setAddresses(Array.isArray(list) ? list.map(toAddressView) : []);
      setError(null);
    } catch (err) {
      setAddresses([]);
      setError(err.response?.data?.message ?? '配送先の取得に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const handleChange = (field, value) => {
    setForm((cur) => ({ ...cur, [field]: value }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsAdding(true);
  };

  const openEditForm = (address) => {
    setIsAdding(false);
    setEditingId(address.id);
    setForm({
      name: address.name,
      receiver: address.receiver,
      phone: address.phone,
      zip: address.zip,
      addr: address.addr,
      detail: address.detail,
    });
  };

  const cancelForm = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const validate = () => {
    if (
      !form.name.trim() ||
      !form.receiver.trim() ||
      !form.phone.trim() ||
      !form.zip.trim() ||
      !form.addr.trim()
    ) {
      alert('배송지 정보를 모두 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setIsSaving(true);

    try {
      if (editingId) {
        await updateAddress(editingId, toAddressRequest(form));
      } else {
        await createAddress(toAddressRequest(form));
      }

      await loadAddresses();
      cancelForm();
    } catch (err) {
      alert(err.response?.data?.message ?? '配送先の保存に失敗しました。');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm('이 배송지를 삭제할까요?')) return;

    setDeletingId(addressId);

    try {
      await deleteAddress(addressId);
      await loadAddresses();
    } catch (err) {
      alert(err.response?.data?.message ?? '配送先の削除に失敗しました。');
    } finally {
      setDeletingId(null);
    }
  };

  /** 우편번호 입력칸의 값으로 zipcloud 검색 → 우편번호/주소 자동 채움 */
  const handleSearchPostal = async () => {
    const zipcode = form.zip.trim();

    if (!zipcode) {
      alert('우편번호를 입력해주세요.');
      return;
    }

    setIsSearchingPostal(true);

    try {
      const res = await searchPostalCode(zipcode);
      const found = res.data?.data?.[0];

      if (!found) {
        alert('해당 우편번호의 주소를 찾을 수 없습니다.');
        return;
      }

      const view = toPostalAddressView(found);
      setForm((cur) => ({
        ...cur,
        zip: view.zipcode || cur.zip,
        addr: view.fullAddress,
      }));
    } catch (err) {
      alert(
        err.response?.data?.message ?? '우편번호 검색에 실패했습니다.',
      );
    } finally {
      setIsSearchingPostal(false);
    }
  };

  const handleSetDefault = async (addressId) => {
    setSettingDefaultId(addressId);

    try {
      await setDefaultAddress(addressId);
      await loadAddresses();
    } catch (err) {
      alert(err.response?.data?.message ?? '基本配送先の変更に失敗しました。');
    } finally {
      setSettingDefaultId(null);
    }
  };

  return {
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
  };
}

export default useAddressManagement;
