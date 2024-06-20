import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Leitstellen } from './../../open-api/model/leitstellen';

@Component({
  selector: 'app-leitstellen-modal',
  templateUrl: './leitstellen-modal.component.html',
  styleUrls: ['./leitstellen-modal.component.css']
})
export class LeitstellenModalComponent implements OnInit {
 
  newForm: FormGroup;
  title: string = "Hinzufügen";
  @Input() leitstelleobj: Leitstellen;
  leitstelle = new EventEmitter<Leitstellen>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'leitstelle': new FormControl(null, Validators.required),
      'kennwort': new FormControl(null, Validators.required),
      'telefon': new FormControl(null, Validators.required)
    });
    if (this.leitstelleobj) {
      this.title = "Bearbeiten";
      this.newForm.setValue({ leitstelle: this.leitstelleobj.leitstelle, kennwort: this.leitstelleobj.kennwort, telefon: this.leitstelleobj.telefon });
    }
  }

  onSubmit() {
    if(this.leitstelleobj){
      this.leitstelleobj.leitstelle = this.newForm.value.leitstelle;
      this.leitstelleobj.kennwort = this.newForm.value.kennwort;
      this.leitstelleobj.telefon = this.newForm.value.telefon;
      this.leitstelle.emit(this.leitstelleobj);
    } else {
      this.leitstelle.emit(this.newForm.value);
    }
    
    this.activeModal.close();
  }

}
