import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading'
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle'
            state.filters = action.payload
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error'
        },
        activeFiltersChanged: (state, action) => {
            state.activeFilter = action.payload
        }
    },
})

const {actions, reducer} = filtersSlice

export default reducer
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFiltersChanged
} = actions

