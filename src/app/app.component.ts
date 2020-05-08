import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from './core/selectors/core.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { logout } from './core/actions/core.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectUser).pipe(map(user => user != null));
  }

  logout() {
    this.store.dispatch(logout())
  }
}
