import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GeneralPageComponent } from "./components/general-page/general-page.component";
import { PetComponent } from "./components/pet/pet-add/pet-add.component";
import { PetListComponent } from "./components/pet/pet-list/pet-list.component";
import { PetUpdateComponent } from "./components/pet/pet-update/pet-update.component";
import { LoginComponent } from "./components/authentication/login/login.component";
import { SignUpComponent } from "./components/authentication/sign-up/sign-up.component";
import { UserListComponent } from "./components/user/user-list/user-list.component";
import { UserUpdateComponent } from "./components/user/user-update/user-update.component";
import { AddUserComponent } from "./components/user/add-user/add-user.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserDetailComponent } from "./components/user/user-detail/user-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/login-user", pathMatch: "full" },
  { path: "register-user", component: SignUpComponent },
  { path: "general-page", component: GeneralPageComponent },
  { path: "detail-user/:id", component: UserDetailComponent },
  { path: "add-user", component: AddUserComponent },
  { path: "login-user", component: LoginComponent },
  { path: "view-users", component: UserListComponent },
  { path: "edit-user/:id", component: UserUpdateComponent },
  { path: "add-pet", component: PetComponent },
  { path: "view-pets", component: PetListComponent },
  { path: "edit-pet/:id", component: PetUpdateComponent },
  { path: "navbar/:id", component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
