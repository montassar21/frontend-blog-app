import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  angForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: UsersService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.angForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    });
    if (this.auth.isLoggedIn()) {
      this.route.navigate(['dashboard']);
    }
  }

  onSignup() {
    console.log(this.angForm.value);
    this.auth.signUp(this.angForm.value).subscribe({
      next: (res) => {
        this._snackBar.open(res.message, 'Close', {
          duration: 3000, // Duration in milliseconds
        });
        this.route.navigate(['login']);
        this.angForm.reset();
      },
      error: (err) => {
        this._snackBar.open(err.error.error.message, 'Close', {
          duration: 3000, // Duration in milliseconds
        });
      },
    });
  }
}
