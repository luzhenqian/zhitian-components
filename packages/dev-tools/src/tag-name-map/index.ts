const originalDefine = CustomElementRegistry.prototype.define;

export const tagNameMap = new Map<string, any>();

CustomElementRegistry.prototype.define = function (
  name: string,
  constructor: CustomElementConstructor,
  options: any
) {
  tagNameMap.set(name, constructor);
  if (tagNameMap.has(name)) return;
  return originalDefine.call(this, name, constructor, options);
};
