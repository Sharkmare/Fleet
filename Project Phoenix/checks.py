import discord
from discord.ext import commands

def has_access_level(access_level):
    async def predicate(ctx):
        if access_level is None:
            return True
        else:
            return ctx.author.id in [123, 456, 789]  # replace with your own access level check
    return commands.check(predicate)


def has_permission(permission):
    async def predicate(ctx):
        if permission is None:
            return True
        else:
            return getattr(ctx.author.guild_permissions, permission)
    return commands.check(predicate)


def has_role(role_name):
    async def predicate(ctx):
        if role_name is None:
            return True
        else:
            role = discord.utils.get(ctx.guild.roles, name=role_name)
            return role in ctx.author.roles
    return commands.check(predicate)
