import { Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-update/user-update.component';

export const routes: Routes = [
  { path: 'users/list', component: UserListComponent },
  { path: 'users/create', component: UserCreateComponent },
  { path: 'users/update/:id', component: UserEditComponent },
  { path: '', redirectTo: 'users/list', pathMatch: 'full' },
];
