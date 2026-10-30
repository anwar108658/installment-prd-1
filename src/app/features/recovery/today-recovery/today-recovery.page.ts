import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonChip, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline, checkmarkCircle, documentTextOutline, syncOutline } from 'ionicons/icons';
import { AppShellComponent } from '../../shared/app-shell/app-shell.component';
import { DemoDataService, RecoveryRecord } from '../../shared/demo-data.service';

@Component({
  selector: 'app-today-recovery',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AppShellComponent, IonButton, IonChip, IonIcon],
  templateUrl: './today-recovery.page.html',
  styleUrls: ['./today-recovery.page.scss'],
})
export class TodayRecoveryPage {
  readonly demo = inject(DemoDataService);
  recoveryDate = '2026-11-01';
  private readonly sampleCollected = 24650;
  readonly dailyTarget = 38000;

  constructor() {
    addIcons({ calendarOutline, checkmarkCircle, documentTextOutline, syncOutline });
  }

  get collectedToday(): number {
    return this.sampleCollected + this.demo.recoveryRows
      .filter((row) => row.paid && row.code !== '726')
      .reduce((sum, row) => sum + row.amount, 0);
  }

  get progress(): number {
    return Math.min((this.collectedToday / this.dailyTarget) * 100, 100);
  }

  markPaid(row: RecoveryRecord): void {
    this.demo.markPaid(row);
  }

  skip(row: RecoveryRecord): void {
    this.demo.skip(row);
  }
}
