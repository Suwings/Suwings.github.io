let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}

//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Graphics = PIXI.Graphics;

//hello
PIXI.utils.sayHello(type)

//Create a Pixi Application
let app = new Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,     // default: 1
    // backgroundColor: 0x1099bb
    backgroundColor: 0x272d37
}
);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
console.log(app)

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//资源加载器
loader
    .add("images/a.jpg")
    .add("images/1.png")
    .add("images/2.png")
    .add("images/3.png")
    .add("images/4.png")
    .add("images/5.png")
    .add("images/6.png")
    .on("progress", loadProgressHandler)
    .load(setup);

//纹理缓存别名
let TextureCache = PIXI.utils.TextureCache;
let LoopState = () => { };

//加载完毕之后事件
function setup() {
    let cat = new Sprite(
        resources["images/a.jpg"].texture
    );
    // SuwingsSprite.x = 66;
    // SuwingsSprite.y = 66;
    cat.position.set(0, 0);

    //按缩放大小缩放图片
    // cat.scale.x = 1;
    // cat.scale.y = 1;

    cat.width = app.renderer.screen.width;
    cat.height = app.renderer.screen.height;
    //旋转
    // cat.rotation = 0.5;

    //为精灵设置速度
    //注意这个速度并不是内置对象，而是作为复制加减使用
    cat.vx = 2;
    cat.vy = 2;



    //加入精灵对象
    // app.stage.addChild(cat);
    let tmpScreen = FristSetUp();
    let reelContainer = tmpScreen[0]
    let centerContainer = tmpScreen[1]

    //设置游戏循环帧
    app.ticker.add(delta => gameLoop(delta));

    //设置循环函数
    LoopState = ControlLoop;

    //游戏循环
    function gameLoop(delta) {
        //结构化游戏逻辑代码
        LoopState(delta, cat, centerContainer)
    }
}

//资源加载器加载事件
function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
}

//The `randomInt` helper function
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 结构化真实的游戏业务逻辑之一
function ControlLoop(delta, sprite, reelContainer) {
    //根据速度移动精灵 
    // sprite.x += sprite.vx;
    // //容器的移动与缩放
    reelContainer.x += reelContainer.vx;
    reelContainer.y += reelContainer.vy;
}


//Capture the keyboard arrow keys
let left = keyboard(65),
    up = keyboard(87),
    right = keyboard(68),
    down = keyboard(83),

    expand = keyboard(81),
    narrow = keyboard(69)


const galaxyInfoContainer = new PIXI.Container();
const centerContainer = new PIXI.Container();
const reelContainer = new PIXI.Container();
const bgContainer = new PIXI.Container();

// 第一次渲染执行代码
function FristSetUp() {
    // for (let i = 1; i < 45; i++) {
    //     for (let y = 1; y < 45; y++) {
    //         let circle = new Graphics();
    //         circle.beginFill(0xFFFFFF);
    //         circle.drawCircle(0, 0, 1);
    //         circle.endFill();
    //         circle.x = y * randomInt(25, 45);
    //         circle.y = i * randomInt(25, 45);
    //         circle.vx = 0;
    //         circle.vy = 0;
    //         circle.id = i + y
    //         reelContainer.addChild(circle);
    //     }
    // }

    let galaxyCount = 0;
    let r = 680;
    let r_max = 5000;
    let displayNot = 0;
    let galaxyInterval = 0;
    let circleCount = 0;
    const circleLinkList = []
    let now = 0;
    window.G_GALAXY_LAC = [];
    const GI_MIN = 4;
    for (; r < r_max; r += randomInt(50, 64)) {
        for (let xz = -r - 100; xz < r + 100; xz += randomInt(24, 72)) {

            // for (let zxc = 0; zxc < 10; zxc += 1)randomInt(64, 100);
            let y = Math.sqrt(r * r - xz * xz)
            galaxyInterval -= 1;
            if (galaxyInterval > 0) continue;
            if (isNaN(y)) {
                // y = randomInt(-128, 128);
                continue;
            }
            let maybe = randomInt(0, 100);
            let maybe2 = randomInt(0, 100);
            const MAYBE_SUSSE = 80;
            let circleList = [];
            if (maybe > MAYBE_SUSSE + displayNot || maybe < 20 - displayNot) {
                let circle = new Sprite(
                    resources["images/" + randomInt(1, 6) + ".png"].texture
                );

                circle.x = xz;
                circle.y = y;
                circleList.push(circle)

            }
            if (maybe2 > MAYBE_SUSSE + displayNot || maybe < 20 - displayNot) {
                let circle = new Sprite(
                    resources["images/" + randomInt(1, 6) + ".png"].texture
                );
                circle.x = xz;
                circle.y = -y;
                circleList.push(circle)
            }

            for (const circle of circleList) {
                const id = now;

                //锚点居中
                circle.anchor.set(0.5);

                //字体设置
                const style = new PIXI.TextStyle({
                    fontFamily: "Arial",
                    fontSize: 10,
                    fill: "white",
                    // stroke: '#ff3300',
                    // strokeThickness: 1
                });

                //文字描绘
                const richText = new PIXI.Text(id, style);
                richText.anchor.set(0.5);
                richText.x = circle.x;
                richText.y = circle.y + 25;

                //按缩放大小缩放图片
                circle.scale.x = 0.2;
                circle.scale.y = 0.2;

                // circle.width = 48;
                // circle.height = 48;

                circle.interactive = true;
                // Shows hand cursor
                circle.buttonMode = true;
                circle.on('mouseover', (e) => {
                    GalaxyInfoSelect(e, circle)
                });
                circle.on('mouseout', (e) => {
                    GalaxyInfoSelectClose(e, circle)
                });

                circle.info = {
                    id: id,
                    size: 1,
                    pepole: 0
                };

                reelContainer.addChild(circle);
                reelContainer.addChild(richText);

                galaxyInterval = randomInt(4, 6);
                galaxyCount++;
                now += 1;

                G_GALAXY_LAC.push({
                    id: id,
                    x: circle.x,
                    y: circle.y,
                    size: 1,
                    pepole: 0
                });
                circleLinkList.push(circle);
            }
            circleList = [];
            circleCount++;
        }
        galaxyInterval = 0;
        displayNot += 0.5;
        if (displayNot >= 14) displayNot = 14;
        if ((r_max - r) < r_max / 3) displayNot = 14;
        if ((r_max - r) < r_max / 4) displayNot = 15;
        if ((r_max - r) < r_max / 5) displayNot = 16;
        if ((r_max - r) < r_max / 6) displayNot = 17;
        if ((r_max - r) < r_max / 7) displayNot = 18;
        if ((r_max - r) < r_max / 8) displayNot = 19;
        if ((r_max - r) < r_max / 9) displayNot = 19.5;
    }

    console.log('一共生产:' + galaxyCount + '颗恒星系')
    console.log('G_GALAXY_LAC:')
    console.log(G_GALAXY_LAC)


    let circle2 = new Graphics();
    circle2.beginFill(0x666fff);
    circle2.drawCircle(0, 0, 8);
    circle2.endFill();
    circle2.x = 0;
    circle2.y = 0;



    reelContainer.addChild(circle2);

    reelContainer.vx = 0;
    reelContainer.vy = 0;

    // galaxyInfoContainer 容器构建
    // Rectangle + line style 1
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(1, 0x636969, 1);
    graphics.beginFill(0x5A5A5A);
    graphics.drawRect(0, 0, 120, 120);
    graphics.endFill();
    graphics.alpha = 0.6
    galaxyInfoContainer.addChild(graphics)
    galaxyInfoContainer.visible = false
    reelContainer.addChild(galaxyInfoContainer)


    //绘制背景网格图
    DisplayGrids(bgContainer, app.renderer.screen.width, app.renderer.screen.height)


    // 键盘响应，每个方向都有按下与释放两种
    const BASE_MOVE_VALUE = -10;

    expand.press = () => {
        // console.log('放大')
        // centerContainer.scale.x += 0.1
        // centerContainer.scale.y += 0.1
        // reelContainer.x -= reelContainer.x / 2
        // reelContainer.y -= reelContainer.y / 2
        // for (let circle of reelContainer.children) {
        //     if (circle.scale.x < 0.2) break;
        //     // circle.scale.x -= 0.02
        //     // circle.scale.y -= 0.02
        // }
    }

    narrow.press = () => {
        // console.log('缩小')
        // centerContainer.scale.x -= 0.1;
        // centerContainer.scale.y -= 0.1;
        // reelContainer.x += reelContainer.x / 2
        // reelContainer.y += reelContainer.y / 2
        // for (let circle of reelContainer.children) {
        //     if (circle.scale.x > 0.4) break;
        //     // circle.scale.x += 0.02
        //     // circle.scale.y += 0.02
        // }
    }
    left.press = () => {
        reelContainer.vx = -BASE_MOVE_VALUE;
        // reelContainer.vy = 0;
    };
    left.release = () => {
        reelContainer.vx = 0;
    };
    //Up
    up.press = () => {
        reelContainer.vy = -BASE_MOVE_VALUE;
        // reelContainer.vx = 0;
    };
    up.release = () => {
        reelContainer.vy = 0;

    };
    //Right
    right.press = () => {
        reelContainer.vx = BASE_MOVE_VALUE;
        // reelContainer.vy = 0;
    };
    right.release = () => {
        reelContainer.vx = 0;
    };
    //Down
    down.press = () => {
        reelContainer.vy = BASE_MOVE_VALUE;
        // reelContainer.vx = 0;
    };
    down.release = () => {
        reelContainer.vy = 0;

    };

    // 滚轮控制地图放大缩小
    (function () {
        let circleSizeTmp = 0.2;
        //非火狐实现滚轮效果
        document.onmousewheel = wheelHander;//非火狐
        //火狐一家使用DOMMouseScroll实现滚轮效果
        document.addEventListener('DOMMouseScroll', wheelHander, false);
        function wheelHander(e) {
            const ADD_VALUE = 0.2;
            oEvent = e || window.event;
            if (oEvent.wheelDelta) {//非火狐
                if (oEvent.wheelDelta > 0) {//向上滚动
                    if (centerContainer.scale.y >= 1.8) {
                        return
                    }
                    centerContainer.scale.x += ADD_VALUE;
                    centerContainer.scale.y += ADD_VALUE;
                    console.log(centerContainer.scale.x)
                    if (centerContainer.scale.x >= 0.3) {
                        for (let circle of circleLinkList) {
                            circle.scale.x = 0.2
                            circle.scale.y = 0.2
                        }
                    }
                } else {//向下滚动
                    if (centerContainer.scale.y <= ADD_VALUE + 0.1) {
                        return
                    }
                    centerContainer.scale.x -= ADD_VALUE;
                    centerContainer.scale.y -= ADD_VALUE;

                    console.log(centerContainer.scale.x)
                    if (centerContainer.scale.x <= 0.3) {
                        for (let circle of circleLinkList) {
                            circle.scale.x = 0.5
                            circle.scale.y = 0.5
                            // circle.width = 48;
                            // circle.height = 48;
                        }
                    }
                }

            }
            // else if (oEvent.detail) {
            //     if (oEvent.detail > 0) {//向下滚动
            //         centerContainer.scale.x += ADD_VALUE;
            //         centerContainer.scale.y += ADD_VALUE;
            //     } else {//向上滚动
            //         centerContainer.scale.x -= ADD_VALUE;
            //         centerContainer.scale.y -= ADD_VALUE;
            //     }
            // }
        }
    })()

    // reelContainer.interactive = true;
    // Shows hand cursor
    // reelContainer.buttonMode = true;
    // // reelContainer.anchor.set(0.5);
    // reelContainer
    //     .on('mousedown', GalaxySelect)
    //     .on('pointerup', onDragEnd)
    //     .on('pointerupoutside', onDragEnd)
    //     .on('pointermove', onDragMove);


    reelContainer.scale.x = 0.6
    reelContainer.scale.y = 0.6

    centerContainer.addChild(reelContainer)

    centerContainer.x = app.renderer.screen.width / 2
    centerContainer.y = app.renderer.screen.height / 2

    app.stage.addChild(bgContainer);

    app.stage.addChild(centerContainer);
    return [centerContainer, reelContainer];
}

function GalaxyInfoSelect(e, galaxy) {
    console.log('星系被选择:')
    console.log(galaxy)
    galaxyInfoContainer.x = galaxy.x + galaxy.width / 2 + 2;
    galaxyInfoContainer.y = galaxy.y - galaxyInfoContainer.height / 2;
    galaxyInfoContainer.visible = true;
}

function GalaxyInfoSelectClose(e, galaxy) {
    galaxyInfoContainer.visible = false;
}


// function onDragStart(event) {
//     console.log('onDragStart//')
//     // store a reference to the data
//     // the reason for this is because of multitouch
//     // we want to track the movement of this particular touch
//     this.data = event.data;
//     this.alpha = 0.9;
//     this.dragging = true;
// }

// function onDragEnd() {
//     console.log('onDragEnd')
//     this.alpha = 1;
//     this.dragging = false;
//     // set the interaction data to null
//     this.data = null;
// }

// function onDragMove() {
//     console.log('onDragMove')
//     if (this.dragging) {
//         const newPosition = this.data.getLocalPosition(this.parent);
//         this.x = newPosition.x;
//         this.y = newPosition.y;
//     }
// }



function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            // console.log('键盘按下:' + event.keyCode)
            if (key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            // console.log('键盘释放:' + event.keyCode)
            if (key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };
    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

// 背景网格绘制
function DisplayGrids(reelContainer, w, h) {
    var XgridCount = w / 20;
    var tmpX = 10;
    var tmpY = 10;
    var disX = 10;
    var disY = 10;
    var BASE_ADD = 80;
    for (var index = 0; index < XgridCount; index++) {
        let bgGrids = new Graphics();
        bgGrids.lineStyle({
            color: 0xffffff,
            width: 0.5,
            alpha: 0.1
        })
        bgGrids.moveTo(tmpX, 0); //起始点
        bgGrids.lineTo(disX, h);
        reelContainer.addChild(bgGrids)

        disX += BASE_ADD;
        tmpX += BASE_ADD;
    }
    disX = 10;
    tmpX = 10;
    tmpY = 10;
    for (var index = 0; index < XgridCount; index++) {
        let bgGrids = new Graphics();
        bgGrids.lineStyle({
            color: 0xffffff,
            width: 0.5,
            alpha: 0.1
        })
        bgGrids.moveTo(0, tmpY); //起始点
        bgGrids.lineTo(w, disY);
        reelContainer.addChild(bgGrids)

        tmpY += BASE_ADD;
        disY += BASE_ADD;
    }
};
