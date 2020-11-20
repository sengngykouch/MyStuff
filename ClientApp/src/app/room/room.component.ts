import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { $ } from 'protractor';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const roomListCon = [
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 2, Building: 'House2', Room: 'Kitchen' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 1, Building: 'House1', Room: 'Living Room' },
];

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, AfterViewInit {

    constructor() { }

    ngOnInit(): void {
    }

    displayedColumns: string[] = ['Id', 'Building', 'Room', 'Option'];
    dataSource = new MatTableDataSource(roomListCon);

    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }

    /* ----------------
        Properties
    -------------------*/

    isEdit: boolean = false;

    numberInput: number;
    buildingInput: string;
    roomInput: string;

    /* ------------------
        Modal Triggers
    ---------------------*/
    addRoomClick(): void {
        this.isEdit = false;

        this.numberInput = -1;
        this.buildingInput = '';
        this.roomInput = '';
    }

    editRoomClick(room): void {
        this.isEdit = true;

        this.numberInput = room.Id;
        this.buildingInput = room.Building;
        this.roomInput = room.Room;
    }

    deleteRoomClick(): void {
        // trigger the delete modal.
    }

    /* -----------------
        Modal Buttons
    --------------------*/
    addRoom(): void {
        console.log(this.numberInput);
    }

    updateRoom(): void {

    }

    deleteRoom(): void {

    }


    resetRoomInputs(): void {

    }

}
