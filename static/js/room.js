const templateData = [
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
];

const statusRefers = [
    'notFull-room',
    'select-room ',
    'full-room',
    'still-room',
]

function init() {
    let container = document.getElementById('container');
    const elements = templateData.map(item => {

        return `<div class="row">
        ${item.map(content => `<div class="room ${statusRefers[content.status]}" onclick="choiceEvent(this)">${content.name}</div>`).join('')}
     </div>`;
    });
    container.innerHTML = elements.join('');
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