import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Output() respond = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('ChildComponent elindult');
  }

  ngOnDestroy(): void {
    console.log('ChildComponent megsemmisült');
  }

  sendResponse() {
    this.respond.emit('Köszi, megkaptam az üzenetet!');
  }
}
