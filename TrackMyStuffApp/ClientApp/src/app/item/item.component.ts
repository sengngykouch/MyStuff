import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Item, ItemService } from '../services/item/item.service';
import { ImageService } from '../services/image/image.service';
import { finalize } from 'rxjs/operators';


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
    selectedFileObject: any = null; // actual image file to store in AWS S3. it's part of the <Input>.
    imageSource: string; // for displaying image.

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
        this.imageSource = null;
        this.selectedFileObject = null;
        this.expirationDateInput = new Date();
    }

    editItemClick(item: Item): void {
        this.isEdit = true;

        this.idInput = item.id;
        this.nameInput = item.name;
        this.locationInput = item.location;
        this.descriptionInput = item.description;
        this.imageString = item.image;
        this.imageSource = null;
        this.selectedFileObject = null;
        this.expirationDateInput = item.expirationDate;

        if (this.imageString !== null) {
            this.getImage(this.imageString);
        }
    }

    deleteItemClick(item: Item): void {
        this.idInput = item.id;
    }

    /* -----------------
        Modal Buttons
    --------------------*/
    saveImageAndItem(): void {

        if (this.isEdit) {
            // start with no image, then no image.
            if (!this.selectedFileObject && !this.imageString) {
                this.updateItem();
                return;
            }

            // start with no image, then add image.
            if (!this.imageString && this.selectedFileObject) {
                this.addImageThenUpdateItem();
                return;
            }

            // start with image, then replace image.
            if (this.imageString && this.selectedFileObject) {
                //replace image, then update item.
                this.updateImageThenUpdateItem();
                return;
            }

            // start with image, then remove image.
            if (this.imageString && !this.imageSource && !this.selectedFileObject) {
                this.deleteImageThenUpdateItem();
                return;
            }
        }


        if (!this.selectedFileObject) {
            this.addItem();
            return;
        }

        this.addImageThenAddItem(this.selectedFileObject);
    }

    deleteImageAndItem(): void {
        this.isItemLoading = true;

        if (!this.imageString) {
            this.deleteItem();
            return;
        }

        this.imageService.deleteImage(this.imageString)
            .pipe(
                finalize(() => {
                    this.isItemLoading = false;
                })
            )
            .subscribe(
                response => {
                    if (response) {
                        this.deleteItem();
                    }
                },
                error => {
                    this.toastr.error('Failed to delete the image.');
                    console.error(error);
                }
            );
    }

    /* ----------------
        Item CRUD
    -------------------*/
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

    addItem(): void {
        let itemToAdd: Item = {
            name: this.nameInput,
            location: this.locationInput,
            description: this.descriptionInput,
            image: this.imageString,
            expirationDate: this.expirationDateInput
        };

        this.isItemLoading = true;

        this.itemService.addItem(itemToAdd)
            .pipe(
                finalize(() => {
                    this.isItemLoading = false;
                })
            )
            .subscribe(
                itemResult => {
                    this.closeButtonAddOrEdit.nativeElement.click();

                    const data = this.dataSource.data;
                    data.push(itemResult);
                    this.dataSource.data = data;
                    this.table.renderRows();
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
            image: this.imageString,
            expirationDate: this.expirationDateInput
        };
        this.isItemLoading = true;

        this.itemService.updateItem(itemToUpdate)
            .pipe(
                finalize(() => {
                    this.isItemLoading = false;
                })
            ).subscribe(
                response => {
                    if (response.status === 200) {
                        this.closeButtonAddOrEdit.nativeElement.click();
                        this.getAllItems();
                        this.toastr.success('Successfully updated the item.');
                    }
                },
                error => {
                    this.toastr.error('Failed to update the item.');
                    console.error(error);
                });
    }

    deleteItem(): void {
        let itemId = this.idInput;

        this.itemService.deleteItem(itemId)
            .pipe(
                finalize(() => {
                    this.isItemLoading = false;
                })
            )
            .subscribe(
                response => {
                    if (response.status === 200) {
                        this.closeButtonDelete.nativeElement.click();
                        this.getAllItems();
                        this.toastr.success('Successfully deleted the item.');
                    }
                },
                error => {
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
                let reader = new FileReader();
                reader.readAsDataURL(response);
                // this will make sure all the streams are collected
                reader.onloadend = () => {
                    this.imageSource = reader.result.toString();
                }
            },
            error => {
                this.toastr.error('Failed to get the image.');
                console.error(error);
            }
        )
    }

    addImageThenAddItem(selectedFileObj: any): void {
        this.isItemLoading = true;

        this.imageService.addImage(selectedFileObj)
            .pipe(
                finalize(() => {
                    this.isItemLoading = false;
                })
            )
            .subscribe(
                response => {
                    if (response.fileName) {
                        this.imageString = response.fileName;
                        this.addItem();
                    }
                },
                error => {
                    this.toastr.error('Failed to upload the image.');
                    console.error(error);
                }
            )
    }

    addImageThenUpdateItem(): void {
        this.imageService.addImage(this.selectedFileObject).pipe(
            finalize(() => {
                this.isItemLoading = false;
            })
        ).subscribe(
            response => {
                if (response.fileName) {
                    this.imageString = response.fileName;
                    this.updateItem();
                }
            },
            error => {
                this.toastr.error('Failed to add the image.');
                console.error(error);
            })
    }

    updateImageThenUpdateItem(): void {
        this.imageService.updateImage(this.imageString, this.selectedFileObject)
            .pipe(
                finalize(() => {
                    this.isItemLoading = false;
                })
            ).subscribe(
                response => {

                    if (response) {
                        this.updateItem();
                    }
                },
                error => {
                    this.isItemLoading = false;
                    this.toastr.error('Failed to update the image.');
                    console.error(error);
                }
            )
    }

    deleteImageThenUpdateItem(): void {
        this.imageService.deleteImage(this.imageString)
            .pipe(
                finalize(() => {
                    this.isItemLoading = false;
                })
            ).subscribe(
                response => {
                    //this.isItemLoading = false;
                    if (response) {
                        this.imageString = null;
                        this.updateItem();
                    }
                },
                error => {
                    //this.isItemLoading = false;
                    this.toastr.error('Failed to delete image.');
                    console.error(error);
                }
            )
    }

    deletePreviewImage(): void {
        this.imageSource = null;
    }
}