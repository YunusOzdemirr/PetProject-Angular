import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { PetComponent } from './components/pet/pet-add/pet.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { RouterModule, Routes } from '@angular/router';
import { PetDetailComponent } from './components/pet/pet-detail/pet-detail.component';
import { ReactiveFormsModule } from "@angular/forms";

import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { PetListComponent } from './components/pet/pet-list/pet-list.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { PetUpdateComponent } from './components/pet/pet-update/pet-update.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';

const routes: Routes = [
  { path: '', redirectTo: '/register-user', pathMatch: 'full' },
  { path: 'register-user', component: AddUserComponent },
  { path: 'view-users', component: UserListComponent },
  { path: 'edit-user/:id', component: UserUpdateComponent },
  { path: 'detail-user/:id', component: UserDetailComponent },
  { path: 'add-pet', component: PetComponent },
  { path: 'view-pets', component: PetListComponent },
  { path: 'edit-pet/:id', component: PetUpdateComponent },
  { path: 'detail-pet/:id', component: PetDetailComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    FilterPipePipe,
    PetDetailComponent,
    PetListComponent,
    AddUserComponent,
    UserListComponent,
    UserDetailComponent,
    PetUpdateComponent,
    UserUpdateComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: PetComponent },
      { path: 'pet/:petId', component: PetDetailComponent },
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
