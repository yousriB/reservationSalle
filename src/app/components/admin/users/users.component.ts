import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== userId);
    });
  }
}
