import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Item, ItemService } from '../services/item/item.service';
import { FileUploadComponent } from '../shared/components/file-upload/file-upload.component';
import { ImageService } from '../services/image/image.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, AfterViewInit {

    constructor(
        private itemService: ItemService,
        private imageService: ImageService,
        private toastr: ToastrService
    ) { }

    @ViewChild('closeButtonAddOrEdit') closeButtonAddOrEdit: any;
    @ViewChild('closeButtonDelete') closeButtonDelete: any;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @ViewChild(FileUploadComponent) fileUploadComponent: FileUploadComponent;

    /* ----------------
        Properties
    -------------------*/
    isItemLoading: boolean = true;

    displayedColumns: string[] = ['id', 'name', 'location', 'description', 'picture', 'expirationDate', 'option'];

    dataSource = new MatTableDataSource<Item>();

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
    expirationDateInput: Date;

    minDateInput: Date = new Date();
    
    imageString: string; // image name from database.
    selectedFileObject: any = null; // actual image file to store in AWS S3.

    ngOnInit(): void {
        this.getAllItems();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getAllItems() {
        this.itemService.getItems().subscribe(items => {
            this.dataSource.data = items;
            this.isItemLoading = false;
        }, error => {
            this.toastr.error('Failed to get items.');
            console.error(error);
            this.isItemLoading = false;
        });
    }

    setImageObj_OnFileChange(selectedFileObj: any): void {
        this.selectedFileObject = selectedFileObj;
        console.log(this.selectedFileObject);
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
        this.imageString = null;
        this.fileUploadComponent.deleteFile();
        this.expirationDateInput = new Date();
    }

    editItemClick(item: Item): void {
        this.isEdit = true;

        this.idInput = item.id;
        this.nameInput = item.name;
        this.locationInput = item.location;
        this.descriptionInput = item.description;
        this.imageString = item.image;
        this.expirationDateInput = item.expirationDate;

        //TODO: we need to fetch image to display in the modal.
    }

    deleteItemClick(item: Item): void {
        this.idInput = item.id;
    }

    /* -----------------
        Modal Buttons
    --------------------*/
    saveItem(): void {

        if(this.isEdit){
            this.updateItem();
        }else{
            if(!this.selectedFileObject){
                this.addItem();
                return;
            }
    
            this.addImageThenAddItem(this.selectedFileObject);
        }
    }

    addItem(): void {
        let itemToAdd: Item = {
            name: this.nameInput,
            location: this.locationInput,
            description: this.descriptionInput,
            image: this.imageString,
            expirationDate: this.expirationDateInput
        };

        this.isItemLoading = true;

        this.itemService.addItem(itemToAdd).subscribe(itemResult => {
            this.closeButtonAddOrEdit.nativeElement.click();

            const data = this.dataSource.data;
            data.push(itemResult);
            this.dataSource.data = data;
            this.table.renderRows();

            this.isItemLoading = false;

            this.toastr.success('Successfully added the item.');
        }, error => {
            this.toastr.error('Failed to add the new item.');
            console.error(error);
        });
    }

    updateItem(): void {
        let itemToUpdate: Item = {
            id: this.idInput,
            name: this.nameInput,
            location: this.locationInput,
            description: this.descriptionInput,
            image: null,
            expirationDate: this.expirationDateInput
        };
        this.isItemLoading = true;

        this.itemService.updateItem(itemToUpdate).subscribe(response => {
            if (response.status === 200) {
                this.closeButtonAddOrEdit.nativeElement.click();
                this.getAllItems();
                this.toastr.success('Successfully updated the item.');
            }
        }, error => {
            this.toastr.error('Failed to update the item.');
            console.error(error);
        });
    }

    deleteItem(): void {
        let itemId = this.idInput;

        this.itemService.deleteItem(itemId).subscribe(response => {
            if (response.status === 200) {
                this.closeButtonDelete.nativeElement.click();
                this.getAllItems();
                this.toastr.success('Successfully deleted the item.');
            }
        }, error => {
            this.toastr.error('Failed to delete the item.');
            console.error(error);
        });
    }

    /* ----------------
        Image CRUD
    -------------------*/
    getImage(imageName: string): void {
        this.imageService.getImage(imageName).subscribe(
            response => {

                var re = response;
                debugger;

                var rawResponse = "�PNG...."; // truncated for example

                // convert to Base64
                var b64Response = btoa(rawResponse);

                // create an image
                var outputImg = document.createElement('img');
                outputImg.src = 'data:image/png;base64,'+b64Response;

                // append it to your page
                document.body.appendChild(outputImg);
            },
            error => {
                this.toastr.error('Failed to get the image.');
                console.error(error);
            }
        )
    }

    addImageThenAddItem(selectedFileObj: any): void {
        this.imageService.addImage(selectedFileObj).subscribe(
            (response) => {
                this.isItemLoading = false;
                if(response.fileName){
                    this.imageString = response.fileName;
                    this.addItem();
                }
            },
            (error) => {
                this.isItemLoading = false;
                this.toastr.error('Failed to upload the image.');
                console.error(error);
            }
        )
    }

    updateImage(): void {

    }

    deleteImage(): void {

    }

}
