import defaults from 'lodash.defaults'
import {ObservableArray, ObservableObject} from 'can'
import feathersQueryLogic from "feathers-query-logic";

export class ResultList extends ObservableArray {
    static props = {
        total: Number,
    }
}

export default class FeathersModel {
    constructor(params){
      params = defaults(params, {
        name: 'App',
        idField: '_id',
        ObjectType: ObservableObject,
        service: null,
    })
        Object.assign(this, params)

        // stateful gets updated on getList requests
        // TODO - find better way to do this
        this.metadata = new ObservableObject({
          total: 0,
        });
    }
  
    id(obj){
      return obj._id;
    }

    getList(params){
      const query = feathersQueryLogic.toParams(params);
      return this.service.find({query})
        .then(response => {
            const result = new ResultList(response.data);
            result.total = response.total;
          return result;
        });
    }

    get(id){
      return this.service.get(id);
    }

    save(obj){
      const data = obj.serialize();
      if(!this.id(obj)){
        return this.service.create(data);
      }
      return this.service.update(this.id(obj), data);
    }

    destroy(obj){
      return this.service.remove(this.id(obj))
    }
}