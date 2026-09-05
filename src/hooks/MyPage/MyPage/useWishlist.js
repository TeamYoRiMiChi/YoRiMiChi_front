import { useEffect, useState } from 'react';
import { getWishlist } from '../../../api/wishlistApi';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadWishlist() {
      try {
        const response = await getWishlist();
        const list = response.data?.data ?? [];

        console.log('Wishlist data:', list);    
        if (!ignore) {
          setWishlist(Array.isArray(list) ? list : []);
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