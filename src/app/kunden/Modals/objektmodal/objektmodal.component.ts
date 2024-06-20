import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Adresse, ObjektIdentResponse } from 'src/app/open-api';

@Component({
  selector: 'app-objektmodal',
  templateUrl: './objektmodal.component.html',
  styleUrls: ['./objektmodal.component.css']
})
export class ObjektmodalComponent implements OnInit {

  newForm: FormGroup;
  title: string = "Hinzufügen";
  @Input() obj: ObjektIdentResponse;
  @Input() adressen: Adresse[] = [];
  identObj = new EventEmitter<ObjektIdentResponse>();
  

  constructor(public activeModal: NgbActiveModal) {}
    

  ngOnInit(): void {
 
    this.newForm = new FormGroup({
      'identnummer': new FormControl(null, Validators.required),
      'objektart': new FormControl(null, Validators.required),
      'leitstelle': new FormControl(null, Validators.required),
      'adressenid': new FormControl(null, Validators.required)
    });

    if (this.obj) {
      this.title = "Bearbeiten";
      this.newForm.setValue({ identnummer: this.obj.identnummer, objektart: this.obj.objektart, leitstelle: this.obj.leitstelle, adressenid: this.obj.adressenid });
    }
  }

  onSubmit() {
    if(this.obj){
      this.obj.identnummer = this.newForm.value.identnummer;
      this.obj.objektart = this.newForm.value.objektart;
      this.obj.leitstelle = this.newForm.value.leitstelle;
      this.obj.adressenid = this.newForm.value.adressenid;
      this.obj.adresse = this.adressen.find(x => x.id == this.newForm.value.adressenid);
      this.identObj.emit(this.obj);
    } else {
      this.identObj.emit(this.newForm.value);
    }
    
    this.activeModal.close();
  }
}
