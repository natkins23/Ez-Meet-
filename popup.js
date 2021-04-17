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
 const SUBMIT_BTN = document.getElementById("submit-new");
 const SUBMIT_EDIT_BTN = document.getElementById("submit-edit");

//---------------------------VIEW EVENTS------------------------------
 const VIEW_EVENTS_PAGE = document.getElementById("view-events-page");

let profile = {};
let arrayOfEvents = [];

//------------------page load --------------------
document.body.onload = function() {
  //if there is no profile, make one
  // chrome.storage.sync.remove(['profile'], () => {
  //   console.log('profile cleared');
  // });

  updateLocalProfile(profileValdiation,storeProfile,displayWelcome);
  updateLocalEvents();
  COUNT_VIEW.hidden =false;
  //check profile object
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
  console.log("working")
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
    profile.first = FIRST_NAME_INPUT.value;
    profile.last = LAST_NAME_INPUT.value;
    if (NICKNAME_CHECKBOX.checked){
      profile.nick = NICKNAME_INPUT.value;
    }
    else{
      profile.nick = null;
    }
    openMain();
    displayWelcome();
    storeProfile();
    INPUT_PROFILE_PAGE.hidden = true;
    
  }
})

EDIT_PROFILE_BTN.addEventListener("click",function(){
  //open the profile edit menu
  hideMain();
  INPUT_PROFILE_PAGE.hidden = false;
  GO_TO_MAIN_BTN.hidden = false;
})

//-----------------Create event-------------------------
CREATE_EVENT_BTN.addEventListener('click', function () {
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
  //input validation
  if(MeetingFilled() && ZoomFilled()){
     let tempEvent = {};
    //fill up the tempEvent
    tempEvent.eventName = document.getElementById("event").value;
    tempEvent.zoomLink = document.getElementById("link").value;
    tempEvent.zoomPass = document.getElementById("pass").value;
    tempEvent.startDate = document.getElementById("start-date").value;
    tempEvent.endDate = document.getElementById("end-date").value;
    tempEvent.startTime = document.getElementById("start-time").value;
    tempEvent.endTime = document.getElementById("end-time").value;
    tempEvent.uuid = Date.now();
    
    //saveChanges();
    arrayOfEvents.push(tempEvent); 
    openMain(); 
    storeEvents();
    //reveal the number of events created

  }//validation
}); // end of sumbit





//might be obsolete if i return the value in the update function
// //set
// function storeLocal(){
//   storeProfile();
//   storeEvents();
//   storeEventsCreatedCount();
// }
// //get
// function updateLocal(){
//   updateLocalProfile();
//   updateLocalEvents();
//   updateLocalEventsCreatedCount();
// }

//-----------------Profile------------------


// async function updateLocalProfile(){
//   let myPromise = new Promise(function(myResolve) {
//     chrome.storage.sync.get(['profile'], function(result) {
//       myResolve(result.profile);
//     })
//   })
//   profile = await myPromise;
// }




  //potential async/await approach
// function updateLocalProfile(){
//   return myPromise = new Promise(function(myResolve) {
//     chrome.storage.sync.get(['profile'], function(result) {
//       console.log("in updateLocalProfile" + result.profile.penis);
//       myResolve(result.profile);
//     })
//   })
// }

// async function newProfile(){
//   profile = await updateLocalProfile();
//   console.log("in newProlfle: " + profile.penis);
// }



//-----------------Events Array------------------
 function storeEvents(){
  chrome.storage.sync.set({array: arrayOfEvents}, function() {
    console.log('Array stored:' + arrayOfEvents);
  });
}
 function updateLocalEvents(){
  chrome.storage.sync.get(['array'], function(result) {
    //if result key is undefined  
    arrayOfEvents = result.array; 
    if(!arrayOfEvents){
        arrayOfEvents = [];
      }
  });
  console.log("Updated Local Array: ");
  console.log(arrayOfEvents);
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
 function findObjectByCreatedCount(id){
  for(let i = 0; i<arrayOfEvents.length; i++){
    if(arrayOfEvents[i].countId = id){
      return i;
    }
  }
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

function populateInputFeilds(index){
  let curEvent = arrayOfEvents[index];
  
  ZOOM_LINK_INPUT.setAttribute("placeholder",curEvent.zoomLink)
  ZOOM_PASS_INPUT.setAttribute("placeholder",curEvent.zoomPass)
  EVENT_NAME_INPUT.setAttribute("placeholder",curEvent.eventName)
  EVENT_START_DATE_INPUT.setAttribute("placeholder",curEvent.startDate)
  EVENT_END_DATE_INPUT.setAttribute("placeholder",curEvent.endDate)
  EVENT_START_TIME_INPUT.setAttribute("placeholder",curEvent.startTime)
  EVENT_END_TIME_INPUT.setAttribute("placeholder",curEvent.endTime)
}



//--------------------hiding--------------------------------------

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
}
function showMain(){
  MAIN_PAGE.hidden = false;
  //updateViewOfCount();  
}

//when i want to hided eidt
//SUBMIT_EDIT_BTN.hidden = true;

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
  VIEW_EVENTS_PAGE.hidden = false;
  GO_TO_MAIN_BTN.hidden = false; 
  SUBMIT_EDIT_BTN.hidden = true;
  COUNT_VIEW.hidden = false;
}
function hideEvents(){
  VIEW_EVENTS_PAGE.hidden = true;
  GO_TO_MAIN_BTN.hidden = true;
  //updateViewOfCount();
}


//-----------------Hiding Helpers Helpers

function updateViewOfCount(){
  let size = arrayOfEvents.length;
  COUNT_VIEW.textContent = "Event Count: " + size;
}





function NameFilled(){
  let infoValid;
  if(FIRST_NAME_INPUT.value !="" && LAST_NAME_INPUT.value !=""){
    infoValid = true;
    if(NICKNAME_CHECKBOX){
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