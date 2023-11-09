import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import {
  LeafSponsoringResolverModule,
  LeafSponsorCodeInterceptorGuardModule,
  LeafSponsorCodeInterceptorGuard,
  StatisticsPageComponent,
  LeafSponsoringResolver,
} from "@input-output-labs/ngleaf";
import { LeafLabsLayoutComponent } from "./leaf-labs-layout/leaf-labs-layout.component";
import { LeafLabsLayoutModule } from "./leaf-labs-layout/leaf-labs-layout.module";
import { TemplatesComponent } from "./templates/templates.component";
import { MessengerComponent } from "./messenger/messenger.component";
import { SponsoringComponent } from "./sponsoring/sponsoring.component";
import { MessengerModule } from "./messenger/messenger.module";
import { SponsoringModule } from "./sponsoring/sponsoring.module";
import { PaymentComponent } from "./payment/payment.component";
import { PaymentModule } from "./payment/payment.module";

const routes: Routes = [
  {
    path: "",
    component: LeafLabsLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "templates",
        pathMatch: "full",
      },
      {
        path: "templates",
        component: TemplatesComponent,
      },
      {
        path: "messenger",
        component: MessengerComponent,
      },
      {
        path: "sponsoring",
        canActivate: [LeafSponsorCodeInterceptorGuard],
        component: SponsoringComponent,
        resolve: [LeafSponsoringResolver],
      },
      {
        path: "statistics",
        component: StatisticsPageComponent,
      },
      {
        path: "payment",
        component: PaymentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    /* Leaf deps */
    MessengerModule,
    SponsoringModule,
    LeafSponsoringResolverModule,
    LeafSponsorCodeInterceptorGuardModule,
    PaymentModule,
    /* App deps */
    LeafLabsLayoutModule,
  ],
})
export class LeafLabsModule {}
