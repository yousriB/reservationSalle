import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-services-management',
  standalone: false,
  templateUrl: './services-management.component.html',
  styleUrl: './services-management.component.css'
})
export class ServicesManagementComponent {
  tabs = [
    { id: 'food', name: 'Food Types' },
    { id: 'locations', name: 'Locations' },
    { id: 'decorations', name: 'Decorations' },
    { id: 'entertainment', name: 'Entertainment' }
  ];
  currentTab = 'food';

  // Configuration data
  foodOptions: any[] = [];
  locationOptions: any[] = [];
  decorationOptions: any[] = [];
  entertainmentOptions: any[] = [];

  // Modal control
  showModal = false;
  modalTitle = '';
  isEditing = false;
  editForm: any = {
    label: '',
    value: '',
    image: ''
  };
  currentEditingType = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAllConfigurations();
  }

  loadAllConfigurations(): void {
    this.adminService.getFoodOptions().subscribe(data => this.foodOptions = data);
    this.adminService.getLocationOptions().subscribe(data => this.locationOptions = data);
    this.adminService.getDecorationOptions().subscribe(data => this.decorationOptions = data);
    this.adminService.getEntertainmentOptions().subscribe(data => this.entertainmentOptions = data);
  }

  // Food Methods
  openFoodModal(item?: any): void {
    this.currentEditingType = 'food';
    if (item) {
      this.modalTitle = 'Edit Food Type';
      this.editForm = { ...item };
      this.isEditing = true;
    } else {
      this.modalTitle = 'Add New Food Type';
      this.editForm = { label: '', value: '', image: '' };
      this.isEditing = false;
    }
    this.showModal = true;
  }

  editFood(item: any): void {
    this.openFoodModal(item);
  }

  deleteFood(value: string): void {
    if (confirm('Are you sure you want to delete this food type?')) {
      this.adminService.deleteFoodOption(value).subscribe(() => {
        this.foodOptions = this.foodOptions.filter(f => f.value !== value);
      });
    }
  }

  // Location Methods
  openLocationModal(item?: any): void {
    this.currentEditingType = 'location';
    if (item) {
      this.modalTitle = 'Edit Location';
      this.editForm = { ...item };
      this.isEditing = true;
    } else {
      this.modalTitle = 'Add New Location';
      this.editForm = { label: '', value: '', image: '' };
      this.isEditing = false;
    }
    this.showModal = true;
  }

  editLocation(item: any): void {
    this.openLocationModal(item);
  }

  deleteLocation(value: string): void {
    if (confirm('Are you sure you want to delete this location?')) {
      this.adminService.deleteLocationOption(value).subscribe(() => {
        this.locationOptions = this.locationOptions.filter(l => l.value !== value);
      });
    }
  }

  // Decoration Methods
  openDecorationModal(item?: any): void {
    this.currentEditingType = 'decoration';
    if (item) {
      this.modalTitle = 'Edit Decoration';
      this.editForm = { ...item };
      this.isEditing = true;
    } else {
      this.modalTitle = 'Add New Decoration';
      this.editForm = { label: '', value: '', image: '' };
      this.isEditing = false;
    }
    this.showModal = true;
  }

  editDecoration(item: any): void {
    this.openDecorationModal(item);
  }

  deleteDecoration(value: string): void {
    if (confirm('Are you sure you want to delete this decoration?')) {
      this.adminService.deleteDecorationOption(value).subscribe(() => {
        this.decorationOptions = this.decorationOptions.filter(d => d.value !== value);
      });
    }
  }

  // Entertainment Methods
    openEntertainmentModal(item?: any): void {
      this.currentEditingType = 'entertainment';
      if (item) {
        this.modalTitle = 'Edit Entertainment Option';
        this.editForm = { ...item };
        this.isEditing = true;
      } else {
        this.modalTitle = 'Add New Entertainment Option';
        this.editForm = { label: '', value: '', image: '' };
        this.isEditing = false;
      }
      this.showModal = true;
    }

  editEntertainment(item: any): void {
    this.openEntertainmentModal(item);
  }

  deleteEntertainment(value: string): void {
    if (confirm('Are you sure you want to delete this entertainment option?')) {
      this.adminService.deleteEntertainmentOption(value).subscribe(() => {
        this.entertainmentOptions = this.entertainmentOptions.filter(e => e.value !== value);
      });
    }
  }

  // Modal Methods
  closeModal(): void {
    this.showModal = false;
    this.editForm = { label: '', value: '', image: '' };
  }

  saveChanges(): void {
    if (this.currentEditingType === 'food') {
      this.saveFoodChanges();
    } else if (this.currentEditingType === 'location') {
      this.saveLocationChanges();
    } else if (this.currentEditingType === 'decoration') {
      this.saveDecorationChanges();
    } else if (this.currentEditingType === 'entertainment') {
      this.saveEntertainmentChanges();
    }
  }

  private saveFoodChanges(): void {
    if (this.isEditing) {
      this.adminService.updateFoodOption(this.editForm).subscribe(updated => {
        this.foodOptions = this.foodOptions.map(f => 
          f.value === updated.value ? updated : f
        );
        this.closeModal();
      });
    } else {
      this.adminService.addFoodOption(this.editForm).subscribe(newOption => {
        this.foodOptions = [...this.foodOptions, newOption];
        this.closeModal();
      });
    }
  }

  private saveLocationChanges(): void {
    if (this.isEditing) {
      this.adminService.updateLocationOption(this.editForm).subscribe(updated => {
        this.locationOptions = this.locationOptions.map(l => 
          l.value === updated.value ? updated : l
        );
        this.closeModal();
      });
    } else {
      this.adminService.addLocationOption(this.editForm).subscribe(newOption => {
        this.locationOptions = [...this.locationOptions, newOption];
        this.closeModal();
      });
    }
  }

  private saveDecorationChanges(): void {
    if (this.isEditing) {
      this.adminService.updateDecorationOption(this.editForm).subscribe(updated => {
        this.decorationOptions = this.decorationOptions.map(d => 
          d.value === updated.value ? updated : d
        );
        this.closeModal();
      });
    } else {
      this.adminService.addDecorationOption(this.editForm).subscribe(newOption => {
        this.decorationOptions = [...this.decorationOptions, newOption];
        this.closeModal();
      });
    }
  }

  private saveEntertainmentChanges(): void {
    if (this.isEditing) {
      this.adminService.updateEntertainmentOption(this.editForm).subscribe(updated => {
        this.entertainmentOptions = this.entertainmentOptions.map(e => 
          e.value === updated.value ? updated : e
        );
        this.closeModal();
      });
    } else {
      this.adminService.addEntertainmentOption(this.editForm).subscribe(newOption => {
        this.entertainmentOptions = [...this.entertainmentOptions, newOption];
        this.closeModal();
      });
    }
  }
}
