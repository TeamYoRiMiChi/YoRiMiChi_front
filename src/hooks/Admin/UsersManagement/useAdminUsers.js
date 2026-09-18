import { useMemo, useState } from "react";

const initialMembers = [
  {
    memberId: 1,
    email: "jiyun@example.com",
    name: "안지윤",
    phone: "010-1234-5678",
    role: "USER",
    status: "ACTIVE",
    withdrawnAt: null,
  },
  {
    memberId: 2,
    email: "minsu@example.com",
    name: "김민수",
    phone: "010-2345-6789",
    role: "USER",
    status: "ACTIVE",
    withdrawnAt: null,
  },
  {
    memberId: 3,
    email: "sora@example.com",
    name: "이소라",
    phone: "010-3456-7890",
    role: "USER",
    status: "INACTIVE",
    withdrawnAt: "2026-08-29T14:30:00",
  },
  {
    memberId: 4,
    email: "admin@yorimichi.com",
    name: "관리자",
    phone: "010-1111-2222",
    role: "ADMIN",
    status: "ACTIVE",
    withdrawnAt: null,
  },
  {
    memberId: 5,
    email: "yuna@example.com",
    name: "박유나",
    phone: "010-4567-8901",
    role: "USER",
    status: "ACTIVE",
    withdrawnAt: null,
  },
  {
    memberId: 6,
    email: "junho@example.com",
    name: "이준호",
    phone: "010-5678-9012",
    role: "USER",
    status: "INACTIVE",
    withdrawnAt: "2026-09-03T11:20:00",
  },
];

function useAdminUsers() {
  const [members, setMembers] = useState(initialMembers);
  const [keyword, setKeyword] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

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

  const handleStatusChange = (memberId, nextStatus) => {
    setMembers((current) =>
      current.map((member) => {
        if (member.memberId !== memberId) {
          return member;
        }

        return {
          ...member,
          status: nextStatus,
          withdrawnAt:
            nextStatus === "INACTIVE"
              ? new Date().toISOString() : null,
        };
      })
    )
  };

  const handleBulkStatusChange = (event) => {
    const nextStatus = event.target.value;

    if (!nextStatus || selectedIds.length === 0) {
      return;
    }

    setMembers((current) =>
      current.map((member) => {
        if (!selectedIds.includes(member.memberId)) {
          return member;
        }
        return {
          ...member,
          status: nextStatus,
          withdrawnAt:
            nextStatus === "INACTIVE"
              ? new Date().toISOString() : null,
        };
      })
    );
    setSelectedIds([]);
    event.target.value = "";
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