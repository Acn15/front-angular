import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  users: User[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get(`${environment.apiUrl}/users`).subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários', err);
      },
    });
  }

  deleteUser(userId: number) {
    if (confirm('Tem certeza que deseja deletar este usuário?')) {
      this.http.delete(`${environment.apiUrl}/users/${userId}`).subscribe({
        next: () => {
          console.log('Usuário deletado com sucesso');
          this.loadUsers();
        },
        error: (err) => {
          console.error('Erro ao deletar usuário', err);
        },
      });
    }
  }
  editUser(id: number) {
    this.router.navigate([`/users/update/${id}`]);
  }

  addUser() {
    this.router.navigate(['/users/create']);
  }
}
