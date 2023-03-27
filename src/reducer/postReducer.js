import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPost, addPost, updatePost, getPostById, deletePost } from '../api/postAPI'

export const fetchAllPosts = createAsyncThunk('post/fetchAll', async () => {
	const response = await getAllPost();
	return response
})

export const addNewPost = createAsyncThunk('post/addPost', async (data) => {
	const response = await addPost({ ...data, userId: Math.random() });
	return response
})

export const updatePostById = createAsyncThunk('post/updatePost', async (data) => {
	const response = await updatePost({ ...data, userId: Math.random() });
	return response
})

export const getSearchPost = createAsyncThunk('post/getSearchPost', async (id) => {
	const response = await getPostById(id);
	return response
})

export const deletePostById = createAsyncThunk('post/deletePost', async (id) => {
	const response = await deletePost(id);
	return response
})

export const postSlice = createSlice({
	name: 'post',
	initialState: {
		loading: true,
		posts: [],
		searchedPost: []
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllPosts.pending || addNewPost.pending || updatePostById.pending || getSearchPost.pending
			|| deletePostById.pending,
			(state, action) => {
				state.loading = true
			})
		builder.addCase(fetchAllPosts.fulfilled , (state, action) => {
			state.posts = action.payload
			state.loading = false
		})
		builder.addCase(fetchAllPosts.rejected || addNewPost.rejected || updatePostById.rejected || getSearchPost.rejected
			|| deletePostById.rejected, (state, action) => {
				state.loading = false
			})
		builder.addCase(getSearchPost.fulfilled, (state, action) => {
			state.posts = [action.payload];
			state.loading = false
		})
		builder.addCase(addNewPost.fulfilled || updatePostById.fulfilled || deletePostById.fulfilled, (state, action) => {
			state.loading = false
		})
	},
})

export default postSlice.reducer