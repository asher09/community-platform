import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [
    {
      title: "Sample Post Title",
      content: "This is a sample post content. It can be anything you want to write about.",
      author: "John Doe",
      timestamp: "2023-10-01 12:00 PM"
    }
  ],
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
  },
});

export const { setBlogs } = feedSlice.actions;
export default feedSlice.reducer;
