import 'normalize.css';
import OfflinePluginRuntime from 'offline-plugin/runtime';
import { Main } from './Main.elm';

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

console.log('foo'.includes('foo'));

Main.embed(document.getElementById('app'));
