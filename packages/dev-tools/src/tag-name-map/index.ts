const originalDefine = CustomElementRegistry.prototype.define;

export const tagNameMap = new Map();

CustomElementRegistry.prototype.define = function(name:string, constructor:CustomElementConstructor, options:any) {
  tagNameMap.set( name,constructor);
  return originalDefine.call(this, name, constructor, options);
};
