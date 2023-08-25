import { Component, OnInit } from '@angular/core';
import { createAnimation } from '@ionic/angular';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
})
export class ExperienciaLaboralComponent  implements OnInit {

  experience = {
    company: '',
    startYear: '',
    currentlyWorking: false,
    endYear: '',
    position: ''
};

  constructor() { }

  titleAnimation() {
    const titleTag = document.getElementById("title-l")!

    console.log(titleTag)

    const animation = createAnimation()
      .addElement(titleTag)
      .duration(2500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(0)', opacity: '1' },
        { offset: 0.25, transform: 'translateX(100%)', opacity: '0.2' },
        { offset: 0.5, transform: 'translateX(0)', opacity: '1' },
        { offset: 0.75, transform: 'translateX(-100%)', opacity: '0.2' },
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);
  
    animation.play();
  }

  ngOnInit() {}

  runAnimation() {
    this.titleAnimation();
  }

}