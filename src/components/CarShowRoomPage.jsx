import {useState} from 'react';
import {Loader} from "./Loader";
import {TableCarShowRoom} from "./TableCarShowRoom";
import {NavLink} from "react-router-dom";

export const CarShowRoomPage = ({state, dispatch}) => {
    const [loader, setLoader] = useState(true)
    if (state) {
        setTimeout(() => {
            setLoader(false)
        }, 1000)

    }


    return (<div className={'text-white'}>
        <NavLink to={'/showroomcreate'}>
            <button type="button" className="btn btn-light my-5">Добавить автосалон</button>
        </NavLink>
        <table className="table table-hover table-dark">
            <thead>
            <tr>
                <th scope="col">Название</th>
                <th scope="col">Адрес</th>
                <th scope="col">Телефон</th>
                <th scope="col">Часы работы</th>

            </tr>
            </thead>
            <tbody>
            {state && state.map(el => <TableCarShowRoom dispatch={dispatch} key={el.id} el={el}/>)}
            </tbody>
        </table>
    </div>)
}