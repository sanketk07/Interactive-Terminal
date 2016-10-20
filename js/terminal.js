var $, isAlphaNumeric, loggedInBot, $commandLine, generateCommandLine, $outputLine, $caret, checkArrayContains, writeToConsole, jsImporter, listOfCommands;

//Importing Commands
jsImporter = new AutoVersion(FileType.JAVASCRIPT, ['js/command.js']);
jsImporter.importAll();

$ = jQuery;

isAlphaNumeric = new RegExp('^[a-zA-Z0-9:]$');

loggedInBot = {
    name : undefined,
    getName : function () {
        return this.name;
    }
};

generateCommandLine = function () {
    $commandLine = '<div class="console_Line fixed-row">' +
        '<div class="ip_Label grid-cell-d-1  grid-cell-t-2  grid-cell-m-3">'+loggedInBot.getName()+'$$</div>' +
        '<div class="ip_Line grid-cell-d-11  grid-cell-t-10  grid-cell-m-9">' +
        '<span class="caret blink">&nbsp;</span>' +
        '</div>' +
        '</div>';
};

$outputLine = '<div class="console_Line fixed-row">' +
    '<div class="op_Label grid-cell-d-1  grid-cell-t-2  grid-cell-m-3">Sanket$$</div>' +
    '<div class="op_Line grid-cell-d-11  grid-cell-t-10  grid-cell-m-9">' +
    '</div>' +
    '</div>';

$caret = '<span class="caret blink">&nbsp;</span>';

checkArrayContains = function (listOfCommands, commandName) {
    'use strict';
    var key, listOfKeyWords, index, commandEntity;
    commandEntity = {
        found : false,
        keyName : undefined
    };
    if (listOfCommands && commandName) {
        for (key in listOfCommands) {
            if (listOfCommands.hasOwnProperty(key)) {
                listOfKeyWords = listOfCommands[key].keyWords;
                for (index = 0; listOfKeyWords && index < listOfKeyWords.length; index = index + 1) {
                    if (listOfKeyWords[index].toLowerCase() === commandName) {
                        commandEntity.found = true;
                        commandEntity.keyName = key;
                    }
                }
            }
        }
        return commandEntity;
    }
};

writeToConsole = function (output) {
    'use strict';
    $($(".console_Line")[$(".console_Line").length - 1]).find(".caret").remove();
    if (output) {
        $("#terminal").append($outputLine);
        $($(".op_Line")[$(".op_Line").length - 1]).html(output);
    }
    $("#terminal").append($commandLine);
};

$('body').on('keydown', function (e) {
    'use strict';
    var currentCommand, output, commandEntity;
    if (e.which === 8) {
        $($('.ip_Line')[$('.ip_Line').length - 1]).html($($('.ip_Line')[$('.ip_Line').length - 1]).text().trim().slice(0, $($('.ip_Line')[$('.ip_Line').length - 1]).text().trim().length - 1) + $caret);
    } else if (e.which === 13) {
        currentCommand = $($('.ip_Line')[$('.ip_Line').length - 1]).text().trim().toLowerCase();
        currentCommand = currentCommand.split(':')[0];
        if (!loggedInBot.name) {
            loggedInBot.name = currentCommand;
            $('.console_Line').remove();
            generateCommandLine();
            writeToConsole('Welcome, '+currentCommand);
        } else {
            commandEntity = checkArrayContains(listOfCommands, currentCommand);
            if (!commandEntity.found) {
                output = listOfCommands.noCommandFound.execute(currentCommand);
                writeToConsole(output);
            } else {
                output = listOfCommands[commandEntity.keyName].execute();
                writeToConsole(output);
            }
        }
    } else if (isAlphaNumeric.test(e.key)) {
        $($('.ip_Line')[$('.ip_Line').length - 1]).html($($('.ip_Line')[$('.ip_Line').length - 1]).text().trim() + e.key + $caret);
    }
});
