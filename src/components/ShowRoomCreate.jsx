import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

export const ShowRoomCreate = ({state, dispatch}) => {
    let history = useHistory();
    const [formState, setFormState] = useState({
        name: "",
        address: "",
        phone: "",
        workingHours: ""
    });

    const onCreateShowRoom = () => {
        axios.post("http://localhost:3000/api/carshowroom", formState).then(response => {
            dispatch({type: "ADD_DATA_CARSHOWROOM", payload: response.data})
        });
        alert("Автосалон добавлен!")
        history.push("/carshowroom")
    }
    const validate = formState.name && formState.address && formState.phone && formState.workingHours
    return (<div className={"row justify-content-center mt-5"}>
        <h2 className="row text-white justify-content-center">Добавить новый автосалон</h2>
        <div className="row justify-content-center">
            <div className=" col-4 form-group">
                <label htmlFor="name">Название</label>
                <input type="text" className="form-control mt-1" id="name" placeholder="Автосалон Toyota"
                       onChange={e => {
                           setFormState({...formState, name: e.target.value})
                       }} value={formState.name}/>
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label htmlFor="address">Адрес</label>
                <input type="text" className="form-control mt-1" id="address" placeholder="г.Москва, ул. Тверская 2"
                       value={formState.address}
                       onChange={e => {
                           setFormState({...formState, address: e.target.value})
                       }}
                />
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label>Телефон</label>
                <input type="text" className="form-control mt-1" placeholder="+79245415441"
                       value={formState.phone}
                       onChange={e => {
                           setFormState({...formState, phone: e.target.value})
                       }}
                />
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label>Часы работы</label>
                <input type="text" className="form-control mt-1" placeholder="10:00-20:00"
                       value={formState.workingHours}
                       onChange={e => {
                           setFormState({...formState, workingHours: e.target.value})
                       }}
                />
            </div>
        </div>
        <div className="row mt-5 justify-content-center">
            <button onClick={onCreateShowRoom} disabled={!validate} type="button"
                    className="btn btn-light col-3 btn-sm">Добавить новый автосалон
            </button>
        </div>
    </div>);
}