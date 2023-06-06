import { ObjectId } from 'mongodb';

export class User {
    name: string; //име на потребителя;реализоирано
    username: string; //login име (username - до 15 символа - word characters);
    password: string; //парола (поне 8 символа, поне една цифра и знак различен от буква и цифра);
    gender: Gender; //пол;
    role: Role; //потребителска роля (user или admin);
    photo: URL | undefined; //снимка на потребителя (може да бъде URL, ако липсва се замества с аватара по подразбиране в зависимост от пола);
    description: string; //кратко представяне на потребителя (до 512 символа);
    accountStatu: AccountStatus; //статус на валидност на акаунта - (active, suspended или deactivated);
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
            accountStatu: AccountStatus, 
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
                this.accountStatu = accountStatu;
                this.registrationTime = registrationTime;
                this.modificatinTime = modificatinTime;
            }
}
export class IdentifiableUser extends User {
    _id: ObjectId; //идентификатор на записа (до 24 символа);

    constructor(
            _id: ObjectId,
            name: string, 
            username: string, 
            password: string, 
            gender: Gender, 
            role: Role, 
            photo: URL | undefined, 
            description: string, 
            accountStatu: AccountStatus, 
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
                accountStatu,
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
    Admin, User
}
