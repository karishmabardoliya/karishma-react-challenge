import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCountries, getAllUniversities } from '../api/universitiesAPI';

export const fetchAllUniversities = createAsyncThunk('universities/fetchAll', async (name) => {
	console.log('reducer', name);
	const response = await getAllUniversities(name);
	return response
})

export const fetchAllCountries = createAsyncThunk('countries/fetchAll', async () => {
	const response = await getAllCountries();
	return response
})


export const universitySlice = createSlice({
	name: 'university',
	initialState: {
		loading: false,
		universities: [],
        countries: []
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllUniversities.pending || fetchAllCountries.pending, (state, action) => {
			state.loading = true
		})
		builder.addCase(fetchAllUniversities.fulfilled, (state, action) => {
			state.universities = action.payload
			state.loading = false
		})
		builder.addCase(fetchAllUniversities.rejected || fetchAllCountries.rejected, (state, action) => {
			state.loading = false
		})
		builder.addCase(fetchAllCountries.fulfilled, (state, action) => {
			state.countries = action.payload
			state.loading = false
		})
	},
})

export default universitySlice.reducer