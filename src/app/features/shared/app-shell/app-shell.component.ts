import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  calendarOutline,
  homeOutline,
  moonOutline,
  peopleOutline,
  personOutline,
  sunnyOutline,
  syncOutline,
} from 'ionicons/icons';
import { DemoDataService } from '../demo-data.service';

export type AppTab = 'dashboard' | 'customers' | 'recovery' | 'profile' | '';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonTitle,
    IonToolbar,
  ],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {
  readonly demo = inject(DemoDataService);
  @Input({ required: true }) title = '';
  @Input() activeTab: AppTab = '';
  @Input() backUrl = '/customers';
  @Input() showBack = false;

  constructor() {
    addIcons({
      arrowBackOutline,
      calendarOutline,
      homeOutline,
      moonOutline,
      peopleOutline,
      personOutline,
      sunnyOutline,
      syncOutline,
    });
  }

  toggleTheme(): void {
    this.demo.themeMode = this.demo.themeMode === 'dark' ? 'light' : 'dark';
  }
}
