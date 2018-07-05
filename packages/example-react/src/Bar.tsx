import React from 'react';
import { bar } from './bar.css';
import Loadable from 'react-loadable';

const LazyBaz = Loadable({
  loader: () => import('./Baz'),
  loading: () => <span>loading</span>,
  delay: 350
});

const test = async () => {
  return 41;
};

test().then(x => console.log('async stuff', x));

export default () => (
  <div className={bar}>
    {(() => {
      throw new Error('foo');
    })()}
    bar <LazyBaz />
  </div>
);
