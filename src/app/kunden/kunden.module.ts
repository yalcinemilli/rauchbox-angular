
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BlockUIModule } from 'ng-block-ui';
import { BlockTemplateComponent } from '../_layout/blockui/block-template.component';
import { SarchandfilterService } from '../_services/sarchandfilter.service';
import { CardModule } from '../content/partials/general/card/card.module';
import { BoostraptablesModule } from '../content/partials/table/boostraptables/boostraptables.module';
import { KontaktmodalComponent } from './Modals/kontaktmodal/kontaktmodal.component';
import { NeuerkundeComponent } from './Modals/neuerkunde/neuerkunde.component';
import { ObjektmodalComponent } from './Modals/objektmodal/objektmodal.component';
import { StandortmodalComponent } from './Modals/standortmodal/standortmodal.component';
import { TechnicaldetailmodalComponent } from './Modals/technicaldetailmodal/technicaldetailmodal.component';
import { WartungsmodalComponent } from './Modals/wartungsmodal/wartungsmodal.component';
import { kundenRouting } from './kunden.routing';
import { KundenService } from './kunden.service';
import { KundendetailsItemComponent } from './kundendetails/kundendetails-item/kundendetails-item.component';
import { KundendetailsComponent } from './kundendetails/kundendetails.component';
import { KundenhomeComponent } from './kundenhome/kundenhome.component';

@NgModule({
  declarations: [
    KundendetailsComponent,
    NeuerkundeComponent,
    KundenhomeComponent,
    KundendetailsItemComponent,
    StandortmodalComponent,
    KontaktmodalComponent,
    ObjektmodalComponent,
    TechnicaldetailmodalComponent,
    WartungsmodalComponent    
  ],
  imports: [
    NgxDatatableModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbCollapseModule,
    BoostraptablesModule,
    ReactiveFormsModule,
    CardModule,
    kundenRouting,
    NgSelectModule,
    NgbModule,
    RouterModule,
    BlockUIModule.forRoot({
      template: BlockTemplateComponent
    })
  ],
  providers: [
    KundenService, DecimalPipe, SarchandfilterService
  ],
  exports: [
    KundendetailsComponent,
    NeuerkundeComponent,
    KundenhomeComponent,
    KundendetailsItemComponent,
    StandortmodalComponent,
    KontaktmodalComponent,
    ObjektmodalComponent,
    TechnicaldetailmodalComponent,
  ]
})
export class KundenModule { }

