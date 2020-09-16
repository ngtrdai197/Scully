import { Component, OnInit } from '@angular/core'
import { ScullyRoutesService } from '@scullyio/ng-lib'
import { map } from 'rxjs/operators'

import { SeoService } from '@/app/core/services'
import { environment as env } from '@/environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .left-side {
        max-height: 465px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  routes$ = this.scullyRoutesService.available$.pipe(
    map((scullyRoutes) =>
      scullyRoutes.filter((scullyRoute) => scullyRoute.route.includes('/blog')),
    ),
  )
  constructor(
    private scullyRoutesService: ScullyRoutesService,
    private readonly seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.update({
      title: 'Dai Nguyen',
      route: `${env.baseUrl}`,
      url: `${env.baseUrl}`,
      image: `${env.baseUrl}/assets/avatar.jpeg`,
      description:
        'I am a developer who is highly interested in TypeScript. My tech stack has been full-stack TS such as Angular, React with TypeScript and NestJS.',
    })
  }
}
