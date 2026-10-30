
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonSpinner,
} from '@ionic/angular';
import { AuthService } from '../../../core/services/authService/authservice';
import { Router } from '@angular/router';
import { MessageService } from '../../../core/services/message/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonSpinner,
    ReactiveFormsModule,
  ],
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly msg = inject(MessageService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  readonly loading = signal(false);
  readonly error = signal('');

  async submit(): Promise<void> {
    // if (this.loading()) return;
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }

    // this.error.set('');
    // this.loading.set(true);
    // try {
    //   await this.auth.login(this.form.getRawValue());
    //   this.msg.success(`Khush amdeed, ${this.auth.user()?.name ?? ''}`);
    //   await this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    // } catch (cause: unknown) {
    //   const message = this.getLoginErrorMessage(cause);
    //   this.error.set(message);
    //   this.msg.error(message);
    // } finally {
    //   this.loading.set(false);
    // }
  }

  private getLoginErrorMessage(error: unknown): string {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return 'Internet Issue';
    }

    if (typeof error !== 'object' || error === null) {
      return 'Login nahi ho saka, dobara koshish karein';
    }

    if ('type' in error && error.type === 'user_invalid_credentials') {
      return 'Email ya password galat hai';
    }
    if ('type' in error && error.type === 'user_blocked') {
      return 'Ye account block hai, admin se rabta karein';
    }
    if ('code' in error && error.code === 429) {
      return 'Bohat zyada koshish ho gayi, thori der baad dobara try karein';
    }
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    return 'Login nahi ho saka, dobara koshish karein';
  }
}
