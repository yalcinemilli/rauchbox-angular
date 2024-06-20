import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteItemComponent } from 'src/app/delete-item/delete-item.component';
import { Kontakt, KontaktControllerService, KontaktResponse, LeitstellenResponse, ListResponseKontaktResponse } from 'src/app/open-api';
import { LeitstellenKontaktModalComponent } from '../leitstellen-kontakt-modal/leitstellen-kontakt-modal.component';

@Component({
  selector: 'app-leitstellen-kontakt-view',
  templateUrl: './leitstellen-kontakt-view.component.html',
  styleUrls: ['./leitstellen-kontakt-view.component.css']
})
export class LeitstellenKontaktViewComponent implements OnInit {

kontakte: KontaktResponse[] = [];
@Input() leitstelle: LeitstellenResponse;
  
constructor(
    private kontaktController: KontaktControllerService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.kontaktController.getKontakte(99 + this.leitstelle.id).subscribe((data: ListResponseKontaktResponse) => {
      this.kontakte = data.list;
    });
  }
closeModal(): void {
    this.activeModal.close();
  }

  deleteKontakt(dataobj: Kontakt) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Kontakt';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.kontakte.splice(this.kontakte.indexOf(await 
             new Promise((resolve, reject) => {
              setTimeout(() => {
                this.kontaktController.deleteKontakt(dataobj.id).subscribe((data: KontaktResponse) => {
                  resolve(dataobj);
                });
              }, 2000);
            })),1);
        }
      }
      );
  }


  openModalKontakt(data: any) {
    const modalRef = this.modalService.open(LeitstellenKontaktModalComponent, {size: 'lg'});
    modalRef.componentInstance.kontaktobj = data;
    if (data) {
      modalRef.componentInstance.kontakt.subscribe(async (data: Kontakt) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.kontaktController.updateKontakt(data, data.id).subscribe((data: Kontakt) => {
              resolve(data);
            });
          }, 2000);
        });
      });
    } else {
      modalRef.componentInstance.kontakt.subscribe(async (data: Kontakt) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.kontaktController.createKontakt(data, 99 + this.leitstelle.id).subscribe((data: Kontakt) => {
              this.kontakte.push(data);
              resolve(data);
            });
          }, 2000);
        });
      });
    }
  }

}
