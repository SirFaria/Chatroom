// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new message
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())// limpa a caixa de texto
        .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset the form
    newNameForm.reset();
    // show then hide the update message
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000)
});

// update the chatroom
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        // clear the chats
        chatUI.clear();
        // update the chatroom
        chatroom.updateRoom(e.target.getAttribute('id'));
        // get chats and render
        chatroom.getChats(chat => chatUI.render(chat));


    }
});

// check local storage username
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));