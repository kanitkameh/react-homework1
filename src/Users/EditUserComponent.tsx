import { IdentifiableUser } from "./User";
import React, { FormEvent, useState } from 'react';
import { AccountStatus, Gender, Role } from '../Users/User';
import { userRepository } from '../Users/UserRepository';
import { useLoaderData } from "react-router-dom";

export function EditUserComponent() {
  const user: IdentifiableUser = useLoaderData() as IdentifiableUser;

  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [password, setPassword] = useState(user.password);
  const [photo, setPhoto] = useState(user.photo?.toString() ?? "");
  const [description, setDescription] = useState(user.description);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let updatedUser: IdentifiableUser = new IdentifiableUser(
            user.id,
            name, //име на потребителя;реализоирано
            username, //login име (username - до 15 символа - word characters);
            password, //парола (поне 8 символа, поне една цифра и знак различен от буква и цифра);
            gender, //пол;
            Role.User, //потребителска роля (user или admin);
            new URL(photo), //снимка на потребителя (може да бъде URL, ако липсва се замества с аватара по подразбиране в зависимост от пола);
            description, //кратко представяне на потребителя (до 512 символа);
            AccountStatus.Active, //статус на валидност на акаунта - (active, suspended или deactivated);
            user.registrationTime, 
            new Date() 
            )
    console.log("Updated user to: " + JSON.stringify(updatedUser));
    userRepository.updateUser(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} id="userRegistrationForm" >
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        maxLength={15}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      /><br/>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      /><br/>

      <label>Gender</label><br/>
      <label htmlFor="male">Male</label>
      <input
        type="radio"
        id="male"
        name="gender"
        value="Male"
        checked={gender === Gender.Male}
        onChange={(event) => setGender(event.target.value as Gender)}
      />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        id="female"
        name="gender"
        value="Female"
        checked={gender === Gender.Female}
        onChange={(event) => setGender(event.target.value as Gender)}
      /><br/>


      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        minLength={8}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      /><br/>

      <label htmlFor="photo">Profile picture URL</label>
      <input
        type="text"
        id="photo"
        name="photo"
        value={photo}
        onChange={(event) => setPhoto(event.target.value)}
      /><br/>

      <label htmlFor="description">Short description</label>
      <input
        type="text"
        id="description"
        name="description"
        maxLength={512}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      /><br/>

      <button type="submit">Save User</button>
    </form>
  );
}