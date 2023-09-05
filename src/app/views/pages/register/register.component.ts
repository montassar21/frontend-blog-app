import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import { UsersService } from '../../../shared/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

angForm!:FormGroup;
constructor(
private fb:FormBuilder,
private route:Router,
private auth: UsersService,
private _snackBar:MatSnackBar

)
{
}
ngOnInit():void{
  this.angForm=this.fb.group({
    username:['',Validators.required],
    email:['',Validators.required],
    phone:['',Validators.required],
    password1:['',Validators.required],
    password2:['',Validators.required]
  })
  if(this.auth.isLoggedIn()){
    this.route.navigate(['dashboard']);}
}

onSignup(){
  if(this.angForm.valid){
    console.log(this.angForm.value);
   this.auth.signUp(this.angForm.value).subscribe({
    next:(res=>{

      console.log(res);
        this._snackBar.open('User Created Successully !', 'Close', {
        duration: 3000 // Duration in milliseconds
      });
      this.route.navigate(['login']);
            this.angForm.reset();

//     else if(res.Message=="This mail exist!"){
//       this.toast.error({detail:"ERROR",summary:res.Message,duration:5000});
//   }
//   else if(res.Message=="Username is too short."){
//     this.toast.error({detail:"ERROR",summary:res.Message,duration:5000});
// }
// else if(res.Message=="Password is too short."){
//   this.toast.error({detail:"ERROR",summary:res.Message,duration:5000});
// }
// else{
//   this.toast.error({detail:"ERROR",summary:res.Message,duration:5000});

// }
    })
   ,error:(err=>{
    // alert(err?.error.Message);
   })

   })
  }
  else{
  alert("Invalid input !")
// ValidateForm.vlidateAllFormFields(this.angForm);
  }
}

}
