
import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import { StacheElement, debug } from 'can';

// steal appears to need this?
import 'ws';


import 'bulma/css/bulma.css';
import 'bulma-extensions/bulma-checkradio/dist/css/bulma-checkradio.min.css';
import '@fortawesome/fontawesome-free/css/all.css';


import FeathersModel from './models/feathers-model/FeathersModel';
import App from './components/admin-app/models/App';
import './components/admin-app/admin-app'


import view from "./main.stache";
const socket = io('http://lvh.me:3030')
const client = feathers()
client.configure(socketio(socket));
client.configure(auth())
const appService = client.service('app-redirect');

const feathersModel = new FeathersModel({
  service: appService,
  ObjectType: App,
});

debug();

class AppRoot extends StacheElement {
  static view = view;
  static props = {
    appModel: {
      get default(){
        return feathersModel;
      }
    },
    session: {
      value({resolve, listenTo, lastSet}){

        // when session is set or cleared, update
        listenTo(lastSet, resolve);

        // reauthenticate to resolve
        client.reAuthenticate().then(result => {
          console.log(result);
          resolve(result);
        }).catch(e => {
          console.warn(e);
          resolve(null);
        })
      }
    },
    logout() {
      client.logout().then(() => this.session = null)
    }
  }


}

customElements.define("app-root", AppRoot);
