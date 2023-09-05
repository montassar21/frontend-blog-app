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
      if(this.loginForm.valid){
        //send the obj to database
          this.auth.login(this.loginForm.value).subscribe({
          next:(response=>{
            console.log(response);

            this.auth.storeToken(response.token);
            this.route.navigate(['dashboard']);
            // this.toast.success({detail:"SUCCESS",summary:res.Message,duration:5000});
    this._snackBar.open('Success !', 'Close', {
        duration: 3000 // Duration in milliseconds
      });

            //  else if(res.Message=="Email does not exist.!")
            //  else          this.toast.error({detail:"ERROR",summary:res.Message,duration:5000});
            return response.token;
              }),
          error:(err=>{
          this._snackBar.open('Error : Login or password Incorrect !', 'Close', {
        duration: 3000 // Duration in milliseconds
    });

          })
        })
      }
      else{
        //throw the error using toaster and with required field
        // ValidateForm.vlidateAllFormFields(this.loginForm);
         this._snackBar.open('Your form is invalid !', 'Close', {
        duration: 3000 // Duration in milliseconds
    });

      }
    }

}
