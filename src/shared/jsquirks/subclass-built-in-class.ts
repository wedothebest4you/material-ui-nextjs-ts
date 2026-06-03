export function setPrototypeFix(
  instance: InstanceType<new (...args: any[]) => any>,
) {
  Object.setPrototypeOf(instance, new.target.prototype);
}
