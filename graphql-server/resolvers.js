import fetch from 'node-fetch';
import { PubSub } from 'graphql-subscriptions';
import { create, update, getAll } from './firebase';
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    transactions: async () => await getAll('transactions'),
    users: async () => await getAll('users')
  },
  Mutation: {
    newTransaction: async (_, { transaction }) => await create(transaction, 'transactions'),
    updateTransaction: async (_, { transaction }) => await update(transaction, 'transactions'),
    newUser: async (_, { user }) => await create(user, 'users'),
    updateUser: async (_, { user }) => await update(user, 'users')
  },
  // Subscription: {
  // widgetInserted: {
  //   subscribe: () => pubsub.asyncIterator(WIDGET_INSERTED),
  // },
  // widgetDeleted: {
  //   subscribe: () => pubsub.asyncIterator(WIDGET_DELETED),
  // },
  // },
};
