//----------------------
//      Data
//----------------------


let arrayOfEvents = [];
let eventCount=0;
let printedEvents = 0;

function updateCount(){
  for(let i =0; i<arrayOfEvents.length; i++){
    eventCount = arrayOfEvents.length;
    return eventCount;
  }

}

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

//buttons
let backBtn = document.getElementById("back");
let createBtn = document.getElementById("create");
let viewBtn = document.getElementById("view");
let submitBtn = document.getElementById("submit");

//containers
let input = document.getElementById("input-fields");
let events = document.getElementById("events-container");

//----------------------
//      Functions
//----------------------

//main
function hideMain(){
  createBtn.hidden = true;
  viewBtn.hidden = true;
}
function showMain(){
  createBtn.hidden = false;
  viewBtn.hidden = false;
}

//input
function showInput(){
  input.hidden = false;
  backBtn.hidden = false; 
}
function hideInput(){
  backBtn.hidden = true;
  input.hidden = true;
}

//events
function showEvents(){
  events.hidden = false;
  backBtn.hidden = false; 
}
function hideEvents(){
  events.hidden = true;
  backBtn.hidden = true;
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
// Buttons Click Events
//----------------------


// click "create event" - (collecting input)
createBtn.addEventListener('click', function () {
  hideMain();
  showInput();

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

// click "back" button
backBtn.addEventListener('click',function(){
  console.log("penis");
  //if input is showing
  if(input.hidden == false){
    showMain();
    hideInput();
  }

  //if events are showing
  else if(events.hidden == false){
    showMain();
    hideEvents();
  }
});

// click "view" button
viewBtn.addEventListener('click',function(){
  console.log(eventCount);
  updateCount();
  console.log(eventCount);
  if(eventCount<1){
    alert("No events to view, create an event first");
  }
  else {
    hideMain();
    showEvents();
  }
  
 });


// click "submit" button
document.getElementById("submit").addEventListener('click', function() {
  //input validation
  if(NameFilled() && MeetingFilled() && ZoomFilled()){
    //make an instance
    let tempEvent = {}

    //fill up the object
    tempEvent.eventName = document.getElementById("event").value;
    tempEvent.zoomLink = document.getElementById("link").value;
    tempEvent.zoomPass = document.getElementById("pass").value;
    tempEvent.date = document.getElementById("start-date").value;
    tempEvent.startTime = document.getElementById("start-time").value;
    tempEvent.endTime = document.getElementById("end-time").value;
      
    arrayOfEvents.push(tempEvent);
    showMain();
    hideInput();
    
  }//validation
});


// function printEventDetails(){

//     let node =document.createTextNode("Event " + eventCount)
//     newForm.id = "eventForm"
//     events.appendChild(newForm)
//     newForm.appendChild(node);
    
//     para = document.createElement("p");
//     node = document.createTextNode("-----------------");
//     para.appendChild(node);
//     newForm.appendChild(para);


//     para = document.createElement("p");
//     node = document.createTextNode("Event Name " +curMeeting.eventName);
//     para.appendChild(node);
//     newForm.appendChild(para);

//     para = document.createElement("p");
//     node = document.createTextNode("Zoom link: " + curMeeting.zoomLink);
//     para.appendChild(node);
//     newForm.appendChild(para);
//     para = document.createElement("p");
//     node = document.createTextNode("Zoom pass: " + curMeeting.zoomPass);
//     para.appendChild(node);
//     newForm.appendChild(para);
    
//     //when
//     para = document.createElement("p");
//     node = document.createTextNode("Date: " + curMeeting.date);
//     para.appendChild(node);
//     newForm.appendChild(para);
//     para = document.createElement("p");
//     node = document.createTextNode("Start Time: " + curMeeting.startTime);
//     para.appendChild(node);
//     newForm.appendChild(para);
//     para = document.createElement("p");
//     node = document.createTextNode("End Time: " + curMeeting.endTime);
//     para.appendChild(node);
//     newForm.appendChild(para);


//     para = document.createElement("p");
//     node = document.createTextNode("-----------------");
//     para.appendChild(node);
//     newForm.appendChild(para);
//   }






// let newEvent = document.getElementById("create-new-event");

// newEvent.addEventListener('click', function () {
  
  
  
  // document.createElement('BUTTON');
  // text.setAttribute("type", "text");
  // text.setAttribute("id", "nodeID");
  // text.setAttribute("placeholder", "First");


    // var text1 = document.createElement('input');
    // text1.setAttribute("type", "text");
    // text1.setAttribute("id", "nodeID");
    // text1.setAttribute("placeholder", "Last");
    // var text2 = document.createElement('input');
    // text2.setAttribute("type", "text");
    // text2.setAttribute("id", "nodeID");
    // text2.setAttribute("placeholder", "Class");
    // var text3 = document.createElement('input');
    // text3.setAttribute("type", "text");
    // text3.setAttribute("id", "nodeID");
    // text3.setAttribute("placeholder", "Link");
  
  // var form = document.getElementById("form");
  // form.appendChild(text);




    // form.appendChild(text1);
    // form.appendChild(text2);
    // form.appendChild(text3);



  // var submit = document.createElement('BUTTON');
  // form.appendChild(submit);
//});


// if i want to make a new webpage - potential future
// newEvent.addEventListener("click",e => {
//   showReadme();     
// });


// function showReadme(info, tab) {
//   let url = chrome.runtime.getURL("newevent.html");
//   chrome.tabs.create({ url });
// }






