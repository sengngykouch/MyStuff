import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-image-preview',
    templateUrl: './image-preview.component.html',
    styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

    @Input('imageSrc') imageSrc: string;
    @Input('canDelete') canDelete: boolean = false; 
    @Input('showDefaultImage') showDefaultImage: boolean = true;

    @Output() deleteImageEvent: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

    deleteImage(): void {
        this.deleteImageEvent.emit();
        this.imageSrc = null;
    }
}
