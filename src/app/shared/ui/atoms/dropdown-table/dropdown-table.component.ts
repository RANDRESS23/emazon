import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY_STRING } from '@domain/constants/admin';

@Component({
  selector: 'atom-dropdown-table',
  templateUrl: './dropdown-table.component.html',
  styleUrls: ['./dropdown-table.component.scss']
})
export class DropdownTableComponent implements OnInit {
  @Input() label: string = EMPTY_STRING;
  @Input() options: Record<string, string | number>[] = [];
  @Output() optionChange = new EventEmitter<any>();
 
  constructor() { }

  ngOnInit(): void {
  }

  action(event: any){
    const selectedOption = event.target.value;
    this.optionChange.emit(selectedOption);
  }
}
