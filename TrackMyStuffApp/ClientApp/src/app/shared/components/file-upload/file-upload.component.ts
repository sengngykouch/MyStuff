import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

    @ViewChild('fileUploadInput') fileUploadInput: ElementRef<HTMLInputElement>;
    @Output() selectedFileChange: EventEmitter<File> = new EventEmitter();

    constructor(private renderer: Renderer2) { }

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
        this.renderer.setValue(this.fileUploadInput.nativeElement, '');
        this.selectedFileChange.emit(null);
    }
}
