import {
  UserProvider,
  NationalityProvider,
  DantocProvider,
  RoomProvider,
  BuildingProvider,
} from '/providers/index.js';

// models

// validation
import { isNotEmpty, isEmail, isNumberPhone, isDate } from './validation.js';

import {
  autocomplete,
  loadingCall,
  loadDateAtLocale,
  loadingDestroy,
  templateInit,
  templateMember,
  loadingCardTemplate,
  formTemplate,
  initSwitchFormHTML,
  setEventOnClick,
} from '/common/methods/index.js';


// DANTOC constants
import { CONSTANTS } from '/common/utils/constant.js';
import { RoomCustom } from '/models/room-custom.model.js';


const membersElement = document.getElementById('members');
const listBoard = document.getElementById('list-name');
const tong = document.getElementById('tong');
const male = document.getElementById('male');
const female = document.getElementById('female');

localStorage.clear()

if (localStorage.getItem('buildings') == null)
  localStorage.setItem('buildings', CONSTANTS.BUILDING.K1);

if (localStorage.getItem('status') == null)
  localStorage.setItem('status', CONSTANTS.STATUS.ALL);


/**
 * preloading
 */
function preloading() {
  // preloading
  let viewIndex = document.getElementById('view-index');
  viewIndex.innerHTML = "";

  // render template loading
  for (let i = 0; i < 10; i++)
    viewIndex.innerHTML += loadingCardTemplate();
}

/**
 * init method
 */
async function init(
  argument = {
    buildings: CONSTANTS.BUILDING.K1,
    status: CONSTANTS.STATUS.ALL,
    loading: false
  }, numberPhone = localStorage.getItem('search-input-value') ? localStorage.getItem('search-input-value') : ''
) {
  // pre-process phone number
  let pn = numberPhone.replace('+84', '');
  pn = pn.replace('+856', '');
  if ((pn.length > 0) && pn[0] === "0") {
    pn = pn.slice(1);
  }

  if (argument.loading) loadingCall($("body"));
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

  // get rooms list
  let roomlist = await RoomProvider.getRoomBy(
    argument.buildings,
    argument.status
  ).then(data => {
    // console.log(data);
    // if (data.length == 0)
    //   return null;
    return data.map(item => (new RoomCustom()).toJson(item))
  });

  if (roomlist) {
    // get rooms
    let rooms = {};
    roomlist.forEach(item => {
      if (rooms[item.name[0]] == undefined) rooms[item.name[0]] = []
      rooms[item.name[0]].push(item);
    });

    let data = [];
    for (const [k, v] of Object.entries(rooms)) {
      // sort
      data.push(`<h3>${k}F</h3>
      <div style="border-bottom: 2px solid #eaeaea; width:100%">
      </div><div style="margin-top: 20px; width: 100%"></div>`
      );

      // floor 
      rooms[k] = v.sort((a, b) => parseInt(a.name) - parseInt(b.name));
      const floor = rooms[k];
      floor.forEach(room => {
        let userList = room.users;
        room.status = (userList.length == 0 ? "empty" : userList.length >= 4 ? "full" : "semi");

        if (pn.length > 0) {
          userList = userList.filter(item => {
            return item.phoneNumber.includes(pn);
          })

          if (userList.length > 0) data.push(templateInit(room, userList));
        } else {
          data.push(templateInit(room, userList));
        }

      });

      data.push(`</div><div style="margin-top: 30px; width: 100%"></div>`);
    }

    // render into viewIndex
    viewIndex.innerHTML = data.join("")

    // assign onclick
    roomlist.forEach(
      model => {
        setEventOnClick(model.id, () => onRoomClick(model))
      }
    );

    // render empty member list
    membersElement.innerHTML = "";
    listBoard.innerHTML = `Danh sách`;

    if ($('.project-box').length > 0) $('.project-box')[0].click();

    // add event into room box
    for (const key of Object.keys(rooms)) {
      // floor 
      const floor = rooms[key];
      floor.forEach(room => {
        setEventOnClick(`add-participant-${room.id}`, () => onAddButtonClick(room));
      });
    }

    // detroy loading
    if (argument.loading) loadingDestroy($("body"));
  }


}

/**
 * on add click
 * @param {RoomCustom} room
 */
function onRoomClick(room) {
  // remove selected
  $('.project-box.selected').toggleClass('selected');

  // filter user by rooom id
  let filters = room.users;
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
    if (id[1]._id) {
      id[1].id = id[1]._id;
      delete id[1]._id;
    }

    // remove user by id 
    setEventOnClick(id[2], () => onRemoveUserClick(id[1]))

    // update user by id 
    setEventOnClick(id[3], () => onUpdateUserClick(id[1]))

    // switch user by id 
    setEventOnClick(id[4], () => onRoomUpdateInitClick(id[1], room.id,))
  });

  // render room name
  listBoard.innerHTML = `Phòng ${room.name}`;

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
function resetRoomDataStorage(room) {
  console.log(room)
  let filters = room.users;
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
    registerForm.innerHTML = formTemplate(updateStatus);
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
  loadingCall($("body"));

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
    thongBaoValidation("Họ và tên không được rỗng");
    return false;
  }

  if (!isNumberPhone(model.phoneNumber)) {
    thongBaoValidation("Đây không phải là số điện thoại");
    return false;
  }

  if (!isNotEmpty(model.address)) {
    thongBaoValidation("Địa chỉ không được rỗng");
    return false;
  }

  if (!isNotEmpty(model.nationality)) {
    thongBaoValidation("Quốc tịch không được rỗng");
    return false;
  }

  if (!isNotEmpty(model.iDCard)) {
    thongBaoValidation("Mã sinh viên không được rỗng");
    return false;
  }

  if (!isDate(model.birth)) {
    thongBaoValidation("Ngày sinh không đúng định dạng");
    return false;
  }

  if (!isEmail(model.email)) {
    thongBaoValidation("Email không hợp lệ");
    return false;
  }

  if (!isNotEmpty(model.danToc)) {
    thongBaoValidation("Dân tộc không được rỗng");
    return false;
  }

  if (!isNotEmpty(model.sex)) {
    thongBaoValidation("Giới tính không được rỗng");
    return false;
  }

  if (!isNotEmpty(model.roomId)) {
    thongBaoValidation("Phòng không được rỗng");
    return false;
  }

  return true;
}

setEventOnClick('add-button', () => { onAddButtonClick(); });
setEventOnClick('switch-button', () => onSwitchButtonClick());

/**
 * on add button click
 */
function onAddButtonClick(room = undefined) {
  let roomData = JSON.parse(localStorage.getItem('room-data'));

  const initDiv = document.getElementById('init-register-form');
  const register = document.createElement('register-form');
  const sexIndex = localStorage.getItem('sex-index');

  // xử lý register form
  register.setAttribute('roomid', roomData.id);
  register.setAttribute('sex', sexIndex == null || sexIndex == 3 ? 1 : parseInt(sexIndex));
  register.setAttribute('class', "register-form");

  if (room != undefined) {
    resetRoomDataStorage(roomData);
    register.setAttribute('roomid', room.id);
  }

  const number = roomData.number;
  if (number < 4) {
    initDiv.appendChild(register);
    initialize(register);
  } else {
    thongBaoValidation("Phỏng chỉ cho phép 4 sinh viên cư trú");
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

function onEventTrigger(data, updateStatus = false, user = undefined) {
  const fullname = document.getElementById('fullname');
  const number = document.getElementById('number');
  const address = document.getElementById('address');
  const idcard = document.getElementById('idcard');
  const birth = document.getElementById('birth');
  const localPart = document.getElementById('local-part');

  // check validate
  if (validation(data)) {
    if (!updateStatus) {
      UserProvider.create(data).then((response) => {
        if (response.toString() === "null") {
          thongBaoValidation("Người dùng này đã tồn tại hãy kiểm tra lại mã sinh viên/ căn cước công dân");
        } else {
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
        }
      });
    } else {
      // merge 
      let dataKeys = Object.keys(data);
      for (let key of dataKeys) user[key] = data[key];

      // COMMENT: updated
      UserProvider.update(user).then((data) => {
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
 * on submit click
 * @param {Boolean} updateStatus
 */
function onSubmitClick(updateStatus = false, user = undefined) {
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
    role: "1",
    avatar: "images/user.png",
  };

  // event trigger
  onEventTrigger(data, updateStatus, user);
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
    setEventOnClick('submit', () => onSubmitClick(false));

  if (document.getElementById('fb-btn')) setEventOnClick('fb-btn', onCancelClick);
}


// ====================================================================================================================================================
// ====================================================================================================================================================
// ====================================================================================================================================================
// ====================================================================================================================================================

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
  setEventOnClick('switch-submit', function () {
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

  })

  // assign event function cho cancel button switch form
  setEventOnClick('switch-cancel', onSwitchFormCancel)
}

/**
 * remove user
 * @param {User} userId
 * @param {string} roomId
 */
async function onRemoveUserClick(user) {
  if (confirm('Bạn có muốn xóa user này không?')) {
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
 * on update user click
 * @param {*} user 
 */
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
    setEventOnClick('update-submit', function () { onSubmitClick(true, user); })

  if (document.getElementById('fb-btn')) setEventOnClick('fb-btn', onCancelClick)
}

/**
 * tạo form chuyển từ from room thành to room
 * @param {string} roomId
 */
async function switchRoom(roomId) {
  loadingCall($("body"));
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
  setEventOnClick(
    'switch-submit',
    function () {
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

    }
  )

  // assign event function cho cancel button switch form
  setEventOnClick('switch-cancel', onSwitchFormCancel)
}

/**
 * on switch form submit
 * @param {string} user 
 * @param {string} roomIdNeedToChanged 
 */
async function onSwitchFormSubmit(user, roomIdNeedToChanged) {
  // reset room id to change
  user.roomId = roomIdNeedToChanged;

  // lấy tất cả người dùng theo id room
  const users = (await UserProvider.getAll()).filter(item => item.roomId === roomIdNeedToChanged);

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
    thongBaoValidation("Phòng đầy");

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
  loadingCall($("body"));


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
    loadingDestroy($("body"));
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
 * switch form initialize
 */
async function switchFormInit(roomId) {
  const argument = { buildings: localStorage.buildings, status: localStorage.status };
  RoomProvider.getRoomBy(
    argument.buildings,
    argument.status
  ).then(rooms => {
    rooms = rooms.map(item => {
      if (item._id) {
        item.id = item._id;
        delete item._id;
      }

      return item;
    })

    const data = rooms.sort((a, b) => a.name - b.name).filter(item => item.id !== roomId);
    autocomplete(document.getElementById("switch-form-to"), data);
  });
}

/**
 * buildings k1 click
 */
setEventOnClick('buildings-k1', function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K1);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive');
});

/**
 * buildings k2 click
 */
setEventOnClick('buildings-k2', function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K2);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive');
});

/**
 * buildings k3 click
 */
setEventOnClick('buildings-k3', function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K3);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive');
});

/**
 * buildings k4 click
 */
setEventOnClick('buildings-k4', function () {
  onBuildingFilterClick(CONSTANTS.BUILDING.K4);
  $(".badge-filter.building").addClass("unactive")
  this.classList.toggle('unactive');
});

/**
 * status s1 click
 */
setEventOnClick('status-s1', function () {
  onStatusFilterClick(CONSTANTS.STATUS.ALL);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive');
});

/**
 * status s2 click
 */
setEventOnClick('status-s2', function () {
  onStatusFilterClick(CONSTANTS.STATUS.FULL);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive');
});

/**
 * status s3 click
 */
setEventOnClick('status-s3', function () {
  onStatusFilterClick(CONSTANTS.STATUS.EXIST);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive');
});

/**
 * status s4 click
 */
setEventOnClick('status-s4', function () {
  onStatusFilterClick(CONSTANTS.STATUS.EMPTY);
  $(".badge-filter.status").addClass("unactive")
  this.classList.toggle('unactive');
});

setEventOnClick('pn-filter', function () {
  const searchInput = document.getElementById('search-input');
  const argument = {
    buildings: localStorage.getItem('buildings'),
    status: localStorage.getItem('status'),
    loading: true,
  }

  if (searchInput.value.length == 0) localStorage.removeItem('search-input-value');
  else localStorage.setItem('search-input-value', searchInput.value)

  // re init
  init(argument, searchInput.value);
})

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

// run load date display at locale
loadDateAtLocale("en");