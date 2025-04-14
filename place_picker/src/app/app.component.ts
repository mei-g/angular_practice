import { Component, inject } from '@angular/core';

import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import { ErrorService } from './shared/modal/error.service';
import { ErrorModalComponent } from "./shared/modal/error-modal/error-modal.component";
import { ModalComponent } from "./shared/modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AvailablePlacesComponent, UserPlacesComponent, ErrorModalComponent, ModalComponent],
})
export class AppComponent {
  private errService = inject(ErrorService);
  error = this.errService.error;
}
