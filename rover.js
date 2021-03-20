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

function fnResponseUpdate(positionValue,modeValue)
{
 if(positionValue !='')
  {
    if(modeValue !='LOW_POWER')
    {
      objRover = new Rover(positionValue);
      objRover.position = positionValue;
    }
  }
 if(modeValue !='' && typeof modeValue !== 'undefined')
  {
   objRover = new Rover();
   if(modeValue ==='LOW_POWER')
    {
     objRover.modes = modeValue;
     objRover.position = objPosValue;
    }
    else
    {
    if(objPosValue === positionValue)
     {
      objRover.position = objPosValue;
     }
    else
     {
      objRover.position = positionValue;
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
  objResultsMODE_CHANGE["completed"] = true;
  arrResults.push(objResultsMODE_CHANGE);
 }
 else if(message.commands[i].commandType==='MOVE')
  {
   let arrMove = [];
   let objMove = fnResponseUpdate(message.commands[i].value,objModeValue);
   objPosValue = objMove.position;
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
    arrResults.push(Object.assign({},arrMove[0]));
  }
 else if(message.commands[i].commandType==='STATUS_CHECK')
  {
    let objroverStatus = {
      mode: objRover.modes,
      generatorWatts: this.generatorWatts,
      position: objRover.position
    }
   objPosValue = objroverStatus.position;
   objResultsSTATUS_CHECK["completed"] = true;
   objResultsSTATUS_CHECK["roverStatus"] = objroverStatus;
   arrResults.push(Object.assign({},objResultsSTATUS_CHECK));
  }
}

let objReceiveMessage = {
  message:message.name,
  results: arrResults
};
  return objReceiveMessage;
 }
};

module.exports = Rover;