slack2slack
===========

Connect channels from different Slack boards. Dead simple Node app that I put on Heroku to make communication between two boards easier.

##Setup

On each Slack board's Integrations page, create an Incoming and an Outgoing Webhook. 
Specify the channel you want the messages to go in and out of. On the Outgoing Webhook, enter the URL of where this app is going to live (I hosted mine on Heroku).

Put the Incoming and Outgoing tokens in their respective places in config.js, update the hostnames for your two slack boards, and include the previously mentioned URL, and you're done! Throw the app on Heroku and start talking.
