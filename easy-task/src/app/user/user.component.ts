import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { CardComponent } from "../shared/card/card.component";

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length)

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [CardComponent]
})
export class UserComponent {
  // selectedUser = DUMMY_USERS[randomIndex];
  // newSelectedUser = signal(DUMMY_USERS[randomIndex]);
  // newImagePath = computed(() => '../assets/'+ this.newSelectedUser().avatar);

  // get imagePath() {
  //   return '../assets/' + this.selectedUser.avatar;
  // }

  // onSelectedUser() {
  //   console.log('clicked!');
  //   const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length)

  //   this.selectedUser=DUMMY_USERS[randomIndex];

  //   this.newSelectedUser.set(DUMMY_USERS[randomIndex]);
  // }


  @Input({required:true}) id!:string;
  @Input({required:true}) avatar!:string;
  @Input({required:true}) name!:string;

  @Input({required:true}) selected!:boolean;

  @Output() select = new EventEmitter<string>();
  //signal method.
  // newAvatar = input.required<string>();

  get imagePath() {
    return '../assets/' + this.avatar;
  }


  onSelectedUser() {
     this.select.emit(this.id);
  }
}
