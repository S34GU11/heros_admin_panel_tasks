import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import {useHttp} from '../../hooks/http.hook';

const heroFiltersAdapter = createEntityAdapter()

const initialState = heroFiltersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

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
               heroFiltersAdapter.setAll(state, action.payload)
           })
           .addCase(fetchHeroesFilters.rejected, state => {
               state.filtersLoadingStatus = 'error'
           })
           .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filtersSlice

export const {selectAll} = heroFiltersAdapter.getSelectors(state => state.filters)

export default reducer
export const {
    activeFiltersChanged
} = actions

