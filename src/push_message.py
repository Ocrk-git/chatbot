from telethon import TelegramClient, events, functions, types, utils
import sys
import inspect
import os
import asyncio
# Login Details

session = "nandavikas"
api_id = 2934000
api_hash = "7407f1e353d48363c48df4c8b3904acb"


async def send_push_message():
    async with TelegramClient(session, api_id, api_hash) as client:
        message = sys.argv[1]
        await client.send_message('+919490987294', message)

def main():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(send_push_message())
    loop.close()

if __name__ == '__main__':
    main()
    print("success")
    sys.stdout.flush()