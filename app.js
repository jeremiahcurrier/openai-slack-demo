const { App, LogLevel, SocketModeReceiver } = require('@slack/bolt');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = new App({
    // signingSecret: process.env.SLACK_SIGNING_SECRET
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    token: process.env.SLACK_BOT_TOKEN
});

(async () => {
    await app.start();
    console.log('⚡️ Hello Whirled Peas... Bolt app is running!\n[Socket Mode = ENABLED]');
})();

// Listen to the slash command, and when received, respond with a ephemeral message including the user who tirgerred the command
app.command('/openai', async ({ command, ack, payload, context, respond }) => {
    ack();
    console.log(`lab1 Responding to `, payload.user_id);

    // add in loading logic for UX

    try {
        const response = await openai.createCompletion("text-davinci-002", {
            prompt: `Translate this into 1. French, 2. Spanish and 3. Japanese:\n\n${payload.text}\n\n`,
            temperature: 0.3,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        console.log('\n\n\n response.data');
        console.log(response.data);
        respond(`Your phrase \`${payload.text}\` translated from :flag-um: English to 1. :flag-mf: French, 2. :flag-mx: Spanish, and 3. :jp: Japanese is:\n${response.data.choices[0].text}`);
    } catch (error) {
        console.log('error');
        console.log(error);
    }

 });
