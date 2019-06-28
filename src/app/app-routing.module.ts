
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CallComponent } from './call/call.component';
const routes: Routes = [
 { path: '', redirectTo: 'call', pathMatch: 'full' },
 { path: 'login', component: LoginComponent },
 { path: 'call', component: CallComponent, canActivate: [AuthGuard] }
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }