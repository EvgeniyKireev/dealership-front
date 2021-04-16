import {useState, useEffect} from 'react';
import {Loader} from "./Loader";
import {TableCarShowRoom} from "./TableCarShowRoom";

export const CarShowRoomPage = ({state, dispatch}) => {
    const [loader, setLoader] = useState(true)

    if (state) {
        setTimeout(() => {
            setLoader(false)
        }, 1000)
    }
    if (loader) {
        return <Loader/>
    }
    return (<div className={'text-white'}>
        <table className="table table-hover table-dark mt-5">
            <thead>
            <tr>
                <th scope="col">Название</th>
                <th scope="col">Адрес</th>
                <th scope="col">Телефон</th>
                <th scope="col">Часы работы</th>

            </tr>
            </thead>
            <tbody>
            {state.map(el => <TableCarShowRoom dispatch={dispatch} key={el.id} el={el}/>)}
            </tbody>
        </table>
    </div>)
}