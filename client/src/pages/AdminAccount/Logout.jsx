import { useEffect } from "react"
import{useNavigate} from "react-router-dom";
import { useAuth } from "../../store/auth";

export const Logout=()=>{
    const navigate =  useNavigate();

     const {LogoutUser} = useAuth();
     
    useEffect(()=>{
    LogoutUser()
    },[LogoutUser]) ;



    return navigate("/login");

}