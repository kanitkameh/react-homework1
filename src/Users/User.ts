import { ObjectId } from 'mongodb';

export class User {
    name: string; //име на потребителя;реализоирано
    username: string; //login име (username - до 15 символа - word characters);
    password: string; //парола (поне 8 символа, поне една цифра и знак различен от буква и цифра);
    gender: Gender; //пол;
    role: Role; //потребителска роля (user или admin);
    photo: URL | undefined; //снимка на потребителя (може да бъде URL, ако липсва се замества с аватара по подразбиране в зависимост от пола);
    description: string; //кратко представяне на потребителя (до 512 символа);
    accountStatus: AccountStatus; //статус на валидност на акаунта - (active, suspended или deactivated);
    registrationTime: Date; //дата и час на регистрация (генерира се автоматично);
    modificatinTime: Date; //дата и час на последна модификация (генерира се автоматично);
    constructor(
            name: string, 
            username: string, 
            password: string, 
            gender: Gender, 
            role: Role, 
            photo: URL | undefined, 
            description: string, 
            accountStatus: AccountStatus, 
            registrationTime: Date, 
            modificatinTime: Date) 
            {
                this.name = name;
                this.username = username;
                this.password = password;
                this.gender = gender;
                this.role = role;
                this.photo = photo;
                this.description = description;
                this.accountStatus = accountStatus;
                this.registrationTime = registrationTime;
                this.modificatinTime = modificatinTime;
            }
}
export class IdentifiableUser extends User {
    _id: string; //идентификатор на записа (до 24 символа);

    constructor(
            _id: string,
            name: string, 
            username: string, 
            password: string, 
            gender: Gender, 
            role: Role, 
            photo: URL | undefined, 
            description: string, 
            accountStatus: AccountStatus, 
            registrationTime: Date, 
            modificatinTime: Date) 
            {
                super(
                name,
                username,
                password,
                gender,
                role,
                photo,
                description,
                accountStatus,
                registrationTime,
                modificatinTime);

                this._id = _id;
            }
}
export enum AccountStatus {
    Active, Suspended, Deactivated
}
export enum Gender {
    Male = "Male", Female = "Female"
}
export enum Role {
    Admin = "Admin", User = "User"
}

export function validate_user(user: any){
    let isUserProblems = isUser( user )
    if(isUserProblems.length === 0){
        return validateUserFields(user as User)
    }
    return isUserProblems;
}

export function validateUserFields(user: User){
    let problems = []
    if(user.username.length > 15){
        problems.push("username too long")
    }

    if(user.password.length < 8){
        problems.push("password too short")
    }


    if(user.description.length > 512){
        problems.push("too long user description")
    }
    return problems;
}

function isUser(user: any){
    let problems = []
    if(!(user.gender === Gender.Female || user.gender === Gender.Male)){
        problems.push("invalid gender")
    }

    if(!(user.role === Role.Admin || user.role === Role.User)){
        problems.push("invalid role")
    }
    return problems;
}