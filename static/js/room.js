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

import {
    DANTOC
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
    <div class="message-box" id="message-box-${memberModel.id}">
       <img src="images/user.png" alt="profile image">
       <div class="message-content">
          <div class="message-header">
             <div class="name">${memberModel.name}</div>
          </div>
          <p class="message-line">${memberModel.email}</p>
          <p class="message-line">${memberModel.phoneNumber}</p>
          <p class="message-line">${memberModel.address}</p>
       </div>
    </div>
    `.trim();
    return [html, `message-box-${memberModel.id}`, memberModel];
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

async function init() {
    // load sĩ số
    UserProvider.getSiSo().then(data => {
        let maleNum = parseInt(data['1']);
        let femaleNum = parseInt(data['2']);

        tong.innerHTML = maleNum + femaleNum;
        male.innerHTML = maleNum;
        female.innerHTML = femaleNum;
    });

    let viewIndex = document.getElementById("view-index");

    const gender = 0;
    const buildings = 0;

    // get all user list
    const users = await UserProvider.getAll();

    // get rooms list 
    const roomlist = await RoomProvider.getRoomBy(gender, buildings);

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
        ids.push([content[1], content[2]]);
        return content[0];
    }).join('');

    // gán onclick vào thành viên mỗi room
    ids.forEach(id => {
        document.getElementById(id[0]).onclick = () => roomUpdateInit(
            id[1],
            room.id,
        );
    })


    listBoard.innerHTML = `${room.name}`;
    document.getElementById(room.id).classList.toggle('selected');

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
                dantocOpts.value = DANTOC.KINH;
                document.getElementById(DANTOC.KINH).setAttribute('selected', 'true');
            }

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

document.getElementById('add-button').onclick = function () {
    let roomData = localStorage.getItem('room-data');
    roomData = JSON.parse(roomData);

    // xử lý register form
    const initDiv = document.getElementById('init-register-form');
    const register = document.createElement('register-form');

    register.setAttribute('roomid', roomData.id);
    register.setAttribute('sex', 1);
    register.setAttribute('class', "register-form");
    initDiv.appendChild(register);
    initialize(register);
};

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
    const sex = document.getElementsByClassName('register-form')[0].getAttribute('sex');

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
        // sex: registerForm.attributes['sex'] ? registerForm.attributes['sex'].value : 1,
        sex: sex,
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
    document.getElementById('init-register-form').innerHTML = "";
}

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

// tạo form chuyển phòng cho user
function roomUpdateInit(userId, roomId) {
    console.log(
        userId,
        roomId
    )
}