import { IdentifiableUser, User } from "./User";

class UserRepository {
    jsonServerPath = "http://localhost:3001";
    async addUser(user: User){
        fetch(this.jsonServerPath+'/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
    }
    async getAllUsers(){
        let response = await fetch(this.jsonServerPath+'/users', {
            method: 'GET',
        })
        let json: [IdentifiableUser] = await response.json()
        return json
    }

    async getUser(userId: string){
        let response = await fetch(this.jsonServerPath+'/users/'+userId, {
            method: 'GET',
        })
        let json: IdentifiableUser = await response.json()
        return json
    }
}

export let userRepository = new UserRepository()