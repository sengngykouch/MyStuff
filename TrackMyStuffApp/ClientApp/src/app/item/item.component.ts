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

    @ViewChild('closebutton') closebutton;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;

    /* ----------------
        Properties
    -------------------*/
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
        this.itemService.getItems().subscribe(items => {
            this.dataSource = items;
            //this.dataSource.sort = this.sort;
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

        this.idInput = item.Id;
        this.nameInput = item.Name;
        this.locationInput = item.Location;
        this.descriptionInput = item.Description;
        this.pictureInput = item.Picture;
        this.expirationDateInput = item.ExpirationDate;
    }

    deleteItemClick(): void {

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

        this.itemService.addItem(itemToAdd).subscribe(itemResult => {
            this.closebutton.nativeElement.click();
            this.dataSource.push(itemResult);
            
            this.table.renderRows();
            
        });
    }

    updateItem(): void {

    }

    deleteItem(): void {

    }

}
