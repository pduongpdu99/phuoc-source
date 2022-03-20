const registerForm = document.getElementsByTagName('register-form');
const loadingType = "spinner";

let loadQuocTich = false;
let loadDanToc = false;
let loadPhong = false;

if (registerForm != undefined && registerForm.length > 0) {
  registerForm[0].innerHTML = `
    <div class="bg-dark"></div>
    <div class="cont animation">
      <div class="form">
        <h2>Đơn đăng ký vào ở ký túc xá</h2>
        <label>
          <span>Họ và tên</span>
          <input type="text" id="fullname" />
        </label>
        <label>
          <span>Số điện thoại</span>
          <input type="text" id="number" />
        </label>
        <label>
          <span>Địa chỉ</span>
          <input type="text" id="address" />
        </label>
        <label>
          <span>Quốc tịch</span>
          <select id="national"></select>
        </label>
        <label>
          <span>Số CNND/CCCD/Mã SV</span>
          <input type="text" id="idcard"/>
        </label>
        <label>
          <span>Ngày sinh</span>
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
          <span>Phòng</span>
          <select id="room-options">
          </select>
        </label>
        <label>
          <span>Giới tính</span>
          <select id="gender">
            <option value="1">Nam</option>
            <option value="2">Nữ</option>
            <option value="3">Khác</option>
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
}

document.getElementById('submit').onclick = onSubmitClick;
document.getElementById('fb-btn').onclick = onCancelClick;

import {
  UserProvider,
  NationalityProvider,
  DantocProvider,
  RoomProvider,
} from '/providers/index.js';

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

    roomOptions.innerHTML = rooms
      .map(room => `<option value="${room.id}">${room.name}</option>`)
      .join('');

    loadPhong = true;
  });
}

/**
 * load data quốc tịch
 */
function loadNationality() {
  NationalityProvider.getAll().then(nationalities => {
    let national = document.getElementById('national');

    national.innerHTML = nationalities
      .map(room => `<option value="${room.id}">${room.name}</option>`)
      .join('');
    loadQuocTich = true;
    onLoadDanToc().then(() => {
      loadDanToc = true;

      if (loadQuocTich == true && loadPhong == true && loadDanToc == true)
        $('body').loadingModal('destroy')
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

    dantocOpts.innerHTML = dantocs
      .filter(dantoc => dantoc.nationality === national.value)
      .map(dantoc => `<option value="${dantoc.id}">${dantoc.name}</option>`)
      .join('');
  });
}

function init() {
  loadingCall();
  loadRoom();
  loadNationality();
}
init();

function onNationalChange() {
  loadingCall();
  onLoadDanToc().then(() => $('body').loadingModal('destroy'));
}

document.getElementById('national').onchange = onNationalChange;

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
  const gender = document.getElementById('gender');

  const data = {
    name: fullname.value,
    phoneNumber: number.value,
    address: address.value,
    nationality: national.value,
    iDCard: idcard.value,
    birth: birth.value,
    email: email.value,
    danToc: dantocOptions.value,
    roomId: roomOptions.value,
    sex: gender.value,
    role: 1,
    avatar: "images/user.png",
  };

  $('body').loadingModal({ text: 'User creating...' });
  $('body').loadingModal('animation', loadingType);
  UserProvider.create(data).then((data) => $('body').loadingModal('destroy'));
}

function onCancelClick() {

}