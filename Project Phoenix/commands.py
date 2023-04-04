import discord
from discord.ext import commands
from checks import has_access_level, has_permission, has_role

# Define the command prefix
prefix = "!"

# Define the ping command
@commands.command(name="ping", aliases=["p"])
@has_access_level(None)
@has_permission(None)
@has_role(None)
async def ping(ctx):
    await ctx.send("Pong!")


# Define the kick command
@commands.command(name="kick")
@has_access_level(5)
@has_permission("kick_members")
@has_role("Admin")
async def kick(ctx, member: discord.Member):
    await member.kick(reason="Kicked by moderator")


# Define the dictionary to store commands and their properties
commands_dict = {
    "ping": {
        "function": ping,
        "alias": ["p"],
        "access_level": None,
        "permission_needed": None,
        "role_needed": None
    },
    "kick": {
        "function": kick,
        "alias": [],
        "access_level": 5,
        "permission_needed": "kick_members",
        "role_needed": "Admin"
    }
}
