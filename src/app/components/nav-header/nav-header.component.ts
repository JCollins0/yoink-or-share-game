import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated, selectUser, State } from 'src/app/reducers';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  private authenticated$ : Observable<boolean>;
  constructor(private store : Store<State>) {
    this.authenticated$ = this.store.select(selectIsAuthenticated);
  }

  public authenticated : boolean = false;

  ngOnInit(): void {
    this.authenticated$.subscribe(authenticated => {
      this.authenticated = authenticated;
    });
    
  }

}
