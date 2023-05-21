import React, { FormEvent, useState } from 'react';
import { AccountStatus, Gender, Role, User } from '../Users/User';
import { userRepository } from '../Users/UserRepository';

export function RegisterUser() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let user: User = new User(
            name, //име на потребителя;реализоирано
            username, //login име (username - до 15 символа - word characters);
            password, //парола (поне 8 символа, поне една цифра и знак различен от буква и цифра);
            gender as Gender, //пол;
            Role.User, //потребителска роля (user или admin);
            new URL(photo), //снимка на потребителя (може да бъде URL, ако липсва се замества с аватара по подразбиране в зависимост от пола);
            description, //кратко представяне на потребителя (до 512 символа);
            AccountStatus.Active, //статус на валидност на акаунта - (active, suspended или deactivated);
            new Date(), 
            new Date() 
            )
    alert(JSON.stringify(user));
    userRepository.addUser(user);
    // userRepository.add/registerUser
    // action="localhost:3001/users" method="post"
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
        value="male"
        checked={gender === 'male'}
        onChange={(event) => setGender(event.target.value)}
      />
      <label htmlFor="female">Female</label>
      <input
        type="radio"
        id="female"
        name="gender"
        value="female"
        checked={gender === 'female'}
        onChange={(event) => setGender(event.target.value)}
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

      <button type="submit">Register</button>
    </form>
  );
}

