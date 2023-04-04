import discord
import json
import os
import sys
from discord.ext import commands
from checks import has_access_level, has_permission, has_role
from commands import prefix, commands_dict

# set our internal version
version = "Phoenix"

# Define the file path to your JSON configuration file
config_file_path = "config.json"

# Load the JSON data from the file if it exists, or create a blank config if it doesn't exist
if os.path.exists(config_file_path):
    with open(config_file_path, "r") as config_file:
        config_data = json.load(config_file)
else:
    print(f"No configuration file found at {config_file_path}. Creating a blank configuration file...")
    config_data = {"Bot": {"owner": None, "token": None}}
    with open(config_file_path, "w") as config_file:
        json.dump(config_data, config_file)



# Define the intents
intents = discord.Intents.default()
client = discord.Client(intents=intents)

# Define the bot and set the command prefix and intents
bot = commands.Bot(command_prefix=prefix, intents=intents)

@client.event
async def on_ready():
    print("Bot is ready.")

# Define the commands
for command_name, command_properties in commands_dict.items():
    command_function = command_properties.get("function")
    command_aliases = command_properties.get("alias", [])
    command_access_level = command_properties.get("access_level")
    command_permission_needed = command_properties.get("permission_needed")
    command_role_needed = command_properties.get("role_needed")

    @bot.command(name=command_name, aliases=command_aliases)
    @has_access_level(command_access_level)
    @has_permission(command_permission_needed)
    @has_role(command_role_needed)
    async def command_wrapper(ctx):
        await command_function(ctx)

# Run the bot
client.run(config_data["Bot"]["token"])


