import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  currentImage: any;
  updates: number = 0;

  constructor(
    private classToggler: ClassToggleService,
    private auth: UsersService,
    private user: UsersService
  ) {
    super();
  }

  async ngOnInit() {
    //      try {
    //        const userr = await this.user.getUser().toPromise();
    //        this.currentImage = userr.image
    //   console.log(this.user.getToken())
    //   if (this.user.getToken() != userr.token) {
    //     this.user.signOut()
    //   }
    //    } catch (error) {
    //            this.user.signOut()
    //   console.error('An error occurred:', error);
    // }
  }
  logout() {
    this.auth.signOut();
  }
}
