import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Adresse, AdresseResponse, AdressenControllerService, EmaControllerService, EmaResponse, KontaktControllerService, KontaktResponse, KundeResponse, ListResponseWartungResponse, ObjektIdentResponse, VideoResponse, Wartung } from 'src/app/open-api';
import { ObjektIdentControllerService } from 'src/app/open-api/api/objektIdentController.service';
import { DeleteItemComponent } from '../../delete-item/delete-item.component';
import { KontaktmodalComponent } from '../Modals/kontaktmodal/kontaktmodal.component';
import { NeuerkundeComponent } from '../Modals/neuerkunde/neuerkunde.component';
import { StandortmodalComponent } from '../Modals/standortmodal/standortmodal.component';
import { TechnicaldetailmodalComponent } from '../Modals/technicaldetailmodal/technicaldetailmodal.component';
import { WartungsmodalComponent } from '../Modals/wartungsmodal/wartungsmodal.component';
import { KundenService } from '../kunden.service';
import { VideoControllerService } from './../../open-api/api/videoController.service';
import { WartungControllerService } from './../../open-api/api/wartungController.service';
import { Kontakt } from './../../open-api/model/kontakt';
import { WartungResponse } from './../../open-api/model/wartungResponse';
import { ObjektmodalComponent } from './../Modals/objektmodal/objektmodal.component';

@Component({
  selector: 'app-kundendetails',
  templateUrl: './kundendetails.component.html',
  styleUrls: ['./kundendetails.component.css'],
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*' })),
      state('closed', style({ height: '0', overflow: 'hidden' })),
      transition('open => closed', [animate('300ms ease-out')]),
      transition('closed => open', [animate('300ms ease-in')]),
    ]),
  ],
})
export class KundendetailsComponent implements OnInit {

  kunde: KundeResponse;
  wartungsvertrag: WartungResponse[] = [];
  videos: [VideoResponse, boolean][] = [];
  emas: [EmaResponse, boolean][] = [];
  selectedItem = new EventEmitter<any>();

  constructor(private kundenService: KundenService,
    private router: Router,
    private modalService: NgbModal,
    private standortController: AdressenControllerService,
    private kontaktController: KontaktControllerService,
    private objektIdentController: ObjektIdentControllerService,
    private videoControllerService: VideoControllerService,
    private emaControllerService: EmaControllerService,
    private wartungControllerService: WartungControllerService
  ) {
  }

  ngOnInit() {
    this.kunde = this.kundenService.getKunde();
    if (!this.kunde) {
      this.router.navigate(['/kunden']);
    }
    this.wartungControllerService.getWartung(this.kunde.id).subscribe((data: ListResponseWartungResponse) => {
      this.wartungsvertrag = data.list;
    });
    this.videos = this.kunde.videos.map((video) => [video, true]);

    this.emas = this.kunde.emas.map((ema) => [ema, true]);
  }

  openModalKundenname() {
    const modalRef = this.modalService.open(NeuerkundeComponent);
    modalRef.componentInstance.kundenobj = this.kunde;
    modalRef.componentInstance.kunde.subscribe(async (data: KundeResponse) => {
      await this.kundenService.updateKunde(data);
    });
  }

  openModalStandort(data: any) {
    const modalRef = this.modalService.open(StandortmodalComponent);
    modalRef.componentInstance.standortobj = data;
    if (data) {
      modalRef.componentInstance.standort.subscribe(async (data: Adresse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.standortController.updateAdresse(data, data.id).subscribe((data: Adresse) => {
              resolve(data);
            });
          }, 2000);
        });
      });
    } else {
      modalRef.componentInstance.standort.subscribe(async (data: Adresse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.standortController.createAdresse(data, this.kunde.id).subscribe((data: Adresse) => {
              this.kunde.adressen.push(data);
              resolve(data);
            });
          }, 2000);
        });
      });
    }
  }

  openModalKontakt(data: any) {
    const modalRef = this.modalService.open(KontaktmodalComponent);
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
            this.kontaktController.createKontakt(data, this.kunde.id).subscribe((data: Kontakt) => {
              this.kunde.kontakte.push(data);
              resolve(data);
            });
          }, 2000);
        });
      });
    }
  }

  openModalWartung(data: any) {
    const modalRef = this.modalService.open(WartungsmodalComponent);
    modalRef.componentInstance.wartungsobj = data;
    if (data) {
      modalRef.componentInstance.wartung.subscribe(async (data2: Wartung) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.wartungControllerService.updateWartung(data2, data.id).subscribe((data3: Wartung) => {
              this.wartungsvertrag = this.wartungsvertrag.map((wartung) => {
                if (wartung.id === data3.id) {
                  return data3;
                } else {
                  return wartung;
                }
              });
              resolve(data3);
            });
          }, 2000);
        });
      });
    } else {
      modalRef.componentInstance.wartung.subscribe(async (data: Wartung) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.wartungControllerService.createWartung(data, this.kunde.id).subscribe((data: Wartung) => {
              this.wartungsvertrag.push(data);
              resolve(data);
            });
          }, 2000);
        });
      });
    }
  }

  openModalObjekt(data1: ObjektIdentResponse) {
    const modalRef = this.modalService.open(ObjektmodalComponent);
    modalRef.componentInstance.obj = data1;
    modalRef.componentInstance.adressen = this.kunde.adressen;
    if (data1) {
      modalRef.componentInstance.identObj.subscribe(async (data: ObjektIdentResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.objektIdentController.updateObjektIdent(data, data.id).subscribe((data: ObjektIdentResponse) => {
              resolve(data);
            });
          }, 2000);
        });
      });
    } else {
      modalRef.componentInstance.identObj.subscribe(async (data: ObjektIdentResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.objektIdentController.createObjektIdent(data, data.adressenid, this.kunde.id).subscribe((data: ObjektIdentResponse) => {
              data.adresse = this.kunde.adressen.find(x => x.id == data.adressenid);
              this.kunde.objektidents.push(data);
              resolve(data);
            });
          }, 2000);
        });
      });
    }
  }

  openModalVideo(data1: VideoResponse) {
    const modalRef = this.modalService.open(TechnicaldetailmodalComponent);
    modalRef.componentInstance.objTyp = data1;
    modalRef.componentInstance.objTypName = 'Video';
    if (data1) {
      modalRef.componentInstance.objSelect.subscribe(async (data: VideoResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.videoControllerService.updateVideo(data, data.id).subscribe((data1: VideoResponse) => {
              resolve(data);
            });
          }, 2000);
        });
      });
    } else {
      modalRef.componentInstance.objSelect.subscribe(async (data: VideoResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.videoControllerService.createVideo(data, this.kunde.id).subscribe((data1: VideoResponse) => {
              var basicCollapse = true;
              this.videos.push([data1, basicCollapse]);
              resolve(data1);
            });
          }, 2000);
        });
      });
    }
  }

  openModalEma(data1: EmaResponse) {
    const modalRef = this.modalService.open(TechnicaldetailmodalComponent);
    modalRef.componentInstance.objTyp = data1;
    modalRef.componentInstance.objTypName = 'Ema';
    if (data1) {
      modalRef.componentInstance.objSelect.subscribe(async (data: EmaResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.emaControllerService.updateEma(data, data.id).subscribe((data1: EmaResponse) => {
              resolve(data);
            });
          }, 2000);
        });
      });
    } else {
      modalRef.componentInstance.objSelect.subscribe(async (data: EmaResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.emaControllerService.createEma(data, this.kunde.id).subscribe((data1: EmaResponse) => {
              var basicCollapse = true;
              this.emas.push([data1, basicCollapse]);
              resolve(data1);
            });
          }, 2000);
        });
      });
    }
  }

  deleteStandort(dataobj: AdresseResponse) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Standort';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.kunde.adressen.splice(this.kunde.adressen.indexOf(await 
             new Promise((resolve, reject) => {
              setTimeout(() => {
                this.standortController.deleteAdresse(dataobj.id).subscribe((data: AdresseResponse) => {
                  resolve(dataobj);
                });
              }, 2000);
            })),1);
        }
      }
      );
  }

  deleteWartung(dataobj: WartungResponse) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Standort';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.wartungsvertrag.splice(this.wartungsvertrag.indexOf(await 
             new Promise((resolve, reject) => {
              setTimeout(() => {
                this.wartungControllerService.deleteWartung(dataobj.id).subscribe((data: WartungResponse) => {
                  resolve(dataobj);
                });
              }, 2000);
            })),1);
        }
      }
      );
  }

  deleteKontakt(dataobj: Kontakt) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Kontakt';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.kunde.kontakte.splice(this.kunde.kontakte.indexOf(await 
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

  deleteObjekt(dataobj: ObjektIdentResponse) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Objekt';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.kunde.objektidents.splice(this.kunde.objektidents.indexOf(await 
             new Promise((resolve, reject) => {
              setTimeout(() => {
                this.objektIdentController.deleteObjektIdent(dataobj.id).subscribe((data: ObjektIdentResponse) => {
                  resolve(dataobj);
                });
              }, 2000);
            })),1);
        }});
  }

  deleteVideo(dataobj: any) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Video';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.videos.splice(this.videos.indexOf(await 
             new Promise((resolve, reject) => {
              setTimeout(() => {
                this.videoControllerService.deleteVideo(dataobj[0].id).subscribe((data: VideoResponse) => {
                  resolve(dataobj);
                });
              }, 2000);
            })),1);
        }});
  }

  deleteEma(dataobj: any) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'Ema';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.emas.splice(this.emas.indexOf(await 
             new Promise((resolve, reject) => {
              setTimeout(() => {
                this.emaControllerService.deleteEma(dataobj[0].id).subscribe((data: EmaResponse) => {
                  resolve(dataobj);
                });
              }, 2000);
            })),1);
        }});
      }


  onSelected(item: any) {
    this.selectedItem.emit(item);
  }

  ngOnDestroy(): void {
    this.kunde = null;
  }
  toggleCollapse(item: any) {
    item[1] = !item[1];
  }
}
