// Platform must initialize itself internally.

import { registerModules } from '../modules/registerModules';

let bootstrapped = false;

export function bootstrapPlatform() {
  if (bootstrapped) return;

  registerModules();

  bootstrapped = true;
}
