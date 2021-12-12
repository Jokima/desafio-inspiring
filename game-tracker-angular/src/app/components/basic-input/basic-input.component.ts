import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
})
export class BasicInputComponent implements OnInit {
  @Output() keyUpEvent = new EventEmitter<string>();
  @Output() sendEvent = new EventEmitter<boolean>();

  @Input() icon: string = '';
  @Input() placeholder: string = '';
  @Input() class: string = '';
  @Input() value: string = '';
  @Input() showSendButton: boolean = false;
  @Input() sendButtonIcon = '';

  constructor() {}

  ngOnInit(): void {}
}
