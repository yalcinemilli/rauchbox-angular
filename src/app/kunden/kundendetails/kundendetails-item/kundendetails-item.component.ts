import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kundendetails-item',
  templateUrl: './kundendetails-item.component.html',
  styleUrls: ['./kundendetails-item.component.css']
})
export class KundendetailsItemComponent {
@Input() obj: any;

constructor() { }

}
