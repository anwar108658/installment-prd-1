import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonInput } from '@ionic/angular';
import { AppShellComponent } from '../../shared/app-shell/app-shell.component';
import { DemoDataService } from '../../shared/demo-data.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, AppShellComponent, IonButton, IonInput],
  templateUrl: './employee-form.page.html',
  styleUrls: ['./employee-form.page.scss'],
})
export class EmployeeFormPage {
  private readonly demo = inject(DemoDataService);
  private readonly router = inject(Router);
  showPassword = false;
  attempted = false;
  employee = { name: '', email: '', password: '', phone: '', cnic: '' };
  errorMessage = '';

  saveEmployee(): void {
    this.attempted = true;
    if (!this.employee.name.trim() || !this.employee.email.trim() || !this.employee.password) {
      this.errorMessage = 'Complete the required fields to continue.';
      return;
    }

    const added = this.demo.addEmployee({
      name: this.employee.name.trim(),
      email: this.employee.email.trim(),
      phone: this.employee.phone.trim(),
      status: 'Active',
    });
    if (!added) {
      this.errorMessage = 'This email already exists';
      return;
    }
    this.errorMessage = '';
    void this.router.navigate(['/employees'], { state: { employeeAdded: true } });
  }
}
