import { Injectable, signal, inject, DestroyRef } from '@angular/core';

import { Place } from './place.model';
import { map, catchError, throwError, tap } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/modal/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errService = inject(ErrorService);

  allUserPlaces = this.userPlaces.asReadonly();
  // private destroyRef = inject(DestroyRef);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces("http://localhost:3000/places", 'sometthing went wrong')
  }

  loadUserPlaces() {
  
    // tap is similar to subscibe but without subscribe to it 
    return this.fetchPlaces("http://localhost:3000/user-places", 'sometthing went wrong').pipe(tap({
      next: (userPlaces) => this.userPlaces.set(userPlaces),
    }))

  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = [...this.userPlaces()];
    
    if(!prevPlaces.some((p)=> p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);

    }
    return this.httpClient.put('http://localhost:3000/user-places', {placeId: place.id}).pipe(
      catchError((error)=>{
        this.userPlaces.set([...prevPlaces]);
        this.errService.showError('Failded to store selected places')
        return throwError(() => new Error('Failded to store selected places'))
      })
    )
  }
  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    this.userPlaces.set(prevPlaces.filter((pl) => pl.id != place.id))

    return this.httpClient.delete('http://localhost:3000/user-places/'+ place.id).pipe(
      catchError((error)=>{
        this.userPlaces.set(prevPlaces);
        this.errService.showError('Failded to delete selected places')
        return throwError(() => new Error('Failded to delete selected places'))
      })
    );
  }

  private fetchPlaces (url: string, errMsg: string) {
    return this.httpClient
        .get<{ places: Place[] }>(url)
        .pipe(
          map((resData)=> resData.places), catchError((error) => throwError(()=> {
            console.log(error);
            new Error('something wnet wrong, please try again later')
          })) 
        )
        
  }
}
