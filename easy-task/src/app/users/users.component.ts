import { Component, input, output, signal } from '@angular/core';
import { UserComponent } from './user/user.component';
import { UserInfo } from '../user.interface'
import { NewUserComponent } from './new-user/new-user.component';
@Component({
  selector: 'app-users',
  imports: [UserComponent, NewUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
// selectedUserId=input.required<string>();
users=input.required<UserInfo[]>();

selectedId=output<string>();
selected:string='';
addClicked = signal<boolean>(false);

onAddUser() {
    console.log('addClicked clicked');
    this.addClicked.set(true);
  }

onSelectUser(id: string){
  this.selectedId.emit(id)
  this.selected = id;
  console.log('app-users: ' + id);
 }

 onNewUserCancel() {
   console.log("cancel user add emitted");
   this.addClicked.set(false);
 }
 
 onNewUserAdd() {
  console.log("new user add emitted");
   this.addClicked.set(false);
 }
}
