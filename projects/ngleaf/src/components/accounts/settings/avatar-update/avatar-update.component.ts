import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LeafSessionService } from '../../../../services/core/session/leaf-session.service';

@Component({
  standalone: false,
  selector: 'leaf-avatar-update',
  templateUrl: './avatar-update.component.html',
  styleUrls: ['./avatar-update.component.scss']
})
export class AvatarUpdateComponent implements OnInit {
  public changeAvatarForm: UntypedFormGroup;

  constructor(
    public formBuilder: UntypedFormBuilder,
    public sessionService: LeafSessionService
  ) {
    this.changeAvatarForm = this.formBuilder.group({
      avatarUrl: ['', Validators.required],
    });
  }

  ngOnInit() {}

  changeAvatar() {
    if (this.changeAvatarForm.valid) {
      const { avatarUrl } = this.changeAvatarForm.getRawValue();
      this.sessionService.changeAvatar(avatarUrl);
    }
  }
}
