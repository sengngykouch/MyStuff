import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { Item, ItemService } from '../services/item/item.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

    constructor(private itemService: ItemService) { }

    @ViewChild('closeButtonAddOrEdit') closeButtonAddOrEdit;
    @ViewChild('closeButtonDelete') closeButtonDelete;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;

    /* ----------------
        Properties
    -------------------*/
    isItemLoading: boolean = true;

    displayedColumns: string[] = ['Id', 'Name', 'Location', 'Description', 'Picture', 'ExpirationDate', 'Option'];

    dataSource;// = new MatTableDataSource<Item>(); 

    nameInputControl = new FormControl('', [
        Validators.required
    ]);
    locationInputControl = new FormControl('', [
        Validators.required
    ]);

    isEdit = false;

    idInput: number;
    nameInput: string;
    locationInput: string;
    descriptionInput: string;
    pictureInput: string;
    expirationDateInput: Date;

    minDateInput: Date = new Date();

    ngOnInit(): void {
        this.getAllItems();

    }

    getAllItems() {
        this.itemService.getItems().subscribe(items => {
            this.dataSource = items;
            //this.dataSource.sort = this.sort;
            this.isItemLoading = false;
        });
    }

    /* ----------------
        Modal Triggers
    -------------------*/
    addItemClick(): void {
        this.isEdit = false;

        this.idInput = -1;
        this.nameInput = '';
        this.locationInput = '';
        this.descriptionInput = '';
        this.pictureInput = '';
        this.expirationDateInput = new Date();
    }

    editItemClick(item): void {
        this.isEdit = true;

        this.idInput = item.id;
        this.nameInput = item.name;
        this.locationInput = item.location;
        this.descriptionInput = item.description;
        this.pictureInput = item.picture;
        this.expirationDateInput = item.expirationDate;
    }

    deleteItemClick(item): void {
        this.idInput = item.id;
    }

    /* -----------------
        Modal Buttons
    --------------------*/
    addItem(): void {
        let itemToAdd: Item = {
            Name: this.nameInput,
            Location: this.locationInput,
            Description: this.descriptionInput,
            ExpirationDate: this.expirationDateInput
        };

        this.isItemLoading = true;

        this.itemService.addItem(itemToAdd).subscribe(itemResult => {
            this.closeButtonAddOrEdit.nativeElement.click();
            this.dataSource.push(itemResult);
            this.table.renderRows();

            this.isItemLoading = false;
        }, error => {
            // show error on a toast or modal.
        });
    }

    updateItem(): void {
        let itemToUpdate: Item = {
            Id: this.idInput,
            Name: this.nameInput,
            Location: this.locationInput,
            Description: this.descriptionInput,
            ExpirationDate: this.expirationDateInput
        };
        this.isItemLoading = true;

        this.itemService.updateItem(itemToUpdate).subscribe(response => {
            if (response.status === 200) {
                this.closeButtonAddOrEdit.nativeElement.click();
                this.getAllItems();
            }
        }, error => {
            //maybe create a toast or modal to show error.
        });
    }

    deleteItem(): void {
        let itemId = this.idInput;

        this.itemService.deleteItem(itemId).subscribe(response => {
            if (response.status === 200) {
                this.closeButtonDelete.nativeElement.click();
                this.getAllItems();
            }
        }, error => {
            //maybe create a toast or modal to show error.
        });
    }

}
