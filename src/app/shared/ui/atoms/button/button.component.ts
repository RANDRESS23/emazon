import { Component, Input, OnInit } from '@angular/core';
import { EMPTY_STRING } from '@src/app/shared/domain/constants/admin';
import { SizeEnum } from '@src/app/shared/domain/enums/size';
import { Size } from '@src/app/shared/domain/types/size';

@Component({
  selector: 'atom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  buttonSizeL: Size = SizeEnum.LARGE;
  buttonSizeM: Size = SizeEnum.MEDIUM;
  buttonSizeS: Size = SizeEnum.SMALL;

  @Input() isSecondaryButton: boolean = false;
  @Input() text: string = EMPTY_STRING;
  @Input() type: string = EMPTY_STRING;
  @Input() size: string = EMPTY_STRING;
  @Input() isDisabled: boolean = false;
  @Input() isFullWidth: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
