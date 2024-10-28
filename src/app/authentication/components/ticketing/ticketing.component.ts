import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TableFilterType } from '../../../enums';
import { GridColumn } from '../../../interface';
import { InlineFiltersComponent } from '../inline-filters/inline-filters.component';
import { TicketService } from '../../../service';
import { MatTableExporterModule } from 'mat-table-exporter';

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

class Ticket {
  date: string;
  time: string;
  username: string;
  branchCode: string;
  branchName: string;
  reasonforCall: string;
  clockNumber: string;
  issue: string;
  reportedAt: string;
  resolved: string;
  newStore: string;
  notes: string;
  status: string;
  reasonForChange: string;
  transferTo: string;
  transferredFrom: string;
  assignedTo: string;
  numberOfFiles: string;
  files: string;
}

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
  ],
})
export class TicketingComponent {
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
  displayedColumnFilters: string[] = [
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

  // Initialize filter object for each field
  filterText = {
    dateFilter: '',
    timeFilter: '',
    ticketFilter: '',
    userFilter: '',
    branchCodeFilter: '',
    branchNameFilter: '',
    reasonForCallFilter: '',
    clockNumberFilter: '',
    issueFilter: '',
    reportedAtFilter: '',
    resolvedFilter: '',
    newStoreFilter: '',
    notesFilter: '',
    statusFilter: '',
    reasonForChangeFilter: '',
    transferToFilter: '',
    ransferredFromFilter: '',
    assignedToFilter: '',
    numberOfFilesFilter: '',
  };

  public dataSource = new MatTableDataSource([]);
  public hasNextPage = true;
  public loadMore = false;

  @Input() rowEventEnabled = false;
  @Input() loaded = false;
  @Input() data$: Ticket[] = [];
  @Input() filteredData: Ticket[] = [];

  @Input() sortColumn: string;
  @Input() sortDirection = SortDirection.Ascending;
  columns: Array<GridColumn> = [
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
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'reasonForChange',
      displayName: 'Reason For Change',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'transferTo',
      displayName: 'Transfer To',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'transferredFrom',
      displayName: 'Transfer From',
      sort: true,
      filterType: TableFilterType.TEXT,
    },
    {
      name: 'assignedTo',
      displayName: 'Assigned To',
      sort: true,
      filterType: TableFilterType.TEXT,
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
      filterType: TableFilterType.TEXT,
    },
  ];
  @Input() hideDetailRow: (data: object) => boolean;
  @Input() detailRow?: TemplateRef<HTMLElement>;
  @Input() customClass: string;

  @ViewChild(MatSort, { static: false }) sort;

  @Output() onScroll = new EventEmitter<void>();
  @Output() onSort = new EventEmitter<any>();
  @Output() triggerRowEvent = new EventEmitter<any>();
  @Output() checkAll = new EventEmitter<boolean>();

  private subscription = new Subscription();

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    if (this.columns) {
      this.displayedColumns = this.columns.map((col) => col.name);
    }
    this.ticketService.getTickets().subscribe((data) => {
      this.data$ = data;
      this.filteredData = data;
    });
    this.bindGrid();
  }

  bindGrid() {
    this.dataSource = new MatTableDataSource(this.filteredData);
    this.dataSource.sort = this.sort;
    this.loadMore = false;
  }

  drop(event: any) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  // onScrollDown(_event) {
  //   if (this.loadMore) return;

  //   this.loadMore = true;
  //   this.componentRef.directiveRef.position(true);

  //   this.onScroll.emit();
  // }

  sortData(event) {
    this.onSort.emit(event);
  }

  rowClick(event) {
    if (this.rowEventEnabled) this.triggerRowEvent.emit(event);
  }

  toggleAllCheckbox(event) {
    this.checkAll.emit(event.checked);
  }

  get noDataFound() {
    return this.dataSource.data.length === 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  applyFilter(data) {
    debugger
    this.filterText[data.column] = data;
    this.applyFilter(data.searchText);
  }

  filterData(searchText: string | number | boolean) {
    this.filteredData = this.data$.filter(
      (item) =>
        item.date.includes(this.filterText.dateFilter) ||
        item.time.includes(this.filterText.timeFilter) ||
        item.username.includes(this.filterText.userFilter) ||
        item.branchCode.includes(this.filterText.branchCodeFilter) ||
        item.reasonforCall.includes(this.filterText.branchCodeFilter) ||
        item.clockNumber.includes(this.filterText.branchNameFilter) ||
        item.issue.includes(this.filterText.issueFilter) ||
        item.reportedAt.includes(this.filterText.reportedAtFilter) ||
        item.resolved.includes(this.filterText.resolvedFilter) ||
        item.reportedAt.includes(this.filterText.reportedAtFilter) ||
        item.newStore.includes(this.filterText.newStoreFilter) ||
        item.notes.includes(this.filterText.notesFilter) ||
        item.status.includes(this.filterText.statusFilter) ||
        item.reasonForChange.includes(this.filterText.reasonForChangeFilter) ||
        item.transferTo.includes(this.filterText.transferToFilter) ||
        item.transferredFrom.includes(this.filterText.ransferredFromFilter) ||
        item.assignedTo.includes(this.filterText.assignedToFilter) ||
        item.numberOfFiles.includes(this.filterText.numberOfFilesFilter)
    );
  }
}
