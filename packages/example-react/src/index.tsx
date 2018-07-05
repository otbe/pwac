import './style.css';
import 'normalize.css';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install({
  onInstalled: () => {
    console.log('SW Event:', 'onInstalled');
  },
  onUpdating: () => {
    console.log('SW Event:', 'onUpdating');
  },
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady');
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated');
    window.location.reload();
  },

  onUpdateFailed: () => {
    console.log('SW Event:', 'onUpdateFailed');
  }
});

// babel + polyfills
console.log('foo'.includes('bar'));

render(<App />, document.getElementById('app'));
