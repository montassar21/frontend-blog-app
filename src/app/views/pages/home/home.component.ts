import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any;
  @ViewChild('buttons', { static: true })
  buttons!: ElementRef;
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {
    this.isLoggedIn();
    console.log(this.isLoggedIn());
    console.log(this.buttons);

    const controlButtons =
      this.buttons.nativeElement.querySelectorAll('.control');
    console.log(controlButtons);
    controlButtons.forEach((button: Element) => {
      this.renderer.listen(button, 'click', () => {
        const activeButton = document.querySelector('.active-btn');
        if (activeButton) {
          activeButton.classList.remove('active-btn');
        }

        button.classList.add('active-btn');

        const activeContent = document.querySelector('.active');
        if (activeContent) {
          activeContent.classList.remove('active');
        }

        const contentId = button.getAttribute('data-id');
        if (contentId) {
          const contentElement = document.getElementById(contentId);
          if (contentElement) {
            contentElement.classList.add('active');
          }
        }
      });
    });
  }
  isLoggedIn(): boolean {
    console.log(localStorage.getItem('currentUser'));
    return localStorage.getItem('currentUser') != null;
  }

  ngAfterViewInit() {}
  toggleTheme() {
    document.body.classList.toggle('light-mode');
  }
}
