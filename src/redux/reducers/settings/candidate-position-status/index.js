import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {}
}

const candidatePositionStatusSlice = createSlice({
  name: "candidatePositionStatus",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    }
  },
});

const { actions, reducer } = candidatePositionStatusSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
