import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTypographyModule,
    NzCardModule,
    NzGridModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}
  frm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }
  login() {
    this.auth
      .login(
        this.frm.get('name')!.value!,
        this.frm.get('email')!.value!,
        this.frm.get('password')!.value!
      )
      .subscribe({
        next: (r) => {
          console.log(r);
          this.auth.storeToken(r.access_token);

          this.message.success('Accesso effettuato con successo');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          const msg = err.error?.errore;

          if (err.status === 401 || err.status === 400) {
            if (
              msg?.includes('email') ||
              msg?.includes('password') ||
              msg?.includes('name')
            ) {
              this.message.error('Credenziali non valide');
            }
          }
        },
      });
  }
}
