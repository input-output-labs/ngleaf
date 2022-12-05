import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsoring',
  templateUrl: './sponsoring.component.html',
  styleUrls: ['./sponsoring.component.scss']
})
export class SponsoringComponent implements OnInit {

  public sponsoring: any = {
    sponsorId: '0123456789'
  };

  constructor() { }

  ngOnInit() {
  }

}
