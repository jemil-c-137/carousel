# Carousel component

**Images slider for React**. Supports swipes(mobile), responsive, supports 'goto' functionality.

##🎠 [Click to see the demo](https://jemil-c-137.github.io/carousel/)**


to start demo app in developing mode:
```
npm start
```


## How to add the component
Carousel component takes as props an array of image src's:
```html
import imagesArray from 'yourDirectory'

<Carousel images={imagesArray} />
``` 

Images array should look like this: 
```js
export const imagesArray = [
  {
    src: "https://source.unsplash.com/random"
  },
  {
    src: "https://source.unsplash.com/random"
  },
  {
    src: "https://source.unsplash.com/random"
  }
]
```

To bundle application in production mode use:
```
npm run build

```
