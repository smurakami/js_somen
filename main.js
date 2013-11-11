enchant();
window.onload = function() {
    var game = new Game(320, 320);
    game.preload('chara.png');

    var Chef = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y, hito){
            enchant.Sprite.call(this, 32, 32);
            this.x = x;
            this.y = y;
            this.kyaku = hito;
            this.image = game.assets['chara.png'];
            this.frame = 0;
            game.rootScene.addChild(this);
            this.counter = 0;
            this.direction = 0;
            this.addEventListener('enterframe', function(){
                if(this.counter == 0){
                    this.counter = rand(120);
                    this.direction = rand(1);
                }
                if(this.age % 4 == 0)this.x += ((this.direction == 0) ? 1 : -1);
                if(this.x >= 280) this.direction = 1;
                if(this.x <= 200) this.direction = 0;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4];
                if(this.age % 20 == 0){
                    var somen = new Somen(this.x - 16, this.y + 10, this.kyaku);
                }
                this.counter--;
            });
        }
    });

    var Hito = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y){
            enchant.Sprite.call(this, 32, 32);
            this.x = x;
            this.y = y;
            this.vx = 0;
            this.speedx = 2;
            this.image = game.assets['chara.png'];
            this.frame = 10;
            game.rootScene.addChild(this);
            this.addEventListener('enterframe', function(){
                if(game.input.right) this.x += this.speedx;
                else if(game.input.left) this.x -= this.speedx;
                else this.x += this.vx;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 10;
            })
        }
    });


    var Somen = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y, hito) {
            enchant.Sprite.call(this, 32, 32);
            this.x = x;
            this.y = y;
            this.image = game.assets['chara.png'];
            this.frame = 5;
            this.randframe = rand(4);
            this.kyaku = hito;
            game.rootScene.addChild(this);
            this.addEventListener('enterframe', function() {
                this.x -= 1;
                this.y += 1;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5 + this.randframe) % 4] + 5;
                if((this.age > 300) || (this.hit(this.kyaku))){
                    game.rootScene.removeChild(this);
                    delete this;
                }
            });
        },
        hit: function(hito){
            if((this.x >= hito.x) && (this.x <= hito.x + 16) && (this.y >= hito.y) && (this.y <= hito.y + 16))
                return true;
            else
                return false;
        }
    });

    game.onload = function() {
        var hito = new Hito(70, 250);
        var chef = new Chef(280, 70, hito);
        //スマホ対応
        game.rootScene.addEventListener('touchstart', function(e) {
            if(e.x > 160) hito.vx = hito.speedx;
            else hito.vx = -hito.speedx;
        });
        game.rootScene.addEventListener('touchend', function(e) {
            hito.vx = 0;
        });
    };

    game.start();
};

function rand(num){ return Math.floor(Math.random() * num) };