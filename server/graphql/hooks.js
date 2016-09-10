import { isAuthorised } from './auth';

const viewerHook = (next) => { // , root, args, request
  isAuthorised();
  // console.log('viewerHook');
  next();
};

const singularHook = (next) => {
  // console.log('singularHook');
  next();
};

const pluralHook = (next) => {
  // console.log('pluralHook');
  next();
};

const mutationHook = (next) => {
  // console.log('mutationHook');
  next();
};

const post = () => (next) => {  // , value
  // console.log('value', value);
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
