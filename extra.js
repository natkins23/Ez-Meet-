


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