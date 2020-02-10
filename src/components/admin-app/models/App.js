import {ObservableObject} from "can";

export default class App extends ObservableObject {
    static props = {
      _id: {
        identity: true,
        edit: false,
      },
      appId: {
        enumerable: true
      },
      redirectUri: {
        enumerable: true
      },
    }
  }