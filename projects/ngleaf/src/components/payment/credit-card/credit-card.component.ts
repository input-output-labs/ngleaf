import { Component, OnInit, Input } from '@angular/core';
import { PaymentMethod } from '../../../api';

@Component({
  selector: 'leaf-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  @Input()
  public paymentMethod: PaymentMethod;

  @Input() 
  public creditCardHeight: string = "255px";

  constructor() { }

  ngOnInit() {
  }

}
