# Vue Weather

Vue weather allows users to select cities and checking weather details in each of them!

[![Example](https://img.shields.io/badge/demo-Working_example-green)](https://vue-weather523.herokuapp.com)

## Features

The application allows users to create their own accounts so the actions taken by them
are permanently saved! 
After selecting cities, it is possible to check the weather in each of them. 

**Your weather assistant!**

## Tech

Vue weather uses a number of open source projects to work properly:

- [Vue.js] - The ProgressiveJavaScript Framework
- [Vuetify] - \Library with beautifully handcrafted Material Components
- [VueCLI] - Standard Tooling for Vue.js Development
- [Node.js] - evented I/O for the backend
- [Express.js] - fast node.js network app framework
- [MongoDB] - The noSQL database for modern applications

## Installation
Clone repository and perform the following actions:

**Install dependencies**
```sh
cd vue-weather
npm run install-server
npm run install-client
```

**Edit /config/keys.js by added mongoDb URI:**
```sh
export default {
    mongoURI: "<YOUR MONGODB URI>",
    secretOrKey: "tAlk1sChEApsh0Wm3thEc0d3"
}
```

**Next, start server in one terminal...**
```sh
npm run dev-server
```

**...and start client in another terminal**
```sh
npm run dev-client
```

----

Now, you can go **localhost:8080** and play fun!

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [git-repo-url]: <https://github.com/novvac/vue-weather.git>
   [Node.js]: <http://nodejs.org>
   [Express.js]: <http://expressjs.com>
   [Vue.js]: <https://vuejs.org>
   [Vuetify]: <https://vuetifyjs.com/en>
   [VueCLI]: <https://cli.vuejs.org>
   [MongoDB]: <https://www.mongodb.com>
