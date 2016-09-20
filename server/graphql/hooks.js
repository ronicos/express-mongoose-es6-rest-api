import { decode } from './auth';
import { hasAccess } from './permissions';
import { queryTypes } from '../constants/query-types';

const createOperation = (model, queryType) => {
  const collection    = model.fieldName;
  const accessModel   = queryType === queryTypes.plural ? model.returnType.ofType.name : model.returnType.name;
  const operationType = model.operation.operation;
  const operation = { collection, operationType, accessModel, queryType }

  return operation;
};

const authHook = (next, user, model, queryType) => {
  const operation     = createOperation(model, queryType);
  const userHasAccess = hasAccess(operation, user);

  next();

  return new Promise((resolve, reject) => userHasAccess ? resolve(next(user)) : reject('access denied'));
};

const post = (next) => {  // , value
  // console.log('value', value);
  next();
};

const createHook = (queryType) => {
  return {
    [queryType]: {
      pre: function () {
        try {
          const next    = arguments[0];
          const request = arguments[1].request;
          const model   = arguments[4];
          const user    = decode(request);

          return authHook.apply(null, [next, user, model, queryType]);
        }
        catch (e) {
          console.log('e', e);
        }
      },
    }
  }
};

const createHooks = () => {
  const hooksArray = Object.keys(queryTypes).map((key) => createHook(key));
  const hooks      = Object.assign.apply(Object, [{}].concat(hooksArray));

  return hooks;
};

const hooks = createHooks();

export { hooks };
