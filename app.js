const { App, LogLevel, SocketModeReceiver } = require('@slack/bolt');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

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

// Listen to the slash command, and when received, respond with a ephemeral message including the user who triggered the command
app.command('/openai', async ({ command, ack, payload, context, respond }) => {
    ack();
    console.log(`lab1 Responding to `, payload.user_id);

    // TODO - add in loading logic for UX

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

 // Listen to the slash command, and when received, respond with a ephemeral message including the user who triggered the command
 // Then take payload text to send in API call to DALL-E2 API, format and send the response back to the user in Slack with their generated image
app.command('/openai-dalle2', async ({ command, ack, payload, context, respond, say }) => {
    ack();
    console.log(`[openai-dalle2] Responding to Slack user id: `, payload.user_id);
    try {
        // const prompt = "An Impressionist oil painting of someone riding on a psychedelic train going through a tunnel on a mountainside in a desert filled with wildflowers and cacti. There is a hawk flying in the sky and there is an orange sun in the sky at sunset.";
        const prompt = payload.text;
        const loading = await app.client.chat.postEphemeral({
            channel : payload.channel_id,
            user    : payload.user_id,
            text    : `:rocket: Sending this prompt to DALL-E2:\n> _${prompt}_`
        });
        console.log(`\n sending prompt "${prompt}" to openai via dalle2 api`);
        const res = await axios.post('https://api.openai.com/v1/images/generations', {
            model           : "image-alpha-001",
            caption         : prompt,
            num_images      : 4, // TODO - support full range of options [up to 10]
            size            : "256x256", // TODO - support full range of sizes [64x64, 256x256 or 1024x1024]
            response_format : "url" // TODO - support both options [or b64_json]
        }, {
            headers: {
            'Content-Type'  : 'application/json',
            'Authorization' : 'Bearer ' + process.env.OPENAI_API_KEY
            }
        });
        console.log('\n[openai-dalle2] OpenAI DALL-E2 API response url:');
        console.log('res.data.data');
        console.log(res.data.data);
        const generation1 = res.data.data[0].url; // TODO - add logic to support more than 1 url
        const generation2 = res.data.data[1].url; // TODO - add logic to support more than 1 url
        const generation3 = res.data.data[2].url; // TODO - add logic to support more than 1 url
        const generation4 = res.data.data[3].url; // TODO - add logic to support more than 1 url
        console.log('jeremiah');
        console.log('generation1');
        console.log(generation1);
        console.log('generation2');
        console.log(generation2);
        console.log('generation3');
        console.log(generation3);
        console.log('generation4');
        console.log(generation4);

        // https://slack.dev/bolt-js/concepts#message-sending with blocks via .say() as method from Slack's Bolt framework
        await say({
            // blocks mocked up via Slack's "Block Kit Builder"
            blocks: [
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        // "text": "This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>"
                        "text": ":art: Powered by <https://openai.com/dall-e-2/|DALL-E2> :art:"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        // "text": "This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>"
                        "text": `_${prompt}_`
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "image",
                    // "image_url": "https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1",
                    "image_url": `${generation1}`,
                    // "alt_text": "inspiration"
                    "alt_text": "Image generated via DALL-E2 API from OpenAI"
                },
                {
                    "type": "image",
                    // "image_url": "https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1",
                    "image_url": `${generation2}`,
                    // "alt_text": "inspiration"
                    "alt_text": "Image generated via DALL-E2 API from OpenAI"
                },
                {
                    "type": "image",
                    // "image_url": "https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1",
                    "image_url": `${generation3}`,
                    // "alt_text": "inspiration"
                    "alt_text": "Image generated via DALL-E2 API from OpenAI"
                },
                {
                    "type": "image",
                    // "image_url": "https://i1.wp.com/thetempest.co/wp-content/uploads/2017/08/The-wise-words-of-Michael-Scott-Imgur-2.jpg?w=1024&ssl=1",
                    "image_url": `${generation4}`,
                    // "alt_text": "inspiration"
                    "alt_text": "Image generated via DALL-E2 API from OpenAI"
                }
            ]
          });
    } catch (error) {
        console.log(`\n[openai-dalle2] error with code: ${error.code}, status: ${error.response.status}, and statusText: ${error.response.statusText}.\n Full error output below:\n${error}`);
        await app.client.chat.postEphemeral({
            channel : payload.channel_id,
            user    : payload.user_id,
            text    : `API Error\n>HTTP status code: *${error.response.status}*\n>Message: *${error.response.statusText}*`
        });
    }

 });
