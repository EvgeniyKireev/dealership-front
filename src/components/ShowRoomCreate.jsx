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
    let validatePhone = (phone) => {
        let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        return regex.test(phone);
    }
    const validate = formState.name && formState.address && formState.phone && formState.workingHours && validatePhone(formState.phone)
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
                {!validatePhone(formState.phone) && <div style={{color: "red", fontSize: "10px"}}>Неверный формат телефонв</div>}
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label>Часы работы</label>
                <select className="form-select mt-1" aria-label="Default select example"
                        value={formState.workingHours}  onChange={e => {
                    setFormState({...formState, workingHours: e.target.value})
                }}>
                    <option value={""} defaultValue disabled></option>
                    <option value={"8:00-18:00"}>8:00-18:00</option>
                    <option value={"10:00-20:00"}>10:00-20:00</option>
                    <option value={"10:00-22:00"}>10:00-22:00</option>
                </select>
            </div>
        </div>
        <div className="row mt-5 justify-content-center">
            <button onClick={onCreateShowRoom} disabled={!validate} type="button"
                    className="btn btn-light col-3 btn-sm">Добавить новый автосалон
            </button>
        </div>
    </div>);
}