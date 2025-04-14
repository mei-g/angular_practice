import { Component, DestroyRef, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit , OnDestroy{
  private interval? : ReturnType <typeof setInterval> ;
  private destroyRef = Inject(DestroyRef);

  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  constructor() {
    this.interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = "offline";
      }else {
        this.currentStatus = "unknown";
      }

    }, 5000);

    // another way of doing ngOnDestroy
    this.destroyRef(()=>{
      clearTimeout(this.interval);
    })
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = "offline";
      }else {
        this.currentStatus = "unknown";
      }

    }, 5000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.interval);
  }
}
