import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonButton, IonIcon, IonInput } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircle, checkmarkOutline, personAddOutline, searchOutline } from 'ionicons/icons';
import { AppShellComponent } from '../../shared/app-shell/app-shell.component';
import { DemoDataService } from '../../shared/demo-data.service';

@Component({
  selector: 'app-new-sale',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AppShellComponent, IonButton, IonIcon, IonInput],
  templateUrl: './new-sale.page.html',
  styleUrls: ['./new-sale.page.scss'],
})
export class NewSalePage {
  readonly demo = inject(DemoDataService);
  private readonly route = inject(ActivatedRoute);
  saleStep = 1;
  saleSaved = false;
  searchText = '';
  sale = this.demo.saleDraft;

  constructor() {
    this.sale.customerCode = this.route.snapshot.queryParamMap.get('customer') ?? this.sale.customerCode;
    addIcons({ checkmarkCircle, checkmarkOutline, personAddOutline, searchOutline });
  }

  get saleBalance(): number {
    return Math.max(this.sale.amount - this.sale.returnAmount, 0);
  }

  get calculatedDailyAmount(): number {
    return this.sale.periodDays > 0 ? Math.ceil(this.saleBalance / this.sale.periodDays) : 0;
  }

  get filteredCustomers() {
    const query = this.searchText.trim().toLowerCase();
    return this.demo.customers.filter((customer) =>
      !query || customer.name.toLowerCase().includes(query) || customer.code.toLowerCase().includes(query),
    );
  }

  nextStep(): void {
    if (this.saleStep < 3) {
      this.saleStep += 1;
      if (this.saleStep === 3) this.sale.dailyInstallment = this.calculatedDailyAmount;
    }
  }

  previousStep(): void {
    this.saleStep = Math.max(1, this.saleStep - 1);
  }

  confirmSale(): void {
    this.saleSaved = true;
  }
}
