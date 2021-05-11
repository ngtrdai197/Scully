import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { SharedModule } from '@/shared/shared.module'
import { HomeComponent } from './home.component'
import { SideComponent } from './side/side.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'me', pathMatch: 'full' },
      {
        path: 'me',
        loadChildren: () =>
          import('@/app/about-me/about-me.module').then((m) => m.AboutMeModule),
        data: { animation: 'me' },
      },
      {
        path: 'blog-list',
        loadChildren: () =>
          import('@/app/blogs/blogs.module').then((m) => m.BlogsModule),
        data: { animation: 'blog-list' },
      },
    ],
  },
]

@NgModule({
  declarations: [HomeComponent, SideComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class HomeModule {}
