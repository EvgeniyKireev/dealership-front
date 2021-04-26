import {Loader} from "./Loader";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

export const CarCreate = ({state, dispatch}) => {
    let history = useHistory();
    useEffect(() => {
        axios.get('http://localhost:3000/api/carshowroom/').then((response) => {
            dispatch({type: "ADD_DATA_CARSHOWROOM", payload: response.data})
        }).catch((e) => {
            alert("У вас нет автосалонов!")
            history.push('/showroomcreate')
        })
    }, [state])
    console.log(!state)
    const [formState, setFormState] = useState({
        model: "",
        color: "",
        category: "",
        power: "",
        price: "",
        year: "",
        showroom_id: {
            id: ""
        }
    });
    if (!state) {
        return <Loader/>
    }

    const onCreateCar = () => {
        axios.post("http://localhost:3000/api/cars", formState).then(response => {
            dispatch({type: "ADD_DATA_CAR", payload: response.data})
        });
        alert("Автомобиль добавлен!")
        history.push("/cars")
    }
    const validate = formState.model && formState.color && formState.category && formState.power &&
        formState.price && formState.year && formState.showroom_id.id &&
        formState.year > 1900 && formState.year <= 2021 && formState.power > 0 && formState.power <= 3000
    return (<div className={"row justify-content-center mt-5"}>
        <h2 className="row text-white justify-content-center">Добавить новый Автомобиль</h2>
        <div className="row justify-content-center">
            <div className=" col-4 form-group">
                <label htmlFor="model">Модель</label>
                <input type="text" className="form-control mt-1" id="model" placeholder="Toyota Chaser jsx100"
                       onChange={e => {
                           setFormState({...formState, model: e.target.value})
                       }} value={formState.model}/>
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label htmlFor="color">Цвет</label>
                <input type="text" className="form-control mt-1" id="color" placeholder="black"
                       value={formState.color}
                       onChange={e => {
                           setFormState({...formState, color: e.target.value})
                       }}
                />
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className="col-4">
                <label>Категория авто</label>
                <select className="form-select mt-1" aria-label="Default select example" value={formState.category}
                        onChange={e => {
                            setFormState({...formState, category: e.target.value})
                        }}>
                    <option value={""} defaultValue disabled></option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label>Мощность</label>
                <input type="number" className="form-control mt-1" placeholder="1000лс"
                       value={formState.power}
                       onChange={e => {
                           setFormState({...formState, power: e.target.value})
                       }}
                />
                {!(formState.power > 0 && formState.power <= 3000) &&
                <div style={{color: "red", fontSize: "10px"}}>Не более 3000</div>}
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label>Цена</label>
                <input type="number" className="form-control mt-1" placeholder="700000"
                       value={formState.price}
                       onChange={e => {
                           setFormState({...formState, price: e.target.value})
                       }}
                />
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label>Год выпуска</label>
                <input type={"number"} className="form-control mt-1" placeholder="2021"
                       value={formState.year}
                       onChange={e => {
                           setFormState({...formState, year: e.target.value})
                       }}
                />
                {!(formState.year > 1900 && formState.year <= 2021) &&
                <div style={{color: "red", fontSize: "10px"}}> Неверный год</div>}
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className="col-4">
                <label>Автосалон</label>
                <select className="form-select mt-1" aria-label="Default select example"
                        value={formState.showroom_id.id} onChange={e => {
                    setFormState({...formState, showroom_id: {id: e.target.value}})
                }}>
                    <option value={""} defaultValue disabled></option>
                    {state.map(el => <option key={el.id} value={el.id}>{el.name}</option>)}
                </select>
            </div>
        </div>
        <div className="row mt-5 justify-content-center">
            <button onClick={onCreateCar} disabled={!validate} type="button"
                    className="btn btn-light col-3 btn-sm">Добавить автомобиль
            </button>
        </div>
    </div>);
}