import { useEffect, useState } from 'react';
import { getWishlistItems, toWishlistItemView } from '../../../api/wishlistApi';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadWishlist() {
      try {
        const response = await getWishlistItems();
        const list = response.data?.data ?? [];

        if (!ignore) {
          setWishlist(Array.isArray(list) ? list.map(toWishlistItemView) : []);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setWishlist([]);
          setError(
            err.response?.data?.message ??
              'ウィッシュリストの取得に失敗しました。'
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadWishlist();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    wishlist,
    isLoading,
    error,
  };
}

export default useWishlist;
