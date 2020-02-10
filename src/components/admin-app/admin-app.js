import {StacheElement,ObservableArray} from "can";
import App from './models/App';

import url from './templates/url.stache';
import 'can-bulma/src/sp-admin/sp-admin'
import view from './admin-app.stache';
import editButton from 'can-bulma/src/sp-admin/demo/editButton.stache'


class AppList extends ObservableArray {
  static items = App;
}

class AdminApp extends StacheElement {
  static view = view;

  static props = {
    model: {},
    objects: AppList,
    searchFields: {
      get default() {
        return ['appId', 'redirectUri']
      }
    },
    editFields: {
      get default() {
        return ['appId', 'redirectUri'];
      },
    },
    listFields: {
      get default() {
        return ['appId', 'redirectUri', {
          name: 'id',
          displayComponent: url,
        }, {
          name: 'Edit',
          displayComponent: editButton
        }];
      }
    },
  };
}

customElements.define('admin-app', AdminApp)

export default {AppList, AdminApp};