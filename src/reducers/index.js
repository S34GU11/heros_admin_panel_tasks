const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_CREATED':
            const newCreatedHeroList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newCreatedHeroList
            }
        case 'HERO_DELETED':
            const updatedHeroList = state.heroes.filter(item => item.id != action.payload)
            return {
                ...state,
                heroes: updatedHeroList
            }
        default: return state
    }
}

export default reducer;