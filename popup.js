//                     DOM elements (order of HTML)
//-----------------------ON ALL PAGES----------------------------
//button
 const GO_TO_MAIN_BTN = document.getElementById("back-to-main");
 const CLEAR = document.getElementById("clear-memory");

// paras
 const WELCOME = document.getElementById("welcome");
 const COUNT_VIEW = document.getElementById("event-count-view");

//-----------------------UNIQUE PAGES-------------------------------
//----------------------------MAIN----------------------------------
 const MAIN_PAGE= document.getElementById("main-menu-page");
 const CREATE_EVENT_BTN = document.getElementById("create");
 const VIEW_EVENT_BTN = document.getElementById("view");
 const EDIT_PROFILE_BTN = document.getElementById("edit-profile");


//------------------------CREATE PROFILE----------------------------------
 const INPUT_PROFILE_PAGE = document.getElementById("input-profile-page");
 const PROFILE_INPUT_MSG = document.getElementById("profile-input-message");
 const FIRST_NAME_INPUT = document.getElementById("fname");
 const LAST_NAME_INPUT = document.getElementById("lname");
 const NICKNAME_CHECKBOX = document.getElementById("prefer-nick");
 const NICKNAME_INPUT_CONTAINER = document.getElementById("input-nick");
 const NICKNAME_INPUT = document.getElementById("nick");
 const CREATE_PROFILE_BTN = document.getElementById("create-profile");
 

//-----------------------------INPUT------------------------------------
 const INPUT_EVENTS_PAGE = document.getElementById("input-event-page");
 const INPUT_HEADER = document.getElementById("input-header");
 const EVENT_NAME_INPUT = document.getElementById("event");
 const EVENT_START_DATE_INPUT = document.getElementById("start-date");
 const EVENT_END_DATE_INPUT = document.getElementById("end-date");
 const EVENT_START_TIME_INPUT = document.getElementById("start-time");
 const EVENT_END_TIME_INPUT = document.getElementById("end-time");
 const ZOOM_LINK_INPUT = document.getElementById("link");
 const ZOOM_PASS_INPUT = document.getElementById("pass");
 const SUBMIT_BTN = document.getElementById("submit");


//---------------------------VIEW EVENTS------------------------------
 const EVENTS_PAGE = document.getElementById("events-page");

let profile = {};
let arrayOfEvents = [];
let indexOfEditingEvent = null;

//------------------page load --------------------
document.body.onload = function() {
  updateLocalProfile(profileValdiation,storeProfile,displayWelcome);
  updateLocalEvents();
};

function updateLocalProfile(valid,store,display){
  chrome.storage.sync.get(['profile'], function(result) {
    profile = result.profile;
    //profile should be empty (on first run)
    valid();
    store();
    display();
  })
}

function profileValdiation(){
  if (!profile){
    profile= {};
    console.log("No profile in storage, made a new Profile Object");
  }
  //there is a profile
  //profile exists
  if(profile.first){
    console.log("profile already existed" + profile.first);
    showMain();
    INPUT_PROFILE_PAGE.hidden = true;
  }
  //profile is empty
  else{
    console.log("profile is empty");
    FIRST_NAME_INPUT.value = "Nathan";
    LAST_NAME_INPUT.value = "Watkins";
    NICKNAME_INPUT.value = "Nate-dog";
  }
}
function storeProfile(){
  chrome.storage.sync.set({profile: profile}, function() {
   });
}

function displayWelcome(){
  if(profile.nick){
    WELCOME.textContent = "Welcome " + profile.nick + "!";
    WELCOME.hidden = false;
  }
  else if (profile.first){
    WELCOME.textContent = "Welcome " + profile.first + "!";
    WELCOME.hidden = false;
  }
  else{
    WELCOME.hidden = true;
  }
}

// ------------- profile page listeners
NICKNAME_CHECKBOX.addEventListener("click", function(){
  if(NICKNAME_CHECKBOX.checked){
    NICKNAME_INPUT_CONTAINER.hidden = false; 
    NICKNAME_INPUT.required = true;
  }
  else{
    NICKNAME_INPUT_CONTAINER.hidden = true;
    NICKNAME_INPUT.required = false;
  }
})

// ----------------- Create Profile---------------------
CREATE_PROFILE_BTN.addEventListener("click", function(){ 
  
  if(NameFilled()){
    console.log("working");
    profile.first = FIRST_NAME_INPUT.value;
    profile.last = LAST_NAME_INPUT.value;
    if (NICKNAME_CHECKBOX.checked){
      profile.nick = NICKNAME_INPUT.value;
    }
    else{
      profile.nick = null;
    }
    console.log(profile.name);
    openMain();
    storeProfile();
    displayWelcome();
    INPUT_PROFILE_PAGE.hidden = true;
    GO_TO_MAIN_BTN.hidden = true;
    
  }
})

function createProfile(){
  
}

EDIT_PROFILE_BTN.addEventListener("click",function(){
  CREATE_PROFILE_BTN.textContent = "Edit Profile";
  PROFILE_INPUT_MSG.textContent = "Editing your profile";
  //open the profile edit menu
  openProfileEdit();
})


//-----------------Create event-------------------------
CREATE_EVENT_BTN.addEventListener('click', function () {
  if(SUBMIT_BTN.textContent = "Edit Event"){
    SUBMIT_BTN.textContent = "Create Event";
  }
  openInput();
  //openInput();
  SUBMIT_BTN.hidden = false;
  //PRESET VALUES
  let tempTime =  getCurrentTime();
  let tempDate = getCurrentDate();
  EVENT_NAME_INPUT.value = "165";
  EVENT_START_DATE_INPUT.value = tempDate;
  EVENT_END_DATE_INPUT.value = tempDate;
  EVENT_START_TIME_INPUT.value  = tempTime;
  EVENT_END_TIME_INPUT.value  = tempTime;
  ZOOM_LINK_INPUT.value = "https://cccconfer.zoom.us/j/98359639686";
  ZOOM_PASS_INPUT.value = "5N#DA@";
})

// click "main" button
//----------------------------------------
GO_TO_MAIN_BTN.addEventListener('click',function(){
  openMain();
  GO_TO_MAIN_BTN.hidden = true;
  });
  

  

// click "submit" button
//creates the event
//----------------------------------------
SUBMIT_BTN.addEventListener('click', function() {
  let emptyEvent = {};
  //if we're editing an event
  if(indexOfEditingEvent){
    let eventToEdit = arrayOfEvents[indexOfEditingEvent];
    console.log(eventToEdit);
    fillObject(eventToEdit);
    openMain();
    storeEvents();
  }
  //were making a new event
  else{
    fillObject(emptyEvent);
    openMain();
    arrayOfEvents.push(emptyEvent); 
    storeEvents(); 
  }
  //input validation
  function fillObject(tempEvent){
    if(MeetingFilled() && ZoomFilled()){
      //fill up the tempEvent
      tempEvent.eventName = document.getElementById("event").value;
      tempEvent.zoomLink = document.getElementById("link").value;
      tempEvent.zoomPass = document.getElementById("pass").value;
      tempEvent.startDate = document.getElementById("start-date").value;
      tempEvent.endDate = document.getElementById("end-date").value;
      tempEvent.startTime = document.getElementById("start-time").value;
      tempEvent.endTime = document.getElementById("end-time").value;
      tempEvent.uuid = Date.now();
    }//validation
  }//end of fill Event
}); // end of sumbit





// click view listener - button - will actually be creating the DOM elements
//----------------------------------------
VIEW_EVENT_BTN.addEventListener('click',function(){
  indexOfEditingEvent = null;
  openEvents();
  //get number of events
  let arrSize = arrayOfEvents.length;
  let printedEvents = 0;
  
  //get number of dom events
  let allChildElements = EVENTS_PAGE.children;

    //loop to get the number of elements in the dom
  for(let i =0; i<allChildElements.length; i++){
    if (allChildElements[i].nodeName == "DIV"){
      printedEvents++;
    }
  }
 //if there are more events in array than in dom, create elements in DOM from the count of the elements Created in dom
  if (arrSize>printedEvents){
    for(let i = printedEvents; i<arrSize;i++){
      //pass an index to the create event function, which makes the DOM event for the event object at that index of the arrayOfEvents array.
      createEventElement(i);
    }
  }
 
 
  //must have elements when deleted, remove them selves from the array of events

  //not sure if necessary
  //updateLocalEvents(createEventElement);

  function createEventElement(index){
    let curEvent = arrayOfEvents[index];
    console.log(curEvent);
    //new event container
    let NEW_EVENT = document.createElement("div");
    EVENTS_PAGE.appendChild(NEW_EVENT);

    //Event Details
    let EVENT_NAME_PARA = document.createElement("p");
    EVENT_NAME_PARA.textContent = "Event : " + curEvent.eventName;
    NEW_EVENT.appendChild(EVENT_NAME_PARA);

    //delete Button
    let DELETE_EVENT_BTN = document.createElement("button");
    DELETE_EVENT_BTN.textContent = "x";
    EVENT_NAME_PARA.appendChild(DELETE_EVENT_BTN);
    DELETE_EVENT_BTN.addEventListener('click', function(e) {
      //remove deleted event from array of events
      arrayOfEvents.splice(index,1);
      //remove the div
      EVENTS_PAGE.removeChild(NEW_EVENT);
      //update the store array
      storeEvents();
    })

    //edit Button
    let EDIT_EVENT_BTN = document.createElement("button");
    EDIT_EVENT_BTN.textContent = "Edit";
    EVENT_NAME_PARA.appendChild(EDIT_EVENT_BTN);
    EDIT_EVENT_BTN.addEventListener('click', function() {
      SUBMIT_BTN.textContent = "Edit Event";
      hideEvents();
      showInput();
      populateInputFeilds(curEvent);
      console.log(indexOfEditingEvent);
      indexOfEditingEvent = index;
      console.log(indexOfEditingEvent);
    });
  
  //creating elements f    
  let EVENT_LINK_PARA = document.createElement("p");
  EVENT_LINK_PARA.textContent = "Zoom link: " + curEvent.zoomLink;
  NEW_EVENT.appendChild(EVENT_LINK_PARA);
  
  let EVENT_PASS_PARA = document.createElement("p");
  EVENT_PASS_PARA.textContent = "Zoom pass: " + curEvent.zoomPass;
  NEW_EVENT.appendChild(EVENT_PASS_PARA);


  let EVENT_START_DATE_PARA = document.createElement("p");
  EVENT_START_DATE_PARA.textContent = "Start Date: " + curEvent.startDate;
  NEW_EVENT.appendChild(EVENT_START_DATE_PARA);

  let EVENT_END_DATE_PARA = document.createElement("p");
  EVENT_END_DATE_PARA.textContent = "End Date: " + curEvent.endDate;
  NEW_EVENT.appendChild(EVENT_END_DATE_PARA);

  let EVENT_START_TIME_PARA = document.createElement("p");
  EVENT_START_TIME_PARA.textContent = "Start Time: " + curEvent.startTime;
  NEW_EVENT.appendChild(EVENT_START_TIME_PARA);

  let EVENT_END_TIME_PARA = document.createElement("p");
  EVENT_END_TIME_PARA.textContent ="End Time: " + curEvent.endTime;
  NEW_EVENT.appendChild(EVENT_END_TIME_PARA);

 }//end of createEventElement function
})//end of view.addEventListener

function updateEventCountHTML(){
  let eventCount = arrayOfEvents.length;
  COUNT_VIEW.textContent = "Event Count : " + eventCount; 
}  
//-----------------Events Array------------------
 function storeEvents(){
  chrome.storage.sync.set({array: arrayOfEvents}, function() {
    console.log('Array stored:' + arrayOfEvents);
    updateEventCountHTML(); 
  });

}
//will update the dom count as well as the array holding the event objects
 function updateLocalEvents(){
    chrome.storage.sync.get(['array'], function(result) {
      //if result key is undefined  
      arrayOfEvents = result.array; 
      if(!arrayOfEvents){
          arrayOfEvents = [];
        }
      updateEventCountHTML();
      console.log("Updated Local Array: ");
      console.log(arrayOfEvents);
    })
 }

//click clear memory
document.getElementById('clear-memory').addEventListener('click', clearMemory);


 function clearMemory(){
  chrome.storage.sync.remove(['array'], result => {
    console.log('array cleared');
});
chrome.storage.sync.remove(['profile'], result => {
  console.log('profile cleared' + result);
});


}
//------------------------Helpers-----------------------------------



//--------PRESET TIME FORMATTING---------------
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

function populateInputFeilds(curEvent){
  ZOOM_LINK_INPUT.value = curEvent.zoomLink;
  ZOOM_PASS_INPUT.value = curEvent.zoomPass;
  EVENT_NAME_INPUT.value = curEvent.eventName;
  EVENT_START_DATE_INPUT.value = curEvent.startDate;
  EVENT_END_DATE_INPUT.value = curEvent.endDate;
  EVENT_START_TIME_INPUT.value = curEvent.startTime;
  EVENT_END_TIME_INPUT.value = curEvent.endTime;
}



//--------------------hiding--------------------------------------

function openProfileEdit(){
  hideMain();
  INPUT_PROFILE_PAGE.hidden = false;
  GO_TO_MAIN_BTN.hidden = false;
  EDIT_PROFILE_BTN.hidden = true;
  WELCOME.hidden = true;
  COUNT_VIEW.hidden = true;
}


function openMain(){

  showMain();
  //if input is being shown - hide it
  if(!INPUT_EVENTS_PAGE.hidden){
    hideInput();
  }
  else if(!INPUT_PROFILE_PAGE.hidden){
    INPUT_PROFILE_PAGE.hidden=true;
  }
  else{
    hideEvents();
  }
}

function openInput(){
  showInput();
  //if main is being shown - hide it
  if(!MAIN_PAGE.hidden){
    hideMain();
  }
  else{
    hideEvents();
  }
}

function openEvents(){
  showEvents();
  //if main is being shown - hide it
  if(!MAIN_PAGE.hidden){
    hideMain();
  }
  else{
    hideInput();
  }
}

// ------------hiding helpers-------------------------
//main
function hideMain(){
  MAIN_PAGE.hidden = true;
  EDIT_PROFILE_BTN.hidden = true;
  WELCOME.hidden =true;
}
function showMain(){
  COUNT_VIEW.hidden =false;
  MAIN_PAGE.hidden = false;
  EDIT_PROFILE_BTN.hidden = false;
}

//input
function showInput(){
  INPUT_EVENTS_PAGE.hidden = false;
  GO_TO_MAIN_BTN.hidden = false; 
}

function hideInput(){
  GO_TO_MAIN_BTN.hidden = true;
  INPUT_EVENTS_PAGE.hidden = true;
}

//events
function showEvents(){
  EVENTS_PAGE.hidden = false;
  GO_TO_MAIN_BTN.hidden = false; 
  COUNT_VIEW.hidden = false;
}
function hideEvents(){
  EVENTS_PAGE.hidden = true;
  GO_TO_MAIN_BTN.hidden = true;
}


//-----------------Hiding Helpers Helpers

function updateViewOfCount(){
  let size = arrayOfEvents.length;
  COUNT_VIEW.textContent = "Event Count: " + size;
}





function NameFilled(){
  console.log("nameFilled is Called");
  let infoValid;
  if(FIRST_NAME_INPUT.value !="" && LAST_NAME_INPUT.value !=""){
    infoValid = true;
    if(NICKNAME_CHECKBOX.checked){
      //make sure nickname is entered
      if(NICKNAME_INPUT.value !=""){
        infoValid = true;
      }
      else{
        
        infoValid = false;
      }
    }
  }
  else{
      infoValid = false;
  }
  
    return infoValid
    
}

function MeetingFilled(){
  let infoValid;
  if(EVENT_NAME_INPUT.value !="" && EVENT_START_DATE_INPUT.value !="" && EVENT_END_DATE_INPUT.value !="" && EVENT_START_TIME_INPUT.value !="" && EVENT_END_TIME_INPUT.value !=""){
    infoValid = true;
  }
    else{
      infoValid = false;
    }
    return infoValid;

}
function ZoomFilled(){
  let infoValid;
  if(ZOOM_LINK_INPUT.value !="" && ZOOM_PASS_INPUT.value !="" && ZoomlinkLogic()){
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