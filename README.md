# Github-Freshdesk-API

A project based on fetching Github user information and making a contact in Freshdesk using REST API
## How to run the program : 
You need to have Node JS and Jest installed (to run the program and for unit testing)
1) I have used WebStorm IDE from Jetbrains -> download the project and open it in the same IDE
2) Generate GITHUB_TOKEN and FRESHDESK_TOKEN
3) Set them globally in your user environment variables in your OS (I use Windows)
4) Download the packages/node modules using the command : 
```bash
npm i axios jest
```

5) You can run the program with :
```bash
node /src/run.js
```
or just configure it from the IDE -> (note, when you type this command in terminal, run it with ctrl + enter


6) You can run the unit tests using :
```bash
npx jest
```

- Note that not using proper tokens will result in error, so they need to be valid 
- The username and the subdomain are mine, so make sure to change them, in order to get your github user and freshdesk domain
