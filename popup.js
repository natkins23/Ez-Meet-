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
    NICKNAME_INPUT_CONTAINER.hidden=false; 
  }
  else{
    NICKNAME_INPUT_CONTAINER.hidden=true;
  }
})

// ----------------- Create Profile---------------------
CREATE_PROFILE_BTN.addEventListener("click", function(){ 
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
  
})




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
chrome.storage.sync.remove(['count'], result => {
  console.log('count cleared');
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
  
  zoomLinkInput.setAttribute("placeholder",curEvent.zoomLink)
  zoomPassInput.setAttribute("placeholder",curEvent.zoomPass)
  eventNameInput.setAttribute("placeholder",curEvent.eventName)
  eventDateInput.setAttribute("placeholder",curEvent.date)
  eventEndTimeInput.setAttribute("placeholder",curEvent.startTime)
  eventStartTimeInput.setAttribute("placeholder",curEvent.endTime)
}



//--------------------hiding--------------------------------------

function openMain(){

  showMain();
  //if input is being shown - hide it
  if(!INPUT_EVENTS_PAGE.hidden){
    hideInput();
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
  updateViewOfCount();
  SUBMIT_EDIT_BTN.hidden = true;
  
}

//input
function showInput(){
  INPUT_PROFILE_PAGE.hidden = false;
  GO_TO_MAIN_BTN.hidden = false; 
  SUBMIT_EDIT_BTN.hidden =true;
}
function hideInput(){
  GO_TO_MAIN_BTN.hidden = true;
  INPUT_PROFILE_PAGE.hidden = true;
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
  updateViewOfCount();
}


//-----------------Hiding Helpers Helpers

function updateViewOfCount(){
  let size = arrayOfEvents.length;
  COUNT_VIEW.textContent = "Event Count: " + size;
}
