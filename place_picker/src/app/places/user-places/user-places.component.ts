import { Component, OnInit, DestroyRef, signal, inject} from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
// import { HttpClient } from '@angular/common/http';
// import { map, catchError, throwError } from 'rxjs'
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{
  isFetching = signal(false);
  error = signal(false);
  private destroyRef = inject(DestroyRef);
  private placeService = inject(PlacesService);

  places = this.placeService.allUserPlaces;

  // constructor(private httpClient: HttpClient){}
  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placeService.loadUserPlaces()
    .subscribe({
      error: (error) => {
        console.log(error());
        // this.error.set('something went wrong. please try again later');
        this.error.set(error.message);
      },
      complete: () =>{
        this.isFetching.set(false);
      }
    })
    ;
  this.destroyRef.onDestroy(()=> {
      subscription.unsubscribe();
  });
  }

  onSelectPlace(selectedPlace: Place) {
    this.placeService.removeUserPlace(selectedPlace).subscribe({
      next: (resData)=> console.log(resData),
      complete: ()=> console.log('deletion is done')
    });
  }
}
