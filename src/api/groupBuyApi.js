import axiosInstance from './axiosInstance';
import { ENDPOINTS } from '../config/api';

/** 공동구매 상세 조회 */
export const getGroupBuy = (productId) => {
  return axiosInstance.get(`${ENDPOINTS.GROUP_BUYS}/${productId}`);
};

/** 공동구매 신청 */
export const participateGroupBuy = (productId, quantity) => {
  return axiosInstance.post(`${ENDPOINTS.GROUP_BUYS}/${productId}/participants`, {
    quantity,
  });
};

/** 내 공동구매 신청 수량 조회 */
export const getMyGroupBuyParticipation = (productId) => {
  return axiosInstance.get(`${ENDPOINTS.GROUP_BUYS}/${productId}/participants/me`);
};

/** 서버 DTO를 기존 상세 컴포넌트가 사용하는 화면 데이터로 */
export function toGroupBuyDetailView(dto) {
  const price = Number(dto.priceJpy ?? 0);
  const originalPrice = Number(dto.originalPriceJpy ?? price);
  const currentQuantity = Number(dto.currentQuantity ?? 0);
  const targetQuantity = Number(dto.targetQuantity ?? 0);
  const remainingQuantity = Math.max(targetQuantity - currentQuantity, 0);
  const discountRate = originalPrice > 0
    ? Math.max(Math.round((1 - price / originalPrice) * 100), 0)
    : 0;
  const displayStatus = getGroupBuyDisplayStatus(
    dto.status,
    currentQuantity,
    targetQuantity,
    dto.endDate,
  );

  return {
    badge: '共同購入',
    productId: dto.productId,
    status: dto.status,
    displayStatus,
    brand: dto.brand || '',
    // 일본어 사이트이므로 일본어 상품명을 먼저 표시
    name: dto.productNameJp || dto.productName || dto.title,
    productCode: `YOMI-GB-${String(dto.groupBuyId).padStart(4, '0')}`,
    rating: 0,
    reviewCount: 0,
    description: dto.description || '',
    groupPriceValue: price,
    groupPrice: `¥${price.toLocaleString()}`,
    referencePrice: `¥${originalPrice.toLocaleString()}`,
    discountRate: `${discountRate}% OFF`,
    currentParticipants: currentQuantity,
    targetParticipants: targetQuantity,
    remainingParticipants: remainingQuantity,
    remainingTime: formatRemainingTime(dto.endDate),
    // DB에 구성량 전용 컬럼이 생기기 전까지 한 상품을 한 세트 단위로 판매
    options: ['1セット'],
    thumbnailUrl: dto.thumbnailUrl ?? null,
  };
}

function getGroupBuyDisplayStatus(status, currentQuantity, targetQuantity, endDate) {
  if (['SUCCESS', 'FAILED', 'CANCELLED'].includes(status)) return status;
  if (targetQuantity > 0 && currentQuantity >= targetQuantity) return 'SUCCESS';

  const remainingMs = new Date(endDate).getTime() - Date.now();
  if (Number.isFinite(remainingMs) && remainingMs <= 0) return 'FAILED';
  if (status === 'RECRUITING' && Number.isFinite(remainingMs) && remainingMs <= 3 * 24 * 60 * 60 * 1000) {
    return 'CLOSING_SOON';
  }

  return status;
}

function formatRemainingTime(endDate) {
  const remainingMs = new Date(endDate).getTime() - Date.now();
  if (!Number.isFinite(remainingMs) || remainingMs <= 0) return '終了';

  const totalHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  return `${days}日 ${totalHours % 24}時間`;
}
