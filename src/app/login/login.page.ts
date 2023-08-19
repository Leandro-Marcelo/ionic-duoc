import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(3).max(8),
  password: z.string().regex(/^\d{4}$/),
});

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: LoginForm = {
    username: '',
    password: '',
  };

  constructor(public toastController: ToastController, private navCtrl: NavController) {}

  ngOnInit() {}

  login() {
    try {
      const validatedData = loginSchema.parse(this.loginForm);
      console.log(validatedData)
      this.presentToast('Welcome');

      this.navCtrl.navigateForward('/home', {
        queryParams: {
          username: this.loginForm.username
        }
      });
    } catch (error: any) {
      let errorMsg = ""
      console.log(error)
      console.log(JSON.stringify(error))
      if (error.issues && error.issues.length >= 1) {
        error.issues.forEach((issue:any) => {
          issue.path.forEach((p: any) => {
            if (p == "username") {
              errorMsg += `el usuario debe ser una cadena alfanumérica de un largo máximo de 8 y mínimo 3 caracteres. `
            }

            if (p == "password") {
              errorMsg += `la password debe ser numérica de 4 dígitos`
            }
          })
        })
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
}
