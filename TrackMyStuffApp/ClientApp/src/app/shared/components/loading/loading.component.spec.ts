import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

import { LoadingComponent } from './loading.component';

fdescribe('LoadingComponent', () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoadingComponent],
            imports: [AngularMaterialModule]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the mat Spinner when loading is true', () => {
        component.isLoading = true;
        fixture.detectChanges();

        let matSpinner = fixture.debugElement.query(By.css('mat-spinner'));

        expect(matSpinner).toBeTruthy();
    });

    it('should not show mat Spinner when loading is false', () => {
        component.isLoading = false;
        fixture.detectChanges();

        let matSpinner = fixture.debugElement.query(By.css('mat-spinner'));

        expect(matSpinner).toBeNull();
    });
});
