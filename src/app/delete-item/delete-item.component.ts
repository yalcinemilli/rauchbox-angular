import { Component, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent {

  @Input() meintext: string;
  answer = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) { }

  onSubmit() {
    this.answer.emit(true);
 
    this.activeModal.close();
  }
}
