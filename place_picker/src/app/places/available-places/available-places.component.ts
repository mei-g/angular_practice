import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit{
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placeService = inject(PlacesService);

  // constructor(private httpClient: HttpClient){}
  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placeService.loadAvailablePlaces()
    .subscribe({
      next: (places) => {
        console.log(places);
        this.places.set(places);
      }, 
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
    this.placeService.addPlaceToUserPlaces(selectedPlace).subscribe(
      {
        next: (resData)=> console.log(resData),
        error: (error)=>console.log(error.message),
      }
    );
    }
}
