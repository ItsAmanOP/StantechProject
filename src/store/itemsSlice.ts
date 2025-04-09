import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    setItems: (_, action) => action.payload,
    loadItems: () => {},
    addItem: (_, action) => {},
    editItem: (_, action) => {},
    removeItem: (_, action) => {},
  },
});

export const { setItems, loadItems, addItem, editItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;