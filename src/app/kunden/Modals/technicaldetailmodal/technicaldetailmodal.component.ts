import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomFieldControllerService, CustomFieldResponse } from 'src/app/open-api';

@Component({
  selector: 'app-technicaldetailmodal',
  templateUrl: './technicaldetailmodal.component.html',
  styleUrls: ['./technicaldetailmodal.component.css']
})
export class TechnicaldetailmodalComponent implements OnInit {


  newForm: FormGroup;
  customFields: FormArray;
  fieldArray: CustomFieldResponse[] = [];
  title: string = "Hinzufügen";
  isVisible: boolean = true;
  @Input() objTypName: string;
  @Input() objTyp: any;
  objSelect = new EventEmitter<any>();


  constructor(public activeModal: NgbActiveModal, private customfieldController: CustomFieldControllerService) { }

  ngOnInit(): void {
      
      this.newForm = new FormGroup({
        'bezeichnung': new FormControl(null, Validators.required),
        'extipadr': new FormControl(null, Validators.required),
        'intipadr': new FormControl(null, Validators.required),
        'fieldname': new FormControl(null, Validators.required),
        'fieldvalue': new FormControl(null, Validators.required),
        'fieldnamenew': new FormControl(null, Validators.required),
        'fieldvaluenew': new FormControl(null, Validators.required),
        'customfieldslist': new FormArray([])
      });
      this.customFields = this.newForm.get('customfieldslist') as FormArray;
      if (this.objTyp == null) {
        this.isVisible = false;
      }
      if (this.objTyp) {

        this.title = "Bearbeiten";
        this.newForm.get('bezeichnung').setValue(this.objTyp.bezeichnung);
        this.newForm.get('extipadr').setValue(this.objTyp.extipadr);
        this.newForm.get('intipadr').setValue(this.objTyp.intipadr);

        this.objTyp.customfields.forEach((field: any) => {
          var newField = new FormGroup({
            'id': new FormControl(field.id),
            'objectid': new FormControl(field.objectid),
            'fieldname': new FormControl(field.fieldname, Validators.required),
            'fieldvalue': new FormControl(field.fieldvalue, Validators.required)
          })
          this.customFields.push(newField);
          this.fieldArray.push(field);
        });

      }

      this.customFields.controls.forEach((control, index) => {
        control.get('fieldname').valueChanges.subscribe(val => {
          this.fieldArray[index].fieldname = val;
          this.updateField(this.fieldArray[index]);
        });
        control.get('fieldvalue').valueChanges.subscribe(val => {
          this.fieldArray[index].fieldvalue = val;
          this.updateField(this.fieldArray[index]);
        });
      })

     
  }


  addField() {
    var newField = new FormGroup({
      'fieldname': new FormControl(this.newForm.value.fieldnamenew, Validators.required),
      'fieldvalue': new FormControl(this.newForm.value.fieldvaluenew, Validators.required)
    })
    if (this.newForm.value.fieldnamenew == null || this.newForm.value.fieldvaluenew == null) {
      return;
    }
    var newField1: CustomFieldResponse = {fieldname: newField.value.fieldname, fieldvalue: newField.value.fieldvalue};
    var objId: string = this.objTypName + this.objTyp.id;
    new Promise((resolve, reject) => {
      setTimeout(() => {
    this.customfieldController.createCustomField(newField1, objId).subscribe((data: CustomFieldResponse) => {
      resolve(data);
      var newField2 = new FormGroup({
        'id': new FormControl(data.id, Validators.required),
        'objectid': new FormControl(data.objectid, Validators.required),
        'fieldname': new FormControl(data.fieldname, Validators.required),
        'fieldvalue': new FormControl(data.fieldvalue, Validators.required)
      })
      this.fieldArray.push(data);
      this.customFields.push(newField2);
    });
   } , 500);
  })
    this.newForm.get('fieldnamenew').setValue(null);
    this.newForm.get('fieldvaluenew').setValue(null);
  }

  updateField(data1: CustomFieldResponse) {
    this.customfieldController.updateCustomField(data1, data1.id).subscribe((data: CustomFieldResponse) => {
      //console.log(data);
    });
  }

  async removeField(data1: any, index: number) {
      this.fieldArray.splice(this.fieldArray.indexOf(
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.customfieldController.deleteCustomField(data1.value.id).subscribe((data: CustomFieldResponse) => {
          resolve(data1);
          this.customFields.removeAt(index);
        });
      }, 500);
    })
    ),1);
    
  }

  onSubmit() {
    if(this.objTyp){

      this.objTyp.bezeichnung = this.newForm.value.bezeichnung;
      this.objTyp.extipadr = this.newForm.value.extipadr;
      this.objTyp.intipadr = this.newForm.value.intipadr;
      this.objTyp.customfields = this.fieldArray;
      this.objSelect.emit(this.objTyp);
    } else {
      var obj: any = {bezeichnung: this.newForm.value.bezeichnung, extipadr: this.newForm.value.extipadr, intipadr: this.newForm.value.intipadr, customfields: null};
      this.objSelect.emit(obj);
    }
    this.activeModal.close();
  }
}
