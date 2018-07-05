# pwac-react

[Example](../example-react)

Available config:
```ts
export type ReactConfig = {
  env: 'react';
  browsers: Array<string>;
  images: false | { sizes: Array<number> };
  prerender: false | { routes: Array<string> };
  manifest:
    | false
    | {
        name: string;
        short_name: string;
        description: string;
        background_color: string;
        icons: Array<{
          src: string;
          sizes: Array<number>;
        }>;
      };
};
```
