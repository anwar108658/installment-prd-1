import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  template: '<ion-content></ion-content>',
  standalone: true,
  imports: [IonContent],
  styleUrls: ['./home.page.scss'],
})
export class HomePage {}
