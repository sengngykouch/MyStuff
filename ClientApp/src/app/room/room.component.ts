import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    roomList = [
        {Id: 1, Building: 'House1', Room: 'Living Room'},
        {Id: 2, Building: 'House1', Room: 'Kitchen'}
    ];


    /* ------------------
        Modal Triggers
    ---------------------*/
    addRoomModal(): void {
        // trigger the modal.
        // reset all the field.
    }

    editRoomModal(): void {
        // trigger the edit modal.
        // get Room properties and fill in the space.
    }

    deleteRoomModal(): void {
        // trigger the delete modal.
    }

    /* -----------------
        Modal Buttons
    --------------------*/
    addRoom(): void {

    }

    updateRoom(): void {

    }

    deleteRoom(): void {
        
    }


}
