const registerForm = document.getElementsByTagName('register-form');

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
          <select id="national">
            <option value="1">Việt</option>
            <option value="2">Lào</option>
          </select>
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
          <select id="dantoc-options">
            <option value="1">Kinh</option>
            <option value="2">Lào</option>
            <option value="3">Êđê</option>
            <option value="4">Mông</option>
          </select>
        </label>
        <label>
          <span>Phòng</span>
          <select id="room-options">
            <option value="1">101</option>
            <option value="2">102</option>
            <option value="3">103</option>
            <option value="4">104</option>
            <option value="5">105</option>
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
  DantocProvider,
  RoomProvider,
} from '/providers/index.js';

const nationality = [
  { id: 1, name: 'Việt Nam' },
  { id: 2, name: 'Lào' },
]

const danToc = ["Bana", "Bố y", "Brâu", "Bru-vân kiều", "Chăm", "Chơ ro", "Chu-ru", "Chứt", "Co", "Cơ ho", "Cờ lao", "Cơ tu", "Cống", "Dao", "Ê-đê", "Gia rai", "Giáy", "Gié-triêng", "Hà nhì", "Hoa", "Hrê", "Kháng", "Khmer", "Khơ mú", "La chí", "La ha", "La hủ", "Lào", "Lô lô", "Lự", "Mạ", "Mảng", "Mnông", "Mông", "Mường", "Ngái", "Nùng", "Ơ đu", "Pà thẻn", "Phù lá", "Pu péo", "Ra glay", "Rơ măm", "Sán chay", "Sán dìu", "Si la", "Tà ôi", "Tày", "Thái", "Thổ", "Kinh", "Xinh mun", "Xơ đăng", "Xtiêng"];
danToc.forEach(dt => {
  const body = {
    name: dt,
    nationality: "623736b36f608d84c08460fd"
  };
  DantocProvider.create(body)
})
/**
 * load data room
 */
RoomProvider.getAll().then(rooms => {
  let roomOptions = document.getElementById('room-options');

  rooms = rooms.sort((a, b) => {
    return parseInt(a.name) - parseInt(b.name);
  });

  roomOptions.innerHTML = rooms
    .map(room => `<option value="${room.id}">${room.name}</option>`)
    .join('');
});

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
  UserProvider.create(data).then((data) => console.log(data));
}

function onCancelClick() {

}