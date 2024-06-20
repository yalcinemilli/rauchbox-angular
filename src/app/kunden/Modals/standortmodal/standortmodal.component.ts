import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Adresse } from 'src/app/open-api';

@Component({
  selector: 'app-standtortmodal',
  templateUrl: './standortmodal.component.html',
  styleUrls: ['./standortmodal.component.css']
})
export class StandortmodalComponent implements OnInit {

  newForm: FormGroup;
  title: string = "Hinzufügen";
  @Input() standortobj: Adresse;
  standort = new EventEmitter<Adresse>();
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'strasse': new FormControl(null, Validators.required),
      'plz': new FormControl(null, Validators.required),
      'ort': new FormControl(null, Validators.required)
    });
    if (this.standortobj) {
      this.title = "Bearbeiten";
      this.newForm.setValue({ strasse: this.standortobj.strasse, plz: this.standortobj.plz, ort: this.standortobj.ort });
    } 
  }


  onSubmit() {
    if(this.standortobj){
      this.standortobj.strasse = this.newForm.value.strasse;
      this.standortobj.plz = this.newForm.value.plz;
      this.standortobj.ort = this.newForm.value.ort;
      this.standort.emit(this.standortobj);
    } else {
      this.standort.emit(this.newForm.value);
    }
    
    this.activeModal.close();
  }
}
