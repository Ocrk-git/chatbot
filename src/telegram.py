from telethon import TelegramClient, events

session = "nandavikas"
api_id = 2934000
api_hash = "7407f1e353d48363c48df4c8b3904acb"

client = TelegramClient(session, api_id, api_hash)
# (chats=('daytradertelugu','moneycontrolcom'))
@client.on(events.NewMessage(chats=('My Bot')))
async def my_event_handler(event):
#     message_event = event()
    if event.out == False:
#         print(f'Event: {event}')
        print(f'Text: {event.raw_text}')
#     try:
#         print(f'Image: {event.photo}')
#     if 'hello' in event.raw_text:
#         await event.reply('hi!')

await client.start()
await client.run_until_disconnected()