const STORAGE_PREFIX = 'yorimichi_inquiry_answers_seen_';

function storageKey(memberId) {
  return `${STORAGE_PREFIX}${memberId}`;
}

function answerVersion(inquiry) {
  if (inquiry.status !== 'ANSWERED' || !inquiry.answer) return null;

  // 답변 내용은 저장하지 않고 변경 여부만 확인할 값으로 변환.
  let hash = 0;
  for (const character of inquiry.answer) {
    hash = (hash * 31 + character.codePointAt(0)) | 0;
  }
  return `${inquiry.answeredAt ?? ''}:${hash}`;
}

function readSeen(memberId) {
  if (!memberId) return {};
  try {
    return JSON.parse(localStorage.getItem(storageKey(memberId)) ?? '{}');
  } catch {
    return {};
  }
}

export function getUnreadAnswerIds(memberId, inquiries) {
  const seen = readSeen(memberId);
  return inquiries
    .filter((inquiry) => {
      const version = answerVersion(inquiry);
      return version && seen[inquiry.inquiryId] !== version;
    })
    .map((inquiry) => inquiry.inquiryId);
}

export function markAnswersSeen(memberId, inquiries) {
  if (!memberId) return;
  try {
    const seen = readSeen(memberId);
    for (const inquiry of inquiries) {
      const version = answerVersion(inquiry);
      if (version) seen[inquiry.inquiryId] = version;
    }
    localStorage.setItem(storageKey(memberId), JSON.stringify(seen));
  } catch {
    // 브라우저 저장소를 사용할 수 없어도 문의 내역 조회는 유지.
  }
}
