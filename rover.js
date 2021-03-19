class Rover {
  constructor(position,){
    this.position = position;
    this.modes = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message){
let objResultsMODE_CHANGE = {};
let objResultsMOVE = {};
let objResultsSTATUS_CHECK = {};
let arrResults = [];
let objRover;
let objModeValue;
let objPosValue;

function fnResponseUpdate(pos,mod)
{
 // console.log('mod',mod)
  //console.log('pos',pos)
  if(pos !='')
  {
      if(mod !='LOW_POWER')
      {
            //console.log('pospos');
          objRover = new Rover(pos);
          objRover.position = pos;
      }
  }
  if(mod !='' && typeof mod !== 'undefined')
  {
     // console.log('modmod');
      objRover = new Rover();
      if(mod ==='LOW_POWER')
      {
           objRover.modes = mod;
           objRover.position = objPosValue;
      }
      else
      {
        if(objPosValue === pos)
        {
          objRover.position = objPosValue;
        }
        else
        {
          objRover.position = pos;
        }
      }
  }
  return objRover;
}

for (let i=0;i<message.commands.length;i++)
{
  if(message.commands[i].commandType==='MODE_CHANGE')
  {
    let objMode;
    if(message.commands[i].value ==='LOW_POWER')
    {
      objMode = fnResponseUpdate(objPosValue,message.commands[i].value);
    }
    else
    {
      objMode = fnResponseUpdate(objPosValue,message.commands[i].value);
    }
    objModeValue = objMode.modes;
   // console.log(i,'mode',objMode);
    objResultsMODE_CHANGE["completed"] = true;
    arrResults.push(objResultsMODE_CHANGE);
  }
  else if(message.commands[i].commandType==='MOVE')
  {
    let arrMove = [];
    let objMove = fnResponseUpdate(message.commands[i].value,objModeValue);
     objPosValue = objMove.position;
   // console.log(i,'move',objMove);
    objModeValue = objMove.modes;
    if(objModeValue==='NORMAL')
    {
      objResultsMOVE["completed"] = true;
       arrMove[0] = objResultsMOVE;
    }
    else
    {
      objResultsMOVE["completed"] = false;
       arrMove[0] = objResultsMOVE;
    }
   
    //arrResults.push(arrMove[0] );
    arrResults.push(Object.assign({},arrMove[0]));
  //  console.log('arrResults[i]',arrMove[0]);
  }
  else if(message.commands[i].commandType==='STATUS_CHECK')
  {
    let objroverStatus = {
      mode: objRover.modes,
      generatorWatts: this.generatorWatts,
      position: objRover.position
    }
objPosValue = objroverStatus.position;
//console.log(i,'sts',objroverStatus);

    objResultsSTATUS_CHECK["completed"] = true;
    objResultsSTATUS_CHECK["roverStatus"] = objroverStatus;
    //arrResults[i] = objResultsSTATUS_CHECK;
    //arrResults.push(objResultsSTATUS_CHECK);
    arrResults.push(Object.assign({},objResultsSTATUS_CHECK));
     //arrResults[i]["completed"] = false;
  }
//arrResults.push(objResults);

}
//console.log(arrResults);
let objReceiveMessage = {
  message:message.name,
  results: arrResults
};

//console.log(arrResults);
    return objReceiveMessage;
  }
};
/*
let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);
let rover = new Rover(98382);    // Passes 98382 as the rover's position.
let response = rover.receiveMessage(message);
*/

module.exports = Rover;