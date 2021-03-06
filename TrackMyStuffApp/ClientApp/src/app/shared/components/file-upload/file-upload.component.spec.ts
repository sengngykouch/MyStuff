import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileUploadComponent],
            imports: [AngularMaterialModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a Paragraph that has "Drag and drop file here"', () => {
        let paragraph = fixture.debugElement.query(By.css('P'));
        let keyword = 'Drag and drop file here';

        expect(paragraph.nativeElement.innerText).toContain(keyword);
    });

    it('should have a button called "Browse for file"', () => {
        let button = fixture.debugElement.query(By.css('Button'));
        let keyword = 'Browse for file';

        expect(button.nativeElement.innerText).toContain(keyword);
    });

    it('should have an input of type file', () => {
        let input = fixture.debugElement.query(By.css('Input'));

        expect(input.nativeElement.getAttribute('type')).toEqual('file');
    });

    it('should trigger fileUploadInputClick func with button click', () => {
        spyOn(component, 'fileUploadInputClick');

        let button = fixture.debugElement.query(By.css('Button'));
        button.nativeElement.click();

        expect(component.fileUploadInputClick).toHaveBeenCalledTimes(1);
    });

    it('should trigger click on fileUploadInput when browse button is clicked', () => {
        let input = fixture.debugElement.query(By.css('input'));
        spyOn(input.nativeElement, 'click');

        let button = fixture.debugElement.query(By.css('Button'));
        button.nativeElement.click();

        expect(input.nativeElement.click).toHaveBeenCalledTimes(1);
    });

    it('should emit fileObject when fileUploadInput value is changed', () => {
        spyOn(component.selectedFileChange, 'emit');

        setFakeFileToFileInput();

        component.onChangeSelectedFile();

        expect(component.selectedFileChange.emit).toHaveBeenCalledTimes(1);
    });

    it('should show image after file is selected', () => {
        setFakeFileToFileInput();

        component.onChangeSelectedFile();
        fixture.detectChanges();

        let resultContainer = fixture.debugElement.query(By.css('.file-upload-result-container')).nativeElement;
        expect(resultContainer).toBeTruthy();
    });

    it('should emit null when deleteFile is called', () => {
        spyOn(component.selectedFileChange, 'emit');

        component.deleteFile();

        expect(component.selectedFileChange.emit).toHaveBeenCalledTimes(1);
    });

    it('should reset fileName to empty when deleteFile is called', () => {
        component.fileName = 'Test fileName';
        component.deleteFile();

        expect(component.fileName).toEqual('');
    });

    it('should show file select after file is deleted', () => {
        setFakeFileToFileInput();

        // set file
        component.onChangeSelectedFile();
        fixture.detectChanges();

        // delete file
        component.deleteFile();
        fixture.detectChanges();

        let selectContainer = fixture.debugElement.query(By.css('.file-upload-container')).nativeElement;
        expect(selectContainer).toBeTruthy();
        expect(selectContainer.getAttribute('hidden')).toEqual(null);
    });

    /**
     * Helper methods
     */
    function setFakeFileToFileInput() {
        // Need dataTransfer to fake a file into the input.
        let dataTransfer = new DataTransfer();
        let fakeFile: File = new File([""], "filename", { type: 'text/html' });
        dataTransfer.items.add(fakeFile);
        component.fileUploadInput.nativeElement.files = dataTransfer.files;
    }
});
