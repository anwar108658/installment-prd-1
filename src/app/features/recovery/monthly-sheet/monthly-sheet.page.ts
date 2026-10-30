import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonSelect, IonSelectOption } from '@ionic/angular';
import { AppShellComponent } from '../../shared/app-shell/app-shell.component';

@Component({
  selector: 'app-monthly-sheet',
  standalone: true,
  imports: [CommonModule, FormsModule, AppShellComponent, IonButton, IonSelect, IonSelectOption],
  templateUrl: './monthly-sheet.page.html',
  styleUrls: ['./monthly-sheet.page.scss'],
})
export class MonthlySheetPage {
  selectedMonth = 'Nov 2026';
  readonly days = Array.from({ length: 31 }, (_, index) => index + 1);
  readonly dailyAmounts = Array.from({ length: 31 }, (_, index) => index < 25 ? 1160 : null);
}
