import { Component, input, output } from '@angular/core';
import { UserComponent } from './user/user.component';
import { UserInfo } from '../user.interface'
@Component({
  selector: 'app-users',
  imports: [UserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
// selectedUserId=input.required<string>();
users=input.required<UserInfo[]>();

selectedId=output<string>();
selected:string='';

onAddUser() {
    console.log('clicked');
  }

onSelectUser(id: string){
  this.selectedId.emit(id)
  this.selected = id;
  console.log('app-users: ' + id);
 }
}
