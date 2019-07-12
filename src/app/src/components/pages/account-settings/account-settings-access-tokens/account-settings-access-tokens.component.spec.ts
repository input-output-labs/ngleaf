import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsAccessTokensComponent } from './account-settings-access-tokens.component';

describe('AccountSettingsAccessTokensComponent', () => {
  let component: AccountSettingsAccessTokensComponent;
  let fixture: ComponentFixture<AccountSettingsAccessTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsAccessTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsAccessTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
