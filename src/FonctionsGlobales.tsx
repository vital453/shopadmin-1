import Axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { logOutt, recupUser } from './Feature/auth/AuthSlice';



export const FuncAuth = () => {
    // let user = useSelector((state: any) => state.auth.user);
    // const dispatch = useDispatch();

    console.log('travian');


    // Axios.get("https://backendtrader.digitalfirst.space/isUserAuth", {
    //     headers: {
    //         "x-access-token": JSON.parse(localStorage.getItem("user") + "").token,
    //     },
    // }).then((response) => {
    //     // console.log(response);
    //     if (response.data.message) {
    //         //connexion expiée
    //         dispatch(logOutt([]));
    //         dispatch(recupUser([]));
    //         // console.log(user.token)
    //         // localStorage.setItem('user', JSON.stringify([]));
    //     } else if (response.data === "Vous etes authentifier") {
    //         dispatch(recupUser(JSON.parse(localStorage.getItem("user") + "")));
    //     }
    // });
};
export default FuncAuth;