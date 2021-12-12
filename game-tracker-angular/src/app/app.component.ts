import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked {
  title = 'game-tracker-angular';

  constructor(
    public loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }
}
