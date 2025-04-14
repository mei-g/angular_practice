import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';

import { Place } from './place.model';
import { InteropObservable, interval, map,  } from 'rxjs';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css',
})
export class PlacesComponent implements OnInit {
  places = input.required<Place[]>();
  selectPlace = output<Place>();
  private destroyRef = inject(DestroyRef);
  

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
  ngOnInit(): void {
    const subscription = interval(1000).pipe(
      map((val) => val*2)
    ).subscribe({

      next: (val) => console.log(val),
    }
    );

    this.destroyRef.onDestroy(() =>
      subscription.unsubscribe()
    );
  }
}
