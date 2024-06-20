import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { SarchandfilterService } from 'src/app/_services/sarchandfilter.service';
import { KundeResponse } from 'src/app/open-api';
import { DeleteItemComponent } from '../../delete-item/delete-item.component';
import { NeuerkundeComponent } from '../Modals/neuerkunde/neuerkunde.component';
import { KundenService } from '../kunden.service';

@Component({
  selector: 'app-kundenhome',
  templateUrl: './kundenhome.component.html',
  styleUrls: ['./kundenhome.component.css']
})
export class KundenhomeComponent implements OnInit, OnDestroy {


  kunden: KundeResponse[] = [];
  total$: Observable<number>;

  
  constructor(private kundenService: KundenService, 
    private modalService: NgbModal, 
    private router: Router,
    public service: SarchandfilterService, 
    ) { }

  ngOnInit(): void {
    this.kundenService.getData().subscribe(async (data: KundeResponse[]) => {
      this.service.setData(data, "Kunden");
      this.service.daten$.subscribe((data: KundeResponse[]) => {
        this.kunden = data;
      });
    });   
    this.total$ = this.service.total$;
    
  }


  ngOnDestroy(): void {
    this.service.setData(null, null);
}

  openModalNewKunde() {
    const modalRef = this.modalService.open(NeuerkundeComponent);
    modalRef.componentInstance.kunde.subscribe(async (data: KundeResponse) => {
      this.kunden.push(await this.kundenService.addKunde(data));
    });
  }

  deleteKundeModal(kunde: KundeResponse) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Kunde';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.kunden.splice(this.kunden.indexOf(await this.kundenService.deleteKunde(kunde)), 1);
        }
      }
      );
   }

   openKundenDetails(kundedata: KundeResponse) {
    this.kundenService.setKunde(kundedata);
    this.router.navigate(['kunden/details']);
   }
   
   sort(column: string): void {
    this.kunden = this.service.sort(column, this.kunden);
  }

get rangeStart(): number {
  return (this.service.page - 1) * this.service.pageSize + 1;
}

get rangeEnd(): number | Observable<number> {
  const end = this.service.page * this.service.pageSize;
  return this.total$.pipe(
    map(total => end > total ? total : end)
  );
}

getFortlaufendeNummer(index: number): number {
  return (this.service.page - 1) * this.service.pageSize + index + 1;
}

}



