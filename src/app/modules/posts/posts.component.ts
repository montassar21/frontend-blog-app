import { Component } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  publicPosts: any[] = [];

  constructor(private user: UsersService) {}

  ngOnInit(): void {
    this.fetchPublicPosts();
  }

  fetchPublicPosts(): void {
    this.user.getAllPublicPosts().subscribe(
      (data) => {
        console.log(data);
        this.publicPosts = data.allPosts;
      },
      (error) => {
        console.error('Error fetching public posts:', error);
      }
    );
  }
}
