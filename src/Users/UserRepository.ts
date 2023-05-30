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
        let json: IdentifiableUser[] = await response.json()
        return json
    }

    async getUserByUsername(username: string) {
        let response = await fetch(this.jsonServerPath+'/users?username='+username, {
            method: 'GET',
        })
        let json: IdentifiableUser = await response.json()
        return json
    }

    async getUser(userId: string){
        console.log("getting user "+ userId)
        let response = await fetch(this.jsonServerPath+'/users/'+userId, {
            method: 'GET',
        })
        let json: IdentifiableUser = await response.json()
        return json
    }
    async updateUser(user: IdentifiableUser) {
        fetch(this.jsonServerPath+'/users/'+user.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
    }
}

export let userRepository = new UserRepository()