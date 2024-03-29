import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/shared/users.service';
declare var window: any;

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss'],
})
export class ManagePostsComponent implements OnInit {
  postModal!: any;
  userId!: string | null;
  posts: any[] = [];
  postForm: any = {
    _id: '',
    title: '',
    content: '',
    date: '',
    status: '',
  };

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private user: UsersService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.userId = this.getUserId();
    // console.log(this.userId);
    this.posts = this.getPostsByUser();
    //Open the modal
    this.postModal = new window.bootstrap.Modal(
      document.getElementById('postModal'),
      { Keyboard: false }
    );
  }

  // This function is responsible for the opening of the Modal
  openModal(): void {
    this.postForm = {
      _id: '',
      title: '',
      content: '',
      date: '',
      status: 'private',
    };
    this.postModal.show();
  }
  addPost(): void {
    // Retrieve form data
    const postData: any = {
      title: this.postForm.title,
      content: this.postForm.content,
      date: this.postForm.date,
      status: this.postForm.status,
    };
    console.log(postData);

    // Call the service method to add the post
    this.user.addPost(postData).subscribe(
      (response: any) => {
        // Handle success response if needed
        console.log('Post added successfully:', response);
        // Close the modal
        this.postModal.hide();
        // Display success message using MatSnackBar
        this._snackBar.open('Post created successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds
        });
      },
      (error) => {
        // Handle error response if needed
        console.error('Error adding post:', error);
        // Display error message using MatSnackBar
        this._snackBar.open('Error creating post. Please try again.', 'Close', {
          duration: 3000, // Duration in milliseconds
        });
      }
    );
  }
  getUserId(): string | null {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return user._id;
    } else {
      return null; // Handle case where user info is not found in local storage
    }
  }

  getPostsByUser(): any {
    this.user.getAllPostsByUser(this.userId).subscribe(
      (response: any) => {
        this.posts = response.userWithPost.posts;
        console.log('Posts by user:', this.posts);
      },
      (error: any) => {
        console.error('Error fetching posts by user:', error);
        // Gérer l'erreur de manière appropriée
      }
    );
  }
  editPost(post: any): any {}

  deletePost(post: any): void {
    console.log(post);
    this.user.deletePost(post._id).subscribe(
      (res) => {
        console.log(res);
        console.log('Post deleted successfully:', post);
        // Rechargez les posts après la suppression
        this.getPostsByUser();
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
