const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

// 7 tests here!
it("constructor sets position and default values for mode and generatorWatts", function(){
  let rover = new Rover(98382);   
    expect(rover.position).toEqual(98382);
    expect(rover.modes).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
});

//8
it("response returned by receiveMessage contains name of message", function(){
let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
let moveCommand = new Command('MOVE', 12000);
let statusCheckCommand = new Command('STATUS_CHECK');
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK') ]; 
let message = new Message('Test message', commands);
let rover = new Rover(98382);   
let response = rover.receiveMessage(message);
expect(response.message).toEqual('Test message');
});

//9
it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
let moveCommand = new Command('MOVE', 12000);
let statusCheckCommand = new Command('STATUS_CHECK');
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK') ]; 
let message = new Message('Test message', commands);
let rover = new Rover(98382);   
let response = rover.receiveMessage(message);
expect(response.results.length).toEqual(commands.length);
});

//10
it("responds correctly to status check command", function(){ 
let rover = new Rover(98382);
let moveCommand = new Command('MOVE', 12000);
let statusCheckCommand = new Command('STATUS_CHECK');
let commands = [moveCommand, statusCheckCommand];
let message = new Message('Test message', commands);   
let response = rover.receiveMessage(message);
expect(response.results[1].roverStatus.mode).toEqual('NORMAL');
expect(response.results[1].roverStatus.position).toEqual(12000);
expect(response.results[1].roverStatus.generatorWatts).toEqual(110);
});

//11
it("responds correctly to mode change command", function(){
let rover = new Rover(98382);  
let moveCommand = new Command('MOVE', 12000);
let modeCommand1 = new Command('MODE_CHANGE', 'LOW_POWER');
let statusCheckCommand = new Command('STATUS_CHECK');
let moveCommand1 = new Command('MOVE', 12000);
let modeCommand = new Command('MODE_CHANGE', 'NORMAL');
let statusCheckCommand1 = new Command('STATUS_CHECK');
let commands = [moveCommand,modeCommand1,statusCheckCommand,moveCommand1,modeCommand,statusCheckCommand1 ];
let message = new Message('Test message', commands);
let response = rover.receiveMessage(message);
expect(response.results[0].completed).toEqual(true);
expect(response.results[2].roverStatus.mode).toEqual('LOW_POWER');
expect(response.results[3].completed).toEqual(false);
expect(response.results[5].roverStatus.mode).toEqual('NORMAL');
});

//12
it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
let rover = new Rover(98382);  
let moveCommand = new Command('MOVE', 12000);
let modeCommand1 = new Command('MODE_CHANGE', 'LOW_POWER');
let moveCommand1 = new Command('MOVE', 12000);
let statusCheckCommand = new Command('STATUS_CHECK');
let commands = [moveCommand,modeCommand1,moveCommand1,statusCheckCommand ];
let message = new Message('Test message', commands);
let response = rover.receiveMessage(message);
expect(response.results[2].completed).toEqual(false);
});

//13
it("responds with position for move command", function(){
let rover = new Rover(98382);  
let moveCommand = new Command('MOVE', 12000);
let statusCheckCommand = new Command('STATUS_CHECK');
let moveCommand1 = new Command('MOVE', 654);
let statusCheckCommand1 = new Command('STATUS_CHECK');
let commands = [moveCommand,statusCheckCommand,moveCommand1,statusCheckCommand1 ];
let message = new Message('Test message', commands);
let response = rover.receiveMessage(message);
expect(response.results[1].roverStatus.position).toEqual(12000);
expect(response.results[3].roverStatus.position).toEqual(654);
});

});