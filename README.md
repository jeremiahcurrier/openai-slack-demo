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
