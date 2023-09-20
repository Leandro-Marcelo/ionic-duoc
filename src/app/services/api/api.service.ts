import { Injectable } from '@angular/core';
import { User } from 'src/app/utils/interfacesAndTypes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  users: User[] = [
    {
      id: 1,
      name: 'User 1',
      password: 'leandro123',
      email: 'user1@gmail.com',
      phone: '1111111',
    },
    {
      id: 2,
      name: 'User 2',
      password: 'leandro123',
      email: "user2@gmail.com",
      phone: '2222222',
    },
    {
      id: 3,
      name: 'Lean',
      email: 'leandro123@gmail.com',
      password: "1234",
      phone: '3333333',
    }
  ]

  async collection() {
    return this.users;
  }

  async findUserByEmailAndPassword(email: string, password: string) {
     const user = this.users.find(user => user.email === email && user.password === password);

      if(user) {
        return user;
      }

      return null
  }

  async login(email: string, password: string): Promise<User> {
    const foundUser = await this.findUserByEmailAndPassword(email, password);

    if (!foundUser) {
      throw new Error('User not found');
    }

    return foundUser;
  }

  async signUp(name: string, email: string, password: string, phone: string) {
    const foundUser = await this.findUserByEmailAndPassword(email, password);

    if (foundUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: this.users.length + 1,
      name,
      email,
      password,
      phone,
    }

    this.users.push(newUser);

    return newUser;
  }
  
}
