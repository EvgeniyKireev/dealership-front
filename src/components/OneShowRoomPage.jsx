import {useState} from 'react';
import {Loader} from "./Loader";
import {TableOneCarShowRoom} from "./TableOneShowRoom";
import {NavLink} from "react-router-dom";

export const OneShowRoomPage = ({state, dispatch}) => {
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
        <NavLink to={'/carshowroom'}>
            <button type="button" className="btn btn-light">Назад</button></NavLink>
        <table className="table table-hover table-dark mt-2">
            <thead>
            <tr>
                <th scope="col">Модель</th>
                <th scope="col">Год выпуска</th>
                <th scope="col">Цвет</th>
                <th scope="col">Категория</th>
                <th scope="col">Мощность</th>
                <th scope="col">Цена</th>
            </tr>
            </thead>
            <tbody>
            {state.map(el => <TableOneCarShowRoom dispatch={dispatch} key={el.id} el={el}/>)}
            </tbody>
        </table>
    </div>)
}