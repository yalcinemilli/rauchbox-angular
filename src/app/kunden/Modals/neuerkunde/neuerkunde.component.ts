import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Kunde } from 'src/app/open-api';
import { KundenService } from '../../kunden.service';

@Component({
  selector: 'app-neuerkunde',
  templateUrl: './neuerkunde.component.html',
  styleUrls: ['./neuerkunde.component.css']
})
export class NeuerkundeComponent implements OnInit {
  neuerkundeForm: FormGroup;
  title: string = "Hinzufügen";
  @Input() kundenobj: Kunde;
  kunde = new EventEmitter<Kunde>();

  constructor(public activeModal: NgbActiveModal, private kundenService: KundenService) { }

  ngOnInit(): void {
    this.neuerkundeForm = new FormGroup({
      'kundenname': new FormControl(null, Validators.required)
    });
    if (this.kundenobj) {
      this.title = "Bearbeiten";
      this.neuerkundeForm.setValue({ kundenname: this.kundenobj.kundenname });
    }
  }

  onSubmit() {

    if (this.kundenobj) {
      this.kundenobj.kundenname = this.neuerkundeForm.value.kundenname;
      this.kunde.emit(this.kundenobj);
    } else {
      this.kunde.emit(this.neuerkundeForm.value);
    }

    this.activeModal.close();
  }
}
