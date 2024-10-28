import { TemplateRef } from '@angular/core';
import { TemplateContext } from './template-context';
import { TableFilterType } from '../enums';

export interface GridColumn {
  name: string;
  displayName: string;
  sort: boolean;
  template?: TemplateRef<TemplateContext>;
  formatValue?: Function;
  tooltip?: boolean;
  columnClass?: string;
  hideColumn?: boolean;
  filterType: TableFilterType;
}
