//write interceptor to pass bearer token if it is present in the store
import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { Observable, catchError, empty, throwError, firstValueFrom, take, switchMap } from 'rxjs';
import { selectToken, selectUsername } from './auth.selectors';
import { logout } from './auth.actions';
import { AppState } from 'src/app/app.state';


export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {

  const store = inject(Store<AppState>);
  const router = inject(Router);

  store.select(selectToken).pipe(take(1)).subscribe(token => {
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next(req).pipe(
      catchError((err, caught) => {
        if (err.status === 401) {
          store.dispatch(logout());
          router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  })
  return next(req).pipe(
    catchError((err, caught) => {
      if (err.status === 401) {
        store.dispatch(logout());
        router.navigate(['/login']);
      }
      return throwError(err);
    })
  );
};