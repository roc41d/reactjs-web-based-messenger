# React Web Based Messenger

## Getting started

### Requirements
```
Node: v12.13.0
NPM: v6.14.9
Mongodb: latest
```

### Installation
Clone the repository

```
git clone https://github.com/roc41d/reactjs-web-based-messenger.git
```

Switch to the repo folder

```
cd reactjs-web-based-messenger
```

The project is broken down into a server and client folder.

#### Running the `server`
Switch to the `server` folder

```
cd server
```

Install all the dependencies

```
npm i
```

Copy the example .env file and make the required configuration changes in the .env file

```
cp env.development.local .env
```

Start the local development server

```
npm start
```

You can now access the server at [http://localhost:3001](http://localhost:3001)

#### Running the `client`
Switch to the `client` folder

```
cd client
```

Install all the dependencies

```
npm i
```

Start the local development server

```
npm start
```

You can now access the client at [http://localhost:3000](http://localhost:3000)
