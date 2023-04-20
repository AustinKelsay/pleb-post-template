# Building your first Lightning App

- Speaker: Austin Kelsay
- Twitter: @bitcoinplebdev
- Nostr: npub1s9etjgzjglwlaxdhsveq0qksxyh6xpdpn8ajh69ruetrug957r3qpklxzl

## Session Agenda:
Austin will walk through two simple Lightning app templates:

- [pleb-node-template](https://github.com/AustinKelsay/pleb-node-template)
- [pleb-post-template](https://github.com/AustinKelsay/pleb-post-template)

The slides for this presentation can be found [HERE](https://twitter.com/bitcoinplebdev)

### pleb-node (ran locally)

pleb-node is a simple example template app that we will walk through in order to talk about the local lightning development environment. pleb-node is not in this replit so you will need to clone it down from github [HERE](https://github.com/AustinKelsay/pleb-node-template) and have [Docker Desktop](https://www.docker.com/products/docker-desktop/) and [Polar](https://lightningpolar.com) availabe to run locally.

No wories if you can't run this locally during the workshop, I will showcase the full project and just want to use it as a opportunity to cover some basic lightning development concepts!

### pleb-post (ran in this replit)

pleb-post is a more complex and opinionated template app that we will setup and run together in this replit!

With pleb-post we will have an opportunity to talk about the remote lightning development environment and look at some useful tools that will give us a ton of leverage and enable us to easily deploy our project and make it available on mainnet.

## What's in this Repl?

- The [pleb-post-template](https://github.com/AustinKelsay/pleb-post-template) project we will be running
- A preconfigured connection to a MongoDB database for pleb-post (not included on github)
- A walkthrough on how to setup and run pleb-post both in the README.md and these tutorial docs you're currently reading

## Austin's Hackathon Ideas He Could Help You With:

1. Building any kind of web wallet or browser extension wallet for lightning! Wether you're wanting to build your first simple lightning wallet web app or you have an innovative idea on how to build the best new browser wallet. Either way I would love to hear about it and help out!
2. Building a lightning paywall. It may be a paywall for your blog, an API, or even some kind of AI tool. Lightning paywall apps are great projects for learning, they can be implemented in a variety of ways, and there is still a lot of unrealized potential in their application.
3. Build anything based off of the pleb-node or pleb-post templates! These templates will give you a solid foundation for starting a new fullstack lightning app project. So any project starting with a low-level GRPC connection into a lightning node (like pleb-node) OR a project using LNBits, Voltage, or LNUrl-Auth, that lets users sign in, get authenticated, and receive a custodial lightning wallet (like pleb-post) I should be able to help out!