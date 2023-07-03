import * as yup from 'yup';

// Used for creation of users
export class UserDTO {
    constructor(
            public name: string, 
            public username: string, 
            public password: string, 
            public gender: Gender, 
            public role: Role, 
            public photo: URL | undefined, 
            public description: string, 
            public accountStatus: AccountStatus
            ){}
}

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

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup
    .string()
    .max(15)
    .matches(/^\w+$/)
    .required(),
  password: yup
    .string()
    .min(8)
    .matches(/^(?=.*[0-9])(?=.*[^\w\s]).*$/)
    .required(),
  gender: yup.string().required(),
  role: yup.string().oneOf(['user', 'admin']).required(),
  photo: yup.string().url().notRequired(),
  description: yup.string().max(512).required(),
  accountStatus: yup
    .string()
    .oneOf(['active', 'suspended', 'deactivated'])
    .required(),
  registrationTime: yup.date().required(),
  modificationTime: yup.date().required(),
});

export const userDtoSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup
    .string()
    .max(15)
    .matches(/^\w+$/)
    .required(),
  password: yup
    .string()
    .min(8)
    .matches(/^(?=.*[0-9])(?=.*[^\w\s]).*$/)
    .required(),
  gender: yup.string().required(),
  role: yup.string().oneOf(['user', 'admin']).required(),
  photo: yup.string().url().notRequired(),
  description: yup.string().max(512).required(),
  accountStatus: yup
    .string()
    .oneOf(['active', 'suspended', 'deactivated'])
    .required(),
});