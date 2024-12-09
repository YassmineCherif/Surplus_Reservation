import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';
import { SurplusReponseComponent } from './components/SurplusDonateur/surplus-reponse/surplus-reponse.component';
import { SurplusListComponent } from './components/SurplusDonateur/surplus-affich/surplus-affich.component';
import { SurplusCreateComponent } from './components/SurplusDonateur/surplus-create/operation-create.component';
import { SurplusEditComponent } from './components/SurplusDonateur/surplus-edit/surplus-edit.component';
import { SurplusListBComponent } from './components/SurplusBeneficiaire/surplus-list/surplus-list.component';
import { FrontNavbarComponent } from './components/front-navbar/front-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/User/login/login.component';
import { RegisterComponent } from './components/User/register/register.component';
import { ForgotPasswordComponent } from './components/User/forgot-password/forgot-password.component';
import { UpdateProfileComponent } from './components/User/update-profile/update-profile.component';
import { DashboardComponent } from './components/User/dashboard/dashboard.component';
import { RefrigerateurListComponent } from './components/SurplusBeneficiaire/refrigerateur-list/refrigerateur-list.component';
import { MesrefrigerateurComponent } from './components/SurplusDonateur/mesrefrigerateur/mesrefrigerateur.component';
import { RefrigerateurCreerComponent } from './components/SurplusDonateur/refrigerateur-creer/refrigerateur-creer.component';
import { RefrigerateurEditComponent } from './components/SurplusDonateur/refrigerateur-edit/refrigerateur-edit.component';


// Define your routes here
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'Surplus/all', component: SurplusListComponent },
  { path: 'surplus/create', component: SurplusCreateComponent },
  { path: 'surplus/edit/:id', component: SurplusEditComponent },  
  { path: 'surplus/reserver', component: SurplusListBComponent },
  { path: 'surplus/reponse/:id', component: SurplusReponseComponent },
  { path: 'refrigerateur/all', component: RefrigerateurListComponent },
  { path: 'refrigerateur/list', component: MesrefrigerateurComponent },
  { path: 'refrigerateur/edit/:id', component: RefrigerateurEditComponent },
  { path: 'refrigerateur/create', component: RefrigerateurCreerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'profile', component: UpdateProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    SurplusListComponent,
    SurplusEditComponent,
    SurplusCreateComponent,
    SurplusListBComponent,
    RefrigerateurListComponent,
    MesrefrigerateurComponent,
    RefrigerateurCreerComponent,
    RefrigerateurEditComponent,
    FrontNavbarComponent,
    SurplusReponseComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    UpdateProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
