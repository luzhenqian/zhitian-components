const originalDefine = CustomElementRegistry.prototype.define;

export const tagNameMap = new Map<string, any>();

CustomElementRegistry.prototype.define = function (
  name: string,
  constructor: CustomElementConstructor,
  options: any
) {
  if (!tagNameMap.has(name)) tagNameMap.set(name, constructor);
  return originalDefine.call(this, name, constructor, options);
};
