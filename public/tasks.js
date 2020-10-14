function pageLoad() {
    document.getElementById('btnUpdate').style.display = 'none';
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/tasks/getAll', true);
    request.setRequestHeader('content-Type', 'application/json');
    request.addEventListener('load', function () {
        var arrdata = JSON.parse(request.responseText);
        var tbody = document.getElementById('datagrid');
        tbody.innerHTML = '';

        arrdata.forEach(function (item) {
            var str = "<tr><td>" + item.id
                + "</td><td>" + item.task
                + "</td><td>" + item.description
                + "</td><td>" + item.status
                + "</td><td><button type='button' class='btn btn-primary btn-sm' onClick='onEditClick(" + JSON.stringify(item)
                + ")'>Edit</button></td><td><button type='button' class='btn btn-primary btn-sm' onClick='onDeleteClick(" + item.id
                + ")'>Delete</button></td></tr>";

            tbody.innerHTML = tbody.innerHTML + str;
        })
    })

    request.send(null);
}

function onEditClick(task) {
    document.getElementById('btnUpdate').style.display = 'block';
    document.getElementById('btnSave').style.display = 'none';

    document.getElementById('task').value = task.task;
    document.getElementById('descripition').value = task.description;
    document.getElementById('status').value = task.status;
    document.getElementById('Id').value = task.id;

}

function Savetask() {
    if (ta == "" || ta == null) {
        alert("please Fill this form");

        return false;
    }
    var ta = {
        task: document.getElementById('task').value,
        descripition: document.getElementById('descripition').value,
        status: document.getElementById('status').value,
    }


    var ajax = new XMLHttpRequest();
    ajax.open('post', 'http://localhost:3000/tasks/insert', true);
    ajax.setRequestHeader('content-Type', 'application/json');
    ajax.addEventListener('load', function () {
        if (ajax.status === 200) {
            alert(ajax.responseText);
            clearPage();
            pageLoad();
        }
    });
    ajax.send(JSON.stringify(ta));

}
function updatetask() {

    var task = {
        id: document.getElementById('Id').value,
        task: document.getElementById('task').value,
        descripition: document.getElementById('descripition').value,
        status: document.getElementById('status').value
    }

    var req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:3000/tasks/update', true);
    req.setRequestHeader('content-Type', 'application/json');
    req.addEventListener('load', function () {
        if (req.status === 200) {
            alert(req.responseText);
            clearPage();
            pageLoad();
        }
    })
    req.send(JSON.stringify(task));


}

function onDeleteClick(id) {
    var del = confirm('are you shore you want to delete this recored');
    if (del === false) {
        return;
    }

    var aj = new XMLHttpRequest();
    aj.open('DELETE', 'http://localhost:3000/tasks/delete/' + id, true);
    aj.setRequestHeader('content-Type', 'application/json');
    aj.addEventListener('load', function () {
        pageLoad();
    })
    aj.send(null)
}

function clearPage() {
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnSave').style.display = 'block';
    document.getElementById('Id').value = '';
    document.getElementById('task').value = '';
    document.getElementById('descripition').value = '';
    document.getElementById('status').value = '';
}