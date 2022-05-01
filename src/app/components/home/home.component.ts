import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { selectIsAuthenticated, State } from 'src/app/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private store: Store<State>,
  ) { }

  ngOnInit(): void {

    this.store.select(selectIsAuthenticated)
      .pipe(take(1))
      .subscribe(authenticated => {
        if(authenticated){
          
        }else{
          this.router.navigate(['/login'])
        }
      })
  }

  ngOnDestroy(): void {
  }

  navAway(): void {
    this.router.navigate(['/dashboard'])
  }

  sendTest(): void {
    
  }
}
