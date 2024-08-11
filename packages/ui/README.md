# @price-comparator/ui

It includes a vite front-end app to represent minimal client UI.

It can show aggregated price data from different sources.

## Environment variables

You need to create `.env.local` file with `WEBSOCKET_SERVER_URL` for local development.

Also need to provide this variable on production build phase.

Example:

```
VITE_WEBSOCKET_SERVER_URL=ws://localhost:8080
```
