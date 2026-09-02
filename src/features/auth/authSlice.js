import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../api/userApi';

const STORAGE_KEY = 'yorimichi_auth';

/**
 * 새로고침해도 로그인이 풀리지 않도록 localStorage에서 복구합니다.
 *
 * 참고: XSS에 노출될 수 있어 실무에서는 refreshToken을 HttpOnly 쿠키에 두는 편이
 * 더 안전합니다. 지금은 구현 단순화를 위해 localStorage를 씁니다.
 */
function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { accessToken: null, refreshToken: null, user: null };
    return JSON.parse(saved);
  } catch {
    return { accessToken: null, refreshToken: null, user: null };
  }
}

function saveToStorage(payload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // 저장 실패해도 로그인 자체는 동작하므로 무시
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 무시
  }
}

/* ============================================
   로그인
============================================ */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await userApi.login(credentials);
      return res.data.data; // { accessToken, refreshToken, user }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ?? 'ログインに失敗しました。'
      );
    }
  }
);

/* ============================================
   회원가입
============================================ */
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (form, { rejectWithValue }) => {
    try {
      const res = await userApi.signup(form);
      return res.data.data; // 가입된 회원 정보
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ?? '会員登録に失敗しました。'
      );
    }
  }
);

/* ============================================
   내 정보 조회 (토큰 유효성 확인 겸용)
============================================ */
export const fetchMyInfo = createAsyncThunk(
  'auth/fetchMyInfo',
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApi.getMyInfo();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ?? null);
    }
  }
);

const saved = loadFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: saved.accessToken,
    refreshToken: saved.refreshToken,
    user: saved.user,
    status: 'idle',      // idle | loading | succeeded | failed
    error: null,
    signupStatus: 'idle',
    signupError: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken ?? null;
      state.user = user;
      saveToStorage({ accessToken, refreshToken: refreshToken ?? null, user });
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      clearStorage();
    },
    clearAuthError: (state) => {
      state.error = null;
      state.signupError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* 로그인 */
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload;
        state.status = 'succeeded';
        state.accessToken = accessToken;
        state.refreshToken = refreshToken ?? null;
        state.user = user;
        saveToStorage({ accessToken, refreshToken: refreshToken ?? null, user });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      /* 회원가입 */
      .addCase(signupUser.pending, (state) => {
        state.signupStatus = 'loading';
        state.signupError = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.signupStatus = 'succeeded';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = 'failed';
        state.signupError = action.payload;
      })

      /* 내 정보 — 실패하면 토큰이 만료된 것이므로 로그아웃 처리 */
      .addCase(fetchMyInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        saveToStorage({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          user: action.payload,
        });
      })
      .addCase(fetchMyInfo.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        clearStorage();
      });
  },
});

export const { setCredentials, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
