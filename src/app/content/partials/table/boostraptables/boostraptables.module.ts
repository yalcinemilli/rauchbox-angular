import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BlockUIModule } from 'ng-block-ui';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BreadcrumbModule } from 'src/app/_layout/breadcrumb/breadcrumb.module';
import { NgbdSortableHeader } from '../../../../_directives/sortable.directive';
import { BlockTemplateComponent } from '../../../../_layout/blockui/block-template.component';
import { CardModule } from '../../general/card/card.module';
import { BasictableComponent } from './basictable/basictable.component';
import { NgbSortable, NgxboostraptablesComponent } from './ngxboostraptables/ngxboostraptables.component';
import { TableborderComponent } from './tableborder/tableborder.component';
import { TablecomponentsComponent } from './tablecomponents/tablecomponents.component';
import { TablesizingComponent } from './tablesizing/tablesizing.component';
import { TablestylingComponent } from './tablestyling/tablestyling.component';

@NgModule({
  imports: [
    NgxDatatableModule,
    CardModule,
    BreadcrumbModule,
    CommonModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    }),
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
  ],
  declarations: [BasictableComponent, TableborderComponent, TablesizingComponent, TablestylingComponent, TablecomponentsComponent,
    NgxboostraptablesComponent, NgbSortable, NgbdSortableHeader],
  exports: [BasictableComponent, TableborderComponent, TablesizingComponent, TablestylingComponent, TablecomponentsComponent, NgxboostraptablesComponent, NgbSortable, NgbdSortableHeader],
})

export class BoostraptablesModule { }
