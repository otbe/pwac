# pwac-elm

[Example](../example-elm)

Available config:
```ts
export type ElmConfig = {
  env: 'elm';
  assets: {
    package: string;
  };
  browsers: Array<string>;
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


