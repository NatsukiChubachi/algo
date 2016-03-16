/**
 * enchant();
 * Preparation for using enchant.js.
 * (Exporting enchant.js class to global namespace.
 *  ex. enchant.Sprite -> Sprite etc..)
 *
 * enchant.js を使う前に必要な処理。
 * (enchant.js 本体や、読み込んだプラグインの中で定義されている enchant.Foo, enchant.Plugin.Bar などのクラスを、
 *  それぞれグローバルの Foo, Bar にエクスポートする。)
 */
enchant();

var _gGame = null;
var _gCommon = null;

_gCommon = new CCommon();

var bgLPath = "Resources/Textures/UI/BG/SGJ_background_L_02.png";
var bgRPath = "Resources/Textures/UI/BG/SGJ_background_R_02.png";
var goalPath = "Resources/Textures/Items/goal.png";
var robotWork = "Resources/Textures/Character/robot_walk_s.png";
var dragButton = "Resources/Textures/UI/Buttons/B_Active.png";
var dragButtonActive = "Resources/Textures/UI/Buttons/B_NonActive.png";
var dragFrame = "Resources/Textures/png/line.png";
var yajirushi = "Resources/Textures/png/yajirushi.png";
var clearBgPath = "Resources/Textures/UI/BG/background_gameclear.png";
var startBtn = "Resources/B_Start.png";
var bgTitle = "Resources/background_title.png";
var bgBackGround = "Resources/background.png";
var introStage1 = "Resources/intro_stage1.png";
var isGoal = false;

var frames = [];

var stageClearMessages = {
  0: "西暦2026年、家庭用ロボットが普及し始めた時代。\nいま流行のロボットは、決められた動きをするだけでなく¥nカスタマイズして持ち主の望む行動をインプットできることが特徴だ。¥n¥n自分専用のロボを手に入れたあなたは、さっそく動かすことに成功した。¥n¥n次はどうしようか。ロボを走らせてみようか。¥nしかし、路上には空き缶などのゴミが多く、¥nロボを走らせて転んだりしたら壊れてしまうかもしれない。¥n¥nどうしよう…そうだ、これを次の目標にしよう！¥nあなたは、空き缶をロボに拾わせることにした。\n\nロボが空き缶を拾うようにカスタマイズしよう！",
  1: "見事、空き缶をロボに拾わせることに成功したあなた。¥n¥nしかし、捨てられている空き缶はまだまだある。¥nしかも今度は、アルミ缶とスチール缶が混在している。¥nここのゴミ箱はアルミ缶とスチール缶を分けられるようになっている。¥n¥n空き缶を集めて新しい缶にリサイクルするためには、¥nアルミ缶とスチール缶を区別する必要があるらしい。¥n¥nロボがアルミ缶とスチール缶を分けて回収するようにカスタマイズしよう！",
};


/*
 * window.onload
 *
 * The function which will be executed after loading page.
 * Command in enchant.js such as "new Core();" will cause an error if executed before entire page is loaded.
 *
 * ページがロードされた際に実行される関数。
 * すべての処理はページがロードされてから行うため、 window.onload の中で実行する。
 * 特に new Core(); は、<body> タグが存在しないとエラーになるので注意。
 */
window.onload = function()
{
    /**
     * new Core(width, height)
     *
     * Make instance of enchant.Core class. Set window size to 320 x 320
     * Core オブジェクトを作成する。
     * 画面の大きさは 320ピクセル x 320ピクセル に設定する。
     */
    var game = new Core(960, 540);
    
    _gGame = game;

    // バナナを増やす関数 (6フレームごとに呼ばれる)
    var addFrame = function(before){
      var newFrame = new Sprite(100, 100);    // Spriteを生成
      var yaji = new Sprite(24, 100);
      newFrame.x = 100;
      newFrame.y = before.y + before.height + yaji.height;
      newFrame.image = game.assets[dragFrame];
      yaji.x = newFrame.x + (newFrame.width / 2) - (yaji.width / 2);
      yaji.y = newFrame.y - yaji.height;
      yaji.image = game.assets[yajirushi];
      before.image = game.assets[dragButtonActive];
      game.rootScene.addChild(newFrame);
      game.rootScene.addChild(yaji);
      frames.push(newFrame);
    };

    /**
     * Core.fps
     *
     * Set fps (frame per second) in this game to 15.
     * ゲームの fps (frame per second) を指定する。この場合、1秒間あたり15回画面が更新される。
     */
    game.fps = 30;
    
    /**
     * Core#preload
     *
     * You can preload all assets files before starting the game.
     * Set needed file lists in relative/absolute path for attributes of Core#preload
     * 必要なファイルを相対パスで引数に指定する。 ファイルはすべて、ゲームが始まる前にロードされる。
     */
    game.preload([
        bgLPath,
        bgRPath,
        robotWork,
        dragButton,
        dragFrame,
        dragButtonActive,
        goalPath,
        clearBgPath,
        yajirushi,
        startBtn,
        bgTitle,
        bgBackGround,
        introStage1
    ]);

    /**
     * Core#onload
     *
     * ロードが完了した直後に実行される関数を指定している。
     * onload プロパティは load イベントのリスナとして働くので、以下の2つの書き方は同じ意味。
     *
     * game.onload = function(){
     *     // code
     * }
     *
     * game.addEventListener("load", function(){
     *     // code
     * })
     */
    game.onload = function(){
        /**
         * Sprite.image {Object}
         * Core#preload で指定されたファイルは、Core.assets のプロパティとして格納される。
         * Sprite.image にこれを代入することで、画像を表示することができる
         */
        backgroundR = new Sprite(640, 540);
        backgroundR.x = 320;
        backgroundR.y = 0;    // Sprite の左上の x, y 座標を指定
        backgroundR.image = game.assets[bgRPath];

        backgroundL = new Sprite(320, 540);
        backgroundL.x = 0;
        backgroundL.y = 0;    // Sprite の左上の x, y 座標を指定
        backgroundL.image = game.assets[bgLPath];

        goal = new Sprite(150, 125);
        goal.x = 960 - goal.width;
        goal.y = (640 / 2) - (goal.height / 2);    // Sprite の左上の x, y 座標を指定
        goal.image = game.assets[goalPath];

        bt = new Sprite(100, 100);
        bt.x = 25;
        bt.y = 25;    // Sprite の左上の x, y 座標を指定
        bt.image = game.assets[dragButton];

        label = new enchant.Label();
        label.text = "歩く";
        label.width = 24;
        label.height = 12;
        label.x = bt.x + (bt.width / 2) - (label.width / 2);
        label.y = bt.y + (bt.height / 2) - (label.height / 2);
        label.font = "12px 'Arial'";

        /*
        // BGMの再生
        bgm = game.assets[bgmPath];
        game.rootScene.addEventListener("enterframe", function(){
          bgm.play();
        });
        */

        // ロボット
        robot = new Sprite(150, 200);

        /**
         * Sprite.image {Object}
         * Core#preload で指定されたファイルは、Core.assets のプロパティとして格納される。
         * Sprite.image にこれを代入することで、画像を表示することができる
         */
        robot.image = game.assets[robotWork];
        robot.x = 350;
        robot.y = 150;
        
        /**
         * Sprite.frame {Number}
         * (width, height) ピクセルの格子で指定された画像を区切り、
         * 左上から数えて frame 番目の画像を表示することができる。
         * デフォルトでは、0:左上の画像が表示される。
         * このサンプルでは、シロクマが立っている画像を表示する (chara1.gif 参照)。
         */
         var firstFrame = new Sprite(100, 100);    // Spriteを生成
         firstFrame.x = 100;
         firstFrame.y = 150;
         firstFrame.image = game.assets[dragFrame];
         frames.push(firstFrame);

        
        /**
         * Group#addChild(node) {Function}
         * オブジェクトをノードツリーに追加するメソッド。
         * ここでは、クマの画像を表示するスプライトオブジェクトを、rootScene に追加している。
         * Core.rootScene は Group を継承した Scene クラスのインスタンスで、描画ツリーのルートになる特別な Scene オブジェクト。
         * この rootScene に描画したいオブジェクトを子として追加する (addChild) ことで、毎フレーム描画されるようになる。
         * 引数には enchant.Node を継承したクラス (Entity, Group, Scene, Label, Sprite..) を指定する。
         */
        game.rootScene.addChild(backgroundL);
        game.rootScene.addChild(bt);
        game.rootScene.addChild(label);
        game.rootScene.addChild(backgroundR);
        game.rootScene.addChild(goal);
        game.rootScene.addChild(robot);
        game.rootScene.addChild(firstFrame);

        /**
         * EventTarget#addEventListener(event, listener)
         * イベントに対するリスナを登録する。
         * リスナとして登録された関数は、指定されたイベントの発行時に実行される。
         * よく使うイベントには、以下のようなものがある。
         * - "touchstart" : タッチ/クリックされたとき
         * - "touchmove" : タッチ座標が動いた/ドラッグされたとき
         * - "touchend" : タッチ/クリックが離されたとき
         * - "enterframe" : 新しいフレームが描画される前
         * - "exitframe" : 新しいフレームが描画された後
         * enchant.js やプラグインに組み込まれたイベントは、それぞれのタイミングで自動で発行されるが、
         * EventTarget#dispatchEvent で任意のイベントを発行することもできる。
         *
         * ここでは、右に向かって走っていくアニメーションを表現するために、
         * 新しいフレームが描画される前に、毎回クマの画像を切り替え、x座標を1増やすという処理をリスナとして追加する。
         */
        robot.addEventListener("enterframe", function(){
            this.frame = (this.age / 4) % 8 + 1;
            if(isGoal){
              if(this.x >= 775){
                clearBg = new Sprite(960, 540);
                clearBg.x = 0;
                clearBg.y = 0;    // Sprite の左上の x, y 座標を指定
                clearBg.image = game.assets[clearBgPath];
                game.rootScene.addChild(clearBg);
                clearMessage = new enchant.Label();
                clearMessage.text = stageClearMessages[0];
                clearMessage.width = 640;
                clearMessage.height = 368;
                clearMessage.x = 160;
                clearMessage.y = 172;
                clearMessage.font = "24px 'Arial'";
                game.rootScene.addChild(clearMessage);
              }else{
                this.x += 3;
              }
            }
        });
        
        // タッチしたときに移動させる
        game.rootScene.addEventListener('touchstart', function(e){
            bt.x = e.localX;
            bt.y = e.localY;
            label.x = bt.x + (bt.width / 2) - (label.width / 2);
            label.y = bt.y + (bt.height / 2) - (label.height / 2);
        });

        // タッチ座標が動いたときに移動させる
        game.rootScene.addEventListener('touchmove', function(e){
            bt.x = e.localX - bt.width / 2;
            bt.y = e.localY - bt.height / 2;
            label.x = bt.x + (bt.width / 2) - (label.width / 2);
            label.y = bt.y + (bt.height / 2) - (label.height / 2);
        });
        
        // タッチ座標が動いたときに移動させる
        game.rootScene.addEventListener('touchend', function(e){
            bt.x = 25;
            bt.y = 25;
            label.x = bt.x + (bt.width / 2) - (label.width / 2);
            label.y = bt.y + (bt.height / 2) - (label.height / 2);
            var currentFrame = frames[frames.length - 1];
            if(currentFrame.x <= e.localX && e.localX <= (currentFrame.x + currentFrame.width) && (currentFrame.y <= e.localY && e.localY <= currentFrame.y + currentFrame.height)){
               addFrame(currentFrame);
               isGoal = true;
            }
        });
        
        CreateTitleScreen();
    };

    /**
     * Core#start
     * ゲームを開始する。この関数を実行するまで、ゲームは待機状態となる。
     * 代わりに Core#debug を使うことで、デバッグモードで起動することができる。
     * Core#pause(); で一時停止し、 Core#resume(); で再開することができる。
     */
    game.start();
};
