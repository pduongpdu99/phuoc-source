import {
  UserProvider,
  NationalityProvider,
  DantocProvider,
  RoomProvider,
  BuildingProvider,
} from '/providers/index.js';

// validation
import { isNotEmpty, isEmail, isNumberPhone, isDate } from './validation.js';

// DANTOC constants
import {
  CONSTANTS
} from '/common/utils/constant.js';


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
    empty: { name: "empty", classname: "empty" },
    semi: { name: "exist", classname: "semi" },
    full: { name: "full", classname: "full" },
  }
) => {
  return `
<div class="project-box-wrapper">
   <div class="project-box ${data.status}" id="${data._id}">
      <div class="project-box-header" style="width: 100%">
         <span>December 10, 2020</span>
      </div>
      <div class="project-box-content-header">
         <p class="box-content-header">${data.name} room</p>
         <p class="box-content-subheader">${data.describe}</p>
      </div>
      <div class="project-box-footer">
         <div class="participants">
            ${users.map(user => `<img src='${user.avatar}' alt='${user.avatar}'>`).join("")}
            <button class="add-participant" id="add-participant-${data._id}" title="Add user">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                  stroke-linejoin="round" class="feather feather-plus">
                  <path d="M12 5v14M5 12h14" />
               </svg>
            </button>
         </div>
         <div class="days-left">
         ${_status[data.status].name}
         </div>
      </div>
   </div>
</div>`;
}

/**
 * template member
 * @param {{id: String, name: String, email: String, number: String, address: String}} memberModel
 * @returns
 */
const templateMember = (memberModel) => {
  const html = new String(`
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

    <!-- features -->
    <div>
      <!-- delete button -->
      <div class="delete-feature-button" id="delete-button-${memberModel.id}" title="Delete">
        <span class="iconify" data-icon="ant-design:user-delete-outlined"></span>
      </div>

      <!-- update button -->
      <div class="update-feature-button" id="update-button-${memberModel.id}" title="Update">
        <span class="iconify" data-icon="clarity:update-line"></span>
      </div>

      <!-- switch button -->
      <div class="switch-feature-button" id="switch-button-${memberModel.id}" title="Switch">
        <span class="iconify" data-icon="fluent:table-switch-16-filled"></span>
      </div>
    </div>
  </div>`);

  return [
    html,
    `message-box-${memberModel.id}`,
    memberModel,
    `delete-button-${memberModel.id}`,
    `update-button-${memberModel.id}`,
    `switch-button-${memberModel.id}`,
  ];
};


/**
 * loading
 */
function loadingCall() {
  $('body').loadingModal({ text: 'Loading...' });
  $('body').loadingModal('animation', loadingType);
}

/**
 * preloading
 */
function preloading() {
  // preloading
  let viewIndex = document.getElementById('view-index');
  viewIndex.innerHTML = "";

  // template initialize
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

  // render template loading
  for (let i = 0; i < 10; i++)
    viewIndex.innerHTML += template();
}

/**
 * init method
 */
async function init(argument = { buildings: CONSTANTS.BUILDING.K1, status: CONSTANTS.STATUS.ALL, loading: false }) {
  if (argument.loading) loadingCall();
  preloading();

  // load sĩ số
  let buildings = localStorage.getItem('buildings');
  let status = localStorage.getItem('status');

  // tìm buildings
  BuildingProvider.findById(buildings).then(data => {
    localStorage.setItem('sex-index', data.allowSex);
    return data;
  });

  // get sĩ số
  UserProvider.getSiSo(
    buildings,
    status
  ).then(data => {
    let maleNum = data['male'];
    let femaleNum = data['female'];

    // sĩ số tổng + nam + nữ
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

  // get rooms
  let rooms = {};
  roomlist.forEach(item => {
    if (rooms[item.name[0]] == undefined) rooms[item.name[0]] = []
    rooms[item.name[0]].push(item);
  });

  let data = [];
  for (const [k, v] of Object.entries(rooms)) {
    // sort
    rooms[k] = v.sort((a, b) => parseInt(a.name) - parseInt(b.name));

    // floor 
    const floor = rooms[k];
    data.push(`<h3>${k}F</h3>
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

  // render into viewIndex
  viewIndex.innerHTML = data.join("")

  // assign onclick
  roomlist.forEach(
    model => document.getElementById(model._id).onclick = () => onRoomClick({
      id: model._id,
      name: model.name
    }, users)
  );

  // render empty member list
  membersElement.innerHTML = "";
  listBoard.innerHTML = `List`;

  if ($('.project-box').length > 0) $('.project-box')[0].click();

  // add event into room box
  for (const key of Object.keys(rooms)) {
    // floor 
    const floor = rooms[key];
    floor.forEach(room => {
      document.getElementById(`add-participant-${room._id}`).onclick = function () {
        onAddButtonClick(room, users)
      }
    });
  }

  // detroy loading
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

  /**
   * filter data
   * - html
   * - [user, roomId]
   */
  membersElement.innerHTML = filters.map(user => {
    let content = templateMember(user);
    ids.push([content[1], content[2], content[3], content[4], content[5]]);
    return content[0];
  }).join('');

  // render limit status
  document.getElementById('member-list-status').innerHTML = `LIMIT STATUS: ${filters.length}/4`;

  // gán onclick vào thành viên mỗi room
  ids.forEach(id => {
    // remove user by id 
    document.getElementById(id[2]).onclick = () => onRemoveUserClick(id[1]);

    // update user by id 
    document.getElementById(id[3]).onclick = () => onUpdateUserClick(id[1]);

    // switch user by id 
    document.getElementById(id[4]).onclick = () => onRoomUpdateInitClick(
      id[1],
      room.id,
    );
  })

  // render room name
  listBoard.innerHTML = `${room.name}`;

  // toggle selected classname (if any)
  document.getElementById(room.id).classList.toggle('selected');

  // get number user number of room
  room.number = filters.length;

  // reset local strage into 'room-data' key with room data
  localStorage.setItem('room-data', JSON.stringify(room));

  // set local storage into 'room-users-data' key with users of that room
  localStorage.setItem('room-users-data', JSON.stringify(filters));

}

/**
 * resetRoomDataStorage
 * @param {Room} room 
 * @param {User[]} users 
 */
function resetRoomDataStorage(room, users) {
  let filters = filterUsersByRoom(room.id, users);
  room.number = filters.length;
  localStorage.setItem('room-data', JSON.stringify(room));
}

// init render
init();



// ====================================================================================================================================================
// ====================================================================================================================================================
// ====================================================================================================================================================
// ====================================================================================================================================================

/**
 * register form init
 * @param {HTMLDOMElemnet} registerForm
 */
function registerFormInit(registerForm, updateStatus = false) {

  if (registerForm != undefined) {
    registerForm.innerHTML = `
    <div class="bg-dark"></div>
    <div class="cont animation">
      <div class="form" id="form">
        <h2>Đơn đăng ký vào ở ký túc xá</h2>
        <label>
          <span>Fullname</span>
          <input type="text" id="fullname" placeholder="Enter fullname"/>
        </label>
        <label>
          <span>Number phone</span>
          <div class="number-field-custom">
            <select id="number-option-select"></select>
            <input type="text" id="number"  placeholder="Enter number phone"/>
          </div>
        </label>
        <label>
          <span>Address</span>
          <input type="text" id="address" placeholder="Enter address"/>
        </label>
        <label>
          <span>National</span>
          <select id="national"></select placeholder="Enter nationality">
        </label>
        <label>
          <span>Card id</span>
          <input type="text" id="idcard" placeholder="Enter id card/ CMND/ StudentID"/>
        </label>
        <label>
          <span>Birthday</span>
          <input type="date" id="birth" class="form-input datepicker" value="2000-01-01" min="1970-01-01" max="2030-01-01">
        </label>
        <label>
          <span>Email</span>
          <div class="email-field-custom">
            <input type="text" placeholder="Ex: admin" id="local-part"/>
            <select id="domain-option-select"></select>
          </div>
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
        ${!updateStatus ? `<button type="button" id="submit" class="submit">Register</button>` : `<button type="button" id="update-submit" class="update-submit">Update</button>`}
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
    const domains = CONSTANTS.EMAIL_DOMAIN;

    const keyNumber = CONSTANTS.KEY_NUMBER_PHONE;

    // render into sex-options
    let sexOptions = document.getElementById('sex-options');
    sexOptions.value = registerForm.getAttribute('sex');

    // disable process reset attribute into input sex-option
    const sexIndex = localStorage.getItem('sex-index');
    if (sexIndex != 3 && sexIndex != null) {
      // set disable into sexOption element
      sexOptions.setAttribute('disabled', '');
    } else {
      let userFilter = JSON.parse(localStorage.getItem('room-users-data'));

      // check first sex value of user is male or female
      // set default this into sexOption element
      if (userFilter.length > 0) {
        userFilter = userFilter.map(item => item.sex);
        sexOptions.value = userFilter[0];

        // set disable into sexOption element
        sexOptions.setAttribute('disabled', '');
      }
    }

    // render domain option into select element
    document.getElementById('domain-option-select').innerHTML = domains.map(item => `<option value="${item}">${item}</option>`);

    // render number option into select element
    document.getElementById('number-option-select').innerHTML = keyNumber.map(item => `<option value="${item}">${item}</option>`);

    // set on event change into onchange attribute national index
    if (document.getElementById('national'))
      document.getElementById('national').onchange = onNationalChange;
  }
}


/**
 * load data dantoc
 */
async function onLoadDanToc() {
  return DantocProvider.getAll().then(dantocs => {
    let dantocOpts = document.getElementById('dantoc-options');
    let national = document.getElementById('national');

    if (dantocs && dantocOpts) {
      dantocOpts.innerHTML = dantocs
        .filter(dantoc => dantoc.nationality === national.value)
        .map(dantoc => `<option value="${dantoc.id}" id="${dantoc.id}">${dantoc.name}</option>`)
        .join('');

      if (national.value === CONSTANTS.NATIONALITIES.VIETNAM) {
        dantocOpts.value = CONSTANTS.DANTOC.KINH;
        document.getElementById(CONSTANTS.DANTOC.KINH).setAttribute('selected', 'true');
      } else {
        dantocOpts.value = CONSTANTS.DANTOC.LAO;
        document.getElementById(CONSTANTS.DANTOC.LAO).setAttribute('selected', 'true');
      }
    }

    $("body").loadingModal('destroy');
  });
}

/**
 * load data room
 */
async function loadRoom(registerForm) {
  const argument = { buildings: localStorage.buildings, status: localStorage.status };
  let rooms = await RoomProvider.getRoomBy(
    argument.buildings,
    argument.status
  );

  let roomOptions = document.getElementById('room-options');

  // rooms sorted
  rooms = rooms.sort((a, b) => {
    return parseInt(a.name) - parseInt(b.name);
  });

  // room options
  if (roomOptions) {
    roomOptions.innerHTML = rooms
      .map(room => `<option value="${room._id}">${room.name}</option>`)
      .join('');
  }

  // CHECK: exist of register form
  if (registerForm != undefined && registerForm.attributes['roomid']) {
    if (roomOptions)
      roomOptions.value = registerForm.attributes['roomid'].value
  } else {
    if (rooms.length > 0)
      if (roomOptions)
        roomOptions.value = rooms[0].id
  }
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
  onLoadDanToc()
}


/**
 * on national change
 */
function onNationalChange() {
  // spin loading
  loadingCall();

  // destroy spin loading
  onLoadDanToc();
}

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

document.getElementById('add-button').onclick = onAddButtonClick;
document.getElementById('switch-button').onclick = onSwitchButtonClick;

/**
 * on add button click
 */
function onAddButtonClick(room = undefined, users = undefined) {
  let roomData = JSON.parse(localStorage.getItem('room-data'));

  const initDiv = document.getElementById('init-register-form');
  const register = document.createElement('register-form');
  const sexIndex = localStorage.getItem('sex-index');

  // xử lý register form
  register.setAttribute('roomid', roomData.id);
  register.setAttribute('sex', sexIndex == null || sexIndex == 3 ? 1 : parseInt(sexIndex));
  register.setAttribute('class', "register-form");

  if (room != undefined && users != undefined) {
    resetRoomDataStorage(room, users);
    register.setAttribute('roomid', room._id);
  }

  const number = roomData.number;
  if (number < 4) {
    initDiv.appendChild(register);
    initialize(register);
  } else {
    thongBaoValidation("Room member is maxium");
  }
}

/**
 * on switch button click
 */
function onSwitchButtonClick() {
  let data = localStorage.getItem('room-data');
  let roomData = data != null && data != undefined ? JSON.parse(data) : undefined;
  if (roomData) switchRoom(roomData.id);
  else thongBaoValidation("No data");
}

/**
 * on submit click
 * @param {Boolean} updateStatus
 */
function onSubmitClick(updateStatus = false, user) {
  const fullname = document.getElementById('fullname');
  const number = document.getElementById('number');
  const address = document.getElementById('address');
  const national = document.getElementById('national');
  const idcard = document.getElementById('idcard');
  const birth = document.getElementById('birth');
  const localPart = document.getElementById('local-part');
  const dantocOptions = document.getElementById('dantoc-options');
  const roomOptions = document.getElementById('room-options');
  const sex = document.getElementById('sex-options');

  const preprocessNumber = (number) => {
    let _number = number;
    if (_number[0] === "0") _number = _number.slice(1);
    _number = _number.replace('+84', '');
    _number = _number.replace('+856', '');
    return _number;
  }

  const numberOption = document.getElementById('number-option-select');
  const domainOption = document.getElementById('domain-option-select');

  // init object
  const data = {
    name: fullname.value,
    phoneNumber: `${numberOption.value}${preprocessNumber(number.value)}`,
    address: address.value,
    nationality: national.value,
    iDCard: idcard.value.toLowerCase(),
    birth: birth.value,
    email: `${localPart.value}@${domainOption.value}`,
    danToc: dantocOptions.value,
    roomId: roomOptions.value,
    sex: sex.value,
    role: 1,
    avatar: "images/user.png",
  };

  // check validate
  if (validation(data)) {
    if (!updateStatus) {
      UserProvider
        .create(data)
        .then((data) => {
          if (JSON.stringify(data).toString() === "null") {
            thongBaoValidation("Người dùng này đã tồn tại hãy kiểm tra lại mã sinh viên");
          } else {
            // xóa form
            onCancelClick();

            // code render
            init({
              buildings: localStorage.getItem('buildings'),
              status: localStorage.getItem('status'),
              loading: true,
            });

            // clear field
            fullname.value = "";
            number.value = "";
            address.value = "";
            idcard.value = "";
            birth.value = "";
            localPart.value = "";
          }
        });
    } else {
      // merge 
      let dataKeys = Object.keys(data);
      for (let key of dataKeys) user[key] = data[key];

      delete user.createdAt;
      delete user.updatedAt;
      delete user.avatar;

      // COMMENT: updated
      UserProvider
        .update(user)
        .then((data) => {
          // code render
          init({
            buildings: localStorage.getItem('buildings'),
            status: localStorage.getItem('status'),
            loading: true,
          });

          // clear field
          fullname.value = "";
          number.value = "";
          address.value = "";
          idcard.value = "";
          birth.value = "";
          localPart.value = "";

          // xóa form
          onCancelClick();

        });
    }

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
  loadNationality();
  loadRoom(registerForm);


  if (document.getElementById('submit'))
    document.getElementById('submit').onclick = function () {
      onSubmitClick();
    };
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
async function onRoomUpdateInitClick(user, roomId) {
  const room = await RoomProvider.findById(roomId)

  // render inner html into init-switch-form index
  document.getElementById('init-switch-form').innerHTML = initSwitchFormHTML(room)

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
async function onRemoveUserClick(user) {
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

async function onUpdateUserClick(user) {
  let roomData = JSON.parse(localStorage.getItem('room-data'));

  const initDiv = document.getElementById('init-register-form');
  const register = document.createElement('register-form');
  const sexIndex = localStorage.getItem('sex-index');

  // xử lý register form
  register.setAttribute('roomid', roomData.id);
  register.setAttribute('sex', sexIndex == null || sexIndex == 3 ? 1 : parseInt(sexIndex));
  register.setAttribute('class', "register-form");

  initDiv.appendChild(register);

  registerFormInit(register, true);
  loadNationality();
  loadRoom(register);

  // render user field
  document.getElementById('fullname').value = user.name;
  document.getElementById('number').value = user.phoneNumber.slice(3);
  document.getElementById('address').value = user.address;
  document.getElementById('idcard').value = user.iDCard;
  document.getElementById('local-part').value = user.email.split("@")[0];

  // enable sex option
  document.getElementById('sex-options').removeAttribute('disabled')

  if (document.getElementById('update-submit'))
    document.getElementById('update-submit').onclick = function () {
      onSubmitClick(true, user);
    };
  if (document.getElementById('fb-btn'))
    document.getElementById('fb-btn').onclick = onCancelClick;

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
  document
    .getElementById('init-switch-form')
    .innerHTML = initSwitchFormHTML(room);

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
    UserProvider.update(user).then(userUpdated => {
      // re-render
      init({
        buildings: localStorage.getItem('buildings'),
        status: localStorage.getItem('status'),
        loading: true,
      });

      // auto-click on switch form cancel method
      onSwitchFormCancel();
    });
  } else {
    // render notification form
    thongBaoValidation("Room full");

    // detroy loading
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
  const argument = { buildings: localStorage.buildings, status: localStorage.status };
  let rooms = await RoomProvider.getRoomBy(
    argument.buildings,
    argument.status
  );

  const data = rooms.sort((a, b) => a.name - b.name).filter(item => item.id !== roomId);
  autocomplete(document.getElementById("switch-form-to"), data);
}

/**
 * buildings k1 click
 */
document.getElementById('buildings-k1').onclick = function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K1);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * buildings k2 click
 */
document.getElementById('buildings-k2').onclick = function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K2);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * buildings k3 click
 */
document.getElementById('buildings-k3').onclick = function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K3);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * buildings k4 click
 */
document.getElementById('buildings-k4').onclick = function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K4);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * status s1 click
 */
document.getElementById('status-s1').onclick = function () {
  onStatusFilterClick(CONSTANTS.STATUS.ALL);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * status s2 click
 */
document.getElementById('status-s2').onclick = function () {
  onStatusFilterClick(CONSTANTS.STATUS.FULL);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * status s3 click
 */
document.getElementById('status-s3').onclick = function () {
  onStatusFilterClick(CONSTANTS.STATUS.EXIST);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * status s4 click
 */
document.getElementById('status-s4').onclick = function () {
  onStatusFilterClick(CONSTANTS.STATUS.EMPTY);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive')
}

/**
 * on building filter click
 * @param {string} buildingId 
 */
function onBuildingFilterClick(buildingId) {
  localStorage.setItem('buildings', buildingId);
  const argument = {
    buildings: localStorage.getItem('buildings'),
    status: localStorage.getItem('status'),
    loading: true,
  }

  // re init
  init(argument);
}

/**
 * on status filter click
 * @param {string} status 
 */
function onStatusFilterClick(status) {
  localStorage.setItem('status', status);
  const argument = {
    buildings: localStorage.getItem('buildings'),
    status: localStorage.getItem('status'),
    loading: true,
  }

  // re init
  init(argument);
}


// FIXBUG 8: fix day by localtime

const LOCALE_TEMPLATE = {
  EN: {
    MONTH: {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
  }
}

const localRefer = {
  en: getDateInEnglishLocale,
  vi: getDateInVietnameseLocale,
}

/**
 * get date in english locale
 * @param {Date} currentDate 
 */
function getDateInEnglishLocale(currentDate) {
  let enRefers = LOCALE_TEMPLATE.EN;
  let date = currentDate.getDate();
  let stand = date == 1 ? "st" : date == 2 ? "nd" : date == 3 ? "rd" : "th";

  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();

  return `${enRefers.MONTH[month]}, ${date}${stand} ${year} `;
}

/**
 * get date in vietnam locale
 * @param {Date} currentDate 
 */
function getDateInVietnameseLocale(currentDate) {
  // let viRefers = LOCALE_TEMPLATE.VI;

  let date = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  return `Ngày ${date} /${month}/${year} `;
}

/**
 * load date at locale
 * @param {String} locale 
 */
function loadDateAtLocale(locale) {
  const dateDisplay = localRefer[locale](new Date());
  document.getElementById('today').innerHTML = dateDisplay;
}

// run load date display at locale
const locale = "en";
loadDateAtLocale(locale);