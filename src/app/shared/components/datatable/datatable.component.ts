import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';
import { TableDirective } from '../../directives/table.directive';
import { DataColumnType, DatatableColData } from '../../models';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit, AfterContentInit {
  DataColumnType = DataColumnType;
  @Input() colData: Array<DatatableColData> = [];
  _rowData: Array<any> = [];
  @Input() set rowData(rowData: Array<any> | null) {
    this._rowData = rowData === null ? [] : rowData;
  }

  @ContentChildren(TableDirective) tableTemplates!: QueryList<TableDirective>;

  constructor() {}

  ngOnInit(): void {
    console.log('Inited datatable');
  }

  ngAfterContentInit(): void {
    console.log(this.tableTemplates);
  }

  findTemplate(id: string): TemplateRef<any> | null {
    return this.tableTemplates.find((td) => td.id === id)?.templateRef ?? null;
  }
}
