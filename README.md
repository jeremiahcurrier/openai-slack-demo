# gtm-slack-demo-bot
## GPT-3 via Completions API
Use OpenAI Completions API to translate English into 3 default languages (French, Spanish and Japanese).

Create a custom Slack app [socket mode enabled, add a slash command, 'commands' and 'chat:write' Bot Token scopes], then install to single workspace, invite bot to a channel for demo.

On local (Mac) machine install homebrew, node.js, npm packages [nodemon, dotenv, @slack/bolt, and openai], and create a folder, clone this repo to the folder, npm install, create & configure .env file, run app via "nodemon app.js" in Terminal app.

### Demo

<img width="952" alt="openai-translations-demo" src="https://user-images.githubusercontent.com/4379219/188205381-267035ef-2882-4074-9b85-8302f0222165.png">

## DALL-E2 API
Enter a prompt to send to DALL-E2 API to generate 1 256x256 image without leaving Slack.

1. Add another slash command ```/openai-dalle2```
2. Install the axios npm module as another dependency (used to make API call to DALL-E2 API)
3. Pro tip: make sure the bot is invited to whatever channel you want to try this out in!

### Demo

https://user-images.githubusercontent.com/4379219/188205165-d8c326f2-7e4a-4ab3-9fb3-3d2fc3dc315b.mp4

***
```Everything below this line was written with GPT-3 by OpenAI via taking this Github repo as the input to read```
***
# OpenAI Slack Demo
This repository contains code for an OpenAI Slack demo, which allows you to use the powerful artificial intelligence capabilities of OpenAI within the popular collaboration platform, Slack.
## Getting Started
To get started with this demo, first clone the repository:
git clone https://github.com/jeremiahcurrier/openai-slack-demo
Next, navigate into the directory and install the required dependencies:
cd openai-slack-demo
npm install
## Usage
The code in this repository provides the basic structure for connecting OpenAI with Slack. You will need to add your own logic for what you want the AI to do. To begin, add your Slack and OpenAI API keys to the config.js file.
To run the demo, use the following command:
npm start
The demo will now be listening for messages on Slack, and will pass them to OpenAI for processing.
## Contributing
Contributions to this repository are welcome! If you'd like to add new features or fix bugs, please fork the repository and create a pull request with your changes.
## License
This repository is licensed under the MIT License.
