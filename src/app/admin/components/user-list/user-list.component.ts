import { Component, OnInit } from '@angular/core';
import { DataColumnType, DatatableColData } from 'src/app/shared/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  sampleColData: Array<DatatableColData>;
  sampleRowData: Array<any>;

  constructor() {
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

    this.sampleRowData = [
      {
        userName: 'testUser1',
        value: 'Edit',
        createdDate: '2022-06-20T05:00:00.000Z',
      },
      {
        userName: 'testUser2',
        value: 'Edit',
        createdDate: '2022-06-20T05:00:00.000Z',
      },
    ];
  }

  ngOnInit(): void {}
}
