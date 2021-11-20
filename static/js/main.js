console.log("Testing connection!");

let socket = io( 'http://localhost:8080');

var userName = prompt("This page requires your name:","");


$('.formMessages').on('submit', function(event){
    event.preventDefault();
    let message = $('#userMessage').val();

    let messageData ={
        name: userName,
        message: message
    }
    socket.emit('chatUsers', messageData);
});

socket.on('listenAll', function(messageData){
    let message = `<p class="chatP" >${messageData.name} :  ${messageData.message}</p>`;
    
    $('.containerChat' ).append(message);
    var messageContent = document.querySelectorAll(".chatP");
    for(var i = 0; i < messageContent.length; i++){
        messageContent[i].style.backgroundColor = "dark";
        messageContent[i].style.color = 'white';
        messageContent[i].style.width = "100%";
        messageContent[i].style.justifycontent = "center";
    }
    var messageContainer = document.querySelector(".containerChat");
    messageContainer.style.backgroundColor = "grey";
    messageContainer.style.width = "12%";
        
});

socket.on('loadingMessages', function(messagesAll){
    for(let i=0; i<messagesAll.length; i++){
        let message = `<p>${messagesAll[i].name} :  ${messagesAll[i].message}</p>`;
        $('.containerChat').append(message);
    }
});



