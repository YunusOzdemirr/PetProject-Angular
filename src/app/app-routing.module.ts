import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetComponent } from './components/pet/pet-add/pet.component';
import { PetDetailComponent } from './components/pet/pet-detail/pet-detail.component';
import { PetListComponent } from './components/pet/pet-list/pet-list.component';
import { PetUpdateComponent } from './components/pet/pet-update/pet-update.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';


const routes: Routes = [
    { path: '', redirectTo: '/register-user', pathMatch: 'full' },
    { path: 'register-user', component: AddUserComponent },
    { path: 'view-users', component: UserListComponent },
    { path: 'edit-user/:id', component: UserUpdateComponent },
    { path: 'add-pet', component: PetComponent },
    { path: 'view-pets', component: PetListComponent },
    { path: 'edit-pet/:id', component: PetUpdateComponent },
    { path: 'detail-pet/:id', component: PetDetailComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes),

    ],

    exports: [RouterModule]
})
export class AppRoutingModule { }
