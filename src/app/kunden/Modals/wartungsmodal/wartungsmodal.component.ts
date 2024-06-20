import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Wartung } from 'src/app/open-api';

@Component({
  selector: 'app-wartungsmodal',
  templateUrl: './wartungsmodal.component.html',
  styleUrls: ['./wartungsmodal.component.css']
})
export class WartungsmodalComponent implements OnInit {

  newForm: FormGroup;
  title: string = "Hinzufügen";
  @Input() wartungsobj: Wartung;
  wartung = new EventEmitter<Wartung>();
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.newForm = new FormGroup({
      vertrag: new FormControl(false),
      firstQuartal: new FormControl(false),
      secondQuartal: new FormControl(false),
      thirdQuartal: new FormControl(false),
      fourthQuartal: new FormControl(false)
    });
    if (this.wartungsobj) {
      this.title = "Bearbeiten";
      this.newForm.setValue({ vertrag: Boolean(this.wartungsobj.vertrag), firstQuartal: Boolean(this.wartungsobj.first_quartal), secondQuartal: Boolean(this.wartungsobj.second_quartal), thirdQuartal: Boolean(this.wartungsobj.third_quartal), fourthQuartal: Boolean(this.wartungsobj.fourth_quartal) });
    }
  }

  boolZuInt(boolWert: boolean): number {
    return boolWert ? 1 : 0;
  }

  onSubmit() {/*
      this.wartungsobj.vertrag = this.boolZuInt(this.newForm.value.vertrag);
      this.wartungsobj.firstQuartal = this.boolZuInt(this.newForm.value.firstQuartal);
      this.wartungsobj.secondQuartal = this.boolZuInt(this.newForm.value.secondQuartal);
      this.wartungsobj.thirdQuartal = this.boolZuInt(this.newForm.value.thirdQuartal);
      this.wartungsobj.fourthQuartal = this.boolZuInt(this.newForm.value.fourthQuartal);
      this.wartung.emit(this.wartungsobj);*/
    const wartungsobj1: Wartung = {
      vertrag: this.boolZuInt(this.newForm.value.vertrag),
      first_quartal: this.boolZuInt(this.newForm.value.firstQuartal),
      second_quartal: this.boolZuInt(this.newForm.value.secondQuartal),
      third_quartal: this.boolZuInt(this.newForm.value.thirdQuartal),
      fourth_quartal: this.boolZuInt(this.newForm.value.fourthQuartal)
    }
    this.wartung.emit(wartungsobj1);
    this.activeModal.close();
  }
}
