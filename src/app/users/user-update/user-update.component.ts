import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-update',
  standalone: true,
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss',
  imports: [FormsModule],
})
export class UserEditComponent implements OnInit {
  user = {
    id: 0,
    name: '',
    email: '',
    document: '',
  };

  private apiUrl = environment.apiUrl;

  originalUser: User = { ...this.user };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.loadUser(userId);
  }

  loadUser(userId: string | null) {
    if (userId) {
      this.http.get(`${this.apiUrl}/users/by-id/${userId}`).subscribe({
        next: (data: any) => {
          this.user = data;
        },
        error: (err) => {
          console.error('Erro ao carregar o usuário', err);
        },
      });
    }
  }

  onSubmit() {
    const modifiedFields = this.getModifiedFields();
    const userId = this.route.snapshot.paramMap.get('id');
    if (Object.keys(modifiedFields).length > 0) {
      this.http
        .patch(`${this.apiUrl}/users/${userId}`, modifiedFields)
        .subscribe({
          next: (response) => {
            // this.toastr.success('Usuário atualizado com sucesso', 'Sucesso');
            this.router.navigate(['/users/list']);
          },
          error: (err) => {
            // this.toastr.error('Erro ao atualizar o usuário', 'Erro');
            console.error('Erro ao atualizar o usuário', err);
          },
        });
    } else {
      // this.toastr.info('Nenhuma alteração foi feita', 'Info');
    }
  }

  getModifiedFields() {
    const modifiedFields: Partial<User> = {};

    (Object.keys(this.user) as (keyof User)[]).forEach((key) => {
      if (
        this.user[key] !== this.originalUser[key] &&
        this.user[key] !== undefined
      ) {
        modifiedFields[key] = this.user[key] as any;
      }
    });

    return modifiedFields;
  }

  goBack() {
    this.router.navigate(['/users/list']);
  }
}
