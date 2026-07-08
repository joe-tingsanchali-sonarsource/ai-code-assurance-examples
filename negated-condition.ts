// Rule: typescript:S7735 - Unexpected negated condition
//
// Negated conditions in if/else statements and ternaries force the reader to mentally
// invert the logic, adding unnecessary cognitive load. Inverting the condition and
// swapping the branches keeps the same behavior while being easier to read.

interface Order {
  id: string;
  isPaid: boolean;
  itemCount: number;
}

function describePaymentStatus(order: Order): string {
  // Noncompliant: negated condition in an if/else (typescript:S7735)
  if (!order.isPaid) {
    return 'Payment pending';
  } else {
    return 'Payment received';
  }
}

function getBadgeLabel(order: Order): string {
  // Noncompliant: negated condition in a ternary expression (typescript:S7735)
  return !order.isPaid ? 'Pending' : 'Paid';
}

function getShippingClass(order: Order): string {
  // Noncompliant: negated (!=) condition where branches could simply be swapped (typescript:S7735)
  if (order.itemCount !== 0) {
    return 'standard';
  } else {
    return 'empty-cart';
  }
}

// --- Compliant alternatives for comparison ---
function describePaymentStatusFixed(order: Order): string {
  if (order.isPaid) {
    return 'Payment received';
  } else {
    return 'Payment pending';
  }
}

function getBadgeLabelFixed(order: Order): string {
  return order.isPaid ? 'Paid' : 'Pending';
}
