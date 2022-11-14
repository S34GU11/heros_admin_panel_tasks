import {heroesFetching, heroesFetched, heroesFetchingError} from "../components/heroesList/heroesSlice";

export const fetchHeroes = request => dispatch => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
       .then(data => dispatch(heroesFetched(data)))
       .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = request => dispatch => {
    dispatch(filtersFetching())
    request('http://localhost:3001/filters')
       .then(data => dispatch((filtersFetched(data))))
       .catch(() => dispatch(filtersFetchingError()))
}

export const activeFilterChanged = filter => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}

// Example how to change dispatch:
// export const activeFilterChanged = filter => dispatch => {
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filter
//         })
//     }, 1000)
// }

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = filters => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}