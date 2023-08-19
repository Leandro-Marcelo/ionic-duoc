import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface EducationLevel {
  id: number;
  name: string
}

interface UserInfo {
  name: string;
  lastname: string;
  education: string;
  birthday: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  educationLevels:EducationLevel[]=[
    {id:1, name:"Primaria Incompleta"},
    {id:2, name:"Primaria Completa"},
    {id:3, name:"Secundaria Incompleta"},
    {id:4, name:"Secundaria Completa"},
    {id:5, name:"Terciario/Universitario Incompleto"},
    {id:6, name:"Terciario/Universitario Completo"}
  ]

  userInfoReset: UserInfo = {
    name: "",
    lastname: "",
    education: "",
    birthday: ""
  }

  userInfo: UserInfo = {...this.userInfoReset}

  username: string = ""
  constructor(public alertController: AlertController, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  clear() {
    this.userInfo = {...this.userInfoReset}
    //this.userInfo = {...this.userInfo, ...this.userInfoReset};
  }

  showFullname(){

    if (this.userInfo.name !== "" && this.userInfo.lastname !== "") {
      this.showAlert("Usuario","Su nombre es "+this.userInfo.name+" "+this.userInfo.lastname);
    }

  }

  async showAlert(titulo:string,message:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
