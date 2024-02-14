
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    // ハンバーガーメニュー
    $(function () {
        $(".js-hamburger").on("click", function () {
            $(this).toggleClass("is-open");
            if ($(this).hasClass("is-open")) {
                openDrawer();
            } else {
                closeDrawer();
            }
        });

        // backgroundまたはページ内リンクをクリックで閉じる
        $(".header__drawer, .js-drawer a[href]").on("click", function () {
            closeDrawer();
        });

        // resizeイベント
        $(window).on('resize', function () {
            if (window.matchMedia("(min-width: 768px)").matches) {
                closeDrawer();
            }
        });

        function openDrawer() {
            $(".js-drawer").fadeIn();
            $(".js-hamburger").addClass("is-open");
        }

        function closeDrawer() {
            $(".js-drawer").fadeOut();
            $(".js-hamburger").removeClass("is-open");
        }

    });


    // Fvスライダー
    // const mv_swiper = new Swiper(".js-fv-swiper", {
    //     loop: true,
    //     speed: 2000,
    //     effect: "fade",
    //     fadeEffect: {
    //         crossFade: true,
    //     },
    //     autoplay: {
    //         delay: 4000,
    //         disableOnInteraction: false,
    //     },
    // });


    // キャンペーンスライダー（swiper）
    const mySwiper = new Swiper('.js-campaign-swiper', { //名前を変える
        loop: true,
        loopAdditionalSlides: 1,
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        // },
        speed: 2000,          //追記
        slidesPerView: "auto",
        spaceBetween: 24, // スライド間の余白（px）
        centeredSlides: true, // アクティブなスライドを中央に配置する
        grabCursor: true, // PCでマウスカーソルを「掴む」マークにする
        breakpoints: {
            // 768px以上の場合
            768: {
                spaceBetween: 40, // スライド間の余白（px）
            }
        },
        // pagination: {
        //     el: ".swiper-pagination", //paginationのclass
        //     clickable: true, //クリックでの切り替えを有効に
        //     //type: "progressbar" //paginationのタイプ (※2)
        // },
        navigation: {
            prevEl: ".swiper-button-prev", //戻るボタンのclass
            nextEl: ".swiper-button-next", //進むボタンのclass
        },
        // scrollbar: { //スクロールバーを表示したいとき
        //     el: ".swiper-scrollbar", //スクロールバーのclass
        //     hide: true, //操作時のときのみ表示
        //     draggable: true //スクロールバーを直接表示できるようにする
        // },
    });
    /* =================================================== 
※1 effectについて
slide：左から次のスライドが流れてくる
fade：次のスライドがふわっと表示
■ fadeの場合は下記を記述
    fadeEffect: {
        crossFade: true
    },
cube：スライドが立方体になり、3D回転を繰り返す
coverflow：写真やアルバムジャケットをめくるようなアニメーション
flip：平面が回転するようなアニメーション
cards：カードを順番にみていくようなアニメーション
creative：カスタマイズしたアニメーションを使うときに使用します

=======================================================
※2 paginationのタイプ
bullet：スライド枚数と同じ数のドットが表示
fraction：分数で表示（例：1 / 3）
progressbar：スライドの進捗に応じてプログレスバーが伸びる
custom：自由にカスタマイズ

=====================================================*/



    // Topに戻るボタン
    $(function () {
        const pageTop = $(".js-page-top");
        pageTop.hide();
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) { // 100pxスクロールしたら発火
                pageTop.fadeIn(); // 500px以上スクロールしたらボタンをフェードイン
            } else {
                pageTop.fadeOut(); // 500px以下になったらボタンをフェードアウト
            }
        });
        pageTop.click(function () {
            $("body,html").animate(
                {
                    scrollTop: 0,
                },
                500 // 500ミリ秒かけてページトップに戻る
            );
            return false;
        });
    });

    $(function () {
        // ページトップボタンを選択
        const pageTop = $(".js-page-top");
        pageTop.hide();

        $(window).scroll(function () {
            // スクロール量を取得
            const scrollTop = $(this).scrollTop();
            // ドキュメントの高さ
            const documentHeight = $(document).height();
            // ウィンドウの高さ
            const windowHeight = $(window).height();
            // フッターの高さ
            const footerHeight = $("footer").innerHeight();
            // フッターが画面内に入ってくるスクロール位置
            const fadeStart = documentHeight - windowHeight - footerHeight;

            if (scrollTop > 500) {
                pageTop.fadeIn();
                // フッターの手前でボタンの位置を調整
                if (scrollTop > fadeStart) {
                    pageTop.css({
                        position: "absolute",
                        bottom: footerHeight + 16  // ボタンの位置をフッターの高さ + 余白に設定
                    });
                } else {
                    pageTop.css({
                        position: "fixed",
                        bottom: "20px" // 元の位置に戻す
                    });
                }
            } else {
                pageTop.fadeOut();
            }
        });

        // ボタンをクリックしたらトップへスムーズスクロール
        pageTop.click(function () {
            $("body,html").animate({
                scrollTop: 0,
            }, 500);
            return false;
        });
    });

    $(function () {
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
