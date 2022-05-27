import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LogoutAction } from 'src/app/actions/app.actions';
import { selectIsAuthenticated, State } from 'src/app/reducers';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit, OnDestroy {

  private authenticated$ : Subscription;
  constructor(private store : Store<State>) {
    this.authenticated$ = this.store.select(selectIsAuthenticated)
      .subscribe(authenticated => {
        this.authenticated = authenticated;
        if(authenticated){
          setTimeout( () => {
            this.store.dispatch(LogoutAction())
          }, 60000 * 5)
        }
      });
  }

  public authenticated : boolean = false;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authenticated$.unsubscribe();
  }

}
