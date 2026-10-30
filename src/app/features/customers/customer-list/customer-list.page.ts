import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonChip, IonIcon, IonInput } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, chevronForwardOutline, peopleOutline, searchOutline } from 'ionicons/icons';
import { AppShellComponent } from '../../shared/app-shell/app-shell.component';
import { CustomerRecord, DemoDataService } from '../../shared/demo-data.service';

type CustomerFilter = 'All' | 'Active' | 'Overdue' | 'Completed';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AppShellComponent, IonButton, IonChip, IonIcon, IonInput],
  templateUrl: './customer-list.page.html',
  styleUrls: ['./customer-list.page.scss'],
})
export class CustomerListPage {
  readonly demo = inject(DemoDataService);
  searchText = '';
  customerFilter: CustomerFilter = 'All';
  emptyPreview = false;
  readonly filters: CustomerFilter[] = ['All', 'Active', 'Overdue', 'Completed'];

  constructor() {
    addIcons({ addOutline, chevronForwardOutline, peopleOutline, searchOutline });
  }

  get filteredCustomers(): CustomerRecord[] {
    if (this.emptyPreview) return [];
    const query = this.searchText.trim().toLowerCase();
    return this.demo.customers.filter((customer) => {
      const matchesSearch = !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.code.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query);
      return matchesSearch && (this.customerFilter === 'All' || customer.status === this.customerFilter);
    });
  }
}
