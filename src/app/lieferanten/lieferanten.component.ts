import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { SarchandfilterService } from '../_services/sarchandfilter.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { Lieferanten, LieferantenControllerService, LieferantenResponse, ListResponseLieferantenResponse } from '../open-api';
import { LieferantenModalComponent } from './lieferanten-modal/lieferanten-modal.component';

@Component({
  selector: 'app-lieferanten',
  templateUrl: './lieferanten.component.html',
  styleUrls: ['./lieferanten.component.css']
})
export class LieferantenComponent implements OnInit, OnDestroy {

  lieferanten: LieferantenResponse[] = [];
  total$: Observable<number>;
  
  constructor(private lieferantenController: LieferantenControllerService, 
    private modalService: NgbModal, 
    public service: SarchandfilterService) { }

  ngOnInit(): void {
    this.lieferantenController.getLieferanten1().subscribe(async (data: ListResponseLieferantenResponse) => {
      this.service.setData(data.list, "Lieferanten");
      this.service.daten$.subscribe((data: LieferantenResponse[]) => {
        this.lieferanten = data;
      });
    });
    this.total$ = this.service.total$;
  }

  ngOnDestroy(): void {
      this.service.setData(null, null);
  }


  openModal(data: LieferantenResponse) {
    const modalRef = this.modalService.open(LieferantenModalComponent);
  modalRef.componentInstance.lieferantobj = data;
  if (data) {
    modalRef.componentInstance.lieferant.subscribe(async (data: Lieferanten) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.lieferantenController.updateLieferanten(data, data.id).subscribe((data: Lieferanten) => {
            resolve(data);
          });
        }, 2000);
      });
    });
  } else {
    modalRef.componentInstance.lieferant.subscribe(async (data: Lieferanten) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.lieferantenController.createLieferanten(data).subscribe((data: Lieferanten) => {
            this.lieferanten.push(data);
            this.service.setData(this.lieferanten, "Lieferanten");
            resolve(data);
          });
        }, 2000);
      });
    });
  }

  }

  deleteModal(obj: LieferantenResponse) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Lieferant';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.lieferanten.splice(this.lieferanten.indexOf(await
            new Promise((resolve, reject) => {
              setTimeout(() => {
                this.lieferantenController.deleteLieferanten(obj.id).subscribe((data: LieferantenResponse) => {
                  resolve(obj);
                });
              }, 2000);
            })),1);
            this.service.setData(this.lieferanten, "Lieferanten");

          }
      }
      );
    }
  

sort(column: string): void {
  this.lieferanten = this.service.sort(column, this.lieferanten);
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
