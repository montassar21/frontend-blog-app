import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Token } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,
    public auth:UsersService,
    private route: Router,
    private _snackBar:MatSnackBar
  ) { }
  ngOnInit():void{
    this.loginForm=this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
    })
    if(this.auth.isLoggedIn()){
      this.route.navigate(['dashboard']);
    }


    }

    onLogin(){
        //send the obj to database
          this.auth.login(this.loginForm.value).subscribe({
            next: (response => {
              console.log(response);
              this.auth.storeToken(response.token);
              localStorage.setItem('currentUser', JSON.stringify(response.user));


             this._snackBar.open('Success !', 'Close', {
          duration: 3000 // Duration in milliseconds
         });
            this.route.navigate(['posts']);
            this.loginForm.reset();

              }),
          error:(err=>{
          this._snackBar.open(err.error.error.message, 'Close', {
        duration: 3000 // Duration in milliseconds
    });

          })
        })


    }

}
