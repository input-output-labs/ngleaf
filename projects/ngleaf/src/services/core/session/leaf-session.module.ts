import { NgModule } from '@angular/core';
import { AccountApiClientModule, SponsoringApiClientModule } from '../../../api/clients/index';
import { LeafLegalNoticeService } from '../legal-notice/leaf-legal-notice.service';
import { LeafSessionService } from './leaf-session.service';

@NgModule({
    imports: [AccountApiClientModule, SponsoringApiClientModule],
    providers: [LeafSessionService, LeafLegalNoticeService]
})
export class LeafSessionModule {
  constructor(legalNoticeService: LeafLegalNoticeService) {
    legalNoticeService.watch();
  }
}
