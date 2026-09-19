import { useEffect, useMemo, useState } from "react";
import { getAdminMembers, updateAdminMemberStatus } from "../../../api/Admin/UsersManagement/adminMemberApi";

function useAdminUsers() {
  const [members, setMembers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    let active = true;

    getAdminMembers()
      .then((response) => {
        if (active) {
          setMembers(response.data.data ?? []);
        }
      })
      .catch((error) => {
        if (active) {
          console.error("会員一覧の取得に失敗しました。", error);
          setMembers([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => {
    return {
      total: members.length,
      active: members.filter((member) => member.status === "ACTIVE").length,
      withdrawn: members.filter((member) => member.status === "INACTIVE").length,
      admin: members.filter((member) => member.role === "ADMIN").length,
    };
  }, [members]);

  const filteredMembers = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return members.filter((member) => {
      const keywordMatches = !normalizedKeyword ||
        member.name.toLowerCase().includes(normalizedKeyword) ||
        member.email.toLowerCase().includes(normalizedKeyword) ||
        member.phone.toLowerCase().includes(normalizedKeyword) ||
        String(member.memberId).includes(normalizedKeyword);
      const roleMatches = !roleFilter || member.role === roleFilter;
      const statusMatches = !statusFilter || member.status === statusFilter;

      return keywordMatches && roleMatches && statusMatches;
    });
  }, [members, keyword, roleFilter, statusFilter])

  const pageSize = 8;

  const totalPages = Math.max(
    1, Math.ceil(filteredMembers.length / pageSize)
  );

  const pagedMembers = filteredMembers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const visibleIds = pagedMembers.map(
    (member) => member.memberId
  );

  const isAllSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id))
      );
      return;
    }
    setSelectedIds((current) => [
      ...new Set([...current, ...visibleIds]),
    ]);
  };

  const handleSelectItem = (memberId) => {
    setSelectedIds((current) => {
      if (current.includes(memberId)) {
        return current.filter((id) => id !== memberId);
      }
      return [...current, memberId];
    });
  };

  const handleReset = () => {
    setKeyword("");
    setRoleFilter("");
    setStatusFilter("");
    setPage(1);
  };

  const handleStatusChange = async (memberId, nextStatus) => {
    const message = nextStatus === "INACTIVE"
      ? "この会員を退会状態に変更しますか？" : "この会員を有効に戻しますか？";
    if (!window.confirm(message)) {
      return;
    }
    try {
      await updateAdminMemberStatus(memberId, nextStatus);

      const response = await getAdminMembers();
      setMembers(response.data.data ?? []);
    } catch (error) {
      console.error("会員状態の変更に失敗しました。",error);
      window.alert(
        error.response?.data?.message ?? "会員状態の変更に失敗しました。"
      );
    }
  }

  const handleBulkStatusChange = async (event) => {
    const nextStatus = event.target.value;
    event.target.value = "";

    if (!nextStatus || selectedIds.length === 0) {
      return;
    }
    
    const confirmed = window.confirm(
      `${selectedIds.length}名の会員の状態を変更しますか？`
    );
    if (!confirmed){
      return;
    }

    const results = await Promise.allSettled(
      selectedIds.map((memberId) => updateAdminMemberStatus(memberId,nextStatus))
    );

    try{
      const response = await getAdminMembers();
      setMembers(response.data.data ?? []);
    } catch (error) {
      console.error("会員一覧の再取得に失敗しました。",error);
      window.alert("更新後の会員一覧を読み込めませんでした。ページを再読み込みしてください。");
      return;      
    }
    
    setSelectedIds([]);

    const failedCount = results.filter((result) => result.status === "rejected").length;

    if(failedCount > 0) {
      window.alert(`${failedCount}件の更新に失敗しました。`);
    }
  };

  return {
    members,
    setMembers,
    keyword,
    setKeyword,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    selectedIds,
    setSelectedIds,
    summary,
    filteredMembers,
    totalPages,
    pagedMembers,
    visibleIds,
    isAllSelected,
    handleSelectAll,
    handleSelectItem,
    handleReset,
    handleStatusChange,
    handleBulkStatusChange,
  };
}

export default useAdminUsers;