import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CertificacionesComponent } from './components/certificaciones/certificaciones.component';
import { createAnimation } from '@ionic/core';
import { AuthService } from '../services/auth/auth.service';


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
  constructor(public alertController: AlertController, private route: ActivatedRoute, private authService: AuthService, private navController: NavController) {
  }

  selectedSegment: string = 'certificaciones';

  // segmentChanged(event) {
  //   // ... tu código aquí ...
  
  //   this.titleAnimation();
  // }

segmentChanged(event: any) {
  if (event.detail.value === 'logout') {
    this.handleLogout();
    return;
  }

  this.selectedSegment = event.detail.value;
  
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

  handleLogout() {
    console.log("handleLOGOTGHUA")
    this.authService.logout();
    this.navController.navigateForward('/login')
  }
}
