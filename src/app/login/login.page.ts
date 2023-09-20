import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { z } from 'zod';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(/^\d{4}$/),
});

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: LoginForm = {
    email: 'leandro123@gmail.com',
    password: '1234',
  };

  isAuthenticated = '';

  constructor(
    public toastController: ToastController,
    private navCtrl: NavController,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const authJwt: any = await this.storageService.getStorage('authJwt');

    console.log(`authJwt`);
    console.log(authJwt);
    if (authJwt) {
      const parsedAuthJwt = JSON.parse(authJwt.value);
      this.goToHome(parsedAuthJwt.name);
    }
  }

  async login() {
    try {
      const validatedData = loginSchema.parse(this.loginForm);
      console.log(validatedData);
      //this.presentToast('Welcome');

      const foundUser = await this.authService.login(
        this.loginForm.email,
        this.loginForm.password
      );

      if (foundUser) {
        this.goToHome(foundUser.name);
      } else {
        this.presentToast('Credenciales Invalidas');
      }
    } catch (error: any) {
      let errorMsg = '';
      console.log(error);
      console.log(JSON.stringify(error));
      if (error.issues && error.issues.length >= 1) {
        error.issues.forEach((issue: any) => {
          issue.path.forEach((p: any) => {
            // if (p == 'username') {
            //   errorMsg += `el usuario debe ser una cadena alfanumérica de un largo máximo de 8 y mínimo 3 caracteres. `;
            // }

            if (p == 'password') {
              errorMsg += `la password debe ser numérica de 4 dígitos`;
            }
          });
        });
      }

      this.presentToast(errorMsg);
    }
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }

  goToHome(name: string) {
    this.navCtrl.navigateForward('/home', {
      queryParams: {
        name,
      },
    });
  }
}
