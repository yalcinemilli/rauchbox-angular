import { DecimalPipe } from '@angular/common';
import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SarchandfilterService } from 'src/app/_services/sarchandfilter.service';
import { DeleteItemComponent } from 'src/app/delete-item/delete-item.component';
import { KundenService } from 'src/app/kunden/kunden.service';
import { KundeResponse } from 'src/app/open-api';
import { SortEvent } from '../../../../../_directives/sortable.directive';


export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbSortable {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
@Component({
  selector: 'app-ngxboostraptables',
  templateUrl: './ngxboostraptables.component.html',
  styleUrls: ['./ngxboostraptables.component.css'],
  providers: [DecimalPipe, SarchandfilterService],
})
export class NgxboostraptablesComponent implements OnInit {
  @Input() inputData: any[] = [];
  objekt: any[] = [];
  objekte: Observable<any[]>
  total$: Observable<number>;
@ViewChildren(NgbSortable) headers: QueryList<NgbSortable>;

  constructor(private kundenService: KundenService,
    private modalService: NgbModal,
    private router: Router,
    public service: SarchandfilterService,
    pipe: DecimalPipe) {
      console.log(this.inputData);
     }

  ngOnInit() {
    this.kundenService.getData().subscribe(async data => {
      this.service.setData(data, "Kunden");
      this.service.daten$.subscribe(data => {
        this.objekt = data;
      });
          
    });
    console.log(this.inputData);
    this.total$ = this.service.total$;
  

}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  //this.kundenService.getDestroy();
}
  deleteKundeModal(kunde: KundeResponse) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Kunde';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.inputData.splice(this.inputData.indexOf(await this.kundenService.deleteKunde(kunde)), 1);
        }
      }
      );
   }

   openKundenDetails(kundedata: KundeResponse) {
    this.kundenService.setKunde(kundedata);
    this.router.navigate(['kunden/details']);
   }
   

onSort({ column, direction }: SortEvent) {
  // resetting other headers
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });

  this.service.sortColumn = column;
  this.service.sortDirection = direction;
}
}



