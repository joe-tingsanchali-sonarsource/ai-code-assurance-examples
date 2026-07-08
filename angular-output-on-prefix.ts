import { Component, Directive, EventEmitter, Output } from '@angular/core';

// Rule: typescript:S7652 - Output bindings should not be named "on" or prefixed with "on"
//
// Angular templates support both "(eventName)" and "on-eventName" binding syntax.
// Naming an @Output "on" or prefixing it with "on" produces awkward/redundant template
// syntax such as "(onConfirm)" or "on-onConfirm".

@Component({
  selector: 'app-confirm-dialog',
  template: `<button (click)="onConfirm.emit()">Confirm</button>`,
})
export class ConfirmDialogComponent {
  // Noncompliant: output binding prefixed with "on" (typescript:S7652)
  @Output() onConfirm = new EventEmitter<void>();

  // Noncompliant: output alias prefixed with "on" (typescript:S7652)
  @Output('onCancelled') cancelled = new EventEmitter<void>();
}

@Directive({
  selector: '[appDropdown]',
  // Noncompliant: "outputs" metadata entry named with an "on" prefix (typescript:S7652)
  outputs: ['onToggle'],
})
export class DropdownDirective {
  onToggle = new EventEmitter<boolean>();
}

// --- Compliant alternative for comparison ---
@Component({
  selector: 'app-confirm-dialog-fixed',
  template: `<button (click)="confirm.emit()">Confirm</button>`,
})
export class ConfirmDialogFixedComponent {
  @Output() confirm = new EventEmitter<void>(); // Compliant
  @Output('cancelled') cancelledEvent = new EventEmitter<void>(); // Compliant
}
