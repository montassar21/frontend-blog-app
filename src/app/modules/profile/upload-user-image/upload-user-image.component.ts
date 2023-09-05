import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/shared/image.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-upload-user-image',
  templateUrl: './upload-user-image.component.html',
  styleUrls: ['./upload-user-image.component.scss']
})
export class UploadUserImageComponent implements OnInit {
    userInfo!: any;
    selectedFile: any ;

  constructor(private imageService: ImageService,
    private user: UsersService,
    private _snackBar: MatSnackBar,
) {

  }
  ngOnInit(): void {
        this.user.getUser().subscribe(user => this.userInfo = user);
  }


  handleFileInput(file: any): void {
    this.selectedFile = file.files.item(0);
    console.log(this.selectedFile)
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.userInfo.image = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile)
                                   }

    async uploadImage() {
         if (this.selectedFile) {
           this.imageService.uploadImage(this.selectedFile).subscribe(res => {
            console.log('Image uploaded successfully', res);
             this.userInfo.image = "photos/" + this.selectedFile.name;

            }, error => {
            console.error('Image upload failed', error);
           });
                   this.userInfo.image = "photos/"+this.selectedFile.name;
           this.user.updateUserImage(this.userInfo).subscribe(_=>    this._snackBar.open('Image uploaded successfully!', 'Close', {
        duration: 3000 // Duration in milliseconds
    }))
                   }
                         }
}
