import {
  UserProvider,
  NationalityProvider,
  DantocProvider,
  RoomProvider,
} from '/providers/index.js';

import {
  isNotEmpty,
  isEmail,
  isNumberPhone,
  isDate
} from './validation.js';

const loadingType = "spinner";

let loadQuocTich = false;
let loadDanToc = false;
let loadPhong = false;

function registerFormInit() {
  const registerForm = document.getElementsByTagName('register-form')[0];

  if (registerForm != undefined) {
    registerForm.innerHTML = `
    <div class="bg-dark"></div>
    <div class="cont animation">
      <div class="form" id="form">
        <h2>Đơn đăng ký vào ở ký túc xá</h2>
        <label>
          <span>Fullname</span>
          <input type="text" id="fullname"/>
        </label>
        <label>
          <span>Number</span>
          <input type="text" id="number" />
        </label>
        <label>
          <span>Address</span>
          <input type="text" id="address" />
        </label>
        <label>
          <span>Nationality</span>
          <select id="national"></select>
        </label>
        <label>
          <span>Số CNND/CCCD/StudentID</span>
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
          <span>Ethnic</span>
          <select id="dantoc-options"></select>
        </label>
        <label>
          <span>Room</span>
          <select id="room-options">
          </select>
        </label>
        <button type="button" id="submit" class="submit">Register</button>
        <button type="button" id="fb-btn" class="fb-btn">Cancel</button>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>Welcome to Dormitory of PDU</h2>
            <p>Vui mừng chào đón các bạn tới với kí tý xá trường Đại học Phạm Văn Đồng</p>
          </div>
        </div>
      </div>
    </div>
    `;

    if (document.getElementById('submit'))
      document.getElementById('submit').onclick = onSubmitClick;
    if (document.getElementById('fb-btn'))
      document.getElementById('fb-btn').onclick = onCancelClick;
  }
}

function loadingCall() {
  $('body').loadingModal({ text: 'Loading...' });
  $('body').loadingModal('animation', loadingType);
}

/**
 * load data room
 */
function loadRoom() {
  RoomProvider.getAll().then(rooms => {
    let roomOptions = document.getElementById('room-options');

    rooms = rooms.sort((a, b) => {
      return parseInt(a.name) - parseInt(b.name);
    });

    if (roomOptions)
      roomOptions.innerHTML = rooms
        .map(room => `<option value="${room.id}">${room.name}</option>`)
        .join('');


    if (registerForm != undefined && registerForm.attributes['roomid']) {
      if (roomOptions)
        roomOptions.value = registerForm.attributes['roomid'].value
    } else {
      if (rooms.length > 0)
        if (roomOptions)
          roomOptions.value = rooms[0].id
    }

    loadPhong = true;
  });
}

/**
 * load data quốc tịch
 */
function loadNationality() {
  NationalityProvider.getAll().then(nationalities => {
    let national = document.getElementById('national');

    if (national)
      national.innerHTML = nationalities
        .map(room => `<option value="${room.id}">${room.name}</option>`)
        .join('');
    loadQuocTich = true;
    onLoadDanToc().then(() => {
      loadDanToc = true;
    });
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
      if (dantocOpts)
        dantocOpts.innerHTML = dantocs
          .filter(dantoc => dantoc.nationality === national.value)
          .map(dantoc => `<option value="${dantoc.id}">${dantoc.name}</option>`)
          .join('');
  });
}

function onNationalChange() {
  loadingCall();
  onLoadDanToc().then(() => {
    $('body').loadingModal('destroy')
  });
}

if (document.getElementById('national'))
  document.getElementById('national').onchange = onNationalChange;

function thongBaoValidation(value) {
  alert(value);
}

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
    sex: registerForm.attributes['sex'] ? registerForm.attributes['sex'].value : 1,
    role: 1,
    avatar: "images/user.png",
  };

  if (validation(data)) {
    $('body').loadingModal({ text: 'User creating...' });
    $('body').loadingModal('animation', loadingType);
    UserProvider.create(data).then((data) => {
      $('body').loadingModal('destroy');

      fullname.value = "";
      number.value = "";
      address.value = "";
      idcard.value = "";
      birth.value = "";
      email.value = "";
    });
  }
}
function onCancelClick() {
  document.getElementsByTagName('register-form')[0].classList.add('hide')
}

function initialize() {
  registerFormInit();
  loadRoom();
  loadNationality();
}
initialize();
