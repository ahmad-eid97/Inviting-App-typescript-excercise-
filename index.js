// HTML ELEMENTS
var input = document.querySelector('#input');
var addBtn = document.querySelector('#addBtn');
var updateBtn = document.querySelector('#updateBtn');
var list = document.querySelector('#list');
var emptyDiv = document.querySelector('.empty');
var FriendsList = [];
var updateMode = false;
function renderFriends() {
    if (FriendsList.length <= 0) {
        emptyDiv.innerHTML = 'Guest list is empty. try to invite some friends...';
    }
    else {
        emptyDiv.innerHTML = '';
    }
    FriendsList.forEach(function (friend) {
        var friendElement = document.createElement('li');
        friendElement.innerHTML = friend.name;
        friendElement.classList.add('friendItem');
        friendElement.addEventListener('click', function (e) {
            if (e.target instanceof HTMLLIElement) {
                input.value = friend.name;
                updateMode = true;
                InviteFriend.friendIdForUpdate = friend.id;
                addBtn.classList.add('hide');
                updateBtn.classList.remove('hide');
            }
        });
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete Guest';
        deleteBtn.addEventListener('click', function () {
            deleteInvitedFriend(friend);
        });
        friendElement.append(deleteBtn);
        list.append(friendElement);
    });
}
var InviteFriend = /** @class */ (function () {
    function InviteFriend() {
    }
    InviteFriend.prototype.inviteFriend = function (friend) {
        list.innerHTML = '';
        FriendsList.push(friend);
        input.value = '';
        renderFriends();
    };
    InviteFriend.prototype.deleteFriend = function (friend) {
        FriendsList = FriendsList.filter(function (fr) { return fr.id !== friend.id; });
        list.innerHTML = '';
        renderFriends();
    };
    Object.defineProperty(InviteFriend.prototype, "setFriendId", {
        set: function (id) {
            InviteFriend.friendIdForUpdate = id;
        },
        enumerable: false,
        configurable: true
    });
    InviteFriend.prototype.updateFriend = function (updatedFriend) {
        var friendFound = FriendsList.findIndex(function (fr) { return fr.id === updatedFriend.id; });
        FriendsList.splice(friendFound, 1, updatedFriend);
        list.innerHTML = '';
        renderFriends();
    };
    InviteFriend.friendIdForUpdate = 0;
    return InviteFriend;
}());
addBtn.addEventListener('click', function () {
    if (input.value) {
        var newFriend = new InviteFriend();
        newFriend.inviteFriend({ name: input.value, id: Math.random() * 100 });
    }
});
function deleteInvitedFriend(friend) {
    var deleteFriend = new InviteFriend();
    deleteFriend.deleteFriend(friend);
}
updateBtn.addEventListener('click', function () {
    updateBtn.classList.add('hide');
    addBtn.classList.remove('hide');
    var updateFriend = new InviteFriend();
    updateFriend.updateFriend({ name: input.value, id: InviteFriend.friendIdForUpdate });
    input.value = '';
});
