// Rule: typescript:S6582 - Prefer using an optional chain expression
//
// Chains of "&&" (or negated "||") checks used to guard against null/undefined before
// accessing a property or calling a function are harder to read than the equivalent
// optional chaining ("?.") expression, and are more error-prone to extend.

interface Address {
  city: string;
  zip: string;
}

interface Customer {
  name: string;
  address?: Address;
  getLoyaltyCard?: () => { points: number };
}

function getCity(customer: Customer): string | undefined {
  // Noncompliant: should be rewritten as "customer.address?.city" (typescript:S6582)
  return customer.address && customer.address.city;
}

function hasNoAddress(customer: Customer): boolean {
  // Noncompliant: negated guard should be "!customer.address?.city" (typescript:S6582)
  return !customer.address || !customer.address.city;
}

function getLoyaltyPoints(customer: Customer): number | undefined {
  // Noncompliant: should be rewritten as "customer.getLoyaltyCard?.()" (typescript:S6582)
  return customer.getLoyaltyCard && customer.getLoyaltyCard().points;
}

function getZipDeep(customer: Customer): string | undefined {
  // Noncompliant: multi-level guard chain, should be "customer.address?.zip" (typescript:S6582)
  return customer && customer.address && customer.address.zip;
}

// --- Compliant alternatives for comparison ---
function getCityFixed(customer: Customer): string | undefined {
  return customer.address?.city;
}

function hasNoAddressFixed(customer: Customer): boolean {
  return !customer.address?.city;
}

function getLoyaltyPointsFixed(customer: Customer): number | undefined {
  return customer.getLoyaltyCard?.().points;
}

function getZipDeepFixed(customer: Customer): string | undefined {
  return customer?.address?.zip;
}
