
//Get id & password
function getRegEx(id, pass)
{
  var str = id;
  var patt1 = /\d{10,11}/g;
  var id = str.match(patt1);

  var str = pass;
  var patt2 = /\w+$/g;
  var pass = str.match(patt2);

  return id,pass;
}