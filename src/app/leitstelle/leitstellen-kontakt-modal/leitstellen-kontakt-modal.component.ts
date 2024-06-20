import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Kontakt } from 'src/app/open-api';

@Component({
  selector: 'app-leitstellen-kontakt-modal',
  templateUrl: './leitstellen-kontakt-modal.component.html',
  styleUrls: ['./leitstellen-kontakt-modal.component.css']
})
export class LeitstellenKontaktModalComponent implements OnInit {
  newForm: FormGroup;
  title: string = "Hinzufügen";
  @Input() kontaktobj: Kontakt;
  kontakt = new EventEmitter<Kontakt>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'ansprechpartner': new FormControl(null, Validators.required),
      'telefon': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'notizen': new FormControl(null)
    });
    if (this.kontaktobj) {
      this.title = "Bearbeiten";
      this.newForm.setValue({ ansprechpartner: this.kontaktobj.ansprechpartner, telefon: this.kontaktobj.telefon, email: this.kontaktobj.email, notizen: this.kontaktobj.notizen });
    }
  }

  onSubmit() {
    if(this.kontaktobj){
      this.kontaktobj.ansprechpartner = this.newForm.value.ansprechpartner;
      this.kontaktobj.telefon = this.newForm.value.telefon;
      this.kontaktobj.email = this.newForm.value.email;
      this.kontaktobj.notizen = this.newForm.value.notizen;
      this.kontakt.emit(this.kontaktobj);
    } else {
      this.kontakt.emit(this.newForm.value);
    }
    
    this.activeModal.close();
  }

}
