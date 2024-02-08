
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
        $(window).on('resize', function() {
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

});
