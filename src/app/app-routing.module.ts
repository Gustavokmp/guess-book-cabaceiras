import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'guest-book',
    loadChildren: () => import('./guest-book/guest-book.module').then( m => m.GuestBookPageModule)
  },
  {
    path: 'frame-image',
    loadChildren: () => import('./frame-image/frame-image.module').then( m => m.FrameImagePageModule)
  },
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
