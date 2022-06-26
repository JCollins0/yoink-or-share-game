import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataColumnType, DatatableColData } from 'src/app/shared/models';
import { RootState } from 'src/app/store';
import { UserListDatatableRowData } from '../../models/table-models';
import { LoadUserList } from '../../store/actions/user-list.actions';
import { selectUsersList } from '../../store/reducers';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  sampleColData: Array<DatatableColData>;
  userListData$: Observable<Array<UserListDatatableRowData>>;

  constructor(private store: Store<RootState>) {
    this.sampleColData = [
      {
        type: DataColumnType.TEXT,
        title: 'User Name',
        label: 'userName',
      },
      {
        type: DataColumnType.DATE,
        title: 'Created',
        label: 'createdDate',
      },
      {
        type: DataColumnType.TEMPLATE,
        title: 'Buttons',
        label: 'buttons',
      },
    ];

    this.store.dispatch(LoadUserList());

    this.userListData$ = this.store.select(selectUsersList).pipe(
      map((userList) =>
        userList.map((user) => {
          return {
            userName: user.userName,
            value: 'Edit',
            createdDate: user.createdDate,
          };
        })
      )
    );
  }

  ngOnInit(): void {}
}
