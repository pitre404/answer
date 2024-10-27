
    
    var items = document.getElementsByClassName('item');

    for (var i = 0; i < items.length; i++) {

        var item = items[i];
        var frame = item.getElementsByClassName('frame')[0];
        var frontBox = frame.getElementsByClassName('front')[0];
        var leftBox = frame.getElementsByClassName('left')[0];
        var rightBox = frame.getElementsByClassName('right')[0];

        frontBox.style.backgroundImage = 'url(./images/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
        leftBox.style.backgroundImage = 'url(./images/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
        rightBox.style.backgroundImage = 'url(./images/' + (i + 1).toString().padStart(2, '0') + '.jpg)';
    }
    (function () {
        "use strict";
        var shell = document.getElementsByClassName('shell')[0];
        var slider = shell.getElementsByClassName('shell_slider')[0];
        var items = shell.getElementsByClassName('item');
        var prevBtn = shell.getElementsByClassName('prev')[0];
        var nextBtn = shell.getElementsByClassName('next')[0];

        var width, height, totalWidth, margin = 20,
            currIndex = 0,
            interval, intervalTime = 3000;
        function init() {

            resize();
            move(Math.floor(items.length / 2));
            bindEvents();
            timer();
        }
        function resize() {

            width = Math.max(window.innerWidth * .20, 275);
            height = window.innerHeight * .17;
            totalWidth = width * items.length;

            slider.style.width = totalWidth + "px";

            for (var i = 0; i < items.length; i++) {
                let item = items[i];
                item.style.width = (width - (margin * 2)) + "px";
                item.style.height = height + "px";
            }
        }
        function bindEvents() {

            window.onresize = resize;

            prevBtn.addEventListener('click', () => { prev(); });
            nextBtn.addEventListener('click', () => { next(); });
        }
        init();
        function move(index) {

            if (index < 1) index = items.length;
            if (index > items.length) index = 1;
            currIndex = index;

            for (var i = 0; i < items.length; i++) {
                let item = items[i],
                    box = item.getElementsByClassName('frame')[0];
                if (i == (index - 1)) {

                    item.classList.add('item--active');
                    box.style.transform = "perspective(1200px)";
                } else {

                    item.classList.remove('item--active');
                    box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
                }
            }

            slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";

            var frontBox = items[index - 1].getElementsByClassName('front')[0];
            document.body.style.backgroundImage = frontBox.style.backgroundImage;
        }
        function timer() {

            clearInterval(interval);
            interval = setInterval(() => {
                move(++currIndex);
            }, intervalTime);
        }

        function prev() {
            move(--currIndex);
            timer();
        }
        function next() {
            move(++currIndex);
            timer();
        }
    })();