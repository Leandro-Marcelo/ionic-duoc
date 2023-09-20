import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { ApiService } from '../api/api.service';
import { User } from '../../utils/interfacesAndTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(    private storage: StorageService,
    private apiService: ApiService) { }

  async login(email: string, password: string) {
    try {
      const foundUser = await this.apiService.login(email, password);
      const userData = JSON.stringify(foundUser)
      this.setUserData(userData);

      return foundUser;
    } catch(e) {
      console.log("USER NOT FOUND")
      return
    }
  }

  async getId() {
    return (await this.storage.getStorage('authJwt')).value;
  }

  setUserData(userData: string) {
    this.storage.setStorage('authJwt', userData);
  }

  async register(name: string, email: string, password: string, phone: string) {
    try {
      const registeredUser = await this.apiService.signUp(name, email, password, phone);
      await this.setUserData(JSON.stringify(registeredUser));
    } catch(e) {
      console.log("USER ALREADY EXISTS")
    }
  }

  async logout() {
    try {
      //await this.fireAuth.signOut();
      return this.storage.removeStorage('authJwt');
    } catch(e) {
      throw(e);
    }
  }
}
