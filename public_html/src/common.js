
/**
 * コモンクラス
 * @returns {CCommon}
 */
var CCommon = function() 
{
    // グループの作成
    this.CreateGroup = function( iPosX, iPosY )
    {
        var _group = new Group();
        _group.x = iPosX;
        _group.y = iPosY;
        
        return _group;
    };
    
    // ラベルの作成
    this.CreateLabel = function( iPosX, iPosY, sStrMsg )
    {
        // ラベル作成
        var _lbl = new Label( sStrMsg );
        _lbl.x = iPosX;
        _lbl.y = iPosY;
        _lbl.font = "16px cursive";
        _lbl.textAlign = "left";

        return _lbl;
    };
    
    // キャラ作成
    this.CreateSprite = function( iPosX, iPosY, iWidth, iHeight )
    {
        var _surf = new Surface( iWidth, iHeight );
        _surf.context.beginPath();
        _surf.context.fillStyle = "rgba(255,0,0,1.0)";
        _surf.context.fillRect( 0, 0, iWidth, iHeight );
        _surf.context.stroke();

        var _chara = new Sprite( iWidth, iHeight );
        _chara.image = _surf;
        _chara.x = iPosX;
        _chara.y = iPosY;

        return _chara;
    };
    
    // JSONファイルの読み込み
    this.ReadJsonFile = function( strJsonPath, funcSetter )
    {
        // JSONファイルの読み込みを行う
        httpObj = new XMLHttpRequest();
        httpObj.open("get", strJsonPath, true);
        httpObj.onload = function()
        {
            // ファイルを読み込んだのちにパースしてデータを格納する
            // このとき「function(){}」のパラメータは関数として使用できるように特別に解析を入れている 
            var parser = function(k,v){return v.toString().indexOf('function') === 0 ? eval('('+v+')') : v; };
            var data = JSON.parse(this.responseText, parser);

            // セッター関数で読み込んだデータを取得する
            funcSetter( data );
        };

        // 読み込みを開始させる
        httpObj.send(null);
    }    
};


