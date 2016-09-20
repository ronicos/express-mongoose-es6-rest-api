import { queryTypes } from '../constants/query-types';
import { roles } from '../constants/roles';

const createRule = (allowedRole) => (accessRoles) => accessRoles.indexOf(allowedRole) > -1;

const permissions = {
  User: {
    [queryTypes.plural]: createRule(roles.admin),
    [queryTypes.singular]: createRule(roles.admin),
    [queryTypes.viewer]: createRule(roles.user),
  },
  Viewer: {
    [queryTypes.viewer]: createRule(roles.user),
  }
};

const hasAccess = (operation, user) => {
  const { accessModel, queryType } = operation;

  // const userHasAccess = permissions[accessModel][queryType](user.roles);

  return true;
};

export { hasAccess };
