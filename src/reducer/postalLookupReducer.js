import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPostalCodeDetail } from '../api/postalCodeAPI'


export const getSearchPostalCode = createAsyncThunk('post/getSearchPost', async (id) => {
	const response = await getPostalCodeDetail(id);
	return response
})

export const postalLookupSlice = createSlice({
	name: 'postalLookUp',
	initialState: {
		loading: false,
		postalCodeDetail: {},
        error: ''
	},
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(getSearchPostalCode.pending, (state, action) => {
			state.loading = true;
            state.error = '';
		})
		builder.addCase(getSearchPostalCode.fulfilled, (state, action) => {
			state.postalCodeDetail = action.payload;
			state.loading = false;
            state.error = '';
		})
		builder.addCase(getSearchPostalCode.rejected, (state, action) => {
			state.loading = false;
            state.error = "Invalid PostalCode";
		})
		
	},
})

export default postalLookupSlice.reducer