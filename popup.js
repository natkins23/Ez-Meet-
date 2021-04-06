
document.getElementById("new").addEventListener('click', function () {
  
  //hide the create Event button
  let but = document.getElementById("new");
  but.hidden = true;

  //make a container div
  let container = document.getElementById("container");
  document.body.appendChild(container);

  //in div - name
  var para = document.createElement("p");
  var node = document.createTextNode("Name");
  para.appendChild(node);
  container.appendChild(para);

  //first
  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("placeholder", "First");
  container.appendChild(x);
  //last
  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("placeholder", "Last");
  container.appendChild(x);


  ////in div - zoom
  para = document.createElement("p");
  node = document.createTextNode("Zoom Meeting Info.");
  para.appendChild(node);
  container.appendChild(para);
  //link
  x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("placeholder", "https://zoom.us/wc//join?");
  container.appendChild(x);
  //password
  x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("placeholder", "Password (optional)");
  container.appendChild(x); 

  //create cancel button
  x = document.createElement("BUTTON");
  x.textContent ="Cancel";
  x.id = "cancel";
  container.appendChild(x); 

})


document.addEventListener('click',function(e){
  //delete children of div node
  if(e.target && e.target.id== 'cancel'){
      var e = document.getElementById("container");

        //e.firstElementChild can be used.
        var child = e.lastElementChild; 
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        };
    
    //reveeal createEvent button
    let but = document.getElementById("new");
    but.hidden = false;
   
   }//end if
});




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

// newEvent.addEventListener("click",e => {
//   showReadme();     
// });


// function showReadme(info, tab) {
//   let url = chrome.runtime.getURL("newevent.html");
//   chrome.tabs.create({ url });
// }
