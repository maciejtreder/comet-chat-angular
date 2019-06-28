import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outgoing-call',
  templateUrl: './outgoing-call.component.html',
  styleUrls: ['./outgoing-call.component.scss']
})
export class OutgoingCallComponent {
  @Input()
  public call: any;
}