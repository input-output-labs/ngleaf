import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-leaf-labs-layout",
  templateUrl: "./leaf-labs-layout.component.html",
  styleUrls: ["./leaf-labs-layout.component.scss"],
})
export class LeafLabsLayoutComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.navLinks = [
      {
        labelKey: "app.leaf-labs.layout.templatesLinkLabel",
        link: "./templates",
        index: 0,
      },
      {
        labelKey: "app.leaf-labs.layout.messengerLinkLabel",
        link: "./messenger",
        index: 1,
      },
      {
        labelKey: "app.leaf-labs.layout.sponsoringLinkLabel",
        link: "./sponsoring",
        index: 2,
      },
      {
        labelKey: "app.leaf-labs.layout.statisticsLinkLabel",
        link: "./statistics",
        index: 3,
      },
      {
        labelKey: "app.leaf-labs.layout.paymentLinkLabel",
        link: "./payment",
        index: 4,
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
