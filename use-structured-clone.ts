// Rule: typescript:S7784 - Prefer structuredClone over alternative deep-cloning techniques
//
// JSON-based round-tripping and hand-rolled deep-clone helpers are slower, error-prone,
// and silently mishandle types like Date, Map, Set, and circular references. The native
// structuredClone() function should be used instead.

interface Profile {
  name: string;
  createdAt: Date;
  tags: string[];
  address: { city: string; zip: string };
}

function cloneViaJson(profile: Profile): Profile {
  // Noncompliant: JSON round-trip loses the Date type and can't handle cycles (typescript:S7784)
  return JSON.parse(JSON.stringify(profile));
}

function cloneManually(profile: Profile): Profile {
  // Noncompliant: hand-rolled deep clone instead of the built-in structuredClone (typescript:S7784)
  return {
    name: profile.name,
    createdAt: new Date(profile.createdAt.getTime()),
    tags: [...profile.tags],
    address: { ...profile.address },
  };
}

function cloneTagsViaJson(tags: string[]): string[] {
  // Noncompliant: another JSON-based clone (typescript:S7784)
  return JSON.parse(JSON.stringify(tags));
}

// --- Compliant alternative for comparison ---
function cloneProfile(profile: Profile): Profile {
  return structuredClone(profile); // Compliant
}
