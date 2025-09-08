import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTypographyModule,
    NzCardModule,
    NzGridModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  frm_register = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required),
    },
    { validators: this.passwordMatchValidator }
    //funzione per controllare che le password siano uguali
    // (f: AbstractControl) => {
    //   if (f.get('password')!.value !== f.get('password_confirm')!.value) {
    //     return { password_repeat: false };
    //   }
    //   return null;
    // }
  );

  constructor(
    private auth: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  passwordMatchValidator(
    group: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirm = group.get('password_confirm')?.value;
    return password === confirm ? null : { password_repeat: true };
  }
  // register() {
  //   this.auth
  //     .register(
  //       this.frm_register.get('name')!.value!,
  //       this.frm_register.get('email')!.value!,
  //       this.frm_register.get('password')!.value!
  //     )
  //     .subscribe({
  //       next: (r) => {},
  //       error: () => {},
  //     });
  // }
  // register() {
  //   this.auth
  //     .register(
  //       this.frm_register.get('name')!.value!,
  //       this.frm_register.get('email')!.value!,
  //       this.frm_register.get('password')!.value!
  //     )
  //     .subscribe({
  //       next: (r) => {
  //         this.message.success('Registrazione completata con successo!'); //toast verde con conferma
  //         // eventualmente redirect
  //       },
  //       error: (err) => {
  //         console.error('Errore ricevuto:', err);
  //         if (err.status === 400 && err.error?.errore?.includes('email')) {
  //           this.message.error(`Errore: ${err.error.errore}`); //toast rosso con messaggio specifico
  //         } else {
  //           this.message.error('Impossibile eseguire la registrazione.'); //toast rosso con messaggio generico
  //         }
  //       },
  //     });
  // }
  //   register() {
  //     if (this.frm_register.errors?.['password_repeat']) {
  //       this.message.error('Le password non coincidono');
  //       return;
  //     } else if (this.frm_register.invalid) {
  //       this.message.error('Compila correttamente tutti i campi');
  //       return;
  //     }

  //     this.auth
  //       .register(
  //         this.frm_register.get('name')!.value!,
  //         this.frm_register.get('email')!.value!,
  //         this.frm_register.get('password')!.value!,
  //         this.frm_register.get('password_confirm')!.value!
  //       )
  //       .subscribe({
  //         next: () => {
  //           this.message.success('Registrazione completata con successo!');
  //           this.router.navigate(['/catalogo']);
  //         },
  //         error: (err) => {
  //           const msg = err.error?.errore;
  //           if (err.status === 400 && msg?.includes('email')) {
  //             this.message.error(`Errore: ${msg}`);
  //           } else if (err.status === 400 && msg?.includes('password')) {
  //             this.message.error(`Errore: ${msg}`);
  //           } else {
  //             this.message.warning('Impossibile eseguire la registrazione.');
  //           }
  //         },
  //       });
  //   }
  register() {
    if (this.frm_register.errors?.['password_repeat']) {
      this.message.error('Le password non coincidono');
      return;
    } else if (this.frm_register.invalid) {
      this.message.error('Compila correttamente tutti i campi');
      return;
    }

    const name = this.frm_register.get('name')!.value!;
    const email = this.frm_register.get('email')!.value!;
    const password = this.frm_register.get('password')!.value!;
    const password_confirm = this.frm_register.get('password_confirm')!.value!;

    this.auth.register(name, email, password, password_confirm).subscribe({
      next: () => {
        // Registrazione riuscita, ora login automatico
        this.auth.login(name, email, password).subscribe({
          next: (res) => {
            this.auth.storeToken(res.access_token);
            this.message.success('Registrazione completata. Benvenuta!');
            this.router.navigate(['/home']);
          },
          error: () => {
            this.message.warning('Registrazione ok, ma login fallito');
            this.router.navigate(['/login']);
          },
        });
      },
      error: (err) => {
        const msg = err.error?.errore;
        if (err.status === 400 && msg?.includes('email')) {
          this.message.error(`Errore: ${msg}`);
        } else if (err.status === 400 && msg?.includes('password')) {
          this.message.error(`Errore: ${msg}`);
        } else {
          this.message.warning('Impossibile eseguire la registrazione.');
        }
      },
    });
  }
}
