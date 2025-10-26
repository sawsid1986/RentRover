/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app.component';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appReducer } from './app/app.reducer';
import { AuthInterceptor } from './app/core/auth/auth.interceptor';

bootstrapApplication(App, {
  providers: [
    provideHttpClient( withInterceptors([AuthInterceptor])),
    provideProtractorTestingSupport(),
    provideRouter(routes),
    provideStore(appReducer)
  ]
}).catch((err) => console.error(err));
