import axios from "axios";
import {useHistory} from "react-router";
export const TableCarShowRoom = ({el,dispatch}) => {
    let history = useHistory();
    const onShowRoom = () => {
        axios.get(`http://localhost:3000/api/carshowroom/${el.id}`).then((response) => {
            dispatch({type: "ADD_DATA_ONE_SHOWROOM", payload: response.data})
            console.log(response.data)
        })
        history.push(`/carshowroom/${el.id}`)
    }
    return (<tr onClick={onShowRoom}>
        <td>{el.name}</td>
        <td>{el.address}</td>
        <td>{el.phone}</td>
        <td>{el.workingHours}</td>
    </tr>)
}