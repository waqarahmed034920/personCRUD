
function getAll() {
    document.getElementById('btnupdate').style.display = 'none';
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/person/getAll', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
        var arrData = JSON.parse(request.responseText);

        var tbody = document.getElementById('datagrid');
        tbody.innerHTML = '';

        arrData.forEach(function (item) {
            var str = "<tr><td>" + item.id
                + "</td><td>" + item.firstName
                + "</td><td>" + item.lastName
                + "</td><td>" + item.address
                + "</td><td>" + item.email
                + "</td><td>" + item.phone
                + "</td><td><button type='button' class='btn btn-primary btn-sm' onClick='onEditClick(" + JSON.stringify(item)
                + ")'>Edit</button></td><td><button type='button' class='btn btn-primary btn-sm' onClick='onDeleteClick(" + item.id
                + ")'>Delete</button></td></tr>";

            tbody.innerHTML = tbody.innerHTML + str;

        });
    });

    request.send(null);
}

function onEditClick(person) {
    document.getElementById('Id').value = person.id;
    document.getElementById('firstName').value = person.firstName;
    document.getElementById('lastName').value = person.lastName;
    document.getElementById('address').value = person.address;
    document.getElementById('phone').value = person.phone;
    document.getElementById('email').value = person.email;
    document.getElementById('btnsave').style.display = 'none';
    document.getElementById('btnupdate').style.display = 'block';

}

function SavePerson() {
    if(person == "" || person == null){
        alert("please fill this form")
        return false;
    }
    var person = {
        id: document.getElementById('Id').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
    }

    var req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/person/insert', true);
    req.setRequestHeader('content-Type', 'application/json');
    req.addEventListener('load', function () {
        if (req.status === 200) {
            alert(req.responseText);
            getAll();
            clearPage();
        }

    });
    req.send(JSON.stringify(person));
}

function updatePerson() {
    var person = {
        id: document.getElementById('Id').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
    }

    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'http://localhost:3000/person/update', true);
    ajax.setRequestHeader('content-Type', 'application/json');
    ajax.addEventListener('load', function () {
        if (ajax.status === 200) {
            alert(ajax.responseText);
            getAll();
            clearPage();
        }
    })
    ajax.send(JSON.stringify(person));
}

function onDeleteClick(id) {
    var choice = confirm('Are you sure! you want to delete the record.');
    if (choice === false) {
        // iss function sey bahir nikal jao.
        return;
    }

    var aj = new XMLHttpRequest();
    aj.open('DELETE', 'http://localhost:3000/person/delete/' + id);
    aj.setRequestHeader('content-Type', 'application/json');
    aj.addEventListener('load', function () {
        if (aj.status === 200) {
            alert(aj.responseText);
        }
        getAll();
    })
    aj.send(null);
}

function deleteAll() {
    console.log("calling deleteAll")
}

function clearPage() {
    document.getElementById('btnupdate').style.display = 'none';
    document.getElementById('btnsave').style.display = 'block';
    document.getElementById('Id').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
}