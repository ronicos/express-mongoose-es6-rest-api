import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';

const TestQuery = new GraphQLObjectType({
  name: 'TestQuery',
  type: GraphQLString,
  fields: () => ({
    fetchCount: {
      name: 'fetchCount',
      type: GraphQLString,
      resolve: () => Promise.resolve('42')
    }
  })
});

const customQueries = {
  testQuery: {
    type: TestQuery,
    args: {
      // id: {
      //   type: new GraphQLNonNull(GraphQLID)
      // }
    }
  }
};

export { customQueries };
