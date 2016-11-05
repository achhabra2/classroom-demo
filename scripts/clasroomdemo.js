var Conversation = require('hubot-conversation')
const ciscospark = require(`ciscospark`)
const art101team = 'Y2lzY29zcGFyazovL3VzL1RFQU0vYzAzMTA3ZTAtYTJjMy0xMWU2LWFhZmQtZDM3MmFlMTY2ZmE5'
const history101team = 'Y2lzY29zcGFyazovL3VzL1RFQU0vYjMzODkwZDAtYTJjMy0xMWU2LTg3OTktN2JjNjM3YTJhNDZk'
const math101team = 'Y2lzY29zcGFyazovL3VzL1RFQU0vYjk2YTY5NjAtYTJjMy0xMWU2LTg3OTktN2JjNjM3YTJhNDZk'
const science101team = 'Y2lzY29zcGFyazovL3VzL1RFQU0vYzc3MjJkOTAtYTJjMy0xMWU2LWFhZmQtZDM3MmFlMTY2ZmE5'
const english101team = 'Y2lzY29zcGFyazovL3VzL1RFQU0vYWE3YmM3YTAtYTJjMy0xMWU2LWJmOWEtZTU2YmYwYzI4YWI5'

module.exports = function (robot) {

    var switchBoard = new Conversation(robot)

    robot.respond(/Join Class/, function (msg) {
        console.log("Because I don't know how to use node inspector")
        ciscospark.people.list({
          email: msg.message.user.name
        }).then((people) =>{
          var person = people.items[0]
          msg.envelope.user.name = person.displayName
        })
        var dialog = switchBoard.startDialog(msg)

        msg.send('Sure, I would love to help you with that. Please tell me the number of the class you would like to join:');
        msg.send('<b>1.</b> Art 101 <br><b>2.</b> English 101 <br><b>3.</b> History 101 <br><b>4.</b> Math 101 <br><b>4.</b> Social Science 101 <br>');
        dialog.addChoice(/1/i, function (msg2) {
            ciscospark.teamMemberships.create({
              personEmail: msg2.message.user.name,
              teamId: art101team,
              isModerator: false
            })
            .catch((reason) => {
              console.error("Did not complete adding to team")
              console.error(reason)
            })
            msg2.send('Ok great I am adding you to the Art 101 Team')
        })
        dialog.addChoice(/2/i, function (msg2) {
          ciscospark.teamMemberships.create({
            personEmail: msg2.message.user.name,
            teamId: english101team,
            isModerator: false
          })
          .catch((reason) => {
            console.error("Did not complete adding to team")
            console.error(reason)
          })
            msg2.send('Ok great I am adding you to the English 101 Team')
        })
        dialog.addChoice(/3/i, function (msg2) {
          ciscospark.teamMemberships.create({
            personEmail: msg2.message.user.name,
            teamId: history101team,
            isModerator: false
          })
          .catch((reason) => {
            console.error("Did not complete adding to team")
            console.error(reason)
          })
            msg2.send('Ok great I am adding you to the History 101 Team')
        })
        dialog.addChoice(/4/i, function (msg2) {
          ciscospark.teamMemberships.create({
            personEmail: msg2.message.user.name,
            teamId: math101team,
            isModerator: false
          })
          .catch((reason) => {
            console.error("Did not complete adding to team")
            console.error(reason)
          })
            msg2.send('Ok great I am adding you to the Math 101 Team')
        })
        dialog.addChoice(/5/i, function (msg2) {
          ciscospark.teamMemberships.create({
            personEmail: msg2.message.user.name,
            teamId: science101team,
            isModerator: false
          })
          .catch((reason) => {
            console.error("Did not complete adding to team")
            console.error(reason)
          })
            msg2.send('Ok great I am adding you to the Social Science 101 Team')
        })
    })

    robot.respond(/jump/, function (msg) {
        var dialog = switchBoard.startDialog(msg);
        msg.reply('Sure, How many times?');

        dialog.addChoice(/([0-9]+)/i, function (msg2) {
            var times = parseInt(msg2.match[1], 10);
            for (var i = 0; i < times; i++) {
                msg.emote("Jumps"); //We can use the original message too.
            }
        });
    });


  robot.respond(/.*the mission/, function (msg) {
        msg.reply('Your have 5 seconds to accept your mission, or this message will self-destruct');
        var dialog = switchBoard.startDialog(msg, 5000); //5 Second timeout
        dialog.timeout = function (msg2) {
            msg2.emote('Boom');
        }
        dialog.addChoice(/yes/i, function (msg2) {
            msg2.reply('Great! Here are the details...');
        });
    });
};
