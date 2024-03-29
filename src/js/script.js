
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    //ハンバーガーメニュー
    $(function () {

        $(".js-hamburger").on("click", function () {
            $(this).toggleClass("is-open");//ボタンの開閉
            $(".js-drawer").fadeToggle();//ドロワーメニュをフェードイン、フェードアウト
            $('body').toggleClass('header__drawer-noscroll'); // 背景スクロール固定設定、解除
        });

        // backgroundまたはページ内リンクをクリックでドロワーメニュが閉じる
        $(".header__drawer, .js-drawer a[href]").on("click", function () {
            closeDrawer(); 
        });

        // resizeイベント　ウインドウ幅が広がるとドロワーメニューが閉じる
        $(window).on('resize', function () {
            if (window.matchMedia("(min-width: 768px)").matches) {
                closeDrawer();
            }
        });

        function closeDrawer() {
            $(".js-drawer").fadeOut();//ドロワーメニューをフェードアウト
            $(".js-hamburger").removeClass("is-open");//ボタンからクラス名「is-open」を取る
            $('body').removeClass('header__drawer-noscroll');//背景スクロール解除  
        }

    // });



        // Fvスライダー
        const mv_swiper = new Swiper(".js-fv-swiper", {
            loop: true,
            speed: 2000,
            effect: "fade",
            fadeEffect: {
                crossFade: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });


        // キャンペーンスライダー（swiper）
        const mySwiper = new Swiper('.js-campaign-swiper', { //名前を変える
            loop: true,
            loopAdditionalSlides: 1,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            speed: 2000,          //追記
            slidesPerView: "auto",
            spaceBetween: 24, // スライド間の余白（px）
            grabCursor: true, // PCでマウスカーソルを「掴む」マークにする
            breakpoints: {
                // 768px以上の場合
                768: {
                    spaceBetween: 40, // スライド間の余白（px）
                }
            },
            navigation: {
                prevEl: ".swiper-button-prev", //戻るボタンのclass
                nextEl: ".swiper-button-next", //進むボタンのclass
            },
        });


    //トップへ戻るボタン
    // $(function () {
        const pagetop = $(".js-page-top");
        pagetop.hide(); //最初はボタンを非表示
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) { //100px以上スクロールしたら
            pagetop.fadeIn(); //ボタンをフェードイン
            } else {
            pagetop.fadeOut(); //ボタンをフェードアウト
            }
        });
        pagetop.click(function () {
            $("body,html").animate({
                scrollTop: 0, //上から0pxの位置に戻る
            },500); //500ミリ秒かけて上に戻る
            return false;
        });
    
        //フッター手前で止まるボタン
        $(".js-page-top").hide();
        $(window).on("scroll", function () {
            const scrollHeight = $(document).height(); //ドキュメントの高さ
            const scrollPosition = $(window).height() + $(window).scrollTop(); //現在の位置
            const footHeight = $("footer").innerHeight(); //フッターの高さ
            if (scrollHeight - scrollPosition <= footHeight) { //ドキュメントの高さと現在の位置の差がフッターの高さ以下のとき
            $(".js-page-top").css({ position: "absolute", bottom: footHeight + 0 }); //pisitionをabsoluteに変更 ボタンの位置をフッターの高さ + 余白に設定
            } else { //それ以外の場合は
            $(".js-page-top").css({ position: "fixed", bottom: "0" }); //固定で表示
            }
        });
    // }); 
        


    // 背景色の後に画像が表示されるアニメーション
    // $(function () {
        //要素の取得とスピードの設定
        var box = $('.colorbox'),
            speed = 400;

        //.colorboxの付いた全ての要素に対して下記の処理を行う
        box.each(function () {
            $(this).append('<div class="color"></div>')
            var color = $(this).find($('.color')),
                image = $(this).find('img');
            var counter = 0;

            image.css('opacity', '0');
            color.css('width', '0%');
            //inviewを使って背景色が画面に現れたら処理をする
            color.on('inview', function () {
                if (counter == 0) {
                    $(this).delay(200).animate({ 'width': '100%' }, speed, function () {
                        image.css('opacity', '1');
                        $(this).css({ 'left': '0', 'right': 'auto' });
                        $(this).animate({ 'width': '0%' }, speed);
                    })
                    counter = 1;
                }
            });
        });

    });



});
