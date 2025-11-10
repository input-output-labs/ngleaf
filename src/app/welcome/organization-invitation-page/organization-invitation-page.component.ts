import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-organization-invitation',
  templateUrl: './organization-invitation-page.component.html',
  styleUrls: ['./organization-invitation-page.component.scss']
})
export class OrganizationInvitationPageComponent  implements OnInit {
  public organizationId: string;
  public email: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.organizationId = this.route.snapshot.queryParams.organizationId;
    this.email = this.route.snapshot.queryParams.email;
  }

}
