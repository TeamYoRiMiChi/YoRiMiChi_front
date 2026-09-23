import { useEffect, useMemo, useState } from "react";
import { answerInquiry, getAdminInquiries } from "../../api/inquiryApi";

const PAGE_SIZE = 8;

function useAdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [answering, setAnswering] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [answerText, setAnswerText] = useState("");

  const loadInquiries = async () => {
    const response = await getAdminInquiries();
    setInquiries(response.data.data ?? []);
  };

  useEffect(() => {
    let active = true;
    getAdminInquiries()
      .then((response) => {
        if (active) setInquiries(response.data.data ?? []);
      })
      .catch((error) => {
        if (active) setLoadError(error.response?.data?.message ?? "お問い合わせ一覧を取得できませんでした。");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const summary = useMemo(() => ({
    total: inquiries.length,
    waiting: inquiries.filter((item) => item.status === "WAITING").length,
    answered: inquiries.filter((item) => item.status === "ANSWERED").length,
  }), [inquiries]);

  const filteredInquiries = useMemo(() => {
    const word = keyword.trim().toLowerCase();
    return inquiries.filter((item) => {
      const keywordMatches = !word
        || item.title?.toLowerCase().includes(word)
        || item.memberName?.toLowerCase().includes(word)
        || item.email?.toLowerCase().includes(word)
        || String(item.inquiryId).includes(word);
      return keywordMatches
        && (!statusFilter || item.status === statusFilter)
        && (!categoryFilter || item.category === categoryFilter);
    });
  }, [inquiries, keyword, statusFilter, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / PAGE_SIZE));
  const pagedInquiries = filteredInquiries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleReset = () => {
    setKeyword(""); setStatusFilter(""); setCategoryFilter(""); setPage(1);
  };
  const handleOpenAnswer = (inquiry) => {
    setSelectedInquiry(inquiry); setAnswerText(inquiry.answer || "");
  };
  const handleCloseAnswer = () => {
    setSelectedInquiry(null); setAnswerText("");
  };
  const handleSubmitAnswer = async () => {
    if (!answerText.trim()) return alert("回答内容を入力してください。");
    const isEdit = selectedInquiry.status === 'ANSWERED' && Boolean(selectedInquiry.answer);
    if (isEdit && answerText.trim() === selectedInquiry.answer.trim()) {
      return alert('変更内容がありません。');
    }
    try {
      setAnswering(true);
      await answerInquiry(selectedInquiry.inquiryId, answerText.trim());
      await loadInquiries();
      handleCloseAnswer();
      alert(isEdit ? 'お問い合わせの回答を修正しました。' : 'お問い合わせに回答しました。');
    } catch (error) {
      alert(error.response?.data?.message ?? "回答の保存に失敗しました。");
    } finally {
      setAnswering(false);
    }
  };

  return {
    summary, filteredInquiries, pagedInquiries, totalPages, loading, loadError, answering,
    keyword, setKeyword, statusFilter, setStatusFilter, categoryFilter,
    setCategoryFilter, page, setPage, selectedInquiry, answerText,
    setAnswerText, handleReset, handleOpenAnswer, handleCloseAnswer,
    handleSubmitAnswer,
  };
}

export default useAdminInquiries;
