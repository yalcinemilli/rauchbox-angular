import { EventEmitter, Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { KundeResponse, KundenControllerService, ListResponseKundeResponse } from '../open-api';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class KundenService {

  selectKunde: EventEmitter<KundeResponse> = new EventEmitter();
  kundenObj: any;

  constructor(private kundenControllerService: KundenControllerService) {
  }

  getData(): Observable<KundeResponse[]> {
    return this.kundenControllerService.getKundenAlle("body").pipe(
      switchMap((datas: ListResponseKundeResponse) => {
        const requests = datas.list.map(element => this.kundenControllerService.getKundeById(element.id));
        return forkJoin(requests);
      })
    );
    }

  setKunde(kunde: any): void {
    this.kundenObj = kunde;
    }

  getKunde(): KundeResponse {
    return this.kundenObj;
  }
  
  addKunde1(data: KundeResponse): Promise<KundeResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.kundenControllerService.createKunde(data).subscribe((data: KundeResponse) => {
          resolve(data);
        });
      }, 2000);
    });
  }

  updateKunde1(data: KundeResponse): Promise<KundeResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.kundenControllerService.updateKunde(data, data.id).subscribe((data: KundeResponse) => {
          resolve(data);
        });
      }, 2000);
    });
  }

  deleteKunde1(kunde: KundeResponse): Promise<KundeResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.kundenControllerService.deleteKunde(kunde.id).subscribe((data: KundeResponse) => {
          resolve(kunde);
        });
      }, 2000);
    });
  }
  async addKunde(data: KundeResponse): Promise<KundeResponse> {
    const result = await this.kundenControllerService.createKunde(data).toPromise();
    return result;
  }
  
  async updateKunde(data: KundeResponse): Promise<KundeResponse> {
    const result = await this.kundenControllerService.updateKunde(data, data.id).toPromise();
    return result;
  }
  
  async deleteKunde(kunde: KundeResponse): Promise<KundeResponse> {
    const result = await this.kundenControllerService.deleteKunde(kunde.id).toPromise();
    return kunde;
  }
  
}
