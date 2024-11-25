import { Component, Input, OnInit } from '@angular/core';
import { SizeEnum } from '@src/app/shared/utils/enums/size';
import { Size } from '@src/app/shared/utils/types/size';
import { EMPTY_STRING } from '@utils/constants/general';

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
