import { userRepository } from "../Users/UserRepository";

export function getLoginStatus(): string | null {
    const userId = window.sessionStorage.getItem("loggedUserId");
    return userId;
}

export function login(username: string, password: string){
    console.log("trying to login as " + username);
    userRepository.getUserByUsername(username).then(user => {
        console.log("user logged as: " + JSON.stringify(user))
        window.sessionStorage.setItem("loggedUserId", user._id.toString());
        window.location.replace("/");
    })
}
export function logout(){
    window.sessionStorage.removeItem("loggedUserId");
    window.location.replace("/");
}