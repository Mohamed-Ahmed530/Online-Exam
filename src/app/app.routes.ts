import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth/auth.guard';
import { loggedGuard } from './Core/guards/logged/logged.guard';


export const routes: Routes = [

    { path:"", canActivate:[loggedGuard], loadComponent:()=> import('./Core/layouts/auth-layout/auth-layout.component').then( (c)=> c.AuthLayoutComponent ), children:[
        { path:"", redirectTo:"sign-in", pathMatch:"full"},
        { path:"sign-in", loadComponent:()=> import('./Core/pages/login/login.component').then( (c)=>c.LoginComponent), title:"Sign In" },
        { path:"sign-up", loadComponent:()=> import('./Core/pages/register/register.component').then( (c)=>c.RegisterComponent), title:"Sign Up" },
        { path:"forgot-password", loadComponent:()=> import('./Core/pages/forgot-password/forgot-password.component').then( (c)=>c.ForgotPasswordComponent), title:"Forgot Password" }
    ]},
    { path:"", canActivate:[authGuard], loadComponent:()=> import('./Core/layouts/main-layout/main-layout.component').then( (c)=> c.MainLayoutComponent ), children:[
        { path:"", redirectTo:"home", pathMatch:"full" },
        { path:"home", loadComponent:()=> import('../app/Features/pages/home/home.component').then((c)=> c.HomeComponent), title:"Home" }
    ] }
    
];