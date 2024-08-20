import instance from "@/config/axios.config";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";

interface Friends {
  _id?: string;
  userId: string;
  tag: string;
}

interface FriendsState {
  friends: Friends[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: FriendsState = {
  friends: [],
  loading: false,
  error: {
    name: "",
    message: "",
    stack: "",
    code: "",
  }
};

interface FriendsPayload {
  userId?: string;
  tag?: string;
}

export const getAllFriends = createAsyncThunk<Friends[], void, { rejectValue: string; }>(
  'friends/get-all-fritends',
  async (_, { rejectWithValue }) => {
    try {
      const responseFriends = await instance.get('/friends');
      return responseFriends.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Get all todos is failed!');
      }
      return rejectWithValue('Get all todos is failed!');
    }
  }
);

export const createFriends = createAsyncThunk<Friends, FriendsPayload, { rejectValue: string; }>(
  'friends/create-friends',
  async (payload: FriendsPayload, { rejectWithValue }) => {
    const { userId, tag } = payload;

    try {
      const responseCreateFriends = await instance.post('/friends/add-friends', { userId, tag });
      return responseCreateFriends.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'Get all todos is failed!');
      }
      return rejectWithValue('Get all todos is failed!');
    }
  }
);

const friendsSlice = createSlice({
  name: 'friendsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(getAllFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = { name: action.error.name, message: action.error.message, stack: action.error.stack, code: action.error.code };
      })
      .addCase(createFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.friends.push(action.payload);
      })
      .addCase(createFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = { name: action.error.name, message: action.error.message, stack: action.error.stack, code: action.error.code };
      });
  }
});

export default friendsSlice.reducer;