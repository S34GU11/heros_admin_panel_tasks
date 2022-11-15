import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

export const fetchHeroesFilters = createAsyncThunk(
   'filters/fetchFilters',
   () => {
       const {request} = useHttp()
       return request('http://localhost:3001/filters')
   }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFiltersChanged: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(fetchHeroesFilters.pending, state => {
               state.filtersLoadingStatus = 'loading'
           })
           .addCase(fetchHeroesFilters.fulfilled, (state, action) => {
               state.filtersLoadingStatus = 'idle'
               state.filters = action.payload
           })
           .addCase(fetchHeroesFilters.rejected, state => {
               state.filtersLoadingStatus = 'error'
           })
    }
})

const {actions, reducer} = filtersSlice

export default reducer
export const {
    activeFiltersChanged
} = actions

