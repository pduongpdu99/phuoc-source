export const templateInit = (
   data,
   users,
   _status = {
      empty: { name: "Rỗng", classname: "empty" },
      semi: { name: "Có người", classname: "semi" },
      full: { name: "Đầy", classname: "full" },
   }
) => {
   const date = new Date(data.createdAt);
   const days = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
   ];

   return `
  <div class="project-box-wrapper">
     <div class="project-box ${data.status}" id="${data.id}">
        <!--<div class="project-box-header" style="width: 100%">
           <span>${days[date.getDay()]}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</span>
        </div>-->
        <div class="project-box-content-header">
           <p class="box-content-header">${data.name} room</p>
           <p class="box-content-subheader">${data.describe}</p>
        </div>
        <div class="project-box-footer">
           <div class="participants">
              ${users.map(user => `<img src='${user.avatar}' alt='${user.avatar}'>`).join("")}
              <button class="add-participant" id="add-participant-${data.id}" title="Add user">
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
export const templateMember = (memberModel) => {
   const html = new String(`
    <div class="message-box">
       <img src="images/user.png" alt="profile image">
       <div class="message-content" id="message-box-${memberModel._id}">
          <div class="message-header">
             <div class="name">${memberModel.name}</div>
          </div>
          <p class="message-line">${memberModel.email}</p>
          <p class="message-line">${memberModel.phoneNumber}</p>
          <p class="message-line">${memberModel.address}</p>
          <p class="message-line">${memberModel.sex === '1' ? "Nam" : "Nữ"}</p>
       </div>
  
      <!-- features -->
      <div>
        <!-- delete button -->
        <div class="delete-feature-button" id="delete-button-${memberModel._id}" title="Delete">
          <span class="iconify" data-icon="ant-design:user-delete-outlined"></span>
        </div>
  
        <!-- update button -->
        <div class="update-feature-button" id="update-button-${memberModel._id}" title="Update">
          <span class="iconify" data-icon="clarity:update-line"></span>
        </div>
  
        <!-- switch button -->
        <div class="switch-feature-button" id="switch-button-${memberModel._id}" title="Switch">
          <span class="iconify" data-icon="fluent:table-switch-16-filled"></span>
        </div>
      </div>
    </div>`);

   return [
      html,
      `message-box-${memberModel._id}`,
      memberModel,
      `delete-button-${memberModel._id}`,
      `update-button-${memberModel._id}`,
      `switch-button-${memberModel._id}`,
   ];
};

/**
  * loading card template
  * @returns 
  */
export const loadingCardTemplate = () => `
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

/**
 * form template
 * @param {boolean} updateStatus 
 * @returns 
 */
export const formTemplate = (updateStatus) => `
<div class="bg-dark"></div>
<div class="cont animation">
  <div class="form" id="form">
    <h2>Đơn đăng ký vào ở ký túc xá</h2>
    <label>
      <span>Họ và tên</span>
      <input type="text" id="fullname" placeholder="Nhập họ và tên"/>
    </label>
    <label>
      <span>Số điện thoại</span>
      <div class="number-field-custom">
        <select id="number-option-select"></select>
        <input type="text" id="number"  placeholder="Nhập số điện thoại"/>
      </div>
    </label>
    <label>
      <span>Địa chỉ</span>
      <input type="text" id="address" placeholder="Nhập địa chỉ"/>
    </label>
    <label>
      <span>Quốc tịch</span>
      <select id="national"></select placeholder="Nhập quốc tịch">
    </label>
    <label>
      <span>Mã sinh viên/căng cước công dân</span>
      <input type="text" id="idcard" placeholder="Nhập mã sinh viên/căn cước công dân"/>
    </label>
    <label>
      <span>Ngày sinh</span>
      <input type="date" id="birth" class="form-input datepicker" value="2000-01-01" min="1970-01-01" max="2030-01-01">
    </label>
    <label>
      <span>Địa chỉ email</span>
      <div class="email-field-custom">
        <input type="text" placeholder="Nhập email" id="local-part"/>
        <select id="domain-option-select"></select>
      </div>
    </label>
    <label>
      <span>Dân tộc</span>
      <select id="dantoc-options"></select>
    </label>
    <label>
      <span>Phòng</span>
      <select id="room-options"></select>
    </label>
    <label>
      <span>Giới tính</span>
      <select id="sex-options">
        <option value="1">Nam</option>
        <option value="2">Nữ</option>
        <option value="3">Không yêu cầu</option>
      </select>
    </label>
    ${!updateStatus ? `<button type="button" id="submit" class="submit">Register</button>` : `<button type="button" id="update-submit" class="update-submit">Cập nhật</button>`}
    <button type="button" id="fb-btn" class="fb-btn">Hủy</button>
  </div>
  <div class=" sub-cont">
    <div class="img">
      <div class="img__text m--up">
        <h2>Chào mừng</h2>
        <p>Vui mừng chào đón các bạn tới với kí tý xá trường Đại học Phạm Văn Đồng</p>
      </div>
    </div>
  </div>
</div>
`;


/**
 * switch form html init
 * @param {Room} roomModel
 * @returns
 */
export const initSwitchFormHTML = (roomModel) => {
   return `
     <div class="bg-dark"></div>
     <switch-form user="user_id" room="room_id" class="light">
        <div class="cont">
           <div class="form sign-in">
              <h2>Chuyển phòng</h2>
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
              <button type="button" class="submit" id="switch-submit">Đồng ý</button>
              <button type="button" class="fb-btn" id="switch-cancel">Hủy</button>
           </div>
        </div>
     </switch-form>
     `;
}