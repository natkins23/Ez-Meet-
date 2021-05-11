
// chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
//   if(message.response == 'test')
//     console.log('Got message');
// });

let micBtn = document.getElementById('mic-icon');
let videoBtn =  document.getElementById('video-icon');
let joinBtn = document.getElementById('joinBtn');
let passInput = document.getElementById('inputpasscode');
let firstLeaveBtn = document.getElementsByClassName("zmu-btn footer__leave-btn ax-outline ellipsis zmu-btn--danger zmu-btn__outline--blue")[0];
let secondLeaveBtn = document.getElementsByClassName("zmu-btn leave-meeting-options__btn leave-meeting-options__btn--default leave-meeting-options__btn--danger zmu-btn--default zmu-btn__outline--white")[0];


//if micbutton exists
if (micBtn != null){
  if(micBtn.className != "media-preview-icon media-preview-icon-mic-off"){
    micBtn.click();
  }
  else{
    console.log('mic is already off');
  }

  if(videoBtn.className != "media-preview-icon media-preview-icon-video-off"){
    setTimeout(clickVideo,2000);
  }
  else{
    console.log('video is already off');
  }
  document.getElementById('inputname').value = 'Nathan Watkins';
  document.getElementById('rememberMyNameChecked').checked = true;
  setTimeout(clickJoin,5000);
}
//if passInput exists
else if (passInput!=null) {
  setTimeout(enterPass,2000);
  document.getElementById('joinBtn').removeAttribute("disabled")
  setTimeout(clickJoin,5000);
}

//if leaveBtn exists
else if (firstLeaveBtn != null){
  //setTimeout(clickFirstLeave,3000);
  //setTimeout(clickSecondLeave,10000);
  setTimeout(window.close,3000);
}



function clickVideo(){
  videoBtn.click()
}


function clickJoin(){
  joinBtn.click();
}


function enterPass(){
  passInput.value = 'Y05JNG1TVHZ1RUF5bitsT2h0UUJhZz09';
}

function clickFirstLeave(){
  firstLeaveBtn.click();
}

function clickSecondLeave(){
  secondLeaveBtn.click();
}






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