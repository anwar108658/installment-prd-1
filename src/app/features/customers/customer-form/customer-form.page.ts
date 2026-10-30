import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonButton, IonInput, IonTextarea } from '@ionic/angular';
import { AppShellComponent } from '../../shared/app-shell/app-shell.component';
import { DemoDataService } from '../../shared/demo-data.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AppShellComponent, IonButton, IonInput, IonTextarea],
  templateUrl: './customer-form.page.html',
  styleUrls: ['./customer-form.page.scss'],
})
export class CustomerFormPage {
  private readonly demo = inject(DemoDataService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly existingCustomer = this.demo.getCustomer(this.route.snapshot.paramMap.get('code'));
  attempted = false;
  customer = {
    code: this.existingCustomer?.code ?? `C-${String(698 + this.demo.customers.length - 3).padStart(4, '0')}`,
    name: this.existingCustomer?.name ?? '',
    phone: this.existingCustomer?.phone ?? '',
    cnic: this.existingCustomer?.cnic ?? '',
    address: this.existingCustomer?.address ?? '',
    guarantorName: '',
    guarantorPhone: '',
    notes: '',
  };

  get cnicValid(): boolean {
    return /^\d{13}$/.test(this.customer.cnic.replaceAll('-', ''));
  }

  get formValid(): boolean {
    return this.customer.name.trim().length > 0 && this.customer.phone.trim().length > 0 && this.cnicValid;
  }

  get returnToSale(): boolean {
    return this.route.snapshot.queryParamMap.get('returnTo') === 'sale';
  }

  get backUrl(): string {
    if (this.existingCustomer) return `/customers/${this.existingCustomer.code}`;
    return this.returnToSale ? '/sales/new' : '/customers';
  }

  get isEditing(): boolean {
    return this.existingCustomer !== undefined;
  }

  saveCustomer(): void {
    this.attempted = true;
    if (!this.formValid) return;
    const customerDetails = {
      name: this.customer.name.trim(),
      phone: this.customer.phone.trim(),
      cnic: this.customer.cnic,
      address: this.customer.address,
    };
    if (this.existingCustomer) {
      this.demo.updateCustomer(this.customer.code, customerDetails);
    } else {
      this.demo.addCustomer({ code: this.customer.code, ...customerDetails });
      if (this.returnToSale) this.demo.saleDraft.customerCode = this.customer.code;
    }
    void this.router.navigate([this.backUrl]);
  }
}
