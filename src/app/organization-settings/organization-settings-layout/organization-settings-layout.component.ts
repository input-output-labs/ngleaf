import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-organization-settings-layout",
  templateUrl: "./organization-settings-layout.component.html",
  styleUrls: ["./organization-settings-layout.component.scss"],
})
export class OrganizationSettingsLayoutComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        labelKey: "app.organization-settings.layout.membersLinkLabel",
        link: "./members",
        index: 0,
        disabled: false,
      },
      {
        labelKey: "app.organization-settings.layout.policiesLinkLabel",
        link: "./policies",
        index: 1,
        disabled: false,
      },
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === "." + this.router.url)
      );
    });
  }
}
