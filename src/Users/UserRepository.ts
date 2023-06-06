import { IdentifiableUser, User } from "./User";

class UserRepository {
    backendServerPath = "http://localhost:2704";

    async addUser(user: User){
        fetch(this.backendServerPath+'/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
    }
    async getAllUsers(){
        let response = await fetch(this.backendServerPath+'/users', {
            method: 'GET',
        })
        let json: IdentifiableUser[] = await response.json()
        return json
    }

    async getUserByUsername(username: string) {
        let response = await fetch(this.backendServerPath+'/users?username='+username, {
            method: 'GET',
        })
        let json: IdentifiableUser = await response.json()
        return json
    }

    async getUser(userId: string){
        console.log("getting user "+ userId)
        let response = await fetch(this.backendServerPath+'/users/'+userId, {
            method: 'GET',
        })
        let json: IdentifiableUser = await response.json()
        return json
    }

    async deleteUser(user: IdentifiableUser) {
        return fetch(this.backendServerPath+'/users/'+user._id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
    }

    async updateUser(user: IdentifiableUser) {
        return fetch(this.backendServerPath+'/users/'+user._id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
    }
}

export let userRepository = new UserRepository()