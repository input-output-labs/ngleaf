import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onCandidatureStatus(status: boolean) {
    console.log('Candidature status:', status);
    // TODO: Handle candidature status (success/failure)
  }

}
