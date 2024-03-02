
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    //ハンバーガーメニュー
    $(function () {

        var scrollPosition; // scrollPositionの定義を追加

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
            scrollPosition = $(window).scrollTop(); 
            $(".js-drawer").fadeIn();
            $(".js-hamburger").addClass("is-open");
            $("body").css({ 'overflow': 'hidden', 'height': '100%' }); // スクロール禁止を追加
            $("body").addClass("fixed").css({scrollPosition});
        }

        function closeDrawer() {
            $(".js-drawer").fadeOut();
            $(".js-hamburger").removeClass("is-open");
            $("body").css({ 'overflow': '', 'height': '' }); // スクロール禁止解除
            $("body").removeClass("fixed").css({ top: 0 });
            $(window).scrollTop(scrollPosition); // スクロール位置を復元
        }


    });

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
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        // },
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



    // Topに戻るボタン
    // $(function () {
    //     const pageTop = $(".js-page-top");
    //     pageTop.hide();
    //     $(window).scroll(function () {
    //         if ($(this).scrollTop() > 500) { // 100pxスクロールしたら発火
    //             pageTop.fadeIn(); // 500px以上スクロールしたらボタンをフェードイン
    //         } else {
    //             pageTop.fadeOut(); // 500px以下になったらボタンをフェードアウト
    //         }
    //     });
    //     pageTop.click(function () {
    //         $("body,html").animate(
    //             {
    //                 scrollTop: 0,
    //             },
    //             500 // 500ミリ秒かけてページトップに戻る
    //         );
    //         return false;
    //     });
    // });

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


    // 背景色の後に画像が表示されるアニメーション
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
