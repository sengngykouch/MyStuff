
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

    @Input() headerTitle: string = 'Confirmation Modal';
    @Input() acceptButtonText: string = 'OK';
    @Input() declineButtonText: string = 'CANCEL';
    @Input() acceptButtonColor: 'primary' | 'accent' | 'warn' | 'none' = 'primary';
    @Input() declineButtonColor: 'primary' | 'accent' | 'warn' | 'none' = 'primary';

    @Output('onAccept') onAcceptEmitter: EventEmitter<void> = new EventEmitter();
    @Output('onDecline') onDeclineEmitter: EventEmitter<void> = new EventEmitter();

    modalId: string = 'modalId';

    constructor() { }

    ngOnInit(): void {
        this.modalId = this.getUniqueModalId();
    }

    onAccept(): void {
        this.onAcceptEmitter.emit();
    }

    onDecline(): void {
        this.onDeclineEmitter.emit();
    }

    private getUniqueModalId(): string {
        let now = new Date();
        let ticks = now.getTime();
        return 'modalId_' + ticks;
    }
}
