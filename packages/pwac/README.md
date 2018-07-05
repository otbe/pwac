# PWAC - PWA Compiler (beta)
This is ja highly opinionated compiler for your next Progressive Web App. Under the hood it uses webpack, babel, TypeScript and a lot other tools to accomplish this.

## Features
The available features depend on the environment you use  but general spoken you will get out of the box:

* HMR
* Critical CSS inlining
* Prerendering of routes
* Image optimization 
* Caching via Service Workers
* manifest.json

### [pwac-react](../pwac-react)
* TypeScript
* React 16
* Code splitting (via react-loadable)
* CSS Modules (incl. TS support)
* Responsive image loader

### [pwac-elm](../pwac-elm)
* TypeScript support for your ports
* asset loader


## Available Environments
* pwac-react
* pwac-elm

## Installation
`$ yarn add pwac pwac-<env> --dev`   
`$ yarn pwac watch` or  
`$ yarn pwac build`


