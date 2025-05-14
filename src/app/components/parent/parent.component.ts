import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  parentMessage = 'Üdv a gyerek komponensnek!';
  childResponse = '';

  onChildResponded(event: string) {
    this.childResponse = event;
  }
}
