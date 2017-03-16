var carousel = function() {
    this.initialize();
}

carousel.prototype = {
    /* 初始化 */
    initialize: function(){
        var that = this;
        this.index = 0;
        this.timer = setInterval(function () {
            that.run(that);
        }, 2000);

        this.carousel = document.getElementById('carousel');
        this.pics = document.getElementById('pic').getElementsByTagName('li');
        this.nums = document.getElementById('num').getElementsByTagName('li');
        this.len = this.pics.length;
        this.arrowLeft = document.getElementById('arrow-left');
        this.arrowRight = document.getElementById('arrow-right');

        for(var i=0; i<this.len; ++i) {
            this.nums[i].index = i;
            //this.pics[i].style.zIndex = this.len - i;
            this.pics[i].style.zIndex = 1;
        }
        this.pics[0].style.zIndex = 2;


        for(var i=0; i<this.len; ++i) {
            this.nums[i].onmouseover = function () {
                clearInterval(that.timer);
                that.changeStatus(that.index, this.index);
            }
        }

        this.arrowLeft.onclick = function () {
            var oldIndex = that.index;

            that.index--;
            if(that.index < 0) {
                that.index = that.len - 1;
            }
            that.changeStatus(oldIndex, that.index);
        }

        this.arrowRight.onclick = function () {
            var oldIndex = that.index;

            that.index++;
            if(that.index >= that.len) {
                that.index = 0;
            }

            that.changeStatus(oldIndex, that.index);
        }

        this.carousel.onmouseover = function () {
            clearInterval(that.timer);
        }

        this.carousel.onmouseout = function () {
            that.timer = setInterval(function () {
                that.run(that);
            }, 2000);
        }
    },
    start: function () {
        var that = this;
        this.timer = setInterval(function () {
            that.run(that);
        }, 2000);
    },
    stop: function () {
        clearInterval(this.timer);
    },
    run: function (that) {
        var oldIndex = that.index;

        that.index++;
        if(that.index >= that.len) {
            that.index = 0;
        }

        that.changeStatus(oldIndex, that.index);
    },
    changeStatus: function (oldIndex, curIndex) {
        this.pics[oldIndex].style.opacity = '0';
        this.nums[oldIndex].className = '';
        this.pics[oldIndex].style.zIndex = 1;

        this.pics[curIndex].style.opacity = '1';
        this.nums[curIndex].className = 'active';
        this.pics[curIndex].style.zIndex = 2;
        this.index = curIndex;
    }
}