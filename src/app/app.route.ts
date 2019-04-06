import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AccountSettingsPageComponent } from '@iolabs/ngleaf/components';

const routes: Route[] = [
  {
    path: '',
    redirectTo: '/settings',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: AccountSettingsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // add { enableTracing: true } after routes in forRoot to debug the router
  exports: [RouterModule],
})
export class AppRouteModule {}
