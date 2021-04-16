import {useState, useEffect} from 'react';
import {Loader} from "./Loader";
import {Tablecar} from "./Tablecar";
import {NavLink} from "react-router-dom";

export const CarPage = ({state, dispatch,onDelete}) => {
    const [loader, setLoader] = useState(true)

    if (state) {
        setTimeout(() => {
            setLoader(false)
        }, 500)
    }
    if (loader) {
        return <Loader/>
    }
    return (<div className={'text-white'}>
        <NavLink to={'/carcreate'}>
            <button type="button" className="btn btn-light mt-5">Добавить автомобиль</button></NavLink>
        <table className="table table-hover table-dark mt-2">
            <thead>
            <tr>
                <th scope="col">Модель</th>
                <th scope="col">Год выпуска</th>
                <th scope="col">Цвет</th>
                <th scope="col">Категория</th>
                <th scope="col">Мощность</th>
                <th scope="col">Цена</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {state.map(el => <Tablecar onDelete={onDelete} dispatch={dispatch} key={el.id} el={el}/>)}
            </tbody>
        </table>
    </div>)
}