window.addEventListener('DOMContentLoaded', () => {
    const open = document.querySelector('#cart');
    const wordsWrapper = document.querySelector('.words__wrapper');
    var id;
    const openBtn = document.querySelector('.memory__btn'),
        close = document.querySelector('.cart__close'),

        memory_cart = document.querySelector('.cart');
    const loadContent = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => createElement(json.words));
        callback();
    };

    function createElement(arr) {
        arr.forEach(function (item) {
            let card = document.createElement('div');
            card.classList.add('words__item');
            card.innerHTML = `
                   <div class="words__eng">
                       ${item.eng}
                    </div>
                    <div class="words__rus">
                        <span>${item.rus}</span>
                    </div>
                    <tr>
                    <td><button class="to_learn__btn">В словарь</button></td>
                    <td><button class="learnt__btn">Знаю</button></td>
                    </tr>
        `;
            wordsWrapper.appendChild(card);
        });

    };

    function closeCart() {
        close.addEventListener('click', () => {
            memory_cart.style.display = 'none';
            document.body.style.overflow = '';
            clearInterval(id);
        });

    }

    function createElementForCart(arr) {

        const wordsTitle = document.querySelector('.cart__title');
        let startBtn = document.createElement('div');
        startBtn.innerHTML = '<button class="start__btn">Старт</button>';
        let mins = document.createElement('div');
        mins.classList.add('minutes');
        mins.innerHTML = 'Длительность в минутах: <input type=number class="raz" id="mins" value="1" min="1" max="6">';
        startBtn.addEventListener('click', () => {
            onStartClick(arr);
        });
        wordsTitle.appendChild(startBtn);
        wordsTitle.appendChild(mins);

        openBtn.addEventListener('click', () => {
            memory_cart.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });


    };

    async function openMemoryCart(url) {
        await fetch(url)
            .then(response => response.json())
            .then(json => createElementForCart(json.words));
    }

    loadContent('js/db.json',
        () => {
            openMemoryCart('js/db.json');
            closeCart();
        });


    function onStartClick(arr) {


        id = setInterval(showWord, 100);
        let stop = document.querySelector('.raz');
        let stopTime = stop.valueAsNumber * 60000;
        console.log(stopTime);
        setTimeout(function () {
            clearInterval(id);
            let wCoup = memory_cart.querySelector('.word_couple');
            wCoup.innerText = "";
        }, stopTime);

        function showWord() {
            let wCoup = memory_cart.querySelector('.word_couple');
            let cartWrapper = document.querySelector('.cart__wrapper');
            wCoup.remove();
            let w = document.createElement("div");
            w.classList.add('word_couple');
            let word = arr[Math.floor(Math.random() * arr.length)];
            let h = document.createElement('h1');
            let rotation = Math.round((Math.random() * 60)) - 30;
            h.style.transform = `rotate(${rotation}deg)`;
            h.style.webkitTransform = `rotate(${rotation}deg)`;
            h.style.mozTransform = `rotate(${rotation}deg)`;
            h.style.oTransform = `rotate(${rotation}deg)`;
            h.innerText = word.eng + ' - ' + word.rus;
            w.appendChild(h);
            cartWrapper.appendChild(w);
        }
    }
});

//
//
//             // function showConfirm() {
//             //     confirm.style.display = 'block';
//             //     let counter = 100;
//             //     const id = setInterval(frame, 10);
//             //
//             //     function frame() {
//             //         if (counter == 10) {
//             //             clearInterval(id);
//             //             confirm.style.display = 'none';
//             //
//             //         } else {
//             //             counter--;
//             //             confirm.style.transform = `translateY(-${counter}px)`;
//             //             confirm.style.opacity = '.' + counter;
//             //         }
//             //
//             //     }
//             // }
//
//
//       //  }
//     )
// });

//
// var a;
// fetch('https://api-football-v1.p.mashape.com/leagues', {
//     headers: {
//         "X-Mashape-Key": "4UUu9YH9M1mshzEpnUwMzCwZ7Kr9p1zShpXjsndn50fifuusMu"
//     }
// })
//     .then(response => response.json())
//     .then(json => {
//         console.log(json)
//     });


// const example = {username: "ashamaz"};
//
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "POST",
//     body: JSON.stringify(example)
// })
//     .then(response => response.json())
//     .then(json => console.log(json))

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))