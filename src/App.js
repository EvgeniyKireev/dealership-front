import './App.css';
import {useEffect, useReducer, useState} from 'react';
import axios from "axios";
import {Auth} from "./components/auth";
import {reducer} from "./reducer";
import {CarPage} from "./components/CarPage";
import {Header} from "./components/Header";
import {Route} from "react-router-dom";
import {About} from "./components/About";
import {Loader} from "./components/Loader";
import {CarShowRoomPage} from "./components/CarShowRoomPage";
import {OneShowRoomPage} from "./components/OneShowRoomPage";
import {CarCreate} from "./components/CarCreate";
import {CarUpdate} from "./components/CarUpdate";
import {ShowRoomCreate} from "./components/ShowRoomCreate";

function App() {
    const [state, dispatch] = useReducer(reducer, {});
    const [auth, setAuth] = useState(false);
    const [loader, setLoader] = useState(true)
    window.state = state;
    useEffect(() => {
        if (localStorage.getItem("login") === "admin") {
            setAuth(true)
        }
        axios.get('http://localhost:3000/api/carshowroom/').then((response) => {
            dispatch({type: "ADD_DATA_CARSHOWROOM", payload: response.data})
        })
        axios.get('http://localhost:3000/api/cars/').then((response) => {
            dispatch({type: "ADD_DATA_CAR", payload: response.data})
        })
        setLoader(false)
    }, [])
    if (loader) {
        return <Loader/>
    }
    const isAuth = (!localStorage.getItem("login") === "admin" || !auth)
    return (
        <div className="App">
            {!isAuth && <Header setAuth={setAuth}/>}
            <div className="container">
                {isAuth ? <Auth setAuth={setAuth}/> :
                    <Route path={'/cars'} render={() => <CarPage dispatch={dispatch} state={state.cars} showrooms={state.carShowRoom}/>}/>}
                {!isAuth && <Route path={'/carcreate'} exact
                                   render={() => <CarCreate dispatch={dispatch} state={state.carShowRoom}/>}/>}
                {!isAuth && <Route path={'/showroomcreate'} exact
                                   render={() => <ShowRoomCreate dispatch={dispatch}/>}/>}
                {!isAuth && <Route path={'/carupdate'} exact
                                   render={() => <CarUpdate dispatch={dispatch} dataCar={state.createPage}
                                                            state={state.carShowRoom}/>}/>}
                {!isAuth && <Route path={'/carshowroom'} exact
                                   render={() => <CarShowRoomPage dispatch={dispatch} state={state.carShowRoom}/>}/>}
                {!isAuth &&
                <Route path={'/carshowroom/:id'}
                       render={() => <OneShowRoomPage state={state.oneShowRoom} dispatch={dispatch}/>}/>}
                {!isAuth && <Route path={'/about'} render={() => <About/>}/>}
                {!isAuth &&
                <Route path={"/"} exact render={() => <div className="row justify-content-center">
                    <div className="col-6">
                        <h2 className={"text-white mt-5 text-center"}>?????????? ???????????????????? ?? ???????????????????????????? ??????????????
                            ???????????????????? ???????????? ??????????????????????</h2>
                        <img width={'600px'}
                             src="./auto.png" alt=""/>
                    </div>
                </div>}/>}
            </div>
        </div>
    );
}

export default App;
