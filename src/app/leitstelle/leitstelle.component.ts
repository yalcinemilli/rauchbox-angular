import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { SarchandfilterService } from '../_services/sarchandfilter.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { LeitstellenControllerService, LeitstellenResponse, ListResponseLeitstellenResponse } from '../open-api';
import { Leitstellen } from './../open-api/model/leitstellen';
import { LeitstellenKontaktViewComponent } from './leitstellen-kontakt-view/leitstellen-kontakt-view.component';
import { LeitstellenModalComponent } from './leitstellen-modal/leitstellen-modal.component';


@Component({
  selector: 'app-leitstelle',
  templateUrl: './leitstelle.component.html',
  styleUrls: ['./leitstelle.component.css']
})
export class LeitstelleComponent implements OnInit, OnDestroy {

  leitstellen: LeitstellenResponse[] = [];
  total$: Observable<number>;
  
  constructor(private leistellenController: LeitstellenControllerService, 
    private modalService: NgbModal, 
    public service: SarchandfilterService) { }

  ngOnInit(): void {
    this.leistellenController.getLeitstellen1().subscribe(async (data: ListResponseLeitstellenResponse) => {
      this.service.setData(data.list, "Leitstellen");
      this.service.daten$.subscribe((data: LeitstellenResponse[]) => {
        this.leitstellen = data;
      });
    });
    this.total$ = this.service.total$;
  }

  ngOnDestroy(): void {
      this.service.setData(null, null);
  }

  openModalKontakt(data: LeitstellenResponse) {
    const modalRef = this.modalService.open(LeitstellenKontaktViewComponent, {size: 'lg'});
    modalRef.componentInstance.leitstelle = data;
  }

  openModal(data: LeitstellenResponse) {
    const modalRef = this.modalService.open(LeitstellenModalComponent);
  modalRef.componentInstance.leitstelleobj = data;
  if (data) {
    modalRef.componentInstance.leitstelle.subscribe(async (data: Leitstellen) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.leistellenController.updateLeitstellen(data, data.id).subscribe((data: Leitstellen) => {
            resolve(data);
          });
        }, 2000);
      });
    });
  } else {
    modalRef.componentInstance.leitstelle.subscribe(async (data: Leitstellen) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.leistellenController.createLeitstellen(data).subscribe((data: Leitstellen) => {
            this.leitstellen.push(data);
            this.service.setData(this.leitstellen, "Leitstellen");
            resolve(data);
          });
        }, 2000);
      });
    });
  }

  }

  deleteModal(obj: LeitstellenResponse) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Leitstelle';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.leitstellen.splice(this.leitstellen.indexOf(await
            new Promise((resolve, reject) => {
              setTimeout(() => {
                this.leistellenController.deleteLeitstellen(obj.id).subscribe((data: LeitstellenResponse) => {
                  resolve(obj);
                });
              }, 2000);
            })),1);
            this.service.setData(this.leitstellen, "Leitstellen");

          }
      }
      );
    }
  

sort(column: string): void {
  this.leitstellen = this.service.sort(column, this.leitstellen);
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
