var listOfCommands, returnRandomOutput;

returnRandomOutput = function (arr) {
    'use strict';
    var randomNum = Math.floor(Math.random() * (arr.length));
    return arr[randomNum];
};

listOfCommands = {
    noCommandFound : {
        returnStatements : [
            'Bad Command : ',
            'Guess there is a typo, no command found like ',
            'Hey, I don\'t know what that means - ',
            'Why don\'t you check the list of supported commands ? <br> By the way wrong command - '
        ],
        execute : function (wrongCommand) {
            'use strict';
            return returnRandomOutput(this.returnStatements) + wrongCommand;
        }
    },
    salutation : {
        keyWords : ['hello', 'hey', 'hi', 'hola', 'yo'],
        returnStatements : [
            'Hi !! I am Sanket Kumar, How can I help you ?',
            'Heyo!!',
            'Whatsup yo!'
        ],
        execute : function () {
            'use strict';
            return returnRandomOutput(this.returnStatements);
        }
    // },
    // messages : {
    //     keyWords : ['Who are you?', 'Tell me about yourself', 'hi', 'hola', 'yo'],
    //     returnStatements : [
    //         'I am Sanket Kumar. A graduate student at Northeastern University with 3 years of professional experience in web Development.?',
            
    //     ],
    //     execute : function () {
    //         'use strict';
    //         return returnRandomOutput(this.returnStatements);
    //     }
    }
};