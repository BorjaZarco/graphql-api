# GraphQl API

This is a GraphQL API that acts as a backend service for a shop app. It allows to store cart data using an event-driven architecture. In other words, it registers any action as an event, stores it on the database and updates the entity related to that action. It includes user authentication.

## Findings and decisions

### Apollo vs GraphQl-Express

Having tried both, I have not seen any difference other than simplicity. This fact made me choose graphql-express over apollo, since its implementation is much simpler and understandable.
