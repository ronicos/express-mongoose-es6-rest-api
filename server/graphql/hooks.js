import { validateAuth } from './auth';

const viewerHook = (next, root) => { // , root, args, request
  console.log('viewerHook');

  const data = validateAuth(root.request);

  next(data);
};

const singularHook = (next, root, args, request, model) => {
  const collection = model.fieldName;
  const operationType = model.operation.operation;

  const operation = { collection, operationType };

  console.log('singularHook', operation);

  const data = validateAuth(root.request);

  next(data);
  next(data);
};

const pluralHook = (next, root, args, request, model) => {
  const collection = model.fieldName;
  const operationType = model.operation.operation;

  const operation = { collection, operationType };

  console.log('pluralHook', operation);

  const data = validateAuth(root.request);

  next(data);

  return new Promise((resolve) => {
    setTimeout(() => resolve(), 4000);
  });
};

const mutationHook = (next, root) => {
  console.log('mutationHook');

  const data = validateAuth(root.request);

  next(data);
};

const post = (next, value) => {  // , value
  console.log('value', value);
  next();
};

const hooks = {
  viewer: {
    pre: viewerHook,
    post,
  },
  singular: {
    pre: singularHook,
    post,
  },
  plural: {
    pre: pluralHook,
    post,
  },
  mutation: {
    pre: mutationHook,
    post,
  }
};

export { hooks };
