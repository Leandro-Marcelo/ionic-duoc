import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
      canLoad: [AuthGuard]
  },

  {
    path: 'contacto',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'notfound',
    loadChildren: () =>
      import('./notfound/notfound.module').then((m) => m.NotfoundPageModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactPageModule),
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'post-edit',
    loadChildren: () => import('./post-edit/post-edit.module').then( m => m.PostEditPageModule)
  },
  {
    path: 'post-edit/:id',
    loadChildren: () => import('./post-edit/post-edit.module').then(m => m.PostEditPageModule)
  },
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
