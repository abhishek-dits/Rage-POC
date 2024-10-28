import { GridColumn } from './grid-column';

export interface TemplateContext {
  $implicit: any;
  index: number;
  column: GridColumn;
}
