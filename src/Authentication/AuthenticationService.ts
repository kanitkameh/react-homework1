import { userRepository } from "../Users/UserRepository";

export function getLoginStatus(): string | null {
    // const userId = window.sessionStorage.getItem("loggedUserId");
    const userId = getCookie("connect.sid")
    return userId == "" ? null : userId;
}

export function login(username: string, password: string){
    console.log("trying to login as " + username);
    const body = {
            username: username,
            password: password
        }
    return fetch("http://localhost:2704/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(body),
    }).then(x => {
        console.log("login response " + x)
        console.log("user logged as: " + (document.cookie))
        // TODO de we need this?
        // window.sessionStorage.setItem("loggedUserId", user._id.toString());
    }).catch(error =>
        console.log(error)
    )
}
export function logout(){
    // window.sessionStorage.removeItem("loggedUserId");
    //TODO use proper url for production
    fetch("http://localhost:2704/logout", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors"
    }).then(response => {
    if (response.ok) {
      // Logout successful
      // Perform any necessary client-side cleanup or redirection
      console.log('Logout successful');
      document.location.href = "/"
    } else {
      // Logout failed
      // Handle error or display appropriate message to the user
      console.log('Logout failed '+response.status);
    }
  })
  .catch(error => {
    // Network or fetch error occurred
    // Handle error appropriately
    console.log('Logout error:', error);
  });
}

function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}