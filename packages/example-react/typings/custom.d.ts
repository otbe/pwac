type ResponsiveImage = {
  width: number;
  height: number;
  images: Array<{
    path: string;
    width: number;
    height: number;
  }>;
  placeholder: string;
  src: string;
  srcSet: string;
};

declare module '*.jpg' {
  const image: ResponsiveImage;
  export = image;
}

declare module '*.png' {
  const image: ResponsiveImage;
  export = image;
}
