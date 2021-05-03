
//start with creating an event, and finding all of the dates between the event


let defaultDuration = 1.0;
function createAlarm(duration){
  chrome.alarms.create("Start Meeting", {delayInMinutes: duration});
  console.log("timer started, tab opens in 1 min");
}

chrome.runtime.onMessage.addListener((response,sender,sendResponse) => {
  console.log("got it")
  createAlarm(defaultDuration);

 
  chrome.storage.sync.get(['array'], function(result) {
    let eventsArray = result.array;
    console.log("first event:")
    console.log(`The starting date is ${eventsArray[0].startDate}`);
    console.log(`The starting time is ${eventsArray[0].startTime}`);
    console.log(new Date(`${eventsArray[0].startDate}T${eventsArray[0].startTime}`));
   
    let allEventDates =[];
    let startDate = findFirstEventDate();

    for(let i =0; i< eventsArray.length;i++){
    }
 
    function findFirstEventDate(){
      let givenStartDateIsEventDay = false;
      let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
      let start = new Date(`${eventsArray[i].startDate}T${eventsArray[i].startTime}`);
     
      let firstEventDay;  //day of the first event
      let daysDifference = 0;

      let firstEventdate;
      //ARRAY of the events days, index format
      let eventDays = eventsArray[i].days; 

      //starting day
      let givenStartDayIndex = start.getDay();
      
      for(let i = 0; i<eventDays.length;i++){
        //see if the starting date given is one of the days of the event
        if (givenStartDayIndex==eventDays[i]){
          givenStartDateIsEventDay = true;
          return start;
        }
      }

      //if startDate is NOT an eventDate- we find the next coming eventDay 
      if(!givenStartDateIsEventDay){
        //copying the eventsDays
        let tempEventDays = eventDays.slice();
        //add the start date to the event days- this will help us see where it lands
        tempEventDays.push(givenStartDateIsEventDay);
        tempEventDays.sort();

        //if the given day is the last day, i.e saturday, then the starting day is smallest index of the meeting days.
        if(Math.max(tempEventDays) == givenStartDateIsEventDay){
          //the first day is the smallest day of that week next week
          firstEventDay = Math.min(tempEventDays);
          daysDifference = 6-firstEventDay + 1;
          //increase the day by the given days difference
          function incrementStartDate(daysDifference){
            let tempDate = start.getDate();
            let tempTime = start.getTime();
          }
          
        }
        for(let i = 0; i<tempEventDays.length;i++){  
          
          else if(tempEventDays[i]==givenStartDateIsEventDay){

          }
        }
    }
    


  /////^^^^^^^^^^^^^^^^^^^^^^^^^ABOVE IS FIGURING OUT DATES OF ALL EVENTS IN A RANGE OF DATES
    //figuring out sorting our objects
    
    // for(let i =0; i<eventsArray.length;i++){
    // }
    // let sortedEventsArray = eventsArray.slice().sort((a, b) => b.startDate - a.startDate) 
    // console.log(sortedEventsArray);
    
  })

  chrome.alarms.onAlarm.addListener(function (alarm){
    if (response.todo == "penis"){
      //console.log(response.eventObject.eventName);
      chrome.tabs.create({
        url: 'https://zoom.us/wc/8032832872/join?',
        selected: false
      });
    }
  })
    //chrome.tabs.sendMessage({'response': 'test'});
});


//mute tab
function toggleMuteState(tabId) {
  chrome.tabs.get(tabId, async (tab) => {
    let muted = !tab.mutedInfo.muted;
    await chrome.tabs.update(tabId, { muted });
    console.log(`Tab ${tab.id} is ${ muted ? 'muted' : 'unmuted' }`);
  });
}


//https://zoom.us/wc/79795014853/join?


//https://us04web.zoom.us/j/8032832872?pwd=Y05JNG1TVHZ1RUF5bitsT2h0UUJhZz09


//entering name when joining a call


//inside a calls - open the chat
//document.getElementsByClassName("footer-button__button ax-outline")[2].click()


// //this will open a new tab
// chrome.runtime.onMessage.addListener((response,sender,sendResponse) => {
//   chrome.tabs.create({
//     url: 'https://giphy.com/explore/cat'
//   });
// });





// chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
//   console.log(response)
//   browser.tabs.create({
//         url: "https://giphy.com/explore/cat"
//       });
// });






// // console.log("penis");
// // function handleStartup() {
// //   
// // }

// // browser.runtime.onStartup.addListener(handleStartup);

// //Get id & password
// function getRegEx(id, pass)
// {
//   var str = id;
//   var patt1 = /\d{10,11}/g;
//   var id = str.match(patt1);

//   var str = pass;
//   var patt2 = /\w+$/g;
//   var pass = str.match(patt2);

//   return id,pass;
// }