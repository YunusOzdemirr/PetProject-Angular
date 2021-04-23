import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { PetComponent } from "./components/pet/pet-add/pet-add.component";
import { FilterPipePipe } from "./pipes/filter-pipe.pipe";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { PetListComponent } from "./components/pet/pet-list/pet-list.component";
import { UserListComponent } from "./components/user/user-list/user-list.component";
import { PetUpdateComponent } from "./components/pet/pet-update/pet-update.component";
import { UserUpdateComponent } from "./components/user/user-update/user-update.component";
import { LoginComponent } from "./components/authentication/login/login.component";
import { SignUpComponent } from "./components/authentication/sign-up/sign-up.component";
import { AddUserComponent } from "./components/user/add-user/add-user.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { GeneralPageComponent } from "./components/general-page/general-page.component";
import { UserDetailComponent } from "./components/user/user-detail/user-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    PetComponent,
    FilterPipePipe,
    PetListComponent,
    UserListComponent,
    PetUpdateComponent,
    UserUpdateComponent,
    LoginComponent,
    SignUpComponent,
    AddUserComponent,
    NavbarComponent,
    GeneralPageComponent,
    UserDetailComponent,
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
    ToastrModule.forRoot({
      positionClass: "toast-top-full-width",
    }),
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
