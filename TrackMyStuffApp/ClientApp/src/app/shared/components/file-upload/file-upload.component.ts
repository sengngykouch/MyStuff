import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

    @ViewChild('fileUploadInput') fileUploadInput: any;
    @Output() selectedFileChange: EventEmitter<any> = new EventEmitter();

    constructor() { }

    fileName: string = '';

    ngOnInit(): void {
    }

    fileUploadInputClick(): void {
        this.fileUploadInput.nativeElement.click();
    }

    onChangeSelectedFile(): void {
        let fileObject = this.fileUploadInput.nativeElement.files[0];
        this.fileName = fileObject.name;
        this.selectedFileChange.emit(fileObject);
    }

    deleteFile(): void {
        this.fileName = '';
        this.fileUploadInput.nativeElement.value = '';
        this.selectedFileChange.emit(null);
    }
}
