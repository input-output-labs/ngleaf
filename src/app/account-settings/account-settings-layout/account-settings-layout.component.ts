import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-account-settings-layout",
  templateUrl: "./account-settings-layout.component.html",
  styleUrls: ["./account-settings-layout.component.scss"],
})
export class AccountSettingsLayoutComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        labelKey: "app.account-settings.layout.profileLinkLabel",
        link: "./profile",
        index: 0,
      },
      {
        labelKey: "app.account-settings.layout.pseudoLinkLabel",
        link: "./pseudo",
        index: 1,
      },
      {
        labelKey: "app.account-settings.layout.avatarLinkLabel",
        link: "./avatar",
        index: 2,
      },
      {
        labelKey: "app.account-settings.layout.passwordLinkLabel",
        link: "./password",
        index: 3,
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
