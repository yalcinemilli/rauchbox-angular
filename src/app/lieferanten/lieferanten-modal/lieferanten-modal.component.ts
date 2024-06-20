import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Lieferanten } from 'src/app/open-api';

@Component({
  selector: 'app-lieferanten-modal',
  templateUrl: './lieferanten-modal.component.html',
  styleUrls: ['./lieferanten-modal.component.css']
})
export class LieferantenModalComponent implements OnInit {
 
  newForm: FormGroup;
  title: string = "Hinzufügen";
  @Input() lieferantobj: Lieferanten;
  lieferant = new EventEmitter<Lieferanten>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      'lieferantenname': new FormControl(null, Validators.required),
      'kundennummer': new FormControl(null, Validators.required),
      'supporttelefon': new FormControl(null, Validators.required),
      'ansprechpartner': new FormControl(null, Validators.required)
    });
    if (this.lieferantobj) {
      this.title = "Bearbeiten";
      this.newForm.setValue({ lieferantenname: this.lieferantobj.lieferantenname, kundennummer: this.lieferantobj.kundennummer, supporttelefon: this.lieferantobj.supporttelefon, ansprechpartner: this.lieferantobj.ansprechpartner });
    }
  }

  onSubmit() {
    if(this.lieferantobj){
      this.lieferantobj.lieferantenname = this.newForm.value.lieferantenname;
      this.lieferantobj.kundennummer = this.newForm.value.kundennummer;
      this.lieferantobj.supporttelefon = this.newForm.value.supporttelefon;
      this.lieferantobj.ansprechpartner = this.newForm.value.ansprechpartner;
      this.lieferant.emit(this.lieferantobj);
    } else {
      this.lieferant.emit(this.newForm.value);
    }
    
    this.activeModal.close();
  }


}
