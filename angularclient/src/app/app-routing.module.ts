import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./component/user/user.component";
import {UserFormComponent} from "./component/user-form/user-form.component";
import {RegisterComponent} from "./component/register/register.component";
import {FinishComponent} from "./component/finish/finish.component";

const routes: Routes = [
  {path: '', component: UserFormComponent},
  {path: 'finish', component: FinishComponent},
  {path: 'login', component: UserFormComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent},
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
