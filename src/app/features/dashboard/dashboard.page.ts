import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline, peopleOutline, walletOutline } from 'ionicons/icons';
import { AppShellComponent } from '../shared/app-shell/app-shell.component';
import { DemoDataService } from '../shared/demo-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent, IonIcon],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  readonly demo = inject(DemoDataService);

  constructor() {
    addIcons({ calendarOutline, peopleOutline, walletOutline });
  }
}
