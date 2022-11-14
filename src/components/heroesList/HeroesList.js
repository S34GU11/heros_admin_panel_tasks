import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { createSelector } from 'reselect'

import {heroesFetching, heroesFetched, heroesFetchingError, heroDeleted} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroes = useSelector(state => {
        if (state.filters.activeFilter === 'all') {
            return state.heroes.heroes

        } return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)

    })

    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const nodeRef = useRef(null);

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback(id => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
          .then(res => console.log(res, 'Deleted'))
          .then(dispatch(heroDeleted(id)))
          .catch(error => console.log(error))

    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = arr => {
        if (arr.length === 0) {
            return (
               <CSSTransition
                  timeout={0}
                  nodeRef={nodeRef}
                  classNames="hero">
                   <h5 className="text-center mt-5">Героев пока нет</h5>
               </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
               <CSSTransition
                 key={id}
                 timeout={500}
                 nodeRef={nodeRef}
                 classNames="hero">
                  <HeroesListItem
                     {...props}
                     onDelete={() => onDelete(id)}/>
               </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
       <TransitionGroup component="ul">
               {elements}
       </TransitionGroup>
    )
}

export default HeroesList;