import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { $ } from 'protractor';
import { NgbdSortableHeader, SortEvent} from '../directive/sortable.directive';

const roomListCon = [
    { Id: 1, Building: 'House1', Room: 'Living Room' },
    { Id: 2, Building: 'House2', Room: 'Kitchen' }
];

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1: v1 > v2 ? 1 : 0;

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    constructor() { }

    ngOnInit(): void {
    }

    /* ----------------
        Properties
    -------------------*/
    roomList = roomListCon;

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

    onSort({column, direction}: SortEvent){
        this.headers.forEach(header => {
            if(header.sortable !== column){
                header.direction = '';
            }
        });

        console.log('hi');

        if(direction === '' || column ===''){
            this.roomList = roomListCon;
        }else{
            this.roomList = [...roomListCon].sort((a, b) => {
                const res = compare(a[column], b[column]);
                return direction === 'asc' ? res : -res;
            })
        }
    }

}
