import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  imports: [FormsModule],
})
export class UserCreateComponent {
  user = {
    name: '',
    email: '',
    document: '',
    password: '',
  };

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post(`${this.apiUrl}/users`, this.user).subscribe({
      next: (response) => {
        console.log('Usuário criado com sucesso', response);
        this.router.navigate(['/users/list']);
      },
      error: (err) => {
        console.error('Erro ao criar usuário', err);
      },
    });
  }
  goBack() {
    this.router.navigate(['/users/list']);
  }
}
