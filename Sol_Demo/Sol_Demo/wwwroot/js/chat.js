"use strict";

// to Make SignalR connection. Step 1

var connection = new signalR
    .HubConnectionBuilder()
    .withUrl("/chathub")
    .withAutomaticReconnect()
    .build();

// Disable Send Button Step 2
$("#btnSendMessage").prop("disabled", true);

// Template for List Step 4
function templateList(user, message) {
    //console.log("Template :", user);
    //console.log("Template :", message);

    var template = `<li>${user} says : ${message}</li>`;

    return template;
}

// SingnalR On connection, received message from Server. Step 3
connection.on("SendMessageToClientJsMethod", function (user, message) {
    //console.log("On User :", user);
    //console.log("On Message :", message);

    var templateRender = templateList(user, message);

    console.log(templateRender);

    $("#messageList").append(templateRender);
});

// start the SingalR Connection / Step 5
connection
    .start()
    .then(function () {
        //console.log("Connection Start");
        $("#btnSendMessage").prop("disabled", false);
    })
    .catch(function (err) {
        console.log(err.toString());
        console.log("Error")
    });

// Invoke Message // Step 6

$("#btnSendMessage").click(function (event) {
    var userName = $("#txtUser").val();
    var message = $("#txtMessage").val();

    //console.log("Invoke User :", userName);
    //console.log("Invoke Message :", message);

    connection
        .invoke("SendMessage", userName, message)
        .catch(function (err) {
            console.log(err.toString());
        });

    event.preventDefault();
}
);