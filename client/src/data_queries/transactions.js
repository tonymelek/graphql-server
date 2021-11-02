import { gql } from "@apollo/client";

export const TRANSACTIONS = gql`
                      query  {
                        transactions {
                                id
                                timeCreated
                                timeUpdated
                                from
                                to
                                amount
                                status

                                
                        }
                      } 
                      `
export const NEW_TRANSACTION = gql`
                          mutation NewTransactionMutation($transaction: NewTransaction) {
                            newTransaction(transaction: $transaction)
                          }
                          `
export const UPDATE_TRANSACTION = gql`
                          mutation Mutation($transaction: UpdateTransaction) {
                            updateTransaction(transaction: $transaction)
                          }
                          `