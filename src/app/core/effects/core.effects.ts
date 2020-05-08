import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  exhaustMap,
  take,
  map,
  catchError,
  switchMap,
  tap,
} from 'rxjs/operators';
import { of, from, asyncScheduler, scheduled, asapScheduler } from 'rxjs';

import * as CoreActions from '../actions/core.actions';
import { toUser } from '../models/auth';
import { Router } from '@angular/router';

@Injectable()
export class CoreEffects {

  init$ = createEffect(() => {
    return scheduled([CoreActions.getUser()], asyncScheduler);
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.getUser),
      exhaustMap(() =>
        this.fireAuth.authState.pipe(
          take(1),
          switchMap((authData) => {
            console.debug(authData);
            if (authData) {
              const user = toUser(authData);
              return of(CoreActions.authenticated({ user }));
            } else {
              return of(CoreActions.notAuthenticated());
            }
          }),
          catchError((error) => of(CoreActions.notAuthenticated()))
        )
      )
    );
  });

  loginAnonymously$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.loginAnonymously),
      exhaustMap(() => {
        return from(this.loginAnonymously()).pipe(
          map((q) => {
            return CoreActions.getUser();
          })
        );
      }),
      tap(() => {
        this.router.navigate(['']);
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.logout),
      exhaustMap(() => {
        return from(this.logout()).pipe(
          map(() => {
            return CoreActions.notAuthenticated();
          })
        );
      }),
      tap(() => {
        this.router.navigate(['']);
      })
    );
  });

  constructor(private actions$: Actions, private fireAuth: AngularFireAuth, private router: Router) { }

  loginAnonymously(): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.signInAnonymously();
  }

  logout(): Promise<void> {
    return this.fireAuth.signOut();
  }
}
