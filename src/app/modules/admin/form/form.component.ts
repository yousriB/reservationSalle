import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  selectedCategory: keyof typeof this.formOptions = "Locations";
  newItem: string = "";
  showEditModal: boolean = false;
  editItemValue: string = "";
  editIndex: number | null = null;

  categories: string[] = ["Locations", "Event Types", "Food Types", "Security Options", "Transport Options", "Decorations", "Entertainment"];

  formOptions: Record<string, string[]> = {
    "Locations": ["Hall A", "Hall B", "Outdoor Venue", "Banquet Hall"],
    "Event Types": ["Wedding", "Conference", "Birthday Party", "Concert"],
    "Food Types": ["Buffet", "Plated Meal", "Custom Menu"],
    "Security Options": ["Basic Security", "Armed Guards", "Surveillance"],
    "Transport Options": ["No Transport", "VIP Shuttle", "Luxury Cars"],
    "Decorations": ["Classic", "Modern", "Custom Theme"],
    "Entertainment": ["DJ", "Live Band", "Dancers", "Magic Show", "Fireworks"]
  };

  getCategoryItems(): string[] {
    return this.formOptions[this.selectedCategory] || [];
  }

  addItem() {
    if (this.newItem.trim() === "") return;
    this.formOptions[this.selectedCategory].push(this.newItem.trim());
    this.newItem = "";
  }

  editItem(item: string) {
    this.editItemValue = item;
    this.editIndex = this.formOptions[this.selectedCategory].indexOf(item);
    this.showEditModal = true;
  }

  updateItem() {
    if (this.editIndex !== null && this.editItemValue.trim() !== "") {
      this.formOptions[this.selectedCategory][this.editIndex] = this.editItemValue.trim();
    }
    this.closeEditModal();
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editIndex = null;
  }

  deleteItem(item: string) {
    this.formOptions[this.selectedCategory] = this.formOptions[this.selectedCategory].filter(i => i !== item);
  }

  saveChanges() {
    console.log("Form options saved:", this.formOptions);
    alert("Changes saved successfully! Ready to integrate API.");
  }
}
