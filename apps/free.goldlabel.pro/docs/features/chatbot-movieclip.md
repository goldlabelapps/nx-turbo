# Chatbot movie clip

The chatbot movie clip is the conversational shell exported from `app/NX/Flash/MovieClips/Chatbot/`.

It combines the Flash animation layer, Uberedux state, and MUI layout to render a full-screen chat experience with a scrolling message area and prompt composer.

## Responsibilities

- initialise chatbot state in the Flash store
- render conversation chunks from `flash.chatbot.chunks`
- mount the prompt input at the bottom of the screen
- use the supplied logo as a route back to the home page

This component is useful when a tenant needs a branded conversational surface inside the NX runtime.
