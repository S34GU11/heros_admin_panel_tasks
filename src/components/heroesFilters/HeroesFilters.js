// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import classNames from "classnames";

import store from "../../store";
import { activeFiltersChanged, fetchHeroesFilters, selectAll } from "./heroesFilterSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
    const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters)
    const filters = selectAll(store.getState())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchHeroesFilters())
        // eslint-disable-next-line
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h4 className="text-center mt-5">Loading Error</h4>
    }

    const renderFiltersBtn = arr => {
        if (arr.length === 0 ) return <h4 className="text-center mt-5">Not Found</h4>

        return arr.map(({name, className, label}) => {
            //use classNames library
            const btnClass = classNames('btn', className, {
                'active' : name === activeFilter
            })

            return <button
              key={name}
              id={name}
              className={btnClass}
              onClick={() => dispatch(activeFiltersChanged(name))}
            >{label}</button>
        })
    }

    const elementButtons = renderFiltersBtn(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elementButtons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;