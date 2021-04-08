//----------------------
//      Data
//----------------------


let arrayOfEvents = [];
let eventsCreatedCount = 0;
let printedEvents = 0;
let indexOfEditingEvent = null;


//----------------------
//      Elements
//----------------------

//input
let firstNameInput = document.getElementById("fname");
let lastNameInput = document.getElementById("lname");
let zoomLinkInput = document.getElementById("link");
let zoomPassInput = document.getElementById("pass");
let eventNameInput = document.getElementById("event");
let eventDateInput = document.getElementById("start-date");
let eventEndTimeInput = document.getElementById("start-time");
let eventStartTimeInput = document.getElementById("end-time");

let countDiv = document.getElementById("eventCount");

//buttons
let mainBtn = document.getElementById("main");
let createBtn = document.getElementById("create");
let viewBtn = document.getElementById("view");
let submitBtn = document.getElementById("submit");
let commitEditBtn = document.getElementById("edit");


//containers
let inputContainer = document.getElementById("input-fields");
let eventsContainer = document.getElementById("all-events");

//----------------------
//      Functions
//----------------------




//---------------------
//       helpers
//----------------------
function findObjectByCreatedCount(id){
  for(let i = 0; i<arrayOfEvents.length; i++){
    if(arrayOfEvents[i].countId = id){
      return i;
    }
  }
}

//main
function hideMain(){
  createBtn.hidden = true;
  viewBtn.hidden = true;
}
function showMain(){
  createBtn.hidden = false;
  viewBtn.hidden = false;
  updateViewOfCount();
  commitEditBtn.hidden = true;
}

//input
function showInput(){
  inputContainer.hidden = false;
  mainBtn.hidden = false; 
  commitEditBtn.hidden =true;
}
function hideInput(){
  mainBtn.hidden = true;
  inputContainer.hidden = true;
}

//events
function showEvents(){
  eventsContainer.hidden = false;
  mainBtn.hidden = false; 
  commitEditBtn.hidden = true;
  countDiv.hidden = false;
}
function hideEvents(){
  eventsContainer.hidden = true;
  mainBtn.hidden = true;
  updateViewOfCount();
}


//PRESET TIME FORMATTING
function getCurrentDate(){
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today; 
}

function getCurrentTime(){
  let today = new Date();
  let hour = String(today.getHours()).padStart(2, '0');
  let minute =  String(today.getMinutes()).padStart(2, '0');
  let time = hour + ":" + minute;
  return time;
}

//  Input Validation

function NameFilled(){
  let infoValid;
  if(firstNameInput.value !="" && lastNameInput.value !=""){
    infoValid = true;
  }
    else{
      infoValid = false;
    }
    return infoValid
}
function MeetingFilled(){
  let infoValid;
  if(eventNameInput.value !="" && eventDateInput.value !="" && eventStartTimeInput.value !="" && eventEndTimeInput.value !=""){
    infoValid = true;
  }
    else{
      infoValid = false;
    }
    return infoValid;

}
function ZoomFilled(){
  let infoValid;
  if(zoomLinkInput.value !="" && zoomPassInput.value !="" && ZoomlinkLogic()){
    infoValid = true;
  }
    else{
      infoValid = false;
    }
    return infoValid;
}

//logic for zoom link not large enough
function ZoomlinkLogic(){
  // console.log("PENISSSSSSSSSSSSS");
  // let infoValid;
  // if ((link.value.length < 50) && pass.value == ""){
  //   alert("Link not long enough, enter a link with a password or enter a password")
  //   infoValid = false;
  // } 
  // else{
  //   infoValid = true;
  // }
  // return infoValid;
  return true;
}


//----------------------
// eventListeners
//----------------------


// click "create event" - (collecting input)
//----------------------------------------
createBtn.addEventListener('click', function () {
  hideMain();
  showInput();
  submitBtn.hidden =false;

  //PRESET VALUES
  let tempTime =  getCurrentTime();
  let tempDate = getCurrentDate();
  firstNameInput.value = "Nathan";
  lastNameInput.value = "Watkins";
  eventNameInput.value = "165";
  eventDateInput.value = tempDate;
  eventStartTimeInput.value  = tempTime;
  eventEndTimeInput.value  = tempTime;
  zoomLinkInput.value = "https://cccconfer.zoom.us/j/98359639686";
  zoomPassInput.value = "5N#DA@";
})

// click "main" button
//----------------------------------------
mainBtn.addEventListener('click',function(){
  //if input is showing
  if(inputContainer.hidden == false){
    showMain();
    hideInput();
    indexOfEditingEvent = null;
  }

  //if events are showing
  else if(eventsContainer.hidden == false){
    showMain();
    hideEvents();    
  }
  
});

// click "view" button
//----------------------------------------
viewBtn.addEventListener('click',function(){
  if(arrayOfEvents.length==0){
    alert("No events to view, create an event first");
  }
  else {
    hideMain();
    showEvents();
  }

  
 });


function updateViewOfCount(){
  let size = arrayOfEvents.length;
  countDiv.textContent = "Event Count: " + size;
}


// click "submit" button
//creates the event
//----------------------------------------
document.getElementById("submit").addEventListener('click', function() {
  //input validation
  if(NameFilled() && MeetingFilled() && ZoomFilled()){
    //make an instance
    eventsCreatedCount++;
    let tempEvent = {};

    //fill up the object
    tempEvent.eventName = document.getElementById("event").value;
    tempEvent.zoomLink = document.getElementById("link").value;
    tempEvent.zoomPass = document.getElementById("pass").value;
    tempEvent.date = document.getElementById("start-date").value;
    tempEvent.startTime = document.getElementById("start-time").value;
    tempEvent.endTime = document.getElementById("end-time").value;
    tempEvent.countId = eventsCreatedCount;
      
    arrayOfEvents.push(tempEvent); 
    createEvent(eventsCreatedCount);
    showMain();
    hideInput();
    
  }//validation
}); // emd pf sin,ot



function createEvent(lecount){
let theIndex;
  for(let i =0; i<arrayOfEvents.length;i++){
    if(arrayOfEvents[i].countId==lecount){
      theIndex =i;
    }
  }
  let curEvent = arrayOfEvents[theIndex];
  
  //event container
  let newEvent = document.createElement("div");
  let eventId = "event-" + eventsCreatedCount;
  
  //make the event id a number
  newEvent.id = eventId;
  eventsContainer.appendChild(newEvent);


  //Event Details
  let eventNamePara = document.createElement("p");
  eventNamePara.textContent = "Event : " + curEvent.eventName;
  newEvent.appendChild(eventNamePara);

  //delete Button
  let eventDeleteBtn = document.createElement("button");
  eventDeleteBtn.textContent = "x";
  eventNamePara.appendChild(eventDeleteBtn);
  eventDeleteBtn.addEventListener('click', function(e) {
    //find index of event object we're deleting
    let indexOfEvent = findObjectByCreatedCount(eventsCreatedCount);
    //remove deleted event from array of events
    arrayOfEvents.splice(indexOfEvent,1);
    //remove the div
    eventsContainer.removeChild(newEvent);
    updateViewOfCount();
  });
  

   //edit Button
   let eventEditBtn = document.createElement("button");
   eventEditBtn.textContent = "Edit";
   eventNamePara.appendChild(eventEditBtn);
   eventEditBtn.addEventListener('click', function() {
     hideEvents();
     showInput();
     submitBtn.hidden = true;
     commitEditBtn.hidden = false;
     let indexOfEvent = findObjectByCreatedCount(eventsCreatedCount);
     populateInputFeilds(indexOfEvent);
     indexOfEditingEvent = indexOfEvent;
   });

   // final edit button press
  commitEditBtn.addEventListener("click",function(){
    console.log(indexOfEditingEvent);

    //updating object
    let updatingEvent = arrayOfEvents[indexOfEditingEvent];
    updatingEvent.eventName = document.getElementById("event").value;
    updatingEvent.zoomLink = document.getElementById("link").value;
    updatingEvent.zoomPass = document.getElementById("pass").value;
    updatingEvent.date = document.getElementById("start-date").value;
    updatingEvent.startTime = document.getElementById("start-time").value;
    updatingEvent.endTime = document.getElementById("end-time").value; 

    //updating text on event view page
    //create the id of the div
    //remove all of the p's
    let tempDivEventId = "event-"+updatingEvent.countId;
    let parent = document.getElementById(tempDivEventId);
    let child  =parent.lastElementChild;
    while (child) {
        parent.removeChild(child);
        child = parent.lastElementChild;
    };
    
      //Event Details
  let eventNamePara = document.createElement("p");
  eventNamePara.textContent = "Event : " + curEvent.eventName;
  newEvent.appendChild(eventNamePara);

  //delete Button
  let eventDeleteBtn = document.createElement("button");
  eventDeleteBtn.textContent = "x";
  eventNamePara.appendChild(eventDeleteBtn);
  eventDeleteBtn.addEventListener('click', function(e) {
    //find index of event object we're deleting
    let indexOfEvent = findObjectByCreatedCount(eventsCreatedCount);
    //remove deleted event from array of events
    arrayOfEvents.splice(indexOfEvent,1);
    //remove the div
    eventsContainer.removeChild(newEvent);
    updateViewOfCount();
  });
  

   //edit Button
   let eventEditBtn = document.createElement("button");
   eventEditBtn.textContent = "Edit";
   eventNamePara.appendChild(eventEditBtn);
   eventEditBtn.addEventListener('click', function() {
     hideEvents();
     showInput();
     submitBtn.hidden = true;
     commitEditBtn.hidden = false;
     let indexOfEvent = findObjectByCreatedCount(eventsCreatedCount);
     populateInputFeilds(indexOfEvent);
     indexOfEditingEvent = indexOfEvent;
   });


    let eventLinkPara = document.createElement("p");
    eventLinkPara.textContent = "Zoom link: " + curEvent.zoomLink;
    newEvent.appendChild(eventLinkPara);
    
  
    let eventPassPara = document.createElement("p");
    eventPassPara.textContent = "Zoom pass: " + curEvent.zoomPass;
    newEvent.appendChild(eventPassPara);
  
  
    let eventDatePara = document.createElement("p");
    eventDatePara.textContent = "Date: " + curEvent.date;
    newEvent.appendChild(eventDatePara);
  
    let eventStartTimePara = document.createElement("p");
    eventStartTimePara.textContent = "Start Time: " + curEvent.startTime;
    newEvent.appendChild(eventStartTimePara);
  
    let eventEndTimePara = document.createElement("p");
    eventEndTimePara.textContent ="End Time: " + curEvent.endTime;
    newEvent.appendChild(eventEndTimePara);


    

    hideInput();
    showEvents();
    

  }) //end of create
  
  function populateInputFeilds(index){
    let curEvent = arrayOfEvents[index];
    
    zoomLinkInput.setAttribute("placeholder",curEvent.zoomLink)
    zoomPassInput.setAttribute("placeholder",curEvent.zoomPass)
    eventNameInput.setAttribute("placeholder",curEvent.eventName)
    eventDateInput.setAttribute("placeholder",curEvent.date)
    eventEndTimeInput.setAttribute("placeholder",curEvent.startTime)
    eventStartTimeInput.setAttribute("placeholder",curEvent.endTime)
  }

  
  let eventLinkPara = document.createElement("p");
  eventLinkPara.textContent = "Zoom link: " + curEvent.zoomLink;
  newEvent.appendChild(eventLinkPara);
  

  let eventPassPara = document.createElement("p");
  eventPassPara.textContent = "Zoom pass: " + curEvent.zoomPass;
  newEvent.appendChild(eventPassPara);


  let eventDatePara = document.createElement("p");
  eventDatePara.textContent = "Date: " + curEvent.date;
  newEvent.appendChild(eventDatePara);

  let eventStartTimePara = document.createElement("p");
  eventStartTimePara.textContent = "Start Time: " + curEvent.startTime;
  newEvent.appendChild(eventStartTimePara);

  let eventEndTimePara = document.createElement("p");
  eventEndTimePara.textContent ="End Time: " + curEvent.endTime;
  newEvent.appendChild(eventEndTimePara);
}







