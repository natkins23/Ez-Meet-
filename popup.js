//                   DOM elements (order of HTML)
//ON ALL PAGES
//button
const GO_TO_MAIN_BTN = document.getElementById("back-to-main");
const CLEAR = document.getElementById("clear-memory");
// paras
const WELCOME = document.getElementById("welcome");
const COUNT_VIEW = document.getElementById("event-count-view");
//UNIQUE PAGES
//----------------------------MAIN----------------------------------
const MAIN_PAGE= document.getElementById("main-menu-page");
const NEW_EVENT_BTN = document.getElementById("new-event");
const VIEW_EVENT_BTN = document.getElementById("view");
const EDIT_PROFILE_BTN = document.getElementById("edit-profile");
//------------------------CREATE PROFILE----------------------------------
const INPUT_PROFILE_PAGE = document.getElementById("input-profile-page");
const PROFILE_INPUT_MSG = document.getElementById("profile-input-message");
const FIRST_NAME_INPUT_FEILD = document.getElementById("fname");
const LAST_NAME_INPUT_FEILD = document.getElementById("lname");
const NICKNAME_CHECKBOX = document.getElementById("prefer-nick");
const NICKNAME_INPUT_FEILD_CONTAINER = document.getElementById("input-nick");
const NICKNAME_INPUT_FEILD = document.getElementById("nick");
const CREATE_PROFILE_BTN = document.getElementById("create-profile");
//-----------------------------INPUT------------------------------------
const INPUT_EVENTS_PAGE = document.getElementById("input-event-page");
const INPUT_HEADER = document.getElementById("input-header");
const EVENT_NAME_TEXT_FEILD = document.getElementById("event");
const EVENT_START_DATE_INPUT_FEILD = document.getElementById("start-date");
const EVENT_END_DATE_INPUT_FEILD = document.getElementById("end-date");
const EVENT_DAYS_CBOX = document.getElementById( "event-days-checkbox");
const MONDAY = document.getElementById( "monday");
const EVENT_START_TIME_INPUT = document.getElementById("start-time");
const EVENT_END_TIME_INPUT_FEILD = document.getElementById("end-time");
const ZOOM_LINK_INPUT_FEILD = document.getElementById("link");
const ZOOM_PASS_INPUT_FEILD = document.getElementById("pass");
const CREATE_NEW_EVENT_BTN = document.getElementById("new-submit");
const CREATE_EDITED_EVENT_BTN = document.getElementById("edit-submit");
//---------------------------VIEW EVENTS------------------------------
const EVENTS_PAGE = document.getElementById("events-page");
let theEvent;

//------------------page load --------------------
document.body.onload = function() {
setupProfile();
setupEvents();

//gets array
//either exists or doesnt exist
//if it exists, store it
function setupEvents(){
  chrome.storage.sync.get(['array'], function(result) {
    let eventsArray = result.array;
    //if array exists
    if (eventsArray!==undefined){
      console.log("Array existed"); 
      console.log(eventsArray);
      //update event Count
      COUNT_VIEW.textContent = "Event Count : " + eventsArray.length; 
    }
    else{
      eventsArray = [];
      storeEvents(eventsArray);
      
      
    }
  })
}

//gets profile
//either exists and goes to main
//or stores an empty profile object
function setupProfile(){
  defaultProfile = {};
  chrome.storage.sync.get({profile:defaultProfile}, function(result) {
    let profile = result.profile;
    //profile exists, go to mainMenu
    if (profile.first!==undefined){
      console.log(profile);
      updateWelcome(profile);
      gotoMainMenu();
    }
    //OR - profile DOESNT exists, and you make a temp profile
    else{
      storeProfile(profile);
      //TEST/TEMP 
      presetProfileInputs();
    }
  })
  //TEST/TEMP - preseting profile inputs for purposes of testing
  function presetProfileInputs(){
      FIRST_NAME_INPUT_FEILD.value = "Nathan";
      LAST_NAME_INPUT_FEILD.value = "Watkins";
      NICKNAME_INPUT_FEILD.value = "Nate-dog";
    }
  }//END setupProfile

}//end of onload


function updateWelcome(p){
  if(p.nick!==undefined && p.nick !=null){
    WELCOME.textContent = "Welcome " + p.nick + "!";
    
  }
  else if (p.first!==undefined){
    WELCOME.textContent = "Welcome " + p.first + "!";
  }
  else{
    console.log("ERROR THERE IS NO PROFILE! UPDATEWELCOME HAS NO PROFILE");
  }
}


// ------------- profile page listeners
NICKNAME_CHECKBOX.addEventListener("click", function(){
  if(NICKNAME_CHECKBOX.checked){
    NICKNAME_INPUT_FEILD_CONTAINER.hidden = false; 
    NICKNAME_INPUT_FEILD.required = true;
  }
  else{
    NICKNAME_INPUT_FEILD_CONTAINER.hidden = true;
    NICKNAME_INPUT_FEILD.required = false;
  }
})

EDIT_PROFILE_BTN.addEventListener("click",function(){
  chrome.storage.sync.get(['profile'], function(result) {
    profile = result.profile;
    FIRST_NAME_INPUT_FEILD.value = profile.first;
    LAST_NAME_INPUT_FEILD.value = profile.last;
    NICKNAME_INPUT_FEILD.value = profile.nick;
    //if nick picked - reveal it
    if(profile.nick){
      NICKNAME_CHECKBOX.checked = true;
      NICKNAME_INPUT_FEILD_CONTAINER.hidden = false; 
      NICKNAME_INPUT_FEILD.required = true;  
    }
    else{
      NICKNAME_CHECKBOX.checked = false; 
      NICKNAME_INPUT_FEILD_CONTAINER.hidden = true;
      NICKNAME_INPUT_FEILD.required = false;
    }
  })
  
  //currently no implementation to change these elements BACK to create instead of edit
  //this is because once a profile exists, you can only edit it anyways
  //if we offer a way to delete a profile, we then need to change it back and forth
  PROFILE_INPUT_MSG.textContent = "Editing your profile";
  CREATE_PROFILE_BTN.textContent = "Edit Profile";
  //open the profile edit menu
  gotoProfileInput();
})//END EDIT PROFILE BTN
 

//--------Creates a profile if it doesnt
CREATE_PROFILE_BTN.addEventListener("click", function(){ 
  //GETS PROFILE FROM STROAGE
  if(NameInputFilled()){
    chrome.storage.sync.get(['profile'], function(result) {
      let profile = result.profile;
      fill(profile);
      storeProfile(profile);
      updateWelcome(profile);
      gotoMainMenu();

      //------helper functions---
      function fill(p){
        p.first = FIRST_NAME_INPUT_FEILD.value;
        p.last = LAST_NAME_INPUT_FEILD.value;
        if (NICKNAME_CHECKBOX.checked){
          p.nick = NICKNAME_INPUT_FEILD.value;
        }
        else{
          p.nick = null;
        }
      }//fill

    })//sync;

  }//Name input validation

})//end CREATE PROFILE Listener


function storeProfile(p){
  chrome.storage.sync.set({profile: p}, function() {
   });
}//end store


function resetCheckbox(){
  console.log("penis");
  for(let i  = 0; i<EVENT_DAYS_CBOX.children.length;i++){
    if(EVENT_DAYS_CBOX.children[i].nodeName == "INPUT"){
      EVENT_DAYS_CBOX.children[i].checked = false;
    } 
  }
}

//-----------------CREATE NEW EVENT-------------------------
NEW_EVENT_BTN.addEventListener('click', function () {
  gotoEventInputMenu();
  


 


   //TEST - preset values - NOT IN FINAL
  let tempTime =  getCurrentTime();
  let tempDate = getCurrentDate();
  EVENT_NAME_TEXT_FEILD.value = "165";
  EVENT_START_DATE_INPUT_FEILD.value = tempDate;
  EVENT_END_DATE_INPUT_FEILD.value = tempDate;
  EVENT_DAYS_CBOX.childNodes.nodeName == "checkbox";
  EVENT_START_TIME_INPUT.value  = tempTime;
  EVENT_END_TIME_INPUT_FEILD.value  = tempTime;
  ZOOM_LINK_INPUT_FEILD.value = "https://cccconfer.zoom.us/j/98359639686";
  ZOOM_PASS_INPUT_FEILD.value = "5N#DA@";
})

// click "main" button
//----------------------------------------
GO_TO_MAIN_BTN.addEventListener('click',function(){
  gotoMainMenu();
  GO_TO_MAIN_BTN.hidden = true;
  });
  
//potential issue - adding sendtoedit property. but if the eiditing process gets canceled multiple event objects could have that property and so Check for edits wouldnt just pick the last instance if it happens multiple times.


//I NEED TO CREATE THE EVENT IN THE VIEW BUTTON OR THEY WONT SHOW UP WHEN THE PAGE RELOADS!!!!!!

///--edit event helpers
CREATE_EDITED_EVENT_BTN.addEventListener('click', function() {
  chrome.storage.sync.get(['edit','array'], function(result) {
    let eventsArray = result.array;
    let eventToEdit = result.edit;
    if(MeetingFilled() && ZoomFilled() && oneDayPicked()){
      fillObject(eventToEdit);
      updateArray(eventsArray,eventToEdit)
      storeEvents(eventsArray);
        let tempId = eventToEdit.uuid;
        console.log(eventToEdit);
        console.log("the EDITING EVENT ID" + eventToEdit.uuid);
        //find the right event
        console.log(EVENTS_PAGE.children.length);
        for(let i = 0; i<EVENTS_PAGE.children.length;i++){
          let eventDiv = EVENTS_PAGE.children[i];
          console.log("div" + eventDiv);
          console.log("div id" + eventDiv.id);
          if (eventDiv.id == tempId){
            theEvent = eventDiv.children;
           
            break;
          }
        }
          theEvent[2].textContent = "Event : " + eventToEdit.eventName;
          theEvent[3].textContent = "Start Time: " + eventToEdit.startTime;
          theEvent[4].textContent = "End Time: " + eventToEdit.endTime;
          theEvent[5].textContent = "Days: " + getDaysFromIndex(eventToEdit);
          theEvent[6].textContent = "Start Date: " + eventToEdit.startDate
          theEvent[7].textContent ="End Date: " + eventToEdit.endDate
          theEvent[8].textContent = "Zoom Link: " + eventToEdit.zoomLink
          theEvent[9].textContent = "Zoom Pass: " + eventToEdit.zoomPass
      }
    gotoEventsView();
  })//sync 

    function updateArray(a,e){
      let id = e.uuid;
       //find index of event in array through uuid.
      for(let i = 0; i<a.length;i++){
        //if the id matches
        if(a[i].uuid == id){
          //replace that element with the event argument
          a[i] = e;
        }
      }
    }
  })//create edit end

//-- reusable - for new-submit and edit-submit
function fillObject(e){
  let days = [];
    //fill up the tempEvent
    days = getDays(days);
    e.eventName = document.getElementById("event").value;
    e.zoomLink = document.getElementById("link").value;
    e.zoomPass = document.getElementById("pass").value;
    e.startDate = document.getElementById("start-date").value;
    e.endDate = document.getElementById("end-date").value;
    e.startTime = document.getElementById("start-time").value;
    e.endTime = document.getElementById("end-time").value;
    if(!e.hasOwnProperty('uuid')){
      e.uuid = Date.now();
    }
    e.days = days;

    //only used when filling an object
    function getDays(d){
      for(let i =0; i<EVENT_DAYS_CBOX.childNodes.length;i++){
        if(EVENT_DAYS_CBOX.childNodes[i].nodeName == "INPUT"){
          if(EVENT_DAYS_CBOX.childNodes[i].checked==true){
            d.push(EVENT_DAYS_CBOX.childNodes[i].value);
          }
        }
      }
      return d;
  }//getDays
  return e
}//Fill Object

function oneDayPicked(){
  for(let i =0; i<EVENT_DAYS_CBOX.childNodes.length;i++){
    if(EVENT_DAYS_CBOX.childNodes[i].nodeName == "INPUT"){
      if(EVENT_DAYS_CBOX.childNodes[i].checked==true){
        MONDAY.required = false;
        return true;
      }
    }
  }
 
  return false;
}//oneDayPicked





//------------CREATE NEW EVENT------------
//creates new elements
CREATE_NEW_EVENT_BTN.addEventListener('click', function() {
  chrome.storage.sync.get(['array'], function(result) {
    let eventsArray = result.array;
    let eventToFill = {};
    if(MeetingFilled() && ZoomFilled() && oneDayPicked()){
      console.log("passed oneDayPicked");
      let filledEvent = fillObject(eventToFill);
      eventsArray.push(filledEvent); 
      storeEvents(eventsArray);
      createEventElement(filledEvent.uuid,eventsArray);
      gotoMainMenu();
      
    } 
  })//Sync
}); //--------END OF CREATE NEW EVENT----------




//-------VIEW EVENTS------------------
//creates elements in dom
VIEW_EVENT_BTN.addEventListener('click',function(){
  gotoEventsView();
  chrome.storage.sync.get(['array'], function(result) {
    let eventsArray = result.array;
    //get number of events
    let numOfEvents = eventsArray.length;
    let printedEvents = 0;

    //get number of dom events
    let allChildElements = EVENTS_PAGE.children;

    //loop to get the number of Events Created
    for(let i =0; i<allChildElements.length; i++){
      if (allChildElements[i].nodeName == "DIV"){
        printedEvents++;
      }
    }
    //if there are more events in array than in dom, create elements in DOM from the count of the elements Created in dom
    if (numOfEvents>printedEvents){
      for(let i = printedEvents; i<numOfEvents;i++){
        createEventElement(eventsArray[i].uuid,eventsArray);
      }
    }
  })//end sync
})//----------- END VIEW EVENTS LISTENER

//i is index of the array to create
//a is the array
function createEventElement(id, a){
  //get the event we want to create
  let curEvent;
  let index;
  for(let i=0; i<a.length;i++){
    if (a[i].uuid == id){
      curEvent = a[i];
      index = i;
      break;
    }
  }
  console.log(curEvent);
  //new event container
  let NEW_EVENT = document.createElement("div");
  EVENTS_PAGE.appendChild(NEW_EVENT);
  NEW_EVENT.id = curEvent.uuid;

  //delete button
  let DELETE_EVENT_BTN = document.createElement("button");
  DELETE_EVENT_BTN.textContent = "x";
  NEW_EVENT.appendChild(DELETE_EVENT_BTN);
  DELETE_EVENT_BTN.addEventListener('click', function() {
    chrome.storage.sync.get(['array'], function(result) {
      let eventsArray = result.array;
      for(let i=0; i<eventsArray.length;i++){
        if (eventsArray[i].uuid == id){
          index = i;
          break;
        }
      }
    //remove deleted event from array of events
    //splice updates the a event
    eventsArray.splice(index,1);
    //remove the div
    EVENTS_PAGE.removeChild(NEW_EVENT);
    //update the store array
    storeEvents(eventsArray);
    })//sync
  })//Delete listener

  //edit button
  let EDIT_EVENT_BTN = document.createElement("button");
  EDIT_EVENT_BTN.textContent = "Edit";
  NEW_EVENT.appendChild(EDIT_EVENT_BTN);
  EDIT_EVENT_BTN.addEventListener('click', function() {
    gotoEventInputMenu();
    CREATE_EDITED_EVENT_BTN.hidden = false;
    CREATE_NEW_EVENT_BTN.hidden = true;
    populateInputFeilds(curEvent);
    chrome.storage.sync.set({edit: curEvent}, function() {
    });//sync
  })// edit listener

//creating elements   
let EVENT_NAME_PARA = document.createElement("p");
EVENT_NAME_PARA.textContent = "Event : " + curEvent.eventName;
EVENT_NAME_PARA.id = "event-name";
NEW_EVENT.appendChild(EVENT_NAME_PARA);

let EVENT_START_TIME_PARA = document.createElement("p");
EVENT_START_TIME_PARA.textContent = "Start Time: " + curEvent.startTime;
EVENT_START_TIME_PARA.id = "event-start-time";
NEW_EVENT.appendChild(EVENT_START_TIME_PARA);

let EVENT_END_TIME_PARA = document.createElement("p");
EVENT_END_TIME_PARA.textContent ="End Time: " + curEvent.endTime;
EVENT_END_TIME_PARA.id = "event-end-time";
NEW_EVENT.appendChild(EVENT_END_TIME_PARA);

let DAYS_OF_WEEK_PARA = document.createElement("p");
DAYS_OF_WEEK_PARA.textContent = "Days: " + getDaysFromIndex(curEvent);
DAYS_OF_WEEK_PARA.id = "event-days";
NEW_EVENT.appendChild(DAYS_OF_WEEK_PARA);


let EVENT_START_DATE_PARA = document.createElement("p");
EVENT_START_DATE_PARA.textContent = "Start Date: " + curEvent.startDate;
EVENT_START_DATE_PARA.id = "event-start-date";
NEW_EVENT.appendChild(EVENT_START_DATE_PARA);

let EVENT_END_DATE_PARA = document.createElement("p");
EVENT_END_DATE_PARA.textContent = "End Date: " + curEvent.endDate;
EVENT_END_DATE_PARA.id = "event-end-date";
NEW_EVENT.appendChild(EVENT_END_DATE_PARA);


let EVENT_LINK_PARA = document.createElement("p");
EVENT_LINK_PARA.textContent = "Zoom link: " + curEvent.zoomLink;
EVENT_LINK_PARA.id = "event-zoom-link";
NEW_EVENT.appendChild(EVENT_LINK_PARA);

let EVENT_PASS_PARA = document.createElement("p");
EVENT_PASS_PARA.textContent = "Zoom pass: " + curEvent.zoomPass;
EVENT_PASS_PARA.id = "event-zoom-pass";
NEW_EVENT.appendChild(EVENT_PASS_PARA);

}//end of createEventElement function



function getDaysFromIndex(curEvent){
  arrayOfDays = ["Saturday","Monday","Tuesday","Wednesday","Thursday","Friday","Sunday"];
  let stringOfDays = "";
  let numOfDays = curEvent.days.length;
  for(let i = 0; i < numOfDays; i++){
    dayIndex = curEvent.days[i];
    //on last day
    if(i==numOfDays-1 && numOfDays == 1){
      stringOfDays += arrayOfDays[dayIndex];
    }
    else if (i==numOfDays-1 && numOfDays > 1){
      stringOfDays += " and " + arrayOfDays[dayIndex];
    }
    else{
      stringOfDays += " " + arrayOfDays[dayIndex] + ",";
    }

    
  }
  return stringOfDays;
}



//-----------------Events Array------------------
 function storeEvents(a){
  chrome.storage.sync.set({array: a}, function() {
    console.log('Array stored:' + a);
    //updated the count we view on main page
    COUNT_VIEW.textContent = "Event Count : " + a.length; 
  });

}

//click clear memory
CLEAR.addEventListener('click', clearMemory);
//------------------------Helpers-----------------------------------

//can call in console
function clearMemory(){
  chrome.storage.sync.remove(['array'], result => {
    console.log('array cleared');
  });
  chrome.storage.sync.remove(['profile'], result => {
    console.log('profile cleared' + result);
  });

}


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
  ZOOM_LINK_INPUT_FEILD.value = curEvent.zoomLink;
  ZOOM_PASS_INPUT_FEILD.value = curEvent.zoomPass;
  EVENT_NAME_TEXT_FEILD.value = curEvent.eventName;
  EVENT_START_DATE_INPUT_FEILD.value = curEvent.startDate;
  EVENT_END_DATE_INPUT_FEILD.value = curEvent.endDate;
  EVENT_START_TIME_INPUT.value = curEvent.startTime;
  EVENT_END_TIME_INPUT_FEILD.value = curEvent.endTime;
  //populate the checkmarks
  for(let i =0; i<curEvent.days.length;i++){
      for(let j =0; j<EVENT_DAYS_CBOX.children.length;j++){
        if (EVENT_DAYS_CBOX.children[j].nodeName == "INPUT"){
        //to see if a child matches a day
        if(EVENT_DAYS_CBOX.children[j].value == curEvent.days[i]){
          EVENT_DAYS_CBOX.children[j].checked = true;
        }
      }
    }
  
  }//end for

}//end populate



//--------------------HIDING MENUS LOGIC--------------------------

//-----------------Tranitions----------------------------
//going to main
function gotoMainMenu(){
  showMain();
  hideProfileInput();
  hideInput();
  hideEvents();
}

//going to Event Input
function gotoEventInputMenu(){
  hideMain();
  hideEvents();
  showInput();
}
function gotoEventsView(){
  hideMain();
  hideInput();
  showEvents();
}

//going to ProfileInput
function gotoProfileInput(){
  hideMain();
  showProfileINput();
}

//-----------Transition Helpers-------------------------
//profile
function hideProfileInput(){
  INPUT_PROFILE_PAGE.hidden = true;
  GO_TO_MAIN_BTN.hidden = true;
  COUNT_VIEW.hidden = false;
  EDIT_PROFILE_BTN.hidden = false;
  WELCOME.hidden = false;
}
function showProfileINput(){
  INPUT_PROFILE_PAGE.hidden = false;
  GO_TO_MAIN_BTN.hidden = false;
  COUNT_VIEW.hidden = true;
  EDIT_PROFILE_BTN.hidden = true;
  WELCOME.hidden = true;
}

//main
function hideMain(){
  MAIN_PAGE.hidden = true;
  EDIT_PROFILE_BTN.hidden = true;
  WELCOME.hidden =true;
}
function showMain(){
  INPUT_PROFILE_PAGE.hidden = true;
  COUNT_VIEW.hidden =false;
  MAIN_PAGE.hidden = false;
  EDIT_PROFILE_BTN.hidden = false;
  GO_TO_MAIN_BTN.hidden = true;
  WELCOME.hidden = false;
}

//input
function showInput(){
  INPUT_EVENTS_PAGE.hidden = false;
  GO_TO_MAIN_BTN.hidden = false; 
  CREATE_NEW_EVENT_BTN.hidden = false;
}

function hideInput(){
  resetCheckbox();
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

//-------END HIDING------------------------------------------------


//------------------Validation-------------------------------
function NameInputFilled(){
  console.log("nameFilled is Called");
  let infoValid;
  if(FIRST_NAME_INPUT_FEILD.value !="" && LAST_NAME_INPUT_FEILD.value !=""){
    infoValid = true;
    if(NICKNAME_CHECKBOX.checked){
      //make sure nickname is entered
      if(NICKNAME_INPUT_FEILD.value !=""){
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
  if(EVENT_NAME_TEXT_FEILD.value !="" && EVENT_START_DATE_INPUT_FEILD.value !="" && EVENT_END_DATE_INPUT_FEILD.value !="" && EVENT_START_TIME_INPUT.value !="" && EVENT_END_TIME_INPUT_FEILD.value !=""){
    infoValid = true;
  }
    else{
      infoValid = false;
    }
    return infoValid;

}
function ZoomFilled(){
  let infoValid;
  if(ZOOM_LINK_INPUT_FEILD.value !="" && ZOOM_PASS_INPUT_FEILD.value !="" && ZoomlinkLogic()){
    infoValid = true;
  }
    else{
      infoValid = false;
    }
    return infoValid;


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
}

