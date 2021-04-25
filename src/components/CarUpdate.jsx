import {useEffect, useState} from "react";
import {Loader} from "./Loader";
import axios from "axios";
import {useHistory} from "react-router-dom";

export const CarUpdate = ({state, dataCar, dispatch}) => {
    let history = useHistory();
    const [formState, setFormState] = useState({
        model: "",
        color: "",
        category: "",
        power: "",
        price: "",
        year: "",
    });
    useEffect(() => {
        if (dataCar){
            setFormState(dataCar)
        } else{
            history.push("/cars")
        }
    }, [dataCar, history])
    const onUpdate = () => {
        axios.put("http://localhost:3000/api/cars/update", formState).then(response => {
            console.log(formState)
            dispatch({type: "ADD_DATA_CAR", payload: response.data})
        });
        alert("Данные о автомобиле обновлены!")
        history.push("/cars")
    }
    if (!state) {
        return <Loader/>
    }
    const validate = formState.model && formState.color && formState.category && formState.power && formState.price && formState.year
    return (<div className={"row justify-content-center mt-5"}>
        <h2 className="row text-white justify-content-center">Обновить информацию о автомобиле</h2>
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
                <input type="text" className="form-control mt-1" placeholder="1000лс"
                       value={formState.power}
                       onChange={e => {
                           setFormState({...formState, power: e.target.value})
                       }}
                />
            </div>
        </div>
        <div className="row mt-2 justify-content-center">
            <div className=" col-4 form-group">
                <label>Цена</label>
                <input type="text" className="form-control mt-1" placeholder="700000"
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
                <input type={"text"} className="form-control mt-1" placeholder="2021"
                       value={formState.year}
                       onChange={e => {
                           setFormState({...formState, year: e.target.value})
                       }}
                />
            </div>
        </div>
        <div className="row mt-5 justify-content-center">
            <button onClick={onUpdate} disabled={!validate} type="button"
                    className="btn btn-light col-3 btn-sm">Обновить
            </button>
        </div>
    </div>);
}