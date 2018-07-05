import React from 'react';
import { Nav } from './Nav';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import ship from './assets/ship.jpg';
import { placeholder, image } from './app.css';

const LazyBar = Loadable({
  loader: () => import('./Bar'),
  loading: () => <span>loading</span>,
  delay: 350
});
console.log(ship);
const App = () => (
  <BrowserRouter>
    <>
      <Nav />
      <br />
      <input type="text" />
      <br />
      <div
        className={placeholder}
        style={{
          width: `${ship.width}px`,
          height: `${ship.height}px`,
          backgroundImage: 'url("' + ship.placeholder + '")'
        }}
      >
        <img
          src={ship.src}
          srcSet={ship.srcSet}
          alt="Ship!"
          className={image}
        />
      </div>
      <br />
      <Link to="bar">Go To Bar</Link>

      <Route path="/bar" component={LazyBar} />
    </>
  </BrowserRouter>
);

export default hot(module)(App);
