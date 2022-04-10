import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser, State } from './reducers'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'yoink-or-share';

  constructor(private store : Store<State>){}

  ngOnInit(){
  }
}
