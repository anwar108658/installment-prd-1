import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonBadge, IonButton, IonChip, IonIcon, IonModal } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  callOutline,
  chevronForwardOutline,
  informationCircleOutline,
  lockClosedOutline,
  logOutOutline,
  mailOutline,
  moonOutline,
  peopleOutline,
  personOutline,
  sunnyOutline,
  syncOutline,
} from 'ionicons/icons';
import { AppShellComponent } from '../shared/app-shell/app-shell.component';
import { DemoDataService } from '../shared/demo-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent, IonBadge, IonButton, IonChip, IonIcon, IonModal],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  readonly demo = inject(DemoDataService);
  logoutDialogOpen = false;

  constructor() {
    addIcons({
      callOutline,
      chevronForwardOutline,
      informationCircleOutline,
      lockClosedOutline,
      logOutOutline,
      mailOutline,
      moonOutline,
      peopleOutline,
      personOutline,
      sunnyOutline,
      syncOutline,
    });
  }
}
