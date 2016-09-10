import { GraphQLObjectType, GraphQLString } from 'graphql';

const TestQuery = new GraphQLObjectType({
  name: 'TestQuery',
  type: GraphQLString,
  fields: () => ({
    fetchCount: {
      name: 'fetchCount',
      type: GraphQLString,
      resolve: () => '42'
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
