function def_alert(string,duration) {
    if ($(window).width() < 700){layout = 'topCenter'}else{layout = 'topRight'}
    new Noty({
        type: 'success',
        layout : layout,
        theme: 'nest',
        text: string,        
        timeout: duration,
        progressBar : true,
        animation: {
            open: function (promise) {
                var n = this;
                new Bounce()
                    .translate({
                        from     : {x: 450, y: 0}, to: {x: 0, y: 0},
                        easing   : "bounce",
                        duration : 1000,
                        bounces  : 4,
                        stiffness: 3
                    })
                    .scale({
                        from     : {x: 1.2, y: 1}, to: {x: 1, y: 1},
                        easing   : "bounce",
                        duration : 1000,
                        delay    : 100,
                        bounces  : 4,
                        stiffness: 1
                    })
                    .scale({
                        from     : {x: 1, y: 1.2}, to: {x: 1, y: 1},
                        easing   : "bounce",
                        duration : 1000,
                        delay    : 100,
                        bounces  : 6,
                        stiffness: 1
                    })
                    .applyTo(n.barDom, {
                        onComplete: function () {
                            promise(function(resolve) {
                                resolve();
                            })
                        }
                    });
            },
            close: function (promise) {
                var n = this;
                new Bounce()
                    .translate({
                        from     : {x: 0, y: 0}, to: {x: 450, y: 0},
                        easing   : "bounce",
                        duration : 500,
                        bounces  : 4,
                        stiffness: 1
                    })
                    .applyTo(n.barDom, {
                        onComplete: function () {
                            promise(function(resolve) {
                                resolve();
                            })
                        }
                    });
            }
        }
    }).show();

}
/*
.##........#######.....###....########..####.##....##..######..
.##.......##.....##...##.##...##.....##..##..###...##.##....##.
.##.......##.....##..##...##..##.....##..##..####..##.##.......
.##.......##.....##.##.....##.##.....##..##..##.##.##.##...####
.##.......##.....##.#########.##.....##..##..##..####.##....##.
.##.......##.....##.##.....##.##.....##..##..##...###.##....##.
.########..#######..##.....##.########..####.##....##..######..
*/
function loading(status,ele,blur=false) { 
    if (status == true) {
        var ele_loading = '<div class="all-loading"><div class="loading-bar bar1"></div><div class="loading-bar bar2"></div><div class="loading-bar bar3"></div><div class="loading-bar bar4"></div></div>';
        var ele_blur = '<div class="blur-bg"></div>';

        if (blur == true) {
            var ele_loading = ele_loading + ele_blur;
        }
        $(ele).append(ele_loading);

    } else if(status == false){
        $(ele).find('.blur-bg').fadeOut(200);
        $(ele).find('.all-loading').fadeOut(200);
    }
}
