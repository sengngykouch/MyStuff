import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import {AngularMaterialModule } from '../../../angular-material/angular-material.module';

describe('ConfirmationModalComponent', () => {
    let component: ConfirmationModalComponent;
    let fixture: ComponentFixture<ConfirmationModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConfirmationModalComponent],
            imports:[AngularMaterialModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmationModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set header title correctly', () => {
        let headerTitle = 'Test Header Title';
        component.headerTitle = headerTitle;
        fixture.detectChanges();

        expect(component.headerTitle).toEqual(headerTitle);
    });

    it('should set accept button text correctly', () => {
        let acceptButtonText = 'Accept';
        component.acceptButtonText = acceptButtonText;
        fixture.detectChanges();
        let button = fixture.debugElement.query(By.css('#accept-button'));

        expect(button.nativeElement.innerText).toEqual(acceptButtonText);
    });

    it('should set decline button correctly', () => {
        let declineButtonText = 'Decline';
        component.declineButtonText = declineButtonText;
        fixture.detectChanges();
        let button = fixture.debugElement.query(By.css('#decline-button'));

        expect(button.nativeElement.innerText).toEqual(declineButtonText);
    });

    it('should set Accept button color to accent in the DOM', () => {
        let buttonColor: 'accent' = 'accent';
        component.acceptButtonColor = buttonColor;
        fixture.detectChanges();
        let buttonEl = fixture.debugElement.query(By.css('#accept-button'));

        // "color" attr is transpiled to "ng-reflect-color".
        expect(buttonEl.nativeElement.getAttribute("ng-reflect-color")).toEqual(buttonColor);
    });

    it('should set Decline button color to accent in the DOM', () => {
        let buttonColor: 'accent' = 'accent';
        component.declineButtonColor = buttonColor;
        fixture.detectChanges();
        let buttonEl = fixture.debugElement.query(By.css('#decline-button'));

    
        expect(buttonEl.nativeElement.getAttribute("ng-reflect-color")).toEqual(buttonColor);
    });

    it('should emit when accept button is clicked', () => {
        spyOn(component.onAcceptEmitter, 'emit');
        let button = fixture.debugElement.query(By.css('#accept-button'));

        button.nativeElement.click();

        expect(component.onAcceptEmitter.emit).toHaveBeenCalled();
        expect(component.onAcceptEmitter.emit).toHaveBeenCalledTimes(1);
    });

    it('should emit when decline button is clicked', () => {
        spyOn(component.onDeclineEmitter, 'emit');
        let button = fixture.debugElement.query(By.css('#decline-button'));

        button.nativeElement.click();

        expect(component.onDeclineEmitter.emit).toHaveBeenCalled();
        expect(component.onDeclineEmitter.emit).toHaveBeenCalledTimes(1);
    });
});
