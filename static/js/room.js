// const fs = require("fs");
const rooms = [
    {
        "id": "room-0101",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "empty",
        "user_number": 0,
        "name": "101",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0102",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "semi",
        "user_number": 2,
        "name": "102",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0103",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "semi",
        "user_number": 2,
        "name": "103",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0104",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "empty",
        "user_number": 0,
        "name": "104",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0105",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "empty",
        "user_number": 0,
        "name": "105",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0106",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "empty",
        "user_number": 0,
        "name": "106",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0107",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "empty",
        "user_number": 0,
        "name": "107",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0108",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "full",
        "user_number": 4,
        "name": "108",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0109",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "empty",
        "user_number": 0,
        "name": "109",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0110",
        "register_createdAt": "December 10, 2020",
        "floorId": "1",
        "status": "empty",
        "user_number": 0,
        "name": "110",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0201",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "empty",
        "user_number": 0,
        "name": "201",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0202",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "semi",
        "user_number": 2,
        "name": "202",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0203",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "semi",
        "user_number": 2,
        "name": "203",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0204",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "empty",
        "user_number": 0,
        "name": "204",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0205",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "empty",
        "user_number": 0,
        "name": "205",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0206",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "empty",
        "user_number": 0,
        "name": "206",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0207",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "empty",
        "user_number": 0,
        "name": "207",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0208",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "full",
        "user_number": 4,
        "name": "208",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0209",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "empty",
        "user_number": 0,
        "name": "209",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0210",
        "register_createdAt": "December 10, 2020",
        "floorId": "2",
        "status": "empty",
        "user_number": 0,
        "name": "210",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0301",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "empty",
        "user_number": 0,
        "name": "301",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0302",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "semi",
        "user_number": 2,
        "name": "302",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0303",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "semi",
        "user_number": 2,
        "name": "303",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0304",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "empty",
        "user_number": 0,
        "name": "304",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0305",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "empty",
        "user_number": 0,
        "name": "305",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0306",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "empty",
        "user_number": 0,
        "name": "306",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0307",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "empty",
        "user_number": 0,
        "name": "307",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0308",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "full",
        "user_number": 4,
        "name": "308",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0309",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "empty",
        "user_number": 0,
        "name": "309",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0310",
        "register_createdAt": "December 10, 2020",
        "floorId": "3",
        "status": "empty",
        "user_number": 0,
        "name": "310",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0401",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "empty",
        "user_number": 0,
        "name": "401",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0402",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "semi",
        "user_number": 2,
        "name": "402",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0403",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "semi",
        "user_number": 2,
        "name": "403",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0404",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "empty",
        "user_number": 0,
        "name": "404",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0405",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "empty",
        "user_number": 0,
        "name": "405",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0406",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "empty",
        "user_number": 0,
        "name": "406",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0407",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "empty",
        "user_number": 0,
        "name": "407",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0408",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "full",
        "user_number": 4,
        "name": "408",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0409",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "empty",
        "user_number": 0,
        "name": "409",
        "describe": "Ký túc xá Phạm Văn Đồng"
    },
    {
        "id": "room-0410",
        "register_createdAt": "December 10, 2020",
        "floorId": "4",
        "status": "empty",
        "user_number": 0,
        "name": "410",
        "describe": "Ký túc xá Phạm Văn Đồng"
    }
];


const users = [
    {
        "id": "user-00001",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 2,
        "email": "abc@gmail.com",
        "roomId": "room-0101"
    },
    {
        "id": "user-000010",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 2,
        "email": "abc@gmail.com",
        "roomId": "room-0102"
    },
    {
        "id": "user-00002",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 2,
        "email": "abc@gmail.com",
        "roomId": "room-0103"
    },
    {
        "id": "user-00003",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 2,
        "email": "abc@gmail.com",
        "roomId": "room-0104"
    },
    {
        "id": "user-00004",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 1,
        "email": "abc@gmail.com",
        "roomId": "room-0101"
    },
    {
        "id": "user-00005",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 1,
        "email": "abc@gmail.com",
        "roomId": "room-0102"
    },
    {
        "id": "user-00006",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 1,
        "email": "abc@gmail.com",
        "roomId": "room-0102"
    },
    {
        "id": "user-00007",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 1,
        "email": "abc@gmail.com",
        "roomId": "room-0103"
    },
    {
        "id": "user-00008",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 2,
        "email": "abc@gmail.com",
        "roomId": "room-0103"
    },
    {
        "id": "user-00009",
        "role": 1,
        "name": "Phạm Dương",
        "number": "số điện thoại tượng chưng",
        "address": "Địa chỉ tượng chưng",
        "avatar": "images/user.png",
        "nationality": "Việt Nam",
        "iDCard": "17d480201006",
        "birth": "1999-05-11",
        "sex": 2,
        "email": "abc@gmail.com",
        "roomId": "room-0102"
    }
];

const floorRooms = rooms.reduce(function (r, a) {
    r[a.floorId] = r[a.floorId] || [];
    r[a.floorId].push(a);
    return r;
}, Object.create(null));

const filterUsersByRoom = (roomId) => {
    let results = [];
    users.forEach(function (a) {
        if (a.roomId === roomId) results.push(a);
    });
    return results;
}

const filterUsersBySex = (sex) => {
    let results = [];
    users.forEach(function (a) {
        if (a.sex === sex) results.push(a);
    });
    return results;
}

const membersElement = document.getElementById('members');
const listBoard = document.getElementById('list-name');

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
   <div class="project-box ${data.status}" id="${data.id}" onclick="select(${JSON.stringify({ id: data.id, name: data.name }).replace(/"/g, "'")})">
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


const templateMember = (memberModel = { name: "Phạm Dương", email: "pduongpdu99@gmail.com", number: "0932443314", address: "1004 Quang Trung, TP. Quảng Ngãi" }) => `
<div class="message-box">
   <img src="images/user.png" alt="profile image">
   <div class="message-content">
      <div class="message-header">
         <div class="name">${memberModel.name}</div>
      </div>
      <p class="message-line">${memberModel.email}</p>
      <p class="message-line">${memberModel.number}</p>
      <p class="message-line">${memberModel.address}</p>
   </div>
</div>
`;

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

function init() {
    let viewIndex = document.getElementById("view-index");
    let results = [];

    const floors = Object.keys(floorRooms);


    let data = [];
    for (let floorIndex = 0; floorIndex < floors.length; floorIndex += 1) {
        const floor = floorRooms[floorIndex + 1];
        data.push(`
            <h3>${floorIndex + 1}F</h3>
            <div style="border-bottom: 2px solid #eaeaea; width:100%">
            </div><div style="margin-top: 20px; width: 100%"></div>`
        );

        // re-update status
        floor.forEach(room => {
            let users = filterUsersByRoom(room.id);
            room.status = users.length == 0 ? "empty" : users.length >= 4 ? "full" : "semi";
            data.push(templateInit(room, users));
        })

        data.push(`
            </div><div style="margin-top: 30px; width: 100%"></div>`
        );
    }
    results.push(data.join(""))
    viewIndex.innerHTML = results.join("")

    tong.innerHTML = users.length;
    male.innerHTML = filterUsersBySex(2).length;
    female.innerHTML = filterUsersBySex(1).length;
}

function select(room) {
    let users = filterUsersByRoom(room.id);
    membersElement.innerHTML = users.map(user => templateMember(user)).join('');
    listBoard.innerHTML = `${room.name} Room`;

    // remove selected
    $('.project-box.selected').toggleClass('selected')
    document.getElementById(room.id).classList.toggle('selected');
}

init();
select({
    id: 'room-0101',
    name: '101'
})