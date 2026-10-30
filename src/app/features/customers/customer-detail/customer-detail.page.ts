import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonButton,
  IonChip,
  IonIcon,
  IonInput,
  IonModal,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  callOutline,
  checkmarkCircle,
  checkmarkOutline,
  closeOutline,
  ellipsisVertical,
  logoWhatsapp,
} from 'ionicons/icons';
import { AppShellComponent } from '../../shared/app-shell/app-shell.component';
import { CustomerRecord, DemoDataService } from '../../shared/demo-data.service';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AppShellComponent,
    IonButton,
    IonChip,
    IonIcon,
    IonInput,
    IonModal,
  ],
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage {
  private readonly route = inject(ActivatedRoute);
  readonly demo = inject(DemoDataService);
  customer: CustomerRecord | undefined = this.demo.getCustomer(this.route.snapshot.paramMap.get('code'));
  menuOpen = false;
  paymentSheetOpen = false;
  paymentSaved = false;
  paymentAmount = 0;
  paymentNote = '';

  constructor() {
    addIcons({ addOutline, callOutline, checkmarkCircle, checkmarkOutline, closeOutline, ellipsisVertical, logoWhatsapp });
  }

  openPaymentSheet(): void {
    if (!this.customer) return;
    this.paymentAmount = this.customer.dailyInstallment;
    this.paymentNote = '';
    this.paymentSaved = false;
    this.paymentSheetOpen = true;
  }

  savePayment(): void {
    if (!this.customer || this.paymentAmount <= 0 || this.paymentAmount > this.customer.balance) return;
    this.demo.recordPayment(this.customer, this.paymentAmount);
    this.paymentSaved = true;
  }
}
