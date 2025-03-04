import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users = [
    { name: "John Doe", email: "john@example.com", role: "Admin", password: "1234" },
    { name: "Alice Smith", email: "alice@example.com", role: "User", password: "1234" },
    { name: "Michael Brown", email: "michael@example.com", role: "User", password: "1234" },
    { name: "Emily Davis", email: "emily@example.com", role: "Admin", password: "1234" }
  ];

  searchQuery: string = "";
  selectedRole: string = "";
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedUser: any = null;

  currentPage: number = 1;
  itemsPerPage: number = 2;

  filteredUsers() {
    return this.users.filter(user =>
      (user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
       user.email.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (this.selectedRole ? user.role === this.selectedRole : true)
    );
  }

  paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers().slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.filteredUsers().length / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
    this.showEditModal = true;
  }

  updateUser() {
    const index = this.users.findIndex(u => u.email === this.selectedUser.email);
    if (index !== -1) {
      this.users[index] = { ...this.selectedUser };
    }
    this.closeEditModal();
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedUser = null;
  }

  confirmDelete(user: any) {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  deleteUser() {
    this.users = this.users.filter(user => user !== this.selectedUser);
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedUser = null;
  }
}
