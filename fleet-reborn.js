const version = "Reborn 1.4.5.4.1"
try
{
	Config = require('./config.json')
}
catch (e)
{
	console.log('\Fleet encountered an error while trying to load the config file, please resolve this issue and restart Fleet\n\n' + e.message)
	process.exit()
}
const botmain = require("discordie"),
	logchannel = "300130710671458304",
	dvaserver = "186245290431348737",
	dvalogchannel = "226952415797051394",
	botowner = "201983882625548299",
	hungermaster = ["148914844190507018", botowner];
var fs = require("fs"),
	servers = [],
	started = Date.now(),
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest,
	Http = new XMLHttpRequest,
	Commands = [],
	Event = botmain.Events,
	unirest = require("unirest"),
	game = {
		type: 1,
		name: "with your soul~",
		url: "http://discordvore.info"
	};
strg = fs.readFileSync("C:/resources/variables/storage");
var strg = JSON.parse(strg),
	potion = strg.potion.effects,
	speed = strg.voreroulette.speeds,
	nom = strg.voreroulette.noms,
	nom2 = strg.voreroulette.noms2,
	actionsing = strg.voreroulette.actions,
	animal = strg.voreroulette.animals;
console.log(started)
bot = new botmain(
{
	messageCacheLimit: 9999,
	autoReconnect: true,
	
});
bot.connect(
{
	token: Config.bot.token
})
bot.Dispatcher.on("GATEWAY_READY", e =>
{
	console.log("Connected as: " + bot.User.username);
	{
		bot.User.setStatus("online", game)
		console.log(bot.User)
		bot.Channels.get('620908518911901716').sendMessage("Systems online. Version: " + version)
	}
	for (i = 0; i < bot.Guilds.toArray().length; i++)
	{
		servers.push(bot.Guilds.toArray()[i].id)
	}
	console.log("Connected to:", servers)
});
bot.Dispatcher.on("DISCONNECTED", e =>
{
	return console.log("Connection lost", console.log(servers))
});

function banlogger(a,bot,currentserver,banfile,bans){
		bot.Guilds.get(servers[a]).getBans().then(function(b)
		{
			
			for (i = 0; i < b.length; i++)
			{
				bans.push(b[i].id+" | " + currentserver)
			}
			if (revo == servers.length - 1)
			{
				fs.writeFileSync(banfile, bans.join("\n") + "\n")
			}
			revo++
			
		})}

bot.Dispatcher.on("GUILD_MEMBER_ADD", e =>
{
	var banfile = "C:/resources/BANS/BANLOG/banlog"
	var manbanfile = "C:/resources/BANS/BANLOG/blackbanlog"
	console.log(e.member.username)
	bans = [];
	revo = 0
	for (a = 0; a < servers.length; a++)
	{ currentserver = bot.Guilds.get(servers[a]).name
		banlogger(a,bot,currentserver,banfile,bans)
	}
	setTimeout(function()
	{
		bans = fs.readFileSync(banfile, "utf8")
		bans = bans.split("\n")
		manbans = fs.readFileSync(manbanfile, "utf8")
		manbans = manbans.split("\n")
		howmany = bans.filter(Z => Z.includes( e.member.id) ).length
		manhowmany = manbans.filter(Z => Z == e.member.id).length
		if (howmany < 1)
		{
			console.log("no bans logged")
		}
		if (howmany > 0 && howmany < 3)
		{
			CM(dvalogchannel, "Yellow flagged user " + " <@" + e.member.id + "> " + e.member.username + "#" + e.member.discriminator + " `" + e.member.id + "` joined " + e.guild.name)
		}
		if (howmany > 2 || manhowmany >= 1)
		{
			CM(dvalogchannel, "Red flagged user " + " <@" + e.member.id + "> " + e.member.username + "#" + e.member.discriminator + " `" + e.member.id + "` joined " + e.guild.name)
			e.member.ban()
		}
		if (manhowmany >= 1)
		{
			CM(dvalogchannel, "Black flagged user " + " <@" + e.member.id + "> " + e.member.username + "#" + e.member.discriminator + " `" + e.member.id + "` joined " + e.guild.name)
			e.member.ban()
		}
	}, 10000);
});

function CM(channel, message)
{
	bot.Channels.get(channel).sendMessage(message)
}
bot.Dispatcher.on("MESSAGE_CREATE", e =>
{
	var antiecho;
	var guild;;
	var msg;
	if (e.message.guild)
	{
		guild = e.message.guild.name
	}
	if (e.message)
	{
		msg = e.message
	}
	if (msg.author == "311682437728043009")
	{
		return
	}
	//console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
	//Fleet Legacy Handling
	levelone = fs.readFileSync("C:/resources/variables/levelone", "utf8").split("\n")
	leveltwo = fs.readFileSync("C:/resources/variables/leveltwo", "utf8").split("\n")
	levelthree = fs.readFileSync("C:/resources/variables/levelthree", "utf8").split("\n")
	if (msg.content.split("")[0] == "-")
	{
		console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
		suffix = msg.content.split(" ")
		trigger = suffix[0].replace("-", "")
		suffix = suffix.join(" ")
		if (suffix.split(trigger)[1].split("")[0] == " ")
		{
			suffix = suffix.replace("-" + trigger + " ", "")
		}
		else
		{
			suffix = suffix.replace("-" + trigger, "")
		}
		execute = Commands.filter(e => e.name == trigger.toLowerCase())
		if (execute.length < 1)
		{
			CommandsWithAliases = Commands.filter(e => e.aliases) //Ignore commands without aliases
			execute = CommandsWithAliases.filter(e => e.aliases.includes(trigger.toLowerCase()))
		}
		if (execute.length > 0)
		{
			if (execute[0].noDM && !msg.guild)
			{
				return msg.reply("This Command can not be executed in DMs")
			}
			if (execute[0].level == "master" && msg.author.id != botowner)
			{
				return
			}
			else if (execute[0].level > 0 && msg.author.id != botowner)
			{
				switch (execute[0].level)
				{
					case 3:
						if (levelthree.includes(msg.author.id))
							break;
					case 2:
						if (leveltwo.includes(msg.author.id) || levelthree.includes(msg.author.id))
							break;
					case 1:
						if (levelone.includes(msg.author.id) || leveltwo.includes(msg.author.id) || levelthree.includes(msg.author.id))
							break;
					default:
						return msg.reply("You do not have the needed level " + execute[0].level);
				}
			}
			console.log(suffix)
			execute[0].fn(msg, suffix, bot)
			antiecho = 1;
		}
	}
	//Fleet core -
	if (msg.content.split("")[0] == "-" && !antiecho)
	{
		console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
		suffix = msg.content.split(" ")
		trigger = suffix[0].replace("-", "")
		suffix = suffix.join(" ").replace("-" + trigger + " ", "")
		commands(msg, suffix, trigger)
	}
	//hungergame core
	if (hungermaster.includes(msg.author.id && !antiecho))
	{
		if (msg.content.includes("-hunger2 "))
		{
			console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
			var suffix = msg.content.replace("-hunger2 ", "")
			var t0 = Date.now()
			suffix || (suffix = 24), msg.channel.sendMessage("Dinner time~").then(function(e)
			{
				var s = e.id;
				gamemaster = msg.author.username + "#" + msg.author.discriminator, e.edit("Started by: " + gamemaster), e.content = "Started by: " + gamemaster, setTimeout(function()
				{
					! function e(s, t, r = [], a = [])
					{
						ourmessages = bot.Messages.forChannel(msg.channel.id);
						ourmessages = ourmessages.filter(e => e.id > t);
						ourmessages = ourmessages.filter(e => e.content.toLowerCase().includes("here"));
						for (i = 0; i < ourmessages.length && r.length != suffix; i++) r.includes(ourmessages[i].author.id) || (r.push(ourmessages[i].author.id), a.push(ourmessages[i].author.username + "#" + ourmessages[i].author.discriminator + "\n" + ourmessages[i].content)), ourmessages.length - 1 == i && (t = ourmessages[i].id), ourmessages[i].delete();
						var t1 = Date.now(),
							passed = Math.trunc((t1 - t0) / 1e3 / 60 * 100) / 100 + " minutes";
						s.edit("**Started by:** `" + msg.author.username + "#" + msg.author.discriminator + "` `" + passed + "`\n " + a.join("\n\n") + "");
						if (r.length == suffix) return msg.channel.sendMessage("All slots filled!");
						setTimeout(function()
						{
							e(s, t, r, a)
						}, 3e3)
					}(e, s)
				}, 1e3)
			})
		}
	}
	//fleet core
	if (msg.content.includes("fleet") && !antiecho)
	{
		console.log(e.message.author.username + " | " + e.message.content + " | " + guild)
		//bot owner commands
		if (msg.author.id == botowner)
		{
			if (msg.content.includes("ping"))
			{
				msg.channel.sendMessage("pong")
			}
			if (msg.content.includes("fleet say"))
			{
				CM(msg.channel.id, msg.content.replace('fleet say', '').replace("nodel", ""))
				if (!msg.content.includes("nodel"))
				{
					msg.delete()
				}
			}
		}
	}
});

function commands(msg, suffix, trigger)
{
	switch (trigger)
	{
		case "ping":
			return msg.channel.sendMessage("pong")
		case "swordshield":
			function release()
			{
				var e = "15-11-2019",
					t = (e = e.split("-"))[1] + "," + e[0] + "," + e[2];
				t = new Date(t).getTime(), X = Date.now(), X = t - X;
				var a = " ms";
				return X /= 6e4, a = " minutes", X = Math.trunc(X), X > 60 && (X = Math.trunc(X / 60), a = " hours", X > 24 && (X = Math.trunc(X / 24), a = " days")), X + a
			}
			return msg.channel.sendMessage(release())
		case "vore":
			return vore(msg, suffix, bot)
		default:
			break;
	}
}
bot.Dispatcher.on("MESSAGE_DELETE", (e) =>
{
	if (!e.message)
	{
		return
	}
	if (!e.message.guild)
	{
		return
	}
	var server = e.message.guild.name
	if (!e.message.content)
	{
		var content = ""
	}
	else
	{
		var content = e.message.content
	}
	var member = e.message.author
	var unirest = require('unirest')
	var hookavatar = e.message.author.avatarURL
	let username = member.username
	let userid = member.id
	var hash = member.discriminator
	var hookname = username + "#" + hash
	var qualitycontent = content.split("")
	if (!e.message.attachments[0])
	{
		var img = ""
	}
	else
	{
		var img = e.message.attachments[0].proxy_url
	}
	if (qualitycontent[0] == "-")
	{
		return
	}
	//console.log(server)
	if (server == "Chompers")
	{
		var hookurl = Config.webhooks.chomplog
		unirest.post(hookurl)
			.header('Content-Type', 'application/json').send(
			{
				"avatar_url": "" + hookavatar + "",
				"username": "" + hookname + "",
				"content": "UID:`" + userid + "` Message ID: `" + e.messageId + "` in <#" + e.channelId + ">\n```" + content + "```\n" + img + ""
			}).end()
		return
	}
	if (server == "Ourpoke")
	{
		var hookurl = Config.webhooks.ourpokelog
		unirest.post(hookurl)
			.header('Content-Type', 'application/json').send(
			{
				"avatar_url": "" + hookavatar + "",
				"username": "" + hookname + "",
				"content": "UID:`" + userid + "` Message ID: `" + e.messageId + "` in <#" + e.channelId + ">\n```" + content + "```\n" + img + ""
			}).end()
		return
	}
	if (server == "Vore Lovers")
	{
		var hookurl = Config.webhooks.voreloverslog
		unirest.post(hookurl)
			.header('Content-Type', 'application/json').send(
			{
				"avatar_url": "" + hookavatar + "",
				"username": "" + hookname + "",
				"content": "UID:`" + userid + "` Message ID: `" + e.messageId + "` in <#" + e.channelId + ">\n```" + content + "```\n" + img + ""
			}).end()
		return
	}
	//console.log("ignored deletion")
})

function relaymedaddy(message)
{
	var me = "201983882625548299";
	bot.Users.get(me).openDM()
		.then(function(x)
		{
			x.sendMessage(message)
			return x.close()
		})
}
bot.Dispatcher.on("MESSAGE_REACTION_ADD", (e) =>
{
	if (!e.message)
	{
		return
	}
	fs = require('fs')
	var makerid = e.message.author.id
	var myhooks = fs.readFileSync('C:/resources/variables/myhook');
	myhooks = JSON.parse(myhooks)
	let myhook;
	myhook = myhooks.filter(d => d.channel.id == e.message.channel.id)
	if (myhook.length >= 1)
	{
		var hookid = myhook[0].webhook.id
		if (hookid == makerid)
		{
			e.message.addReaction('🇫')
		}
	}
})

function protoDM(ID, MESSAGE, bot)
{
	bot.Users.get(ID).openDM() //opens the dm
		.then(function(x)
		{ //passes the info of the opened DM into x
			x.sendMessage(MESSAGE) //sends a message to x
			x.close() //closes the DM
		})
		.catch(function(error)
		{
			// handle error
			protoDM('201983882625548299', error)
		})
}
bot.Dispatcher.on("GUILD_BAN_ADD", (e) =>
{
	var unirest = require('unirest')
	var hookurl = Config.webhooks.defaultbanlog
	var hookavatar = e.guild.iconURL
	var hookname = e.guild.name
	let srv = e.guild.name
	let srvid = e.guild.id
	let discordname = e.user.username
	let name = e.user.username
	let usericon = e.user.avatarURL
	let discriminator = e.user.discriminator
	let discordid = e.user.id
	var dir = "C:/resources/BANS"
	var webhookmessage = "`" + name + "#" + discriminator + "`\n**Unique ID:**" + discordid + "\n<@" + discordid + "> \n<#" + srvid + ">\n" + usericon + ""
	unirest.post(hookurl)
		.header('Content-Type', 'application/json').send(
		{
			"avatar_url": "" + hookavatar + "",
			"username": "" + hookname + "",
			"content": webhookmessage
		}).end()
	//return console.log(webhookmessage)
	//return console.log("Aborted")
	if (!fs.existsSync(dir))
	{
		fs.mkdirSync(dir);
	}
	if (!fs.existsSync(dir + "/" + discordid))
	{
		fs.mkdirSync(dir + "/" + discordid)
	}
	if (!fs.existsSync(dir + "/" + discordid + "/" + srv))
	{
		fs.writeFile(dir + "/" + discordid + "/" + srv, '1', function(err)
		{
			if (err)
			{
				return console.log(err);
			}
			console.log(srv);
		})
	}
	else
	{
		fs.readFile(dir + "/" + discordid + "/" + srv, 'utf8', (err, data) =>
		{
			if (err) throw err;
			console.log(data);
			if (data != '')
			{
				var convert = data - 0
				var amount = convert + 1
				fs.writeFile(dir + "/" + discordid + "/" + srv, '' + amount + '', function(err)
				{
					if (err)
					{
						return console.log(err);
					}
					console.log(dir + "/" + discordid + "/" + srv);
				})
			}
		})
	}
	if (fs.existsSync('C:/resources/BANS/' + discordid + '.txt'))
	{
		fs.readFile('C:/resources/BANS/' + discordid + '.txt', 'utf8', (err, data) =>
		{
			if (err) throw err;
			console.log(data);
			if (data != '')
			{
				var convert = data - 0
				var amount = convert + 1
				fs.writeFile('C:/resources/BANS/' + discordid + '.txt', '' + amount + '', function(err)
				{
					if (err)
					{
						return console.log(err);
					}
					console.log("new ban added");
				})
			}
			else
			{
				var amount = 1
				fs.writeFile('C:/resources/BANS/' + discordid + '.txt', '' + amount + '', function(err)
				{
					if (err)
					{
						return console.log(err);
					}
					console.log("new ban added");
				})
			}
		})
	}
	else
	{
		fs.writeFile('C:/resources/BANS/' + discordid + '.txt', '1', function(err)
		{
			if (err)
			{
				return console.log(err);
			}
			console.log("generated");
		})
	};
	console.log("Ban added from " + srv + " " + name + "#" + discriminator + " Unique ID:" + discordid);
});
bot.Dispatcher.on("MESSAGE_CREATE", (e) =>
{
	if (!e.message)
	{
		return
	}
	if (!e.message.guild)
	{
		if (!e.message.content)
		{
			return
		}
		if (e.message.author.id == '201983882625548299')
		{
			return
		}
		if (e.message.author.id == '311682437728043009')
		{
			return
		}
		console.log(e.message.author.username + "#" + e.message.author.discriminator + " | " + e.message.author.id + "\n" + e.message.content)
		return relaymedaddy(e.message.author.username + "#" + e.message.author.discriminator + " | " + e.message.author.id + "\n" + e.message.content)
		return
	}
	var server = e.message.guild.name
	var msg = e.message
	if (server == "Vore Lovers" && msg.channel.id == 284900164089544706)
	{
		msg.addReaction(msg.guild.emojis[cry(msg.guild.emojis, "YEA")])
		msg.addReaction(msg.guild.emojis[cry(msg.guild.emojis, "NAY")])
		return
	}
})
bot.Dispatcher.on("MESSAGE_CREATE", (e) =>
{
	if (!e.message)
	{
		return
	}
	if (!e.message.guild)
	{
		return
	}
	var server = e.message.guild.name
	var msg = e.message
})

function cry(a, b)
{
	var x = 0
	while (x != a.length)
	{
		if (a[x].name == b)
		{
			return x
		}
		x++
	}
}

bot.Dispatcher.on(Event.GUILD_MEMBER_ADD, (e) => {
    var unirest = require('unirest')
    let jmember = e.member
    let joineduser = e.member.username
    let discordid = e.member.id
    let srv = e.guild.name
    let srvuid = e.guild.id
    console.log(joineduser + discordid + srv)

    if (srvuid != '574956208645996547') {
        var message = `Welcome to ${srv}! \nPlease take a moment to read the rules!\nWe hope you have a great time.`
        if (srvuid == '180538463655821312') //Chompers
        {
            message = `Welcome to ${srv}! \nPlease bring your attention to <#575623788977455104> to learn how to access the rest of the server.\nWe hope you have a great time.`
        }
        protoDM(discordid, message, bot)
    }
})

function pokelookup(suffix, msg, dir)
{
	pokeValidate(suffix[0])
	path = suffix[0] + "/" + suffix[1] //changed to hard coding suff 1 and 0 to accomedate langaugee suffix 2
	console.log(path)
	if (suffix[2]) console.log("Language selection: " + suffix[2])
	else console.log("No language token defaulting to english")
	const READYSTATE = 4
	const Http = new XMLHttpRequest();
	const url = `https://pokeapi.co/api/v2/${path}`;
	y = []
	var x;
	Http.open("GET", url);
	Http.setRequestHeader(`Authorization`, `The big gay`)
	Http.send();
	Http.onreadystatechange = (e) =>
	{
		if (Http.readyState == READYSTATE)
		{
			if (Http.responseText == 'Not Found')
			{
				fs.writeFile(dir + path, Http.responseText, function(err)
				{
					if (err)
					{
						return console.log(err);
					}
					console.log(path + " has been logged");
				})
				return msg.channel.sendMessage("Not Found")
			}
			x = JSON.parse(Http.responseText)
			fs.writeFile(dir + path, Http.responseText, function(err)
			{
				if (err)
				{
					return console.log(err);
				}
				console.log(path + " has been logged");
			})
			if (typeof pokeparse(suffix, x) == 'object')
			{
				msg.channel.sendMessage("", false,
				{
					color: 0x3498db,
					image:
					{
						url: x.sprites.front_shiny
					},
					thumbnail:
					{
						url: x.sprites.front_default
					},
					fields: pokeparse(suffix, x)
				})
			}
			else
			{
				msg.channel.sendMessage(pokeparse(suffix, x, msg))
			}
		}
	}
}

function fieldmaker(name, value)
{
	return {
		name: name,
		value: value
	}
}

function pokeparse(suffix, x, msg)
{
	var result = [];
	switch (suffix[0])
	{
		case "pokemon-species":
			entries = x.flavor_text_entries
			//console.log(entries)
			if (suffix[2])
			{
				entries = entries.filter(d => d.language.name == suffix[2])
			}
			else
			{
				entries = entries.filter(d => d.language.name == 'en')
			}
			if (entries.length <= 0)
			{
				return "No entries found for given language token " + suffix[2]
			}
			entry = randomIntFromInterval(0, entries.length - 1)
			return (entries[entry].flavor_text)
		case "pokemon":
			var spriteobj = x.sprites;
			var sprites = []
			sprites.push(spriteobj.back_default);
			sprites.push(spriteobj.back_female)
			sprites.push(spriteobj.back_shiny);
			sprites.push(spriteobj.front_default)
			sprites.push(spriteobj.front_female);
			sprites.push(spriteobj.front_shiny)
			var normal = sprites[3];
			var shiny = sprites[5]
			typings = x.types;
			var typing;
			if (typings[0])
			{
				typing = typings[0].type.name
			};
			if (typings[1])
			{
				typing = typing + " " + typings[1].type.name
			}
			result.push(fieldmaker('**Pokedex ID:** ' + x.id, '**name:** ' + x.species.name))
			//result.push(fieldmaker())
			result.push(fieldmaker("**type:** " + typing, '**weight:** ' + x.weight / 10 + " kg"))
			//result.push(fieldmaker())
			if (x.height <= 9)
			{
				result.push(fieldmaker('**height:** ' + x.height * 10 + " cm", "_ _"))
			}
			else
				result.push(fieldmaker('**height:** ' + x.height / 10 + " m", "_ _"))
			//result.push(fieldmaker("**sprites:**" ,normal+" "+shiny))
			//console.log(result)
			//var suffix = ["pokemon-species",suffix[1] ]
			//var dir = "C:/resources/"
			//if(msg) {pokelookup(suffix,msg,dir)}
			//console.log(msg)
			return result
		case "item":
			result.push(x.name)
			result.push(x.effect_entries[0].effect.split("\n").join(" "))
			return (result.join("\n"))
		case "type":
			var take2dmg = [];
			var give2dmg = [];
			var takehalfdmg = [];
			var givehalfdmg = [];
			var takenodmg = [];
			var givenodmg = [];
			dmgcalc = x.damage_relations
			takedoubledmgcalc = dmgcalc.double_damage_from;
			dmgcalcname(takedoubledmgcalc, take2dmg);
			givedoubledmgcalc = dmgcalc.double_damage_to;
			dmgcalcname(givedoubledmgcalc, give2dmg);
			takehalfdmgcalc = dmgcalc.half_damage_from;
			dmgcalcname(takehalfdmgcalc, takehalfdmg)
			givehalfdmgcalc = dmgcalc.half_damage_to;
			dmgcalcname(givehalfdmgcalc, givehalfdmg)
			takenodmgcalc = dmgcalc.no_damage_from;
			dmgcalcname(takenodmgcalc, takenodmg)
			givenodmgcalc = dmgcalc.no_damage_to;
			dmgcalcname(givenodmgcalc, givenodmg)
			typeinfo = "```CSS\n[" + suffix[1] + "]"
			if (take2dmg.length > 0)
			{
				typeinfo += "\nTakes 200% from:\n" + take2dmg.join(", ")
			}
			if (takehalfdmg.length > 0)
			{
				typeinfo += "\nTakes 50% from:\n" + takehalfdmg.join(", ")
			}
			if (takenodmg.length > 0)
			{
				typeinfo += "\nTakes none from:\n" + takenodmg.join(", ")
			}
			if (givenodmg.length > 0)
			{
				typeinfo += "\nDeals none to:\n" + givenodmg.join(", ")
			}
			if (givehalfdmg.length > 0)
			{
				typeinfo += "\nDeals 50% to:\n" + givehalfdmg.join(", ")
			}
			if (give2dmg.length > 0)
			{
				typeinfo += "\nDeals 200% to:\n" + give2dmg.join(", ")
			}
			typeinfo += "\n\nPokemon with this type: " + x.pokemon.length
			typeinfo += "\n\nMoves with this type: " + x.moves.length
			typeinfo += "\n```"
			return (typeinfo)
		case "ability":
			entries = x.flavor_text_entries
			//console.log(entries)
			if (suffix[2])
			{
				entries = entries.filter(d => d.language.name == suffix[2])
			}
			else
			{
				entries = entries.filter(d => d.language.name == 'en')
			}
			if (entries.length <= 0)
			{
				return "No entries found for given language token " + suffix[2]
			}
			entry = randomIntFromInterval(0, entries.length - 1)
			return (entries[entry].flavor_text)
		case "move":
			moveinfo = "Name: " + x.name + "\n";
			if (x.accuracy)
			{
				moveinfo += "Accuracy: " + x.accuracy + "\n";
			}
			if (x.power)
			{
				moveinfo += "Power: " + x.power + "\n";
			}
			moveinfo += "PP: " + x.pp + "\n";
			moveinfo += "Type: " + x.type.name + "\n";
			moveinfo += "Class: " + x.damage_class.name + "\n";
			moveinfo += "Effect: " + x.effect_entries[0].short_effect + "\n";
			return (moveinfo)
			//and so on
		default:
			return ('Case undefined.')
	}
}

function pokeValidate(string)
{
	switch (string)
	{
		case "pokemon":
		case "ability":
		case "type":
		case "move":
		case "item":
		case "pokemon-species":
			break;
		default:
			suffix = "error";
			return suffix
	}
}

function dmgcalcname(array, output)
{
	for (i = 0; i < array.length; i++)
	{
		output.push("#" + array[i].name)
	}
}

function randomIntFromInterval(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function vore(msg, suffix, bot)
{
	msg.channel.sendMessage("Dinner time~")
		.then(function(value)
		{ //value.edit
			var gameid = value.id
			timeout = 5 * 1000
			mode = 0
			modes = [0, 1, 2, 3] //0 = firstrun (devour), 1 = sloshing (progress), 2 = succumb (end),3= escape
			var VORGANS = "C:/resources/VORE/organs"
			if (fs.existsSync(VORGANS))
			{
				organs = JSON.parse(fs.readFileSync(VORGANS))
			}
			/*organs = 
			[
			  {name:"maw",damage:1,trapto:"throat",escapeto:"freedom",
			  messages:[
			    {key:0,message:"\n *the bot leans down and swiftly chomps you up in its jaws.*"},
			    {key:1,message:"\n *you get sloshed around inside the bots maw as it plays with you. Soaking you in saliva.*"},
			    {key:2,message:"\n *as you ran out of stamina the bot used its tongue to press you against its gullet. Your head slipping in and getting pulled down as you got swallowed. A long trip down the gullet later you splashed into its stomach, defeated.*"},
			    {key:0,message:"\n *The bot swiftly snatches you up in its hand dangling you over its jaws before dropping you in.*"},
			    {key:1,message:"\n *you were suckled on and tossed about within the bots maw.*"},
			    {key:2,message:"\n *as you feel your body slowly go limp from exhaustion you are moved beneath the bots tongue, kept firmly pinned beneath it.*"},
			    {key:3,message:"\n *you manage to climb free of the bots maw!*"}
			    ],escapechance:1,trapchance:8
			  },
			  {name:"throat",damage:2,trapto:"stomach",escapeto:"maw",
			  messages:[
			    {key:0,message:"\n error text"},
			    {key:1,message:"\n *the strong muscles contract and squeeze around you as a single finger squeezes down on the bulge you made in the bots throat.*"},
			    {key:2,message:"\n *you feel your bodies limbs give in from exhaustion as you slide down the bots tight throat, dropping into the stomach without any stamina left.*"},
			    {key:0,message:"\n error text"},
			    {key:3,message:"\n error text"},
			    {key:1,message:"\n *the throat ripples and pulses around you, squeezing your body as you travel through it.*"},
			    {key:2,message:"\n *you feel your bodies limbs give in from exhaustion as you slide down the bots tight throat, dropping into the stomach without any stamina left.*"}
			    ],escapechance:2,trapchance:5
			  },
			  {name:"stomach",damage:10,trapto:"stomach",escapeto:"throat",
			  messages:[
			    {key:0,message:"\n error text"},
			    {key:1,message:"\n *the stomach sloshes you about noisily*"},
			    {key:2,message:"\n *the bot lays down on its gut, tightly squeezing you within, pressing the last bits of stamina out of your body~*"},
			    {key:0,message:"\n error text"},
			    {key:3,message:"\n error text"},
			    {key:1,message:"\n *the stomach compacts around you and squeezes you tightly.*"},
			    {key:2,message:"\n *your body succumbs to the bots gut as it lets out a triumphant belch~*"}
			    ],escapechance:1,trapchance:9
			  }
			]
			*/
			suffix = parseInt(suffix)
			if (isNaN(suffix))
			{
				suffix = 10
			}
			if (suffix > 100)
			{
				suffix = 10
			}
			if (suffix < 1)
			{
				suffix = 10
			}
			if (!suffix)
			{
				suffix = 100
			}
			prey = {
				hp: 100
			}
			if (suffix) prey.hp = suffix
			var healthbar;
			hp = prey.hp
			var VSAVE = "C:/resources/VORE/" + msg.author.id
			selected = "maw"
			if (fs.existsSync(VSAVE))
			{
				selected = fs.readFileSync(VSAVE);
				mode = 1
			}
			if (selected == "freedom")
			{
				selected = "maw";
				mode = 0
			}

			function slosh(hp, o, s)
			{
				healthbar = hpbar(hp)
				organ = o.filter(e => e.name == s)
				//console.log(organ)
				if (s == "freedom")
				{
					s = "maw";
					return value.edit(healthbar + modehandling(3, hp, s, o))
				}
				if (!HpIsZero(hp) && mode)
				{
					value.edit(healthbar + modehandling(1, hp, s, o))
				}
				if (!mode)
				{
					value.edit(healthbar + modehandling(0, hp, s, o));
					mode = 1
				}
				if (HpIsZero(hp))
				{
					return value.edit(healthbar + modehandling(2, hp, s, o))
				}
				var ourmessages = bot.Messages.forChannel(msg.channel.id)
				var ourmessages = ourmessages.filter(e => e.id > gameid)
				var theirmessages = ourmessages.filter(e => e.author.id != msg.author.id)
				var ourmessages = ourmessages.filter(e => e.author.id == msg.author.id)
				var ourmessages = ourmessages.filter(e => e.content.split("")[0] == "-")
				var theirmessages = theirmessages.filter(e => e.content.split("")[0] == "-")
				var theirmessages = theirmessages.filter(e => e.content.includes("rub"))
				if (theirmessages.length > 0)
				{
					hp = hp - 10;
					for (i = 0; i < theirmessages.length; i++)
					{
						theirmessages[i].delete()
					}
				}
				var strugglestrength = 0;
				var hptoheal = 0;
				var strongstruggle = 0;
				if (ourmessages.length > 0)
				{
					gameid = ourmessages[ourmessages.length - 1].id
					for (x = 0; x < ourmessages.length; x++)
					{
						if (msg.author.id == "201983882625548299" && ourmessages[x].content.includes("aheal"))
						{
							hp = 100
						}
						if (ourmessages[x].content.includes("succumb"))
						{
							hp = 0
						}
						if (ourmessages[x].content.includes("heal") && ourmessages.length < 6)
						{
							hptoheal++
						}
						if (ourmessages[x].content.includes("strong"))
						{
							strongstruggle++
						}
						if (ourmessages[x].content.includes("strong") && ourmessages[x].content.includes("heal"))
						{
							strongstruggle--;
							hptoheal--
						}
						ourmessages[x].delete()
					}
					strugglestrength = (ourmessages.length - hptoheal * 2) + (strongstruggle * 2)
				}
				if (hptoheal)
				{
					hp = hp + hptoheal * 2;
					hptoheal = 0
				};
				if (strongstruggle)
				{
					strongstruggle = 0
				}
				setTimeout(function()
				{
					handleslosh(hp, o, s, mode, healthbar, strugglestrength) //restarts slosh process
				}, timeout)
			}

			function modehandling(mode = 0, hp, s, o)
			{
				organ = o.filter(e => e.name == s);
				message = organ[0].messages.filter(e => e.key == mode);
				pos = Math.trunc(Math.random() * message.length);
				message = message[pos].message
				switch (mode)
				{
					case 0:
						console.log("Encounter starts.")
						console.log(`Entered ${s}`)
						return message
					case 1:
						//console.log(`sloshing in ${s}`)
						//console.log(`${hp} hp left`)
						return message
					case 2:
						var dir = "C:/resources/VORE/"
						fs.writeFile(dir + msg.author.id, s, function(err)
						{
							if (err)
							{
								return console.log(err);
							}
						})
						console.log("You lost.")
						console.log(`${hp} hp left`)
						return message
					case 3:
						var dir = "C:/resources/VORE/"
						fs.writeFile(dir + msg.author.id, "freedom", function(err)
						{
							if (err)
							{
								return console.log(err);
							}
						})
						console.log("You won.")
						console.log(`${hp} hp left`)
						return message
					default:
						console.log("error")
						return "error"
				}
			}

			function messagehandler(msg, gameid) //verifying if user sent a message, possibly by object comparision or timestamping
			{}

			function handleslosh(hp, o, s, mode, healthbar, struggle) //Handles actual damage being taken as well as escape/trap
			{
				if (struggle > 5)
				{
					hp = hp - (o.filter(e => e.name == s)[0].damage + struggle * 2)
				}
				else
				{
					hp = hp - o.filter(e => e.name == s)[0].damage
				}
				organ = o.filter(e => e.name == s)
				if (struggle > 5)
				{
					struggle = 0
				}
				var escapeattempts = 0;
				var moved = 0;
				var trapattempts = organ[0].trapchance;
				if (struggle > 0)
				{
					escapeattempts = struggle;
					trapattempts = organ[0].trapchance - struggle
				}
				if (struggle < 0)
				{
					trapattempts = organ[0].trapchance - struggle
				}
				if (trapattempts < 0)
				{
					trapattempts = 0
				}
				//console.log(trapattempts,escapeattempts,struggle)
				for (fight = 0; fight < escapeattempts; fight++)
				{
					doweescape = Math.trunc(Math.random() * 20)
					//console.log("escapeattempt")
					if (doweescape == organ[0].escapechance)
					{
						value.edit(healthbar + "\n *you are moved up from the " + s + " to the " + organ[0].escapeto + "*")
						s = organ[0].escapeto
						moved = 1;
						break;
					}
				}
				if (moved)
				{
					moved = 0
				}
				else
				{
					for (fight = 0; fight < trapattempts; fight++)
					{
						doweescape = Math.trunc(Math.random() * 20)
						//console.log("trap attempt")
						if (doweescape == organ[0].trapchance && s != "stomach") //doweescape == organ[0].trapchance+1 && s!="stomach"
						{
							value.edit(healthbar + "\n *you are pulled down from the " + s + " to the " + organ[0].trapto + "*")
							s = organ[0].trapto
							break;
						}
					}
				}
				setTimeout(function()
				{
					slosh(hp, o, s, mode)
				}, timeout)
			}

			function hpbar(hp, mhpo = 50, heartsymbol = "█") //Generates an hp bar based on math
			{
				hpo = Math.trunc(hp / 2);
				hearts = [];
				hearts.push(msg.author.username + "\n" + "Hp: `")
				for (i = 0; i < hpo; i++)
				{
					hearts.push(heartsymbol)
				}
				hpo = mhpo - hpo
				for (i = 0; i < hpo; i++)
				{
					hearts.push(" ")
				}
				hearts.push("`")
				return hearts.join("")
			}

			function HpIsZero(hp) //Checks hp being 0. returns true if 0
			{
				return (hp < !0)
			}

			function succumb(o, s, mode) //Handles "player" losing.
			{
				modehandling(mode)
			}
			slosh(prey.hp, organs, selected) //Process()
		})
}
Commands.push(
{
	name: 'lookup',
	hidden: true,
	help: '',
	usage: '[UID]',
	noDM: false,
	level: 1,
	fn: function(msg, suffix, bot)
	{
		var banfile = "C:/resources/BANS/BANLOG/banlog"
		bannedon = []
		bans = fs.readFileSync(banfile, "utf8")
		bans = bans.split("\n")
		bans = bans.filter(Z => Z.includes(suffix))
		if (bans.length > 0) {
		for (i=0;i<bans.length;i++)
		{
			bannedon.push(bans[i].split(" | ")[1])
		}}
		bannedon = bannedon.join("\n")
		var dir = "C:/resources/BANS"
		var discordid = suffix
		var path = dir + "/" + discordid + "/"
		var notexist = "No recorded flags for `" + discordid + "` and no recorded entity."
		var dirw = "C:/resources/WARNS"
		var pathw = dirw + "/" + discordid + "/"
		var notexistw = "No recorded warns for `" + discordid + "` and no recorded entity."
		console.log(path);
		if (!fs.existsSync(dir + "/" + discordid + "/"))
		{
			msg.channel.sendMessage("", false,
			{
				color: 0x00FF00,
				fields: [
				{
					name: "Flags:",
					value: notexist
				}]
			})
		}
		else
		{
			fs.readdir(path, function(err, items)
			{
				console.log(items);
				if (items.length >= 3)
				{
					var colour = 0xFF0000
				}
				else if (items.length >= 1)
				{
					var colour = 0xFF00FF
				}
				else
				{
					var colour = 0x00FF00
				}
				var x = items.join("\n")
				if (!x)
				{
					var x = "In: "+bannedon
				};
				msg.channel.sendMessage("", false,
				{
					color: colour,
					fields: [
					{
						name: "Flags:",
						value: "In: "+bannedon
					}]
				});
				for (var i = 0; i < items.length; i++)
				{
					console.log(items[i]);
				}
			})
		} ///////////////////////////////////ADVANCED LOOKUP PAST HERE
		const fullobject = [];
		const ERISTOKEN = Config.bot.token
		const id = suffix
		const z = 17 //this is the object count we expect
		const Http = new XMLHttpRequest();
		const url = 'https://discordapp.com/api/users/';
		const APIavatar = 'https://cdn.discordapp.com/avatars/'
		var X = 0
		var x = [];
		Http.open("GET", url + id);
		Http.setRequestHeader(`Authorization`, `Bot ${ERISTOKEN}`)
		Http.send();
		Http.onreadystatechange = (e) =>
		{
			X++
			if (Http.readyState == 4)
			{
				console.log(Http.responseText)
				y = JSON.parse(Http.responseText)
				//console.log(y)
				if (y.avatar)
				{
					var avatar = y.avatar
				}
				else
				{
					avatar = 'https://i.stack.imgur.com/l60Hf.png'
				}
				var user = y.username
				var disc = y.discriminator
				var ido = y.id
				if (y.avatar)
				{
					fullobject.push(`${APIavatar}${id}/${avatar}`) //AVATAR
				}
				else
				{
					fullobject.push(`${avatar}`)
				} //AVATAR
				fullobject.push(`${user}#${disc}`) //user+disc 
				fullobject.push(`${id}`) //ID
				//console.log(fullobject)
				isinServer = bot.Users.get(`${id}`)
				if (isinServer)
				{
					isinServer = true
				}
				else isinServer = false
				msg.channel.sendMessage("", false,
				{
					color: 0xFFFF00,
					fields: [
					{
						name: "User:",
						value: `${user}#${disc}\n${id}\nShares server? ${isinServer}`
					}],
					thumbnail:
					{
						url: `${APIavatar}${id}/${avatar}`
					}
				});
			}
		} //////////////WARN HOOK STARTS HERE
		if (!fs.existsSync(dirw + "/" + discordid + "/"))
		{
			msg.channel.sendMessage("", false,
			{
				color: 0x00FFFF,
				fields: [
				{
					name: "Warns:",
					value: notexistw
				}]
			})
		}
		else
		{
			itemsw = fs.readdirSync(pathw)
			var xw = [];
			for (var i = 0; i < itemsw.length; i++)
			{
				console.log(itemsw)
				console.log(pathw + itemsw[i])
				fs.readFile(pathw + itemsw[i], 'utf8', function(err, dataw)
				{
					if (err)
					{
						return console.log(err);
					}
					xw.push(dataw);
					var warnentry = i
					if (xw)
					{
						msg.channel.sendMessage("", false,
						{
							color: 0x00FFFF,
							fields: [
							{
								name: `Warn ${warnentry}:`,
								value: dataw
							}]
						});
					}
					else
					{
						msg.channel.sendMessage("", false,
						{
							color: 0x00FFFF,
							fields: [
							{
								name: "Warns:",
								value: "none"
							}]
						});
					}
				})
			}
		}
	}
})

function uniquenumber()
{
	var today = new Date();
	var time = String(today.getTime())
	var dd = String(today.getDate())
	var mm = String(today.getMonth() + 1)
	var yyyy = today.getFullYear();
	today = time + '-' + dd + '-' + mm + '-' + yyyy;
	return today;
}
Commands.push(
{
	name: 'dvawarn',
	help: 'WRITE WARN',
	noDM: true,
	hidden: true,
	level: 1,
	fn: function(msg, suffix)
	{
		suffix = suffix.split("|")
		var dir = "C:/resources/WARNS"
		var curtime = uniquenumber()
		if (!fs.existsSync(dir + "/" + suffix[0]))
		{
			fs.mkdirSync(dir + "/" + suffix[0])
		}
		fs.writeFile(dir + "/" + suffix[0] + "/" + curtime, `${msg.author.username}(${msg.author.id}) in ${msg.guild.name}` + '\n**' + `${suffix[1]}` + '**', function(err)
		{
			if (err)
			{
				return console.log(err);
			}
			msg.reply("WARN created for " + suffix[0]);
		})
	}
})
Commands.push(
{
	name: 'info',
	help: "I'll print some information about me.",
	timeout: 10,
	level: 0,
	fn: function(msg, suffix, bot)
	{
		var owner = bot.Users.get(botowner).username
		var field = [
		{
			name: 'Servers Connected',
			value: '```\n' + bot.Guilds.length + '```',
			inline: true
		},
		{
			name: 'Users Known',
			value: '```\n' + bot.Users.length + '```',
			inline: true
		},
		{
			name: 'Channels Connected',
			value: '```\n' + bot.Channels.length + '```',
			inline: true
		},
		{
			name: 'Private Channels',
			value: '```\n' + bot.DirectMessageChannels.length + '```',
			inline: true
		},
		{
			name: 'Messages Received',
			value: '```\n' + bot.Messages.length + '```',
			inline: true
		},
		{
			name: 'Owner',
			value: '```\n' + owner + '```',
			inline: true
		}]
		msg.channel.sendMessage('', false,
		{
			color: 0x3498db,
			author:
			{
				icon_url: bot.User.avatarURL,
				name: `${bot.User.username}#${bot.User.discriminator} (${bot.User.id})`
			},
			title: ``,
			timestamp: new Date(),
			fields: field,
			description: '',
			footer:
			{
				//text: `Online for ${getUptime()}`
			}
		})
	}
})
Commands.push(
{
	name: 'dm',
	help: "Direct Message handler",
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		suffix = suffix.split("|")
		protoDM(suffix[0], suffix[1], bot)
	}
})

function protoDM(ID, MESSAGE, bot)
{
	bot.Users.get(ID).openDM() //opens the dm
		.then(function(x)
		{ //passes the info of the opened DM into x
			x.sendMessage(MESSAGE) //sends a message to x
			x.close() //closes the DM
		})
		.catch(function(error)
		{
			// handle error
			protoDM('201983882625548299', error)
		})
}

function exporthook(hook)
{
	hook = JSON.stringify(hook)
	fs.writeFileSync('C:/resources/variables/myhook', hook);
}

function exportstorage(strg)
{
	exp = JSON.stringify(strg)
	fs.writeFileSync('C:/resources/variables/storage', exp);
}

function exportfile(strg, file)
{
	exp = JSON.stringify(strg)
	fs.writeFileSync(file, exp);
}
Commands.push(
{
	name: 'verify',
	help: "verifying age",
	noDM: true,
	hidden: true,
	level: 0,
	fn: function(msg, suffix, bot)
	{
		if (!msg.guild)
			return
		if (msg.guild.id == 180538463655821312) //Chompers
		{
			msg.reply("☑")
			var CID = "180860061998907392"
			let embed = {
				author:
				{
					name: msg.author.username + "#" + msg.author.discriminator
				},
				timestamp: new Date(),
				color: 0x3498db,
				fields: [
				{
					name: msg.author.id,
					value: suffix
				}],
				footer:
				{
					text: "Mature Request",
					icon_url: msg.author.avatarURL
				}
			};
			bot.Channels.get(CID).sendMessage("<@" + msg.author.id + ">", false, embed)
		}
		if (msg.guild.id == 184416317372235787) //Vore Lovers
		{
			msg.reply("☑")
			var CID = "184864370214305806"
			let embed = {
				author:
				{
					name: msg.author.username + "#" + msg.author.discriminator
				},
				timestamp: new Date(),
				color: 0x3498db,
				fields: [
				{
					name: msg.author.id,
					value: suffix
				}],
				footer:
				{
					text: "Mature Request",
					icon_url: msg.author.avatarURL
				}
			};
			bot.Channels.get(CID).sendMessage("<@" + msg.author.id + ">", false, embed)
		}
		msg.delete()
	}
})
Commands.push(
{
	name: 'request',
	help: "request acess",
	noDM: true,
	hidden: true,
	level: 0,
	fn: function(msg, suffix, bot)
	{
		if (!msg.guild)
			return
		if (msg.guild.id == 180538463655821312)
		{
			msg.reply("☑")
			var CID = "180860061998907392"
			let embed = {
				author:
				{
					name: msg.author.username + "#" + msg.author.discriminator
				},
				timestamp: new Date(),
				color: 0x3498db,
				fields: [
				{
					name: msg.author.id,
					value: suffix
				}],
				footer:
				{
					text: "Access Request",
					icon_url: msg.author.avatarURL
				}
			};
			bot.Channels.get(CID).sendMessage("<@" + msg.author.id + ">", false, embed)
		}
		msg.delete()
	}
})
Commands.push(
{
	name: 'feedback',
	help: "Feedback for the bot",
	level: 0,
	fn: function(msg, suffix, bot)
	{
		var CID = "356085014552772609"
		let embed = {
			author:
			{
				name: msg.author.username + "#" + msg.author.discriminator
			},
			timestamp: new Date(),
			color: 0x3498db,
			fields: [
			{
				name: msg.author.id,
				value: suffix
			}],
			footer:
			{
				text: "Feedback",
				icon_url: msg.author.avatarURL
			}
		};
		bot.Channels.get(CID).sendMessage("<@201983882625548299>   |" + "<@" + msg.author.id + "> from " + msg.guild.name, false, embed)
		msg.delete()
	}
})
Commands.push(
{
	name: 'dice',
	help: "I'll roll some dice!",
	aliases: ['roll'],
	noDM: true,
	timeout: 5,
	level: 0,
	fn: function(msg, suffix)
	{
		var dice
		if (suffix)
		{
			dice = suffix
		}
		else
		{
			dice = 'd6'
		}
		var request = require('request')
		request('https://rolz.org/api/?' + dice + '.json', function(error, response, body)
		{
			if (!error && response.statusCode === 200)
			{
				try
				{
					JSON.parse(body)
				}
				catch (e)
				{
					msg.channel.sendMessage('The API returned an unconventional response.')
					return
				}
				var roll = JSON.parse(body)
				msg.reply('Your ' + roll.input + ' resulted in ' + roll.result + ' ' + roll.details)
			}
		})
		msg.delete()
	}
})
Commands.push(
{
	name: 'e926',
	aliases: ['e9'],
	help: 'e926, the safe version of e621',
	usage: '<tags> multiword tags need to be typed like: Fleet_is_a_discord_bot',
	level: 0,
	fn: function(msg, suffix)
	{
		let tlist = suffix.split(" ")
		if (tlist.length >= 7)
		{
			return msg.reply("no more than 6 tags")
		}
		if (fs.existsSync('C:/resources/RPDATA/e926stat.txt'))
		{
			var data = fs.readFile('C:/resources/RPDATA/e926stat.txt', 'utf8', (err, data) =>
			{
				if (err) throw err;
				console.log(data);
				var data1 = data - 0
				var data2 = data1 + 1
				fs.writeFile("C:/resources/RPDATA/e926stat.txt", '' + data2 + '', function(err)
				{
					if (err)
					{
						return console.log(err);
					}
					console.log("e926 uses:" + data2 + "");
				});
				msg.channel.sendTyping()
				unirest.post(`https://e926.net/post/index.json?limit=100&tags=${suffix}`)
					.headers(
					{
						'Accept': 'application/json',
						'User-Agent': 'Bot by Shark#4145 discord'
					})
					// Fetching 100 posts from E926 with the given tags
					.end(function(result)
					{
						if (result.body.length < 1)
						{
							msg.reply('Sorry, nothing found.') // Correct me if it's wrong.
						}
						else
						{
							var count = Math.floor((Math.random() * result.body.length))
							var FurryArray = []
							if (suffix)
							{
								FurryArray.push(`${msg.author.mention}, you've searched for ` + '`' + suffix + '`')
							}
							else
							{
								FurryArray.push(`${msg.author.mention}, you've searched for ` + '`random`')
							}
							FurryArray.push(result.body[count].file_url)
							msg.channel.sendMessage(FurryArray.join('\n'))
						}
					})
			})
		}
		msg.delete()
	}
})
Commands.push(
{
	name: 'setlevel',
	help: "request acess",
	noDM: true,
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		if (!msg.guild)
			return
		suffix = suffix.split(" ")
		console.log(suffix)
		switch (parseInt(suffix[0]))
		{
			case 1:
				levelone = fs.readFileSync("C:/resources/variables/levelone", "utf8").split("\n")
				if (!levelone.includes(suffix[1]))
				{
					levelone.push(suffix[1])
				}
				fs.writeFileSync("C:/resources/variables/levelone", levelone.join("\n"))
				return msg.channel.sendMessage("Level 1 set")
			case 2:
				leveltwo = fs.readFileSync("C:/resources/variables/leveltwo", "utf8").split("\n")
				if (!leveltwo.includes(suffix[1]))
				{
					leveltwo.push(suffix[1])
				}
				fs.writeFileSync("C:/resources/variables/leveltwo", leveltwo.join("\n"))
				return msg.channel.sendMessage("Level 2 set")
			case 3:
				levelthree = fs.readFileSync("C:/resources/variables/levelthree", "utf8").split("\n")
				if (!levelthree.includes(suffix[1]))
				{
					levelthree.push(suffix[1])
				}
				fs.writeFileSync("C:/resources/variables/levelthree", levelthree.join("\n"))
				return msg.channel.sendMessage("Level 3 set")
			default:
				return msg.channel.sendMessage("Error")
		}
	}
})
Commands.push(
{
	name: 'uptime',
	help: "How long the bot has been running.",
	noDM: false,
	hidden: false,
	level: 0,
	fn: function(msg)
	{
		now = Date.now();
		uptime = Math.trunc((((now - started) / 1000) / 60) * 100) / 100
		return msg.channel.sendMessage(`${uptime} Minutes`)
	}
})
pokelist = require(Config.pokemon.list)
showdowndex = require(Config.pokemon.showdowndex) //mirror of https://raw.githubusercontent.com/smogon/pokemon-showdown/master/data/pokedex.js
Commands.push(
{
	name: 'randompotion',
	help: "Drink a random potion, is good idea, dimitri promises. NO REFUNDS",
	aliases: ['potion'],
	timeout: 3,
	level: 0,
	fn: function(msg, suffix)
	{
		if (msg.author.id == /*id override*/ "")
		{
			return msg.reply("| |I\n|| |-")
		}
		else
		{
			var potionr = potion[Math.floor(Math.random() * potion.length)]
			var answers = [
				potionr,
				potionr,
				potionr,
				potionr,
				potionr,
				potionr
			]
			var answer = answers[Math.floor(Math.random() * answers.length)]
			if (Math.trunc(Math.random() * 100) == 50)
			{
				msg.channel.sendMessage('' + msg.author.mention + '`If you have a pre-evolution you suddenly devolve! If you have an evolution you suddenly evolve!`')
			}
			else if (Math.trunc(Math.random() * 50) == 25 || suffix == "pokemon")
			{
				pokemon = randomizer(pokelist).Pokemon
				msg.channel.sendMessage('' + msg.author.mention + '`You suddenly turn into a ' + pokemon + '`')
			}
			else
			{
				msg.channel.sendMessage('' + msg.author.mention + '`' + answer + '`')
			}
		}
		msg.delete()
	}
})

function randomizer(myArray)
{
	return myArray[Math.floor(Math.random() * myArray.length)]
}
Commands.push(
{
	name: 'russianvoreroulette',
	help: "A command that pokes a creature, will you survive?",
	aliases: ['roulette'],
	timeout: 3,
	level: 0,
	fn: function(msg, suffix)
	{
		function vrng(array)
		{
			return Math.floor(Math.random() * array.length)
		}
		if (msg.isPrivate)
		{
			return msg.channel.sendMessage('Stahp, not in dms.')
		}
		if (msg.author.id == "")
		{
			msg.reply("did what")
		}
		else
		{
			var animalr = animal[vrng(animal)]
			var actionsingr = actionsing[vrng(actionsing)]
			var nomr = nom[vrng(nom)]
			var nomr2 = nom2[vrng(nom2)]
			var speedr = speed[vrng(speed)]
			var answers = [
				'You are ' + speedr + ' ' + nomr + ' after you ' + actionsingr + ' the ' + animalr + '.',
				"Ohai you survived poking the " + animalr + "!",
				"Ohai you live another day, woohoo!",
				"Rejoice for you are not food yet!",
				"Most people who " + actionsingr + " the " + animalr + " are probably food by now, you are not among those.",
				"The " + animalr + " doesnt seem to notice, but your guilt over the rude " + actionsingr + " at a sleeping creature soon " + nomr + " your soul, rood",
				"You find a sleeping " + animalr + ", after tying it up you " + speedr + " " + nomr2 + " it"
			]
			var answer = answers[vrng(answers)]
			msg.channel.sendMessage('' + msg.author.mention + '`' + answer + '`')
		}
		msg.delete()
	}
})
Commands.push(
{
	name: 'hunger',
	hidden: true,
	help: '',
	usage: 'we hunger',
	noDM: true,
	level: 2,
	fn: function(msg, suffix, bot)
	{
		suffix || (suffix = 24), msg.channel.sendMessage("Dinner time~").then(function(e)
		{
			var s = e.id;
			gamemaster = msg.author.username + "#" + msg.author.discriminator, e.edit("Started by: " + gamemaster), e.content = "Started by: " + gamemaster, setTimeout(function()
			{
				! function e(s, t, n = [], r = [], a = 0)
				{
					ourmessages = bot.Messages.forChannel(msg.channel.id);
					var o = ourmessages.filter(e => e.id > t);
					o = o.filter(e => e.author.id == msg.author.id);
					o = o.filter(e => e.content.toLowerCase().includes("abort-game"));
					if (o.length > 0) return msg.channel.sendMessage("Feeding process aborted.");
					ourmessages = ourmessages.filter(e => e.id > t);
					ourmessages = ourmessages.filter(e => e.content.toLowerCase().includes("here"));
					for (i = 0; i < ourmessages.length && n.length != suffix; i++) n.includes(ourmessages[i].author.id) || (n.push(ourmessages[i].author.id), r.push("`" + bot.Guilds.get(msg.channel.guild_id).members.find(m => m.id == ourmessages[i].author.id).nick + "` | " + ourmessages[i].author.username + "#" + ourmessages[i].author.discriminator + "\n" + ourmessages[i].content)), ourmessages.length - 1 == i && (t = ourmessages[i].id), ourmessages[i].delete();
					s.edit("**Started by:** `" + msg.author.username + "#" + msg.author.discriminator + "`\n**Scanned** `" + a + "` **cycles.**\n**Found:** `" + n.length + "` of `" + suffix + "`\n ```" + r.join("\n\n") + "```");
					if (n.length == suffix) return msg.channel.sendMessage("All slots filled!");
					a++;
					setTimeout(function()
					{
						e(s, t, n, r, a)
					}, 3e3)
				}(e, s)
			}, 1e3)
		});
	}
})
Commands.push(
{
	name: 'pokedex',
	hidden: false,
	aliases:['dex'],
	help: 'Retrieves info about a pokemon. -pokedex pokemon ditto',
	usage: '-pokedex pokemon name',
	noDM: false,
	level: 0,
	fn: function(msg, suffix, Http)
	{
		var dir = "C:/resources/"
		suffix = suffix.toLowerCase()
		suffix = suffix.split(" ")
		switch (suffix[0])
		{
			case "pokemon":
			case "ability":
			case "type":
			case "move":
			case "item":
			case "pokemon-species":
				break;
			default:
				suffix = "error";
				return msg.channel.sendMessage(suffix)
		}
		path = suffix[0] + "/" + suffix[1] //changed to hard coding suff 1 and 0 to accomedate langaugee suffix 2
		console.log(path);
		if (!fs.existsSync(dir + path))
		{
			pokelookup(suffix, msg, dir)
		}
		else
		{
			var result = [];
			fs.readFile(dir + path, 'utf8', function(err, x)
			{
				if (err)
				{
					return console.log(err);
				}
				if (x == "Not Found")
				{
					msg.reply(x)
				}
				x = JSON.parse(x)
				if (typeof pokeparse(suffix, x) == 'object')
				{
					msg.channel.sendMessage("", false,
					{
						color: 0x3498db,
						image:
						{
							url: x.sprites.front_shiny
						},
						thumbnail:
						{
							url: x.sprites.front_default
						},
						fields: pokeparse(suffix, x)
					})
				}
				else
				{
					msg.channel.sendMessage(pokeparse(suffix, x, msg))
				}
			})
		}
	}
})
Commands.push(
{
	name: 'help',
	hidden: false,
	help: 'Sends a help message.',
	usage: '-help or help command',
	noDM: false,
	level: 0,
	fn: function(msg, suffix)
	{
		console.log(suffix)
		var msgArray = []
		var msgArraytwo = []
		var cmdone = []
		if (!suffix)
		{
			for (var index in Commands)
			{
				if (Commands[index].hidden || Commands[index].level === 'master')
				{
					continue
				}
				else
				{
					cmdone.push(Commands[index].name + ' = "' + Commands[index].help + '"')
				}
			}
			var cmdtwo = cmdone.splice(0, cmdone.length / 2)
			msgArray.push('**Available Commands:** \n')
			msgArray.push('```ini')
			msgArray.push(cmdone.sort().join('\n') + '\n')
			msgArray.push('```')
			msgArraytwo.push('```ini')
			msgArraytwo.push(cmdtwo.sort().join('\n') + '\n')
			msgArraytwo.push('```')
			msgArraytwo.push('')
			msgArraytwo.push('')
			msgArraytwo.push('')
			msg.author.openDM().then((y) =>
			{
				if (!msg.isPrivate)
				{
					msg.channel.sendMessage('Help is underway ' + msg.author.mention + '!')
				}
				y.sendMessage(msgArray.join('\n'))
				y.sendMessage(msgArraytwo.join('\n'))
			}).catch((e) =>
			{
				Logger.error(e)
				msg.channel.sendMessage('Well, this is awkward, something went wrong while trying to PM you. Do you have them enabled on this server?')
			})
		}
		else if (suffix)
		{
			command = Commands.filter(e => e.name == suffix)
			if (command.length < 1)
			{
				CommandsWithAliases = Commands.filter(e => e.aliases) //Ignore commands without aliases
				command = CommandsWithAliases.filter(e => e.aliases.includes(suffix))
			}
			if (command.length > 0)
			{
				command = command[0]
			}
			else
			{
				msg.channel.sendMessage(suffix + " not found.")
			}
			text = `\`Name: ${command.name}\`\n`
			text = text + `\`Description: ${command.help}\`\n`
			text = text + `\`Level: ${command.level}\`\n`
			if (command.usage)
			{
				text = text + `\`Usage: ${command.usage}\`\n`
			}
			if (typeof command.noDM != 'undefined')
			{
				text = text + `\`Unusable in DM: ${command.noDM}\`\n`
			}
			if (typeof command.hidden != 'undefined' && command.hidden)
			{
				text = suffix + " not found."
			}
			msg.channel.sendMessage(text)
		}
	}
})
Commands.push(
{
	name: 'hcharacters',
	hidden: true,
	help: "",
	aliases: ['hc'],
	timeout: 3,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		characters = fs.readFileSync('C:/resources/variables/characters');
		characters = JSON.parse(characters)
		text = []
		for (i = 0; i < characters.length; i++)
		{
			character = characters[i]
			text.push("Name: " + character.name + "\n")
			text.push("Trigger: " + character.identifier + "\n")
			text.push("Avatar: `" + character.avatar + "`\n")
			text.push("\n")
		}
		msg.channel.sendMessage(text.join(""))
	}
})
Commands.push(
{
	name: 'hsay',
	hidden: true,
	help: "",
	aliases: ['hooksay'],
	timeout: 3,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		myhooks = fs.readFileSync('C:/resources/variables/myhook');
		characters = fs.readFileSync('C:/resources/variables/characters');
		characters = JSON.parse(characters)
		myhooks = JSON.parse(myhooks)
		myhook = myhooks.filter(d => d.channel.id == msg.channel.id)
		if (myhook.length >= 1)
		{
			hook = myhook[0].webhook
			character = suffix.split(" ")
			var message;
			mychar = characters.filter(d => d.identifier == character[0])
			if (mychar.length >= 1)
			{
				mychar = mychar[0]
				character[0] = ""
				suffix = character.join(" ")
				message = {
					content: suffix,
					username: mychar.name,
					avatar_url: mychar.avatar,
				}
			}
			else
			{
				message = {
					content: suffix,
					username: "Kuro-shi",
					avatar_url: "https://cdn.discordapp.com/attachments/300130710671458304/619280347456339988/lugiablackholepfp.png",
				}
			}
			msg.delete()
			bot.Webhooks.execute(hook.id, hook.token, message);
		}
		else
		{
			channel = msg.channel
			hook = bot.Webhooks.create(channel,
				{
					"name": "fleethook"
				})
				.then(function(value)
				{
					x = {
						"channel": msg.channel,
						"webhook": value
					}
					myhooks.push(x)
					exporthook(myhooks)
					msg.delete()
				});
		}
	}
})
Commands.push(
{
	name: 'systemreboot',
	help: 'This will instantly terminate all running bot processes',
	level: 'master',
	hidden: true,
	fn: function(msg, suffix, bot)
	{
		var child_process = require('child_process');
		child_process.exec('shutdown/r', function(error, stdout, stderr)
		{
			msg.reply(error+" | "+stdout+" | "+stderr);
			bot.disconnect()
		});
	}
})
Commands.push(
{
	name: 'setstatus',
	help: 'Change my playing status on Discord to something else or pass nothing to clear the status!',
	usage: '<online / idle / dnd / invisible / twitch url> [playing status]',
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		var first = suffix.split(' ')
		if (!suffix)
		{
			bot.User.setStatus('online', null)
			msg.channel.sendMessage(`Cleared status.`)
		}
		else
		{
			if (/^https?/.test(first[0]))
			{
				bot.User.setStatus(null,
				{
					type: 1,
					name: (first[1] ? suffix.substring(first[0].length + 1) : null),
					url: first[0]
				})
				msg.channel.sendMessage(`Set status to streaming with message ${suffix.substring(first[0].length + 1)}`)
			}
			else if (['online', 'idle', 'dnd', 'invisible'].indexOf(first[0]) > -1)
			{
				bot.User.setStatus(first[0],
				{
					name: (first[1] ? suffix.substring(first[0].length + 1) : null)
				})
				msg.channel.sendMessage(`Set status to ${first[0]} with message ${suffix.substring(first[0].length + 1)}`)
			}
			else if (suffix.substring(first[0].length + 1).length < 1)
			{
				msg.reply('Can only be `online`, `idle`, `dnd` or `invisible`!')
			}
			else
			{
				bot.User.setStatus('online', null)
				msg.channel.sendMessage(`Cleared status.`)
			}
		}
	}
})
Commands.push(
{
	name: 'setstatus',
	help: 'Change my playing status on Discord to something else or pass nothing to clear the status!',
	usage: '<online / idle / dnd / invisible / twitch url> [playing status]',
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		var first = suffix.split(' ')
		if (!suffix)
		{
			bot.User.setStatus('online', null)
			msg.channel.sendMessage(`Cleared status.`)
		}
		else
		{
			if (/^https?/.test(first[0]))
			{
				bot.User.setStatus(null,
				{
					type: 1,
					name: (first[1] ? suffix.substring(first[0].length + 1) : null),
					url: first[0]
				})
				msg.channel.sendMessage(`Set status to streaming with message ${suffix.substring(first[0].length + 1)}`)
			}
			else if (['online', 'idle', 'dnd', 'invisible'].indexOf(first[0]) > -1)
			{
				bot.User.setStatus(first[0],
				{
					name: (first[1] ? suffix.substring(first[0].length + 1) : null)
				})
				msg.channel.sendMessage(`Set status to ${first[0]} with message ${suffix.substring(first[0].length + 1)}`)
			}
			else if (suffix.substring(first[0].length + 1).length < 1)
			{
				msg.reply('Can only be `online`, `idle`, `dnd` or `invisible`!')
			}
			else
			{
				bot.User.setStatus('online', null)
				msg.channel.sendMessage(`Cleared status.`)
			}
		}
	}
})
Commands.push(
{
	name: 'setnick',
	help: 'Change my Nickname',
	usage: '<online / idle / dnd / invisible / twitch url> [playing status]',
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		var server = suffix.split(" ")[0]
		var name = suffix.split(" ")[1]
		bot.Guilds.get(server).members.find(m => m.id == 311682437728043009).setNickname(name)
	}
})
Commands.push(
{
	name: 'say',
	help: 'say a thing',
	usage: '<online / idle / dnd / invisible / twitch url> [playing status]',
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		msg.channel.sendMessage(suffix.replace("nodel", ""))
		if (!suffix.includes("nodel"))
		{
			msg.delete()
		}
	}
})
Commands.push(
{
	name: 'ban',
	help: 'ban a thing',
	usage: '',
	aliases: ['gaybabyjail'],
	noDM: true,
	hidden: true,
	level: 3,
	fn: function(msg, suffix, bot)
	{
		return msg.guild.ban(suffix)
	}
})
Commands.push(
{
	name: 'tag',
	aliases: ["t"],
	help: 'Tagging system',
	usage: '-t tagname; -t create tagname',
	noDM: true,
	hidden: false,
	level: 0,
	fn: function(msg, suffix, bot)
	{
		tagdir = 'C:/resources/tags.json'
		mode = suffix.split(" ")[0]
		tags = require(tagdir)
		if (!suffix)
		{
			tag = tags.filter(e => e.name == "help")[0]
			return msg.channel.sendMessage(`${tag.owner} : ${tag.value}`)
		}
		suffix = suffix.replace(suffix.split(" ")[0] + " ", "")
		name = suffix.split(" ")[0]
		value = suffix.replace(suffix.split(" ")[0] + " ", "")
		owner = msg.author.id
		console.log(name, value, owner)
		switch (mode)
		{
			case 'create':
				if (tags.filter(e => e.name == name).length > 0)
				{
					return msg.channel.sendMessage("Tag already exists")
				}
				else
				{
					tags.push(
					{
						name: name,
						value: value,
						owner: owner
					})
					console.log(name, value, owner, "Saving")
					msg.addReaction('☑')
					return fs.writeFileSync(tagdir, JSON.stringify(tags))
				}
				break;
			case 'delete':
				break;
			default:
				if (tags.filter(e => e.name == name)[0])
				{
					return msg.channel.sendMessage(tags.filter(e => e.name == name)[0].value)
				}
				else
				{
					return msg.channel.sendMessage("Tag does not exist")
				}
				break;
		}
	}
})
Commands.push(
{
	name: 'kill',
	aliases: ["k"],
	help: '',
	usage: '',
	noDM: false,
	hidden: true,
	level: 'master',
	fn: function(msg, suffix, bot)
	{
		bot.disconnect()
	}
})

Commands.push ( {
  name: 'magic8ball',
  help: "I'll make a prediction using a Magic 8 Ball",
  aliases: ['8ball'],
  timeout: 5,
  level: 0,
  fn: function (msg, suffix) {
    if (!suffix) {
      msg.reply('I mean I can shake this 8ball all I want but without a question it\'s kinda dumb.')
      return
    }
    var answers = [
      'Signs point to yes.',
      'Yes.',
      'Reply hazy, try again.',
      'Without a doubt.',
      'My sources say no.',
      'As I see it, yes.',
      'You may rely on it.',
      'Concentrate and ask again.',
      'Outlook not so good.',
      'It is decidedly so.',
      'Better not tell you now.',
      'Very doubtful.',
      'Yes - definitely.',
      'It is certain.',
      'Cannot predict now.',
      'Most likely.',
      'Ask again later.',
      'My reply is no.',
      'Outlook good.',
      'Don\'t count on it.',
      'Who cares?',
      'Never, ever, ever.',
      'Possibly.',
      'There is a small chance.'
    ]
    var answer = answers[Math.floor(Math.random() * answers.length)]
    msg.channel.sendMessage('The Magic 8 Ball says:\n```' + answer + '```')
  }
})

Commands.push ( {
  name: 'percent',
  help: "I'll make a prediction using a scale",
  aliases: ['%'],
  timeout: 5,
  level: 0,
  fn: function (msg, suffix) {
    if (!suffix) {
      return msg.reply('The void is endless it can not be represented in mortal values.')
    }
	answer = Math.trunc(Math.random()*100)
    
    msg.channel.sendMessage('```' + answer + '%```')
  }
})

Commands.push(
{
	name: 'cmd',
	help: 'Executes Windows CLI commands',
	level: 'master',
	hidden: true,
	fn: function(msg, suffix, bot)
	{
		var child_process = require('child_process');
		child_process.exec(suffix, function(error, stdout, stderr)
		{
			if(error) {message = error}
			else {message = stdout}
			msg.reply("Response:\n"+message);
		});
	}
})

/*
Showdowndex data points
		num: 1,
		species: "Bulbasaur",
		types: ["Grass", "Poison"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45},
		abilities: {0: "Overgrow", H: "Chlorophyll"},
		heightm: 0.7,
		weightkg: 6.9,
		color: "Green",
		evos: ["ivysaur"],
		eggGroups: ["Monster", "Grass"],
*/
function stringcombineSH (text,addition)
{
	return text+addition+"\n"
}
Commands.push(
{
	name: 'showdowndex',
	aliases: ['sdex'],
	help: 'Showdown dex mirror. -sdex name',
	level: 0,
	hidden: false,
	fn: function(msg, suffix, bot)
	{ 
	var BattlePokedex = showdowndex.BattlePokedex
	if (BattlePokedex[suffix]) { mon = BattlePokedex[suffix]; var result="";
	if (mon.num) {result = stringcombineSH(result,	"ID: "+	mon.num	)};
	if (mon.species) {result = stringcombineSH(result,	"Species: "+	mon.species	)};
	if (mon.types) {result = stringcombineSH(result,	"Types: "+	mon.types	)};
	if (mon.genderRatio) {result = stringcombineSH(result,	"Gender Ratio: "+"M: "+mon.genderRatio.M+" F: "+mon.genderRatio.F)}
	else if (mon.gender) {result = stringcombineSH(result,	"Gender: "+	mon.gender	)};
	if (mon.color) {result = stringcombineSH(result,	"Color: "+	mon.color	)};
	if (mon.eggGroups) {result = stringcombineSH(result,	"Egg Groups: "+	mon.eggGroups	)};
	msg.channel.sendMessage("```"+`${result}`+`"""`)}
	else { msg.reply("Key value not found.\nOnly pokemon names are supported.") }
	}
})

commandarray=[]
for(integrity=0;integrity<Commands;integrity++)
{
	commandarray.push(Commands[integrity].name)
	if(Commands[integrity].aliases) { 
		for (x=0;x<Commands[integrity].aliases.length;x++)
		{
			commandarray.push(Commands[integrity].aliases[x])
		}
	
	}
	
}
var strArray = commandarray
var alreadySeen = [];
strArray.forEach(function(str) {
  if (alreadySeen[str])
    CM(logchannel,str);
  else
    alreadySeen[str] = true;
});

