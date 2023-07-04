import { FormEvent, useState } from "react";
import { login } from "./AuthenticationService";
import { useNavigate, useOutletContext } from "react-router-dom";

export function LoginUser() {
    // const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        login(username, password).then(res => { 
            // navigate("/") 
            document.location.href = "/"
        });
    };
    // const loggedUserId: any = useOutletContext()
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                maxLength={15}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            /><br />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            /><br />

            <button type="submit">Login</button>
        </form>
    );
}