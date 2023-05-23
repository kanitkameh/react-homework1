import { getLoginStatus } from "./AuthenticationService";
import { useNavigate } from "react-router-dom";

export function RequireAuthentication({children} : { children: JSX.Element}){
    const navigate = useNavigate();
    const userId = getLoginStatus();
    if(userId == null)
        navigate("/");

    return (children);
}