import {
  UserProvider,
  NationalityProvider,
  DantocProvider,
  RoomProvider,
  BuildingProvider,
} from '/providers/index.js';

// validation
import {
  isNotEmpty,
  isEmail,
  isNumberPhone,
  isDate
} from './validation.js';

// DANTOC constants
import {
  CONSTANTS
} from '/utils/constant.js';


const filterUsersByRoom = (roomId, users) => {
  let results = [];
  users.forEach(function (a) {
    if (a.roomId === roomId) results.push(a);
  });
  return results;
}

const membersElement = document.getElementById('members');
const listBoard = document.getElementById('list-name');
const loadingType = "spinner";

const tong = document.getElementById('tong');
const male = document.getElementById('male');
const female = document.getElementById('female');
localStorage.clear()

if (localStorage.getItem('buildings') == null)
  localStorage.setItem('buildings', CONSTANTS.BUILDING.K1);

if (localStorage.getItem('status') == null)
  localStorage.setItem('status', CONSTANTS.STATUS.ALL);

const templateInit = (
  data,
  users,
  _status = {
    empty: {
      name: "empty",
      classname: "empty",
    },
    semi: {
      name: "exist",
      classname: "semi",
    },
    full: {
      name: "full",
      classname: "full",
    },
  }
) => {
  return `
<div class="project-box-wrapper">
   <div class="project-box ${data.status}" id="${data._id}">
      <div class="project-box-header" style="width: 100%">
         <span>December 10, 2020</span>
         <div class="more-wrapper">
            <button class="project-btn-more">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" class="feather feather-more-vertical">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
               </svg>
            </button>
         </div>
      </div>
      <div class="project-box-content-header">
         <p class="box-content-header">${data.name} room</p>
         <p class="box-content-subheader">${data.describe}</p>
      </div>
      <div class="project-box-footer">
         <div class="participants">
            ${users.map(user => `<img src='${user.avatar}' alt='${user.avatar}'>`).join("")}
            <button class="add-participant" style="color: #ff942e;">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                  stroke-linejoin="round" class="feather feather-plus">
                  <path d="M12 5v14M5 12h14" />
               </svg>
            </button>
         </div>
         <div class="days-left" style="color: ${_status[data.status].color}">
         ${_status[data.status].name}
         </div>
      </div>
   </div>
</div>
`;
}

/**
 * template member
 * @param {{id: String, name: String, email: String, number: String, address: String}} memberModel
 * @returns
 */
const templateMember = (memberModel) => {
  let html = `
    <div class="message-box">
       <img src="images/user.png" alt="profile image">
       <div class="message-content" id="message-box-${memberModel.id}">
          <div class="message-header">
             <div class="name">${memberModel.name}</div>
          </div>
          <p class="message-line">${memberModel.email}</p>
          <p class="message-line">${memberModel.phoneNumber}</p>
          <p class="message-line">${memberModel.address}</p>
          <p class="message-line">${memberModel.sex === 1 ? "Nam" : "Nữ"}</p>
       </div>
      <div class="delete-button" id="delete-button-${memberModel.id}"><span class="iconify" data-icon="ant-design:user-delete-outlined"
      style="font-size: 20px; color: red"></span></div>
    </div>
    `.trim();
  return [html, `message-box-${memberModel.id}`, memberModel, `delete-button-${memberModel.id}`];
};

/**
 * UX process
 */
document.addEventListener("DOMContentLoaded", function () {
  var modeSwitch = document.querySelector(".mode-switch");

  modeSwitch.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    modeSwitch.classList.toggle("active");
  });

  var listView = document.querySelector(".list-view");
  var gridView = document.querySelector(".grid-view");
  var projectsList = document.querySelector(".project-boxes");

  listView.addEventListener("click", function () {
    gridView.classList.remove("active");
    listView.classList.add("active");
    projectsList.classList.remove("jsGridView");
    projectsList.classList.add("jsListView");
  });

  gridView.addEventListener("click", function () {
    gridView.classList.add("active");
    listView.classList.remove("active");
    projectsList.classList.remove("jsListView");
    projectsList.classList.add("jsGridView");
  });

  document.querySelector(".messages-btn").addEventListener("click", function () {
    document.querySelector(".messages-section").classList.add("show");
  });

  document.querySelector(".messages-close").addEventListener("click", function () {
    document.querySelector(".messages-section").classList.remove("show");
  });
});

function preloading() {
  // preloading
  let viewIndex = document.getElementById('view-index');
  viewIndex.innerHTML = "";

  const template = () => `
    <div class="loading-card">
       <div class="header">
          <div class="details">
             <span class="name"></span>
             <br>
             <span class="about"></span>
          </div>
       </div>
       <div style="margin-top: 20px"></div>
       <div class="btns">
          <div class="btn btn-1"></div>
          <div style="width: 100%;"></div>
          <div class="btn btn-2"></div>
       </div>
    </div>
    `;
  for (let i = 0; i < 10; i++)
    viewIndex.innerHTML += template();
}

async function init(argument = { buildings: CONSTANTS.BUILDING.K1, status: CONSTANTS.STATUS.ALL, loading: false }) {
  if (argument.loading) loadingCall();
  preloading();

  // load sĩ số
  let buildings = localStorage.getItem('buildings');
  let status = localStorage.getItem('status');

  BuildingProvider.findById(buildings).then(data => {
    localStorage.setItem('sex-index', data.allowSex);
    return data;
  });

  UserProvider.getSiSo(
    buildings,
    status
  ).then(data => {
    let maleNum = data['male'];
    let femaleNum = data['female'];

    tong.innerHTML = maleNum + femaleNum;
    male.innerHTML = maleNum;
    female.innerHTML = femaleNum;
  });

  let viewIndex = document.getElementById("view-index");

  // get all user list
  const users = await UserProvider.getAll();

  // get rooms list
  const roomlist = await RoomProvider.getRoomBy(
    argument.buildings,
    argument.status
  );

  let rooms = {};
  roomlist.forEach(item => {
    if (rooms[item.name[0]] == undefined) rooms[item.name[0]] = []
    rooms[item.name[0]].push(item);
  });

  let data = [];
  for (const [k, v] of Object.entries(rooms)) {
    // sort
    rooms[k] = v.sort((a, b) => parseInt(a.name) - parseInt(b.name));

    const floor = rooms[k];
    data.push(`
                <h3>${k}F</h3>
                <div style="border-bottom: 2px solid #eaeaea; width:100%">
                </div><div style="margin-top: 20px; width: 100%"></div>`
    );

    floor.forEach(room => {
      let userList = filterUsersByRoom(room._id, users);
      room.status = (userList.length == 0 ? "empty" : userList.length >= 4 ? "full" : "semi");
      data.push(templateInit(room, userList));
    });

    data.push(`</div><div style="margin-top: 30px; width: 100%"></div>`);
  }

  viewIndex.innerHTML = data.join("")

  // assign onclick
  roomlist.forEach(
    model => document.getElementById(model._id).onclick = () => onRoomClick({
      id: model._id,
      name: model.name
    }, users)
  );

  membersElement.innerHTML = "";
  listBoard.innerHTML = `List`;
  if ($('.project-box').length > 0) $('.project-box')[0].click();

  if (argument.loading) $('body').loadingModal('destroy');
}

/**
 * on add click
 * @param {{id: String, name:String}} room
 * @param {User[]} users
 */
function onRoomClick(room, users) {
  // remove selected
  $('.project-box.selected').toggleClass('selected');

  // filter user by rooom id
  let filters = filterUsersByRoom(room.id, users);
  let ids = [];

  // filter data
  // - html
  // - [user, roomId]
  membersElement.innerHTML = filters.map(user => {
    let content = templateMember(user);
    ids.push([content[1], content[2], content[3]]);
    return content[0];
  }).join('');

  // gán onclick vào thành viên mỗi room
  ids.forEach(id => {
    document.getElementById(id[0]).onclick = () => roomUpdateInit(
      id[1],
      room.id,
    );

    document.getElementById(id[2]).onclick = () => removeUser(id[1]);
  })


  listBoard.innerHTML = `${room.name}`;
  document.getElementById(room.id).classList.toggle('selected');

  room.number = filters.length;
  localStorage.setItem('room-data', JSON.stringify(room));
}

init();



// ====================================================================================================================================================
// ====================================================================================================================================================
// ====================================================================================================================================================
// ====================================================================================================================================================
let loadQuocTich = false;
let loadDanToc = false;
let loadPhong = false;

function registerFormInit(registerForm) {

  if (registerForm != undefined) {
    registerForm.innerHTML = `
    <div class="bg-dark"></div>
    <div class="cont animation">
      <div class="form" id="form">
        <h2>Đơn đăng ký vào ở ký túc xá</h2>
        <label>
          <span>Fullname</span>
          <input type="text" id="fullname" />
        </label>
        <label>
          <span>Number phone</span>
          <input type="text" id="number" />
        </label>
        <label>
          <span>Address</span>
          <input type="text" id="address" />
        </label>
        <label>
          <span>National</span>
          <select id="national"></select>
        </label>
        <label>
          <span>Card id</span>
          <input type="text" id="idcard"/>
        </label>
        <label>
          <span>Birthday</span>
          <input type="text" id="birth"/>
        </label>
        <label>
          <span>Email</span>
          <input type="text" id="email"/>
        </label>
        <label>
          <span>Dân tộc</span>
          <select id="dantoc-options"></select>
        </label>
        <label>
          <span>Room</span>
          <select id="room-options"></select>
        </label>
        <label>
          <span>Sex</span>
          <select id="sex-options">
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </select>
        </label>
        <button type="button" id="submit" class="submit">Register</button>
        <button type="button" id="fb-btn" class="fb-btn">Cancel</button>
      </div>
      <div class=" sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>Welcome to Dormitory of PDU</h2>
            <p>Vui mừng chào đón các bạn tới với kí tý xá trường Đại học Phạm Văn Đồng</p>
          </div>
        </div>
      </div>
    </div>
    `;

    document.getElementById('sex-options').value = registerForm.getAttribute('sex')
  }
}

/**
 * loading
 */
function loadingCall() {
  $('body').loadingModal({ text: 'Loading...' });
  $('body').loadingModal('animation', loadingType);
}

/**
 * load data room
 */
async function loadRoom(registerForm) {
  let rooms = await RoomProvider.getAll();
  let roomOptions = document.getElementById('room-options');

  // rooms sorted
  rooms = rooms.sort((a, b) => {
    return parseInt(a.name) - parseInt(b.name);
  });

  // room options
  if (roomOptions) {
    roomOptions.innerHTML = rooms
      .map(room => `<option value="${room.id}">${room.name}</option>`)
      .join('');
  }

  // tồn tại register form
  if (registerForm != undefined && registerForm.attributes['roomid']) {
    if (roomOptions)
      roomOptions.value = registerForm.attributes['roomid'].value
  } else {
    if (rooms.length > 0)
      if (roomOptions)
        roomOptions.value = rooms[0].id
  }

  loadPhong = true;
}

/**
 * load data quốc tịch
 */
async function loadNationality() {
  const nationalities = await NationalityProvider.getAll();
  let national = document.getElementById('national');

  if (national)
    national.innerHTML = nationalities
      .map(room => `<option value="${room.id}">${room.name}</option>`)
      .join('');
  loadQuocTich = true;
  onLoadDanToc().then(() => {
    loadDanToc = true;
  });
}

/**
 * load data dantoc
 */
async function onLoadDanToc() {
  return DantocProvider.getAll().then(dantocs => {
    let dantocOpts = document.getElementById('dantoc-options');
    let national = document.getElementById('national');

    if (dantocs)
      if (dantocOpts) {
        dantocOpts.innerHTML = dantocs
          .filter(dantoc => dantoc.nationality === national.value)
          .map(dantoc => `<option value="${dantoc.id}">${dantoc.name}</option>`)
          .join('');
        dantocOpts.value = CONSTANTS.DANTOC.KINH;
        document.getElementById(CONSTANTS.DANTOC.KINH).setAttribute('selected', 'true');
      }

  });
}

function onNationalChange() {
  // spin loading
  loadingCall();

  // destroy spin loading
  onLoadDanToc().then(() => {
    $('body').loadingModal('destroy');
  });
}

if (document.getElementById('national'))
  document.getElementById('national').onchange = onNationalChange;

/**
  * thông báo vi phạm validation
  */
function thongBaoValidation(value) {
  alert(value);
}

/**
  * validation
  */
function validation(model) {
  if (!isNotEmpty(model.name)) {
    thongBaoValidation("Fullname is not empty");
    return false;
  }

  if (!isNumberPhone(model.phoneNumber)) {
    thongBaoValidation("It's not number phone");
    return false;
  }

  if (!isNotEmpty(model.address)) {
    thongBaoValidation("address  is not empty");
    return false;
  }

  if (!isNotEmpty(model.nationality)) {
    thongBaoValidation("National is not empty");
    return false;
  }

  if (!isNotEmpty(model.iDCard)) {
    thongBaoValidation("idCard is not empty");
    return false;
  }

  if (!isDate(model.birth)) {
    thongBaoValidation("Birth is invalid date format yyyy-mm-dd");
    return false;
  }

  if (!isEmail(model.email)) {
    thongBaoValidation("it is not email");
    return false;
  }

  if (!isNotEmpty(model.danToc)) {
    thongBaoValidation("dantoc field is not empty");
    return false;
  }

  if (!isNotEmpty(model.sex)) {
    thongBaoValidation("sex field is not empty");
    return false;
  }

  if (!isNotEmpty(model.roomId)) {
    thongBaoValidation("room is not empty");
    return false;
  }

  return true;
}

document.getElementById('add-button').onclick = function () {
  let roomData = localStorage.getItem('room-data');
  roomData = JSON.parse(roomData);

  const number = roomData.number;
  if (number < 4) {
    // xử lý register form
    const initDiv = document.getElementById('init-register-form');
    const register = document.createElement('register-form');

    const sexIndex = localStorage.getItem('sex-index');
    register.setAttribute('roomid', roomData.id);
    register.setAttribute('sex', sexIndex == null || sexIndex == 3 ? 1 : parseInt(sexIndex));
    register.setAttribute('class', "register-form");
    initDiv.appendChild(register);
    initialize(register);
  } else {
    thongBaoValidation("Room member is maxium");
  }
};


document.getElementById('switch-button').onclick = () => {
  let data = localStorage.getItem('room-data');
  let roomData = data != null && data != undefined ? JSON.parse(data) : undefined;
  if (roomData) switchRoom(roomData.id);
  else alert("Chưa có dữ liệu");
};

/**
 * on submit click
 */
function onSubmitClick() {
  const fullname = document.getElementById('fullname');
  const number = document.getElementById('number');
  const address = document.getElementById('address');
  const national = document.getElementById('national');
  const idcard = document.getElementById('idcard');
  const birth = document.getElementById('birth');
  const email = document.getElementById('email');
  const dantocOptions = document.getElementById('dantoc-options');
  const roomOptions = document.getElementById('room-options');
  const sex = document.getElementById('sex-options');

  const data = {
    name: fullname.value,
    phoneNumber: number.value,
    address: address.value,
    nationality: national.value,
    iDCard: idcard.value.toLowerCase(),
    birth: birth.value,
    email: email.value,
    danToc: dantocOptions.value,
    roomId: roomOptions.value,
    sex: sex.value,
    role: 1,
    avatar: "images/user.png",
  };

  if (validation(data)) {
    UserProvider.create(data).then((data) => {
      console.log(data);
      if (JSON.stringify(data).toString() === "null") {
        thongBaoValidation("Người dùng này đã tồn tại hãy kiểm tra lại mã sinh viên");
      } else {
        // xóa form
        onCancelClick();

        // code render
        const argument = {
          buildings: localStorage.getItem('buildings'),
          status: localStorage.getItem('status'),
          loading: true,
        }
        init(argument);

        fullname.value = "";
        number.value = "";
        address.value = "";
        idcard.value = "";
        birth.value = "";
        email.value = "";
      }
    });
  }
}

/**
 * on cancel click
 */
function onCancelClick() {
  document.getElementById('init-register-form').innerHTML = "";
}

/**
 * initialize
 * @param {*} registerForm
 */
function initialize(registerForm) {
  registerFormInit(registerForm);
  loadRoom(registerForm);
  loadNationality();

  if (document.getElementById('submit'))
    document.getElementById('submit').onclick = onSubmitClick;
  if (document.getElementById('fb-btn'))
    document.getElementById('fb-btn').onclick = onCancelClick;
}


// ====================================================================================================================================================
// ====================================================================================================================================================
// ====================================================================================================================================================
// ====================================================================================================================================================

/**
 * switch form html init
 * @param {Room} roomModel
 * @returns
 */
const initSwitchFormHTML = (roomModel) => {
  return `
    <div class="bg-dark"></div>
    <switch-form user="user_id" room="room_id" class="light">
       <div class="cont">
          <div class="form sign-in">
             <h2>Room switch</h2>
             <label>
                <span>Current</span>
                <input type="text" id="switch-form-current" placeholder="101" value="${roomModel.name}" readonly/>
             </label>
             <label>
                <span>To</span>
                <div class="autocomplete">
                   <input type="text" id="switch-form-to" placeholder="101"/>
                </div>
             </label>
             <button type="button" class="submit" id="switch-submit">Switch</button>
             <button type="button" class="fb-btn" id="switch-cancel">Cancel</button>
          </div>
       </div>
    </switch-form>
    `;
}

/**
 * tạo form chuyển phòng cho user
 * @param {User} userId
 * @param {string} roomId
 */
async function roomUpdateInit(user, roomId) {
  const room = await RoomProvider.findById(roomId).then(data => {
    $("body").loadingModal('destroy');
    return data;
  });

  // render inner html into init-switch-form index
  $('#init-switch-form').html(initSwitchFormHTML(room))

  // khởi tạo switch form
  switchFormInit(roomId);

  // assign event function cho button trong switch form
  document.getElementById('switch-submit').onclick = function () {
    const roomdIdNeedToChange = document.getElementById('switch-form-to').getAttribute('data-id');

    // check null
    if (roomdIdNeedToChange && roomdIdNeedToChange.length > 0) {
      onSwitchFormSubmit(
        // thông tin người dùng hiện tại
        user,

        // dữ liệu data-id
        roomdIdNeedToChange
      );
    } else alert("Dữ liệu không hợp lệ/ Dữ liệu không được rỗng")

  };

  // assign event function cho cancel button switch form
  document.getElementById('switch-cancel').onclick = onSwitchFormCancel;
}

/**
 * remove user
 * @param {User} userId
 * @param {string} roomId
 */
async function removeUser(user) {
  if (confirm('Do you wanna remove this user?')) {
    UserProvider.deleteById(user.id).then(data => {
      // code render
      const argument = {
        buildings: localStorage.getItem('buildings'),
        status: localStorage.getItem('status'),
        loading: true,
      }
      init(argument);

      return data;
    })
  }
}

/**
 * tạo form chuyển từ from room thành to room
 * @param {string} roomId
 */
async function switchRoom(roomId) {
  loadingCall();
  const room = await RoomProvider.findById(roomId).then(data => {
    $("body").loadingModal('destroy');
    return data;
  });

  // render inner html into init-switch-form index
  $('#init-switch-form').html(initSwitchFormHTML(room))

  // khởi tạo switch form
  switchFormInit(roomId);

  // assign event function cho button trong switch form
  document.getElementById('switch-submit').onclick = function () {
    const toRoomId = document.getElementById('switch-form-to').getAttribute('data-id');

    // check null
    if (toRoomId && toRoomId.length > 0) {
      onSwitchAllClick(
        // id từ room bàn đầu
        roomId,

        // id room cần chuyển
        toRoomId
      );
    } else alert("Dữ liệu không hợp lệ/ Dữ liệu không được rỗng")

  };

  // assign event function cho cancel button switch form
  document.getElementById('switch-cancel').onclick = onSwitchFormCancel;
}

/**
 * on switch form submit
 * @param {User} user
 */
async function onSwitchFormSubmit(user, roomIdNeedToChanged) {
  user.roomId = roomIdNeedToChanged;

  // lấy tất cả người dùng theo id room
  const users = (await UserProvider.getAll()).filter(item => item.roomId === roomIdNeedToChanged)

  if (users.length < 4) {
    // use update by id api to room id change
    UserProvider.updateById(user).then(userUpdated => {
      // code render
      const argument = {
        buildings: localStorage.getItem('buildings'),
        status: localStorage.getItem('status'),
        loading: true,
      }
      init(argument);

      onSwitchFormCancel();
    });
  } else {
    thongBaoValidation("Room full");
    $("body").loadingModal('destroy');
  }


}

/**
 * on switch all click
 * @param {string} fromRoomId
 * @param {string} toRoomId
 */
function onSwitchAllClick(fromRoomId, toRoomId) {
  loadingCall();


  // use update by id api to room id change
  UserProvider.switchAll(fromRoomId, toRoomId).then((data) => {
    // code render
    const argument = {
      buildings: localStorage.getItem('buildings'),
      status: localStorage.getItem('status'),
      loading: true,
    }
    init(argument);

    // destroy spin loading
    $('body').loadingModal('destroy');
    onSwitchFormCancel();
  });
}

/**
 * on switch form cancel
 */
function onSwitchFormCancel() {
  const switchForm = document.getElementById('init-switch-form');
  switchForm.innerHTML = ``;
}

/**
 * auto complete
 * @param {*} inp
 * @param {Room[]} arr
 */
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);

    /*for each item in the array...*/
    arr.forEach(index => {
      /*check if the item starts with the same letters as the text field value:*/
      if (index.name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + index.name.substr(0, val.length) + "</strong>";
        b.innerHTML += index.name.substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + index.id + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = index.name;
          inp.setAttribute('data-id', index.id);
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    })
  });

  // execute a function presses a key on the keyboardF
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/**
 * switch form initialize
 */
async function switchFormInit(roomId) {
  let rooms = await RoomProvider.getAll();
  const data = rooms.sort((a, b) => a.name - b.name).filter(item => item.id !== roomId);
  autocomplete(document.getElementById("switch-form-to"), data);
}

document.getElementById('buildings-k1').onclick = function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K1);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive')
}

document.getElementById('buildings-k2').onclick = function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K2);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive')
}

document.getElementById('buildings-k3').onclick = function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K3);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive')
}

document.getElementById('buildings-k4').onclick = function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K4);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive')
}

document.getElementById('status-s1').onclick = function () {
  onStatusFilterClick(CONSTANTS.STATUS.ALL);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive')
}

document.getElementById('status-s2').onclick = function () {
  onStatusFilterClick(CONSTANTS.STATUS.FULL);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive')
}

document.getElementById('status-s3').onclick = function () {
  onStatusFilterClick(CONSTANTS.STATUS.EXIST);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive')
}

document.getElementById('status-s4').onclick = function () {
  onStatusFilterClick(CONSTANTS.STATUS.EMPTY);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * on building filter click
 * @param {*} buildingId 
 */
function onBuildingFilterClick(buildingId) {
  localStorage.setItem('buildings', buildingId);
  const argument = {
    buildings: localStorage.getItem('buildings'),
    status: localStorage.getItem('status'),
    loading: true,
  }

  init(argument);
}

/**
 * on status filter click
 * @param {*} status 
 */
function onStatusFilterClick(status) {
  localStorage.setItem('status', status);
  const argument = {
    buildings: localStorage.getItem('buildings'),
    status: localStorage.getItem('status'),
    loading: true,
  }

  init(argument);
}
