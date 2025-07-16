/// <reference types="vite/client" />
declare const Phaser: typeof import('phaser');

declare module "*.json" {
  const value: any;
  export default value;
}