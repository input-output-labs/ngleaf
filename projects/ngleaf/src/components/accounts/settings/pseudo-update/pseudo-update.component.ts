import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LeafSessionService } from '../../../../services/core/session/leaf-session.service';

@Component({
  selector: 'leaf-pseudo-update',
  templateUrl: './pseudo-update.component.html',
  styleUrls: ['./pseudo-update.component.scss']
})
export class PseudoUpdateComponent implements OnInit {
  public changeNameForm: UntypedFormGroup;

  public members: string[] = [];

  constructor(
    public formBuilder: UntypedFormBuilder,
    public sessionService: LeafSessionService
  ) {
    this.changeNameForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  ngOnInit() {}

  changeName() {
    if (this.changeNameForm.valid) {
      const { username } = this.changeNameForm.getRawValue();
      this.sessionService.changeUsername(username);
    }
  }
}
