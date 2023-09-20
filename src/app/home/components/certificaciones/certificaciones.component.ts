import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Animation, AnimationController, createAnimation } from '@ionic/angular';
import { CertificationForm } from 'src/app/utils/interfacesAndTypes';
import { DateAdapter } from '@angular/material/core'; 
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
})
export class CertificacionesComponent  implements OnInit {

  ShiftForm: FormGroup = new FormGroup({
    startingDate: new FormControl(),
    startTime: new FormControl(),
    endingDate: new FormControl(),
    endTime: new FormControl(),
  });

  certificationReset: CertificationForm = {
    name: '',
    obtainmentDate: '',
    expires: false,
    expiryDate: '',
    testData: null
  }

  testData: any = new Date();

  //arrInputs = ["certificationNameItem", "certificationObtainmentDateItem", "certificationExpiryDateItem", "certificationExpiresItem"]
  arrInputs = ["certificationNameItem"]

  certification: CertificationForm = {...this.certificationReset}

  constructor(private animationCtrl: AnimationController, private dateAdapter: DateAdapter<any>) { }

  frenchLocale() {
    this.dateAdapter.setLocale('es-ES');
  } 


  start: any = new Date();
  startDate =  "1/1/2018"
  endDate = "1/1/2020"
  ngOnInit() {
    // this.ShiftForm = new FormGroup({
    //   startingDate: new FormControl(this.startDate),
    //   startTime: new FormControl(),
    //   endingDate: new FormControl(this.endDate),
    //   endTime: new FormControl(),
    // });
    this.animateTitle();
  }

  // animateTitle() {
  //   const titleTag = document.getElementById("title-l")!
  //   const titleAnimation: Animation = createAnimation()
  //     .addElement(titleTag)
  //     .duration(2500)
  //     .iterations(Infinity)
  //     .keyframes([
  //       { offset: 0, transform: 'translateX(0)', opacity: '1' },
  //       { offset: 0.25, transform: 'translateX(100%)', opacity: '0.2' },
  //       { offset: 0.5, transform: 'translateX(0)', opacity: '1' },
  //       { offset: 0.75, transform: 'translateX(-100%)', opacity: '0.2' },
  //       { offset: 1, transform: 'translateX(0)', opacity: '1' }
  //     ]);
  
  //   titleAnimation.play();
  // }

  animateTitle() {
    const titleElement = document.getElementById("title-l")!

    const animation: Animation = this.animationCtrl
      .create()
      .addElement(titleElement)
      .duration(1000)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(-25%)', 'translateX(70%)')
      .fromTo('opacity', 1, 0.2)
      .afterStyles({ 'transform': 'translateX(0)', 'opacity': 1 });

    animation.play();
  }
  
  // animateTitle() {
  //   const titleElement = document.getElementById("title-l")!

  //   const titleAnimation = this.animationCtrl.create()
  //     .addElement(titleElement) // Ajusta el selector según tu estructura HTML
  //     .duration(2500)
  //     .iterations(Infinity);

  //   titleAnimation
  //     .keyframes([
  //       { offset: 0, transform: 'translateX(-50%)', opacity: 1 },
  //       { offset: 0.25, transform: 'translateX(0)', opacity: 1 },
  //       { offset: 0.5, transform: 'translateX(0)', opacity: 0.2 },
  //       { offset: 0.75, transform: 'translateX(0)', opacity: 1 },
  //       { offset: 1, transform: 'translateX(-50%)', opacity: 1 },
  //     ]);

  //   titleAnimation.play();
  // }

  // animateTitle() {
  //   const titleElement = document.getElementById("title-l")!

  //   const titleAnimation = this.animationCtrl.create()
  //     .addElement(titleElement) // Ajusta el selector según tu estructura HTML
  //     .duration(2500)
  //     .iterations(Infinity);

  //   titleAnimation
  //     .keyframes([
  //       { offset: 0, transform: 'translateX(-50%)', opacity: 1 },
  //       { offset: 1, transform: 'translateX(25%)', opacity: 1 },
  //     ]);

  //   titleAnimation.play();
  // }

  animateInput(elementId: string) {
    const inputEl = document.getElementById(elementId)!
    console.log(inputEl)

    const inputAnimation: Animation = createAnimation()
      .addElement(inputEl)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'translateX(0)' },
        { offset: 0.2, transform: 'translateX(-7%)' },
        { offset: 0.5, transform: 'translateX(0)' },
        { offset: 0.7, transform: 'translateX(7%)' },
        { offset: 1, transform: 'translateX(0)' },
      ]);
  
    inputAnimation.play();
  }

  clearInputs() {
    this.certification = {...this.certificationReset}
    const certificationExpiresItemTag = document.getElementById("certificationExpiresItem");
    this.arrInputs.forEach(input => {
      if (input == "certificationExpiresItem" && certificationExpiresItemTag === null) {
        return
      }

      this.animateInput(input)
    })
    
  }

  testing() {
    console.log("hello world")
  }
}
