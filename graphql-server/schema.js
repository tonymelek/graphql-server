export const typeDefs = `
  type Query {
    transactions:[Transaction]
    users:[User]
  }
  
  type Mutation {
    newTransaction(transaction: NewTransaction): String
    updateTransaction(transaction: UpdateTransaction): String
    newUser(user: NewUser): String
    updateUser(user: UpdateUser): String
  }

  enum Status {
    pending
    completed
    rejected
    cancelled
  }

   enum Role {
    admin 
    priest
    servant
    merchant
    client
  }
  type Transaction {
      
      id: String 
      timeCreated:String
      timeUpdated:String
      from: String 
      to:String
      amount: Float
      status: Status
  }

  type User {
      id: String
      availableBalance :Float
      firstName:String
      lastLogin:String
      lastName:String
      pendingBalance:Float
      role:Role
      totalBalance:Float
      email:String
  }

  input NewUser {
      available_balance :Float
      firstName:String!
      lastLogin:String
      lastName:String!
      pendingBalance:Float
      role:Role!
      totalBalance:Float
      email:String!
  }

  input NewTransaction {
      amount: Float!
      from: String!
      status: Status!
      to:String!
      timeCreated:String!
  }

  input UpdateTransaction {
      id: String!
      amount: Float!
      from: String!
      status: Status!
      to:String!
      timeCreated:String!
      timeUpdated:String!
  }

    input UpdateUser {
      id: String!
      availableBalance :Float!
      firstName:String!
      lastLogin:String!
      lastName:String!
      pendingBalance:Float!
      role:Role!
      totalBalance:Float!
      email:String!
  }
 
`;
