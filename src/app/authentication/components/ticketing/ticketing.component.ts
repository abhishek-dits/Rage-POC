import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { Subscription } from 'rxjs';
import { TableFilterType } from '../../../enums';
import { ChangedField, GridColumn, Ticket } from '../../../interface';
import { TicketService } from '../../../service';
import { InlineFiltersComponent } from '../inline-filters/inline-filters.component';
import { NgxDaterangepickerBootstrapComponent, NgxDaterangepickerBootstrapDirective, NgxDaterangepickerBootstrapModule } from "ngx-daterangepicker-bootstrap";
import { AddNewTicketComponent } from '../add-new-ticket/add-new-ticket.component';

@Component({
  selector: 'app-ticketing',
  standalone: true,
  templateUrl: './ticketing.component.html',
  styleUrl: './ticketing.component.scss',
  providers: [TranslateService, TranslateStore],
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    InlineFiltersComponent,
    MatIconModule,
    TranslateModule,
    MatSortModule,
    JsonPipe,
    CdkDrag,
    CdkDropList,
    MatTableExporterModule,
    MatMenuModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    AddNewTicketComponent,
    NgxDaterangepickerBootstrapDirective, 
    NgxDaterangepickerBootstrapComponent,
    NgxDaterangepickerBootstrapModule
  ],
})
export class TicketingComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort;

  public displayedColumns = [
    'date',
    'time',
    'ticket',
    'username',
    'branchCode',
    'branchName',
    'reasonForCall',
    'clockNumber',
    'issue',
    'reportedAt',
    'resolved',
    'newStore',
    'notes',
    'status',
    'reasonForChange',
    'transferTo',
    'transferredFrom',
    'assignedTo',
    'numberOfFiles',
    'files',
  ];
  public displayedColumnFilters: string[] = [
    'DateFilter',
    'TimeFilter',
    'TicketFilter',
    'UserFilter',
    'BranchCodeFilter',
    'BranchNameFilter',
    'ReasonForCallFilter',
    'ClockNumberFilter',
    'IssueFilter',
    'ReportedAtFilter',
    'ResolvedFilter',
    'NewStoreFilter',
    'NotesFilter',
    'StatusFilter',
    'ReasonForChangeFilter',
    'TransferToFilter',
    'TransferredFromFilter',
    'AssignedToFilter',
    'NumberOfFilesFilter',
    'FilesFilter',
  ];
  public filterText = {
    date: '',
    time: '',
    ticket: '',
    username: '',
    branchCode: '',
    branchName: '',
    reasonForCall: '',
    clockNumber: '',
    issue: '',
    reportedAt: '',
    resolved: '',
    newStore: '',
    notes: '',
    status: '',
    reasonForChange: '',
    transferTo: '',
    transferredFrom: '',
    assignedTo: '',
    numberOfFiles: '',
    files: '',
  };
  public columns: Array<GridColumn> = [
    {
      name: 'date',
      displayName: 'Date',
      sort: true,
      filterType: TableFilterType.NUMBER,
    },
    {
      name: 'time',
      displayName: 'Time',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'ticket',
      displayName: 'Ticket #',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'username',
      displayName: 'Username',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'branchCode',
      displayName: 'Branch Code',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'branchName',
      displayName: 'Branch Name',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'reasonforCall',
      displayName: 'Reason For Call',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'clockNumber',
      displayName: 'Clock Number',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'issue',
      displayName: 'Issue',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'reportedAt',
      displayName: 'Reported At',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'resolved',
      displayName: 'Resolved',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'newStore',
      displayName: 'New Store',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'notes',
      displayName: 'Notes',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'status',
      displayName: 'Status',
      sort: true,
      filterType: TableFilterType.SELECT,
      options: [],
    },
    {
      name: 'reasonForChange',
      displayName: 'Reason For Change',
      sort: true,
      filterType: TableFilterType.SELECT,
      options: [],
    },
    {
      name: 'transferTo',
      displayName: 'Transfer To',
      sort: true,
      filterType: TableFilterType.SELECT,
      options: [],
    },
    {
      name: 'transferredFrom',
      displayName: 'Transfer From',
      sort: true,
      filterType: TableFilterType.SELECT,
      options: [],
    },
    {
      name: 'assignedTo',
      displayName: 'Assigned To',
      sort: true,
      filterType: TableFilterType.SELECT,
      options: [],
    },
    {
      name: 'numberOfFiles',
      displayName: 'Number Of Files',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'files',
      displayName: 'Files',
      sort: true,
      filterType: TableFilterType.NONE,
    },
  ];

  public dataSource = new MatTableDataSource([]);
  public loaded = false;
  public resultsLength = 0;
  public data$: Ticket[] = [];
  public filteredData: Ticket[] = [];
  showAddDialog =false;

  private subscription = new Subscription();

  constructor(private ticketService: TicketService) {}
  originalArray: Ticket[] = [];
  editingElement: Ticket | null = null;
  editingField: string | null = null;
  changedRows: Set<number> = new Set();
  previewChanges = false;
  changedFields: ChangedField[] = [];
  changedDataSet: Ticket[] = [];

  uniqueStatusOptions: string[];
  uniqueReasonForChangeOptions: string[] =[];
  uniquetransferToOptions: string[]=[];
  uniquetransferredFromOptions: string[]=[];
  uniqueAssignedToOptions: string[]=[];

  isEdit = false;
  pageIndex = 0;
  pageSize = 5;

  toggle(){
    this.showAddDialog = !this.showAddDialog;
  }
  ngOnInit() {
    if (this.columns)
      this.displayedColumns = this.columns.map((col) => col.name);

    this.ticketService.getTickets().subscribe((data) => {
      const t = data;
      // deep copy
      this.originalArray = JSON.parse(JSON.stringify(data));
      this.data$ = [...t];
      this.filteredData = [...t];
      this.resultsLength = data.length;
      debugger
      this.extractUniqueOptions();
    });
    // Reset page index on load
    this.pageIndex = 0;
    // Set the options for each column
    this.columns.find(col => col.name === 'status')!.options = this.uniqueStatusOptions;
    this.columns.find(col => col.name === 'reasonForChange')!.options = this.uniqueReasonForChangeOptions;
    this.columns.find(col => col.name === 'transferTo')!.options = this.uniquetransferToOptions;
    this.columns.find(col => col.name === 'transferredFrom')!.options = this.uniquetransferredFromOptions;
    this.columns.find(col => col.name === 'assignedTo')!.options = this.uniqueAssignedToOptions;

    this.bindGrid();
  }

  extractUniqueOptions() {
    const statusSet = new Set<string>();
    const reasonForChangeSet = new Set<string>();
    const transferToSet = new Set<string>();
    const transferredFromToSet = new Set<string>();
    const assignedToSet = new Set<string>();

    this.originalArray.forEach((item) => {
      statusSet.add(item.status);
      reasonForChangeSet.add(item.reasonForChange);
      transferToSet.add(item.transferTo);
      transferredFromToSet.add(item.transferredFrom);
      assignedToSet.add(item.assignedTo);
    });

    this.uniqueStatusOptions = Array.from(statusSet);
    this.uniqueReasonForChangeOptions = Array.from(reasonForChangeSet);
    this.uniquetransferToOptions = Array.from(transferToSet);
    this.uniquetransferredFromOptions = Array.from(transferredFromToSet);
    this.uniqueAssignedToOptions = Array.from(assignedToSet);
  }

  handlePageEvent(pageEvent: PageEvent) {
    // Update pageIndex
    this.pageIndex = pageEvent.pageIndex;
    // Update pageSize
    this.pageSize = pageEvent.pageSize;
    // Refresh the grid
    this.bindGrid();
  }

  isEditing(element: Ticket, field: string) {
    return this.editingElement === element && this.editingField === field;
  }

  editElement(element: Ticket, field: string) {
    this.editingElement = element;
    this.editingField = field;
    this.isEdit = true;
  }

  onEditSave(element: Ticket) {
    const ticket = this.data$.findIndex((x) => x.ticket === element.ticket);
    const changedSet = [];
    // Check for changes
    Object.keys(element).forEach((key) => {
      // Compare with original value (you might want to store original values when starting edit)
      if (this.originalArray[ticket][key] !== element[key]) {
        debugger;

        const existingField = this.changedFields.find(
          (x) => x.ticketId === element.ticket
        );

        if (existingField) {
          // If the key already exists, add the new ticketId if it isn't already included
          if (!existingField.key.includes(key)) {
            existingField.key.push(key);
          }
        } else {
          // If the key does not exist, create a new entry
          this.changedFields.push({ ticketId: element.ticket, key: [key] });
        }
        const index = this.changedDataSet.findIndex(
          (x) => x.ticket === element.ticket
        );
        if (index === -1) this.changedDataSet.push(element);
      }
    });

    this.editingElement = null;
    this.bindGrid();
  }

  isChanged(column, ticket) {
    const changes = this.changedFields.find((x) => x.ticketId === ticket);
    return changes ? changes.key.includes(column) : false;
  }

  showPreviewChanges() {
    this.previewChanges = true;
    this.dataSource = new MatTableDataSource(this.changedDataSet);
  }

  hidePreviewChanges() {
    this.previewChanges = false;
    this.dataSource = new MatTableDataSource(...[this.filteredData]);
  }

  cancelChanges() {
    this.previewChanges = false;
    this.isEdit = false;
    const dataSource = JSON.parse(JSON.stringify(this.originalArray));
    this.dataSource = new MatTableDataSource(...[dataSource]);
  }

  bindGrid() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.dataSource = new MatTableDataSource(
      this.filteredData.slice(startIndex, endIndex)
    );
    this.dataSource.sort = this.sort;
    this.resultsLength = this.filteredData.length;
  }

  drop(event: any) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
    const movedColumn = this.columns[event.previousIndex];
    this.columns.splice(event.previousIndex, 1);
    this.columns.splice(event.currentIndex, 0, movedColumn);
    this.bindGrid();
  }

  rowClick(event) {}

  applyFilter(data) {
    if (data) {
      this.filterText[data.column] = data.searchText;
      this.filterData(data.searchText);
    }
  }

  filterData(searchText: string | number | boolean) {
    const datasource = this.previewChanges ? this.changedDataSet : this.data$;
    const allValuesEmpty = Object.values(this.filterText).every(
      (value) => value === ''
    );

    if (!searchText && allValuesEmpty) {
      // If searchText is empty or falsy, return all data
      this.filteredData = datasource;
      this.bindGrid();
      return;
    }

    this.filteredData = datasource.filter((item) => {
      return Object.entries(this.filterText).some(([key, value]) => {
        // Ensure value is not undefined and check for includes
        return (
          value &&
          item[key] &&
          item[key]
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
        );
      });
    });
    this.bindGrid();
  }

  sortData(event: Sort) {
    const direction = event.direction;
    const active = event.active;

    if (direction === '') {
      // No sorting applied, reset to original order
      this.filteredData = [...this.data$];
    } else {
      this.filteredData = this.filteredData.sort((a, b) => {
        const valueA = a[active] ? a[active].toString().toLowerCase() : '';
        const valueB = b[active] ? b[active].toString().toLowerCase() : '';
        return direction === 'asc'
          ? valueA > valueB
            ? 1
            : -1
          : valueA < valueB
          ? 1
          : -1;
      });
    }

    this.bindGrid();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get noDataFound() {
    return this.dataSource.data.length === 0;
  }
}
function dayjs() {
  throw new Error('Function not implemented.');
}

