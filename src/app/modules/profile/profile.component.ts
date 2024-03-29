import { Component, OnInit } from '@angular/core';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory,
} from '@ngrx/data';
import {
  BehaviorSubject,
  Observable,
  ObservableLike,
  map,
  switchMap,
} from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  username: any;
  email: any;
  address: any;
  toId!: any;
  userInfo!: any;
  userModal: any;

  userForm: any = {
    _id: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
  };

  constructor(private user: UsersService, private _snackBar: MatSnackBar) {
    //Get user information
    this.user.getUser().subscribe((user) => (this.userInfo = user));
  }
  ngOnInit(): void {
    //This Modal is responsible for the user information modification.
    this.userModal = new window.bootstrap.Modal(
      document.getElementById('Modal'),
      { Keyboard: false }
    );

    //Get the token of current user.
    this.toId = this.user.getToken();
  }

  openModal(id: string) {
    this.userModal.show();
    this.userForm.email = this.userInfo.email;
    this.userForm.phone = this.userInfo.phone;
    this.userForm.username = this.userInfo.username;
  }

  validatePasswords(group: FormGroup) {
    const password = this.userForm.password1;
    const confirmPassword = this.userForm.password2;

    if (password === confirmPassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  updateProfile() {
    if (this.validatePasswords(this.userForm) == null) {
      this.userInfo.username = this.userForm.username;
      this.userInfo.email = this.userForm.email;
      this.userInfo.phone = this.userForm.phone;
      if (this.userForm.password1 != '') {
        this.userInfo.password = this.userForm.password1;
        this.user.updateUserPassword(this.userInfo).subscribe((_) => {
          this.userModal.hide();
        });
      } else {
        this.user.updateInfo(this.userInfo).subscribe((_) => {
          this.userModal.hide();
        });
      }
      this._snackBar.open('Profile Edited Successfully !', 'Close', {
        duration: 3000, // Duration in milliseconds
      });
    } else {
      this._snackBar.open('Mismatch Passwords !', 'Close', {
        duration: 3000,
      });
    }
  }
}
