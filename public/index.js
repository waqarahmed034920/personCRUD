function SavePerson() {
    console.log('calling save person');
}

function getAll() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:4200/person/getAll', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
      var arrData = JSON.parse(request.responseText);
      console.log('data:', arrData);
      var str = "<tr>"
    });
    request.send(null);
}

function updatePersone() {
    console.log("calling update")
}

function deletePersone() {
    console.log("calling deletePersone")
}

function deleteAll() {
    console.log("calling deleteAll")
}