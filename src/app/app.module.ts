import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgParticlesModule } from 'ng-particles';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@/core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from '@/environments/environment';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';
import { APP_INITIALIZER } from '@angular/core';

function preloadLang(transloco: TranslocoService) {
	const lang = localStorage.getItem('currentLang') || 'en';
	return function () {
		return of(lang).pipe(
			tap(lang => transloco.setActiveLang(lang)),
			switchMap(lang => transloco.load(lang).toPromise()),
		);
	};
}

@NgModule({
	declarations: [AppComponent, PageNotFoundComponent, LandingPageComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		NgParticlesModule,
		AppRoutingModule,
		ScullyLibModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
		HttpClientModule,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			multi: true,
			useFactory: preloadLang,
			deps: [TranslocoService],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
