import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userApi from '../../api/Auth/userApi';
import {
  clearPendingProfile,
  confirmEmail,
  getAuthenticatedAttributes,
  getAuthenticationSession,
  getPendingProfile,
  loginWithEmail,
  logoutFromCognito,
  registerWithEmail,
  resendEmailCode,
  toAuthenticationMessage,
} from '../../services/authentication';

function isMemberMissing(error) {
  return error.response?.status === 404 && error.response?.data?.code === 'U001';
}

async function loadAuthenticatedMember({ createPendingMember = false } = {}) {
  const session = await getAuthenticationSession();

  if (!session.accessToken) {
    return { accessToken: null, user: null, requiresOnboarding: false, attributes: {} };
  }

  try {
    const response = await userApi.getMyInfo();
    return {
      accessToken: session.accessToken,
      user: response.data.data,
      requiresOnboarding: false,
      attributes: {},
    };
  } catch (error) {
    if (!isMemberMissing(error)) throw error;

    const attributes = await getAuthenticatedAttributes();
    const email = attributes.email ?? session.claims.email;
    const pendingProfile = createPendingMember ? getPendingProfile(email) : null;

    if (pendingProfile) {
      const response = await userApi.onboard({
        name: pendingProfile.name,
        phone: pendingProfile.phone,
      });
      clearPendingProfile();

      return {
        accessToken: session.accessToken,
        user: response.data.data,
        requiresOnboarding: false,
        attributes,
      };
    }

    return {
      accessToken: session.accessToken,
      user: null,
      requiresOnboarding: true,
      attributes,
    };
  }
}

export const initializeAuthentication = createAsyncThunk(
  'auth/initializeAuthentication',
  async (_, { rejectWithValue }) => {
    try {
      return await loadAuthenticatedMember();
    } catch (error) {
      return rejectWithValue(toAuthenticationMessage(error, null));
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await loginWithEmail(email, password);
      return await loadAuthenticatedMember({ createPendingMember: true });
    } catch (error) {
      return rejectWithValue(
        toAuthenticationMessage(error, 'ログインに失敗しました。'),
      );
    }
  },
);

export const completeOAuthAuthentication = createAsyncThunk(
  'auth/completeOAuthAuthentication',
  async (_, { rejectWithValue }) => {
    try {
      return await loadAuthenticatedMember();
    } catch (error) {
      return rejectWithValue(
        toAuthenticationMessage(error, 'Googleログインに失敗しました。'),
      );
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (form, { rejectWithValue }) => {
    try {
      const result = await registerWithEmail(form);
      return { email: form.email, nextStep: result.nextStep };
    } catch (error) {
      return rejectWithValue(
        toAuthenticationMessage(error, '会員登録に失敗しました。'),
      );
    }
  },
);

export const confirmSignup = createAsyncThunk(
  'auth/confirmSignup',
  async ({ email, confirmationCode }, { rejectWithValue }) => {
    try {
      return await confirmEmail(email, confirmationCode);
    } catch (error) {
      return rejectWithValue(
        toAuthenticationMessage(error, 'メールアドレスの確認に失敗しました。'),
      );
    }
  },
);

export const resendSignupCode = createAsyncThunk(
  'auth/resendSignupCode',
  async (email, { rejectWithValue }) => {
    try {
      await resendEmailCode(email);
      return email;
    } catch (error) {
      return rejectWithValue(
        toAuthenticationMessage(error, '確認コードの再送信に失敗しました。'),
      );
    }
  },
);

export const onboardUser = createAsyncThunk(
  'auth/onboardUser',
  async (profile, { rejectWithValue }) => {
    try {
      const session = await getAuthenticationSession();
      const response = await userApi.onboard(profile);
      clearPendingProfile();
      return { accessToken: session.accessToken, user: response.data.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ?? '会員情報の登録に失敗しました。',
      );
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await logoutFromCognito();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    user: null,
    attributes: {},
    initialized: false,
    requiresOnboarding: false,
    status: 'idle',
    error: null,
    signupStatus: 'idle',
    signupError: null,
    pendingEmail: null,
  },
  reducers: {
    clearAuthentication: (state) => {
      state.accessToken = null;
      state.user = null;
      state.attributes = {};
      state.requiresOnboarding = false;
      state.status = 'idle';
    },
    clearAuthError: (state) => {
      state.error = null;
      state.signupError = null;
    },
    resetSignupFlow: (state) => {
      state.signupStatus = 'idle';
      state.signupError = null;
      state.pendingEmail = null;
    },
  },
  extraReducers: (builder) => {
    const applyAuthentication = (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.attributes = action.payload.attributes ?? {};
      state.requiresOnboarding = action.payload.requiresOnboarding ?? false;
      state.status = 'succeeded';
      state.error = null;
      state.initialized = true;
    };

    builder
      .addCase(initializeAuthentication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeAuthentication.fulfilled, applyAuthentication)
      .addCase(initializeAuthentication.rejected, (state) => {
        state.initialized = true;
        state.status = 'idle';
        state.accessToken = null;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, applyAuthentication)
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(completeOAuthAuthentication.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(completeOAuthAuthentication.fulfilled, applyAuthentication)
      .addCase(completeOAuthAuthentication.rejected, (state, action) => {
        state.initialized = true;
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.signupStatus = 'loading';
        state.signupError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupStatus = 'confirmationRequired';
        state.pendingEmail = action.payload.email;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = 'failed';
        state.signupError = action.payload;
      })
      .addCase(confirmSignup.pending, (state) => {
        state.signupStatus = 'loading';
        state.signupError = null;
      })
      .addCase(confirmSignup.fulfilled, (state) => {
        state.signupStatus = 'confirmed';
      })
      .addCase(confirmSignup.rejected, (state, action) => {
        state.signupStatus = 'confirmationRequired';
        state.signupError = action.payload;
      })
      .addCase(resendSignupCode.rejected, (state, action) => {
        state.signupError = action.payload;
      })
      .addCase(onboardUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(onboardUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.requiresOnboarding = false;
        state.status = 'succeeded';
      })
      .addCase(onboardUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
        state.attributes = {};
        state.requiresOnboarding = false;
        state.status = 'idle';
      })
      .addCase(logoutUser.rejected, (state) => {
        state.accessToken = null;
        state.user = null;
        state.attributes = {};
        state.requiresOnboarding = false;
        state.status = 'idle';
      });
  },
});

export const { clearAuthentication, clearAuthError, resetSignupFlow } = authSlice.actions;
export default authSlice.reducer;
