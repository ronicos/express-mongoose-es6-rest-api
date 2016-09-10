import { getSchema } from '@risingstack/graffiti-mongoose';
import { hooks } from './hooks';
import { customQueries } from './custom-queries';
import { customMutations } from './custom-mutations';

import User from '../models/user';

const allModels = [User];
const options = { hooks, customQueries, customMutations };
const schema = getSchema(allModels, options);

export { schema };
