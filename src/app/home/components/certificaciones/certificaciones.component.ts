import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController, createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
})
export class CertificacionesComponent  implements OnInit {

  certification = {
    name: '',
    obtainmentDate: '',
    expires: false,
    expiryDate: ''
  };

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
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

  // animateTitle() {
  //   const titleElement = document.getElementById("title-l")!

  //   const animation: Animation = this.animationCtrl
  //     .create()
  //     .addElement(titleElement)
  //     .duration(1000)
  //     .iterations(Infinity)
  //     .fromTo('transform', 'translateX(0)', 'translateX(50%)')
  //     .fromTo('opacity', 1, 0.2)
  //     .afterStyles({ 'transform': 'translateX(0)', 'opacity': 1 });

  //   animation.play();
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
  //       { offset: 0.25, transform: 'translateX(0)', opacity: 1 },
  //       { offset: 0.5, transform: 'translateX(0)', opacity: 0.2 },
  //       { offset: 0.75, transform: 'translateX(0)', opacity: 1 },
  //       { offset: 1, transform: 'translateX(-50%)', opacity: 1 },
  //     ]);

  //   titleAnimation.play();
  // }

  animateTitle() {
    const titleElement = document.getElementById("title-l")!

    const titleAnimation = this.animationCtrl.create()
      .addElement(titleElement) // Ajusta el selector según tu estructura HTML
      .duration(2500)
      .iterations(Infinity);

    titleAnimation
      .keyframes([
        { offset: 0, transform: 'translateX(-50%)', opacity: 1 },
        { offset: 1, transform: 'translateX(25%)', opacity: 1 },
      ]);

    titleAnimation.play();
  }
}
