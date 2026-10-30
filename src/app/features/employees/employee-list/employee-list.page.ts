import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonButton, IonChip, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ellipsisVertical } from 'ionicons/icons';
import { AppShellComponent } from '../../shared/app-shell/app-shell.component';
import { DemoDataService, EmployeeRecord } from '../../shared/demo-data.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, AppShellComponent, IonButton, IonChip, IonIcon],
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
})
export class EmployeeListPage {
  readonly demo = inject(DemoDataService);
  private readonly router = inject(Router);
  openMenu = -1;
  successMessage = false;
  errorMessage = '';

  constructor() {
    this.successMessage = this.router.getCurrentNavigation()?.extras.state?.['employeeAdded'] === true;
    addIcons({ ellipsisVertical });
  }

  changeStatus(employee: EmployeeRecord): void {
    employee.status = employee.status === 'Active' ? 'Blocked' : 'Active';
    this.openMenu = -1;
  }
}
