import { Injectable } from '@angular/core';

export type CustomerStatus = 'Active' | 'Overdue' | 'Completed';

export interface CustomerRecord {
  code: string;
  name: string;
  phone: string;
  item: string;
  balance: number;
  status: CustomerStatus;
  saleAmount: number;
  recovered: number;
  dailyInstallment: number;
  daysRemaining: number;
  progress: number;
  cnic?: string;
  address?: string;
}

export interface RecoveryRecord {
  code: string;
  name: string;
  amount: number;
  status: 'Pending' | 'Overdue' | 'Completed' | 'Paid' | 'Skipped';
  synced: boolean;
  paid: boolean;
}

export interface EmployeeRecord {
  name: string;
  phone: string;
  email: string;
  status: 'Active' | 'Blocked';
}

@Injectable({ providedIn: 'root' })
export class DemoDataService {
  themeMode: 'light' | 'dark' | 'system' = 'light';
  readonly saleDraft = {
    customerCode: '689',
    item: 'LCD 18" Lenovo',
    amount: 360000,
    returnAmount: 0,
    periodDays: 310,
    dailyInstallment: 1160,
    startDate: '2026-11-01',
  };

  readonly customers: CustomerRecord[] = [
    {
      code: '689',
      name: 'Wasil',
      phone: '+92 300 1234567',
      item: 'LCD 18" Lenovo',
      balance: 124700,
      status: 'Active',
      saleAmount: 360000,
      recovered: 235300,
      dailyInstallment: 1160,
      daysRemaining: 108,
      progress: 65,
      cnic: '35202-1234567-1',
      address: 'Gulberg, Lahore',
    },
    {
      code: '704',
      name: 'Ayesha Khan',
      phone: '+92 321 5550184',
      item: 'Samsung A15',
      balance: 48200,
      status: 'Overdue',
      saleAmount: 96000,
      recovered: 47800,
      dailyInstallment: 800,
      daysRemaining: 61,
      progress: 50,
      cnic: '35202-7654321-2',
      address: 'Model Town, Lahore',
    },
    {
      code: '711',
      name: 'Hamza Ali',
      phone: '+92 333 7002319',
      item: 'Haier 32" LED',
      balance: 0,
      status: 'Completed',
      saleAmount: 148000,
      recovered: 148000,
      dailyInstallment: 1200,
      daysRemaining: 0,
      progress: 100,
      cnic: '35202-2468101-3',
      address: 'Johar Town, Lahore',
    },
  ];

  readonly recoveryRows: RecoveryRecord[] = [
    { code: '689', name: 'Wasil', amount: 1160, status: 'Pending', synced: false, paid: false },
    { code: '704', name: 'Ayesha Khan', amount: 800, status: 'Overdue', synced: true, paid: false },
    { code: '718', name: 'Bilal Ahmed', amount: 1250, status: 'Pending', synced: false, paid: false },
    { code: '726', name: 'Maryam Noor', amount: 900, status: 'Paid', synced: true, paid: true },
  ];

  readonly employees: EmployeeRecord[] = [
    { name: 'Ali Raza', phone: '+92 300 7654321', email: 'ali@adtraders.pk', status: 'Active' },
    { name: 'Sara Malik', phone: '+92 321 9876543', email: 'sara@adtraders.pk', status: 'Blocked' },
  ];

  readonly paymentHistory = [
    { date: '30 Oct 2026', amount: 1160 },
    { date: '29 Oct 2026', amount: 1160 },
    { date: '28 Oct 2026', amount: 2320 },
  ];

  getCustomer(code: string | null): CustomerRecord | undefined {
    return this.customers.find((customer) => customer.code === code);
  }

  addCustomer(customer: Omit<CustomerRecord, 'status' | 'saleAmount' | 'recovered' | 'dailyInstallment' | 'daysRemaining' | 'progress' | 'item' | 'balance'>): void {
    this.customers.push({
      ...customer,
      item: 'No active sale',
      balance: 0,
      status: 'Active',
      saleAmount: 0,
      recovered: 0,
      dailyInstallment: 0,
      daysRemaining: 0,
      progress: 0,
    });
  }

  updateCustomer(code: string, updates: Pick<CustomerRecord, 'name' | 'phone' | 'cnic' | 'address'>): void {
    const customer = this.getCustomer(code);
    if (!customer) return;
    Object.assign(customer, updates);
  }

  markPaid(row: RecoveryRecord): void {
    if (row.paid) return;
    row.paid = true;
    row.status = 'Paid';
    row.synced = false;
  }

  skip(row: RecoveryRecord): void {
    if (!row.paid) row.status = 'Skipped';
  }

  recordPayment(customer: CustomerRecord, amount: number): void {
    customer.balance = Math.max(customer.balance - amount, 0);
    customer.recovered += amount;
    customer.progress = customer.saleAmount > 0
      ? Math.min(Math.round((customer.recovered / customer.saleAmount) * 100), 100)
      : 0;
    if (customer.balance === 0) customer.status = 'Completed';
  }

  addEmployee(employee: EmployeeRecord): boolean {
    if (this.employees.some((existing) => existing.email.toLowerCase() === employee.email.toLowerCase())) {
      return false;
    }
    this.employees.push(employee);
    return true;
  }
}
