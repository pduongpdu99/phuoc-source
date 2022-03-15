const templateData = [
    [
        [
            { name: "101", status: "0", },
            { name: "102", status: "0", },
            { name: "103", status: "0", },
            { name: "104", status: "0", },
            { name: "105", status: "0", },
            { name: "106", status: "0", },
            { name: "107", status: "0", },
            { name: "108", status: "0", },
            { name: "109", status: "0", },
            { name: "110", status: "0", },
        ],
        [
            { name: "201", status: "0", },
            { name: "202", status: "0", },
            { name: "203", status: "0", },
            { name: "204", status: "0", },
            { name: "205", status: "0", },
            { name: "206", status: "0", },
            { name: "207", status: "0", },
            { name: "208", status: "0", },
            { name: "209", status: "0", },
            { name: "210", status: "0", },
        ],
        [
            { name: "301", status: "0", },
            { name: "302", status: "0", },
            { name: "303", status: "0", },
            { name: "304", status: "0", },
            { name: "305", status: "0", },
            { name: "306", status: "0", },
            { name: "307", status: "0", },
            { name: "308", status: "0", },
            { name: "309", status: "0", },
            { name: "310", status: "0", },
        ],
        [
            { name: "401", status: "0", },
            { name: "402", status: "0", },
            { name: "403", status: "0", },
            { name: "404", status: "0", },
            { name: "405", status: "0", },
            { name: "406", status: "0", },
            { name: "407", status: "0", },
            { name: "408", status: "0", },
            { name: "409", status: "0", },
            { name: "410", status: "0", },
        ]
    ],

    [
        [
            { name: "501", status: "0", },
            { name: "502", status: "0", },
            { name: "503", status: "0", },
            { name: "504", status: "0", },
            { name: "505", status: "0", },
            { name: "506", status: "0", },
            { name: "507", status: "0", },
            { name: "508", status: "0", },
            { name: "509", status: "0", },
            { name: "510", status: "0", },
        ],
        [
            { name: "601", status: "0", },
            { name: "602", status: "0", },
            { name: "603", status: "0", },
            { name: "604", status: "0", },
            { name: "605", status: "0", },
            { name: "606", status: "0", },
            { name: "607", status: "0", },
            { name: "608", status: "0", },
            { name: "609", status: "0", },
            { name: "610", status: "0", },
        ],
        [
            { name: "701", status: "0", },
            { name: "702", status: "0", },
            { name: "703", status: "0", },
            { name: "704", status: "0", },
            { name: "705", status: "0", },
            { name: "706", status: "0", },
            { name: "707", status: "0", },
            { name: "708", status: "0", },
            { name: "709", status: "0", },
            { name: "710", status: "0", },
        ],
        [
            { name: "801", status: "0", },
            { name: "802", status: "0", },
            { name: "803", status: "0", },
            { name: "804", status: "0", },
            { name: "805", status: "0", },
            { name: "806", status: "0", },
            { name: "807", status: "0", },
            { name: "808", status: "0", },
            { name: "809", status: "0", },
            { name: "810", status: "0", },
        ]
    ]
];

const statusRefers = [
    'notFull-room',
    'select-room ',
    'full-room',
    'still-room',
]

function init() {
    let containerMale = document.getElementById('container-male');
    let containerFemale = document.getElementById('container-female');

    containerMale.innerHTML = templateData[0].map(item => {
        return `<div class="row">
        ${item.map(content => `<div class="room ${statusRefers[content.status]}" onclick="choiceEvent(this)">${content.name}</div>`).join('')}
     </div>`;
    }).join('');

    containerFemale.innerHTML = templateData[1].map(item => {
        return `<div class="row">
        ${item.map(content => `<div class="room ${statusRefers[content.status]}" onclick="choiceEvent(this)">${content.name}</div>`).join('')}
     </div>`;
    }).join('');
}

function choiceEvent(element) {
    let className = element.getAttribute('class');
    className = ['room', statusRefers[1]].join(' ');

    Array.from(
        document.getElementsByClassName('room')
    ).forEach(
        room => room.setAttribute('class', ['room', statusRefers[0]].join(' '))
    );
    element.setAttribute('class', className);
}

init();