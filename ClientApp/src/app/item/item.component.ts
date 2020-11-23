import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FormControl, Validators } from '@angular/forms';


//TODO: remove this after hook with API.
const itemConst = [
    {Id: 1, Name: 'Noodle', Location: 'Kitchen', Description: 'White chinese noodle in green package', ExpirationDate: '2022/01/13'},
    {Id: 2, Name: 'Soup Base', Location: 'Kitchen', Description: 'Orange package with sheep as the cover', ExpirationDate: '2021/11/23'}
];

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, AfterViewInit {

    constructor() { }

    @ViewChild(MatSort) sort: MatSort;

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    /* ----------------
        Properties
    -------------------*/
    displayedColumns: string[] = ['Id', 'Name', 'Location', 'Description', 'Picture', 'ExpirationDate', 'Option'];

    dataSource = new MatTableDataSource(itemConst);

    nameInputControl = new FormControl('', [
        Validators.required
    ]);
    locationInputControl = new FormControl('', [
        Validators.required
    ]);

    isEdit: boolean = false;

    idInput: number;
    nameInput: string;
    locationInput: string;
    descriptionInput: string;
    pictureInput: string;
    expirationDateInput: string;

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
        this.expirationDateInput = '';
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
        
    }

    updateItem(): void {

    }

    deleteItem(): void {

    }

}
