declare module 'interpret' {
  export interface ModuleOptions {
    extension: string;
    harmony?: boolean;
  }

  export interface Module {
    install(options: ModuleOptions): void;
  }

  export interface Extension {
    module: string;
    register(module: Module): void;
  }

  export type Descriptor = Extension | string | Array<Extension | string>;

  export const extensions: { [extension: string]: Descriptor };

  export const configurations: { [moduleName: string]: any };

  export function register(
    moduleName: string
  ): (compiler: any, config: any) => void;
}
