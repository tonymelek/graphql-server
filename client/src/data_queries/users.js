import { gql } from "@apollo/client";

export const NEW_USER = gql`
                mutation Mutation($user: NewUser) {
                    newUser(user: $user)
                  }`
export const USERS = gql`
                    query{
                      users {
                        id
                        firstName
                        lastLogin
                        email
                        lastName
                        role
                        availableBalance
                        pendingBalance
                        totalBalance
                      }
                    }
                    `
export const UPDATE_USER = gql`
                    mutation Mutation($user: UpdateUser) {
                      updateUser(user: $user)
                    }
                    `