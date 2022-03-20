const registerForm = document.getElementsByTagName('register-form');
const nationality = [
  { id: 1, name: 'Việt Nam' },
  { id: 2, name: 'Lào' },
]

const danToc = [
  { id: 'dtoc-0101', name: 'Kinh', nationality: 1 },
  { id: 'dtoc-0102', name: 'Lào', nationality: 2 },
  { id: 'dtoc-0103', name: 'Êđê', nationality: 1 },
  { id: 'dtoc-0104', name: 'Mông', nationality: 1 }
];

const roomOptions = [
  { id: 'room-0101', value: '101' },
  { id: 'room-0102', value: '102' },
  { id: 'room-0103', value: '103' },
  { id: 'room-0104', value: '104' },
  { id: 'room-0105', value: '105' },
];

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
import UserProvider from '/providers/user.provider.js';
import UserProvider from '/providers/rooms.provider.js';

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