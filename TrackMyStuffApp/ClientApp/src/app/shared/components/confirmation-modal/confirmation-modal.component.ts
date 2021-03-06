
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

    @Input() headerTitle: string = 'Confirmation Modal';
    @Input() acceptButtonText: string = 'Ok';
    @Input() declineButtonText: string = 'Cancel';
    @Input() acceptButtonColor: 'primary' | 'accent' | 'warn' | 'none' = 'primary';
    @Input() declineButtonColor: 'primary' | 'accent' | 'warn' | 'none' = 'none';

    @Output('onAccept') onAcceptEmitter: EventEmitter<void> = new EventEmitter();
    @Output('onDecline') onDeclineEmitter: EventEmitter<void> = new EventEmitter();

    modalId: string = 'modalId';

    constructor() { }

    ngOnInit(): void {
        this.modalId = this.generateUniqueModalId();
    }

    onAccept(): void {
        this.onAcceptEmitter.emit();
    }

    onDecline(): void {
        this.onDeclineEmitter.emit();
    }

    private generateUniqueModalId(): string {
        let now = new Date();
        let ticks = now.getTime();
        return 'modalId_' + ticks;
    }
}
