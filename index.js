const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

const resolvers = {
	Query: {
		// Returns ether balance for a given address
		etherBalanceByAddress: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.etherBalanceByAddress(),

		// Returns total ether supply
		totalSupplyOfEther: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.totalSupplyOfEther(),

		// Returns latest ethereum price
		latestEthereumPrice: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.getLatestEthereumPrice(),

		// Returns average block confirmation time
		blockConfirmationTime: (root, _args, { dataSources }) =>
			dataSources.ethDataSource.getBlockConfirmationTime(),
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		ethDataSource: new EtherDataSource(),
	}),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
