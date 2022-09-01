// HTML ELEMENTS
const input = <HTMLInputElement>document.querySelector('#input')!;
const addBtn = <HTMLButtonElement>document.querySelector('#addBtn')!;
const updateBtn = <HTMLButtonElement>document.querySelector('#updateBtn')!;
const list = <HTMLUListElement>document.querySelector('#list')!;
const emptyDiv = <HTMLDivElement>document.querySelector('.empty')

type Friend = {
  name: string
  id: number
}

let FriendsList: Friend[] = []

let updateMode: boolean = false

function renderFriends (): void {
  if (FriendsList.length <= 0) {
    emptyDiv.innerHTML = 'Guest list is empty. try to invite some friends...'
  } else {
    emptyDiv.innerHTML = ''
  }

  FriendsList.forEach(friend => {

    const friendElement = document.createElement('li');
  
    friendElement.innerHTML = friend.name;

    friendElement.classList.add('friendItem')

    friendElement.addEventListener('click', (e) => {

      if (e.target instanceof HTMLLIElement) {

        input.value = friend.name
  
        updateMode = true

        InviteFriend.friendIdForUpdate = friend.id
  
        addBtn.classList.add('hide')
  
        updateBtn.classList.remove('hide')
      }

    })

    const deleteBtn = document.createElement('button');

    deleteBtn.innerHTML = 'Delete Guest'

    deleteBtn.addEventListener('click', () => {
      deleteInvitedFriend(friend)
    })

    friendElement.append(deleteBtn)
  
    list.append(friendElement)
  
  })
}

class InviteFriend {
  static friendIdForUpdate: number = 0;

  inviteFriend (friend: Friend) {
    list.innerHTML = ''

    FriendsList.push(friend)

    input.value = ''

    renderFriends()
  }

  deleteFriend (friend: Friend) {
    FriendsList = FriendsList.filter(fr => fr.id !== friend.id)

    list.innerHTML = ''

    renderFriends()
  }

  set setFriendId (id: number) {
    InviteFriend.friendIdForUpdate = id
  }

  updateFriend (updatedFriend: Friend) {
    const friendFound = FriendsList.findIndex(fr => fr.id === updatedFriend.id);

    FriendsList.splice(friendFound, 1, updatedFriend)

    list.innerHTML = ''

    renderFriends()
  }
}

addBtn.addEventListener('click', () => {

  if (input.value) {

    const newFriend = new InviteFriend()

    newFriend.inviteFriend({name: input.value, id: Math.random() * 100})

  }

});

function deleteInvitedFriend (friend: Friend) {

  const deleteFriend = new InviteFriend()

  deleteFriend.deleteFriend(friend)

}

updateBtn.addEventListener('click', () => {
  updateBtn.classList.add('hide');

  addBtn.classList.remove('hide')

  const updateFriend = new InviteFriend()

  updateFriend.updateFriend({name: input.value, id: InviteFriend.friendIdForUpdate})

  input.value = ''

})