
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    //ハンバーガーメニュー
    $(function () {

        $(".js-hamburger").on("click", function () {
            $(this).toggleClass("is-open");//ボタンの開閉
            $(".js-drawer").fadeToggle();//ドロワーメニュをフェードイン、フェードアウト
            $('body').toggleClass('header__drawer-noscroll'); // 背景スクロール固定設定、解除
            $(".top-header").toggleClass("is-color");//ヘッダーの色を変える

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
            $(".top-header").removeClass("is-color");//ヘッダーの色を戻す
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

    // });



        // モーダル
        let scrollPos;

        $(".js-photo").click(function () {
        let windowWidth = $(window).width();

        // スマホサイズでない場合のみモーダルウィンドウを表示
        if (windowWidth > 767) {
        scrollPos = $(window).scrollTop();
        $(".js-overlay").html($(this).prop("outerHTML"));
        $(".js-overlay").fadeIn(200);
        $('html').addClass('is-fixed');
        }
        return false;
        });

        $(".js-overlay").click(function () {
        $(".js-overlay").fadeOut(200, function () {
            $('html').removeClass('is-fixed');
            $(window).scrollTop(scrollPos);
        });
        return false;
        });



        //アコーディオンfqa
        $('.js-faq-question').on('click', function () {
            $(this).next().slideToggle(300);
            $(this).toggleClass('is-open');
        });

        //アコーディオンarchive
        $('.js-archive').on('click', function () {
            $(this).next('.js-mouths').slideToggle(300);
            $(this).toggleClass('is-open');
        });

        //別ページから特定のフィルターがかかった状態へリンク
        //フィルター、タブ切り替え
        $(document).ready(function () {
            // 変数を要素をセット
            // var $filter = $('.filter-content__list [data-filter]');
            // var    $item = $('.filter-content__items [data-item]');
            var    $tabMenu = $('.js-tab-menu');         // タブメニュー要素の定義
            var    $tabContent = $('.js-tab-content');    // タブコンテンツ要素の定義
        
            // URLのパラメータを取得する関数
            function getParameterByName(name) {
                var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            }
        
            // // フィルターパラメータを取得
            // var filter = getParameterByName('filter');
        
            // if (filter) {
            //     // フィルターを適用
            //     $filter.removeClass('is-active');
            //     $filter.filter('[data-filter="' + filter + '"]').addClass('is-active');
        
            //     $item.removeClass('is-active').fadeOut().promise().done(function () {
            //         if (filter === 'all') {
            //             $item.addClass('is-active').fadeIn();
            //         } else {
            //             $item.filter('[data-item="' + filter + '"]').addClass('is-active').fadeIn();
            //         }
            //     });
            // }


            // //フィルター切り替え
            //     // カテゴリをクリックしたら
            // $filter.click(function (e) {
            //     // デフォルトの動作をキャンセル
            //     e.preventDefault();
            //     var $this = $(this);
        
            //     // クリックしたカテゴリにクラスを付与
            //     $filter.removeClass('is-active');
            //     $this.addClass('is-active');
        
            //     // クリックした要素のdata属性を取得
            //     var $filterItem = $this.attr('data-filter');
        
            //     // データ属性が all なら全ての要素を表示
            //     if ($filterItem === 'all') {
            //         $item.removeClass('is-active').fadeOut().promise().done(function () {
            //             $item.addClass('is-active').fadeIn();
            //         });
            //     // all 以外の場合は、クリックした要素のdata属性の値を同じ値のアイテムを表示
            //         } else {
            //         $item.removeClass('is-active').fadeOut().promise().done(function () {
            //             $item.filter('[data-item="' + $filterItem + '"]').addClass('is-active').fadeIn();
            //         });
            //     }
            // });
        
            // タブ切り替え
            $tabMenu.on('click', function () {
                $tabMenu.removeClass('is-active');
                $tabContent.removeClass('is-active');
                $(this).addClass('is-active');
                var number = $(this).data("number");
                $('#' + number).addClass('is-active');
            });
        
            // タブのURLパラメータを取得
            var tab = getParameterByName('tab');
                if (tab) {
                    // タブを切り替え
                    $tabMenu.removeClass('is-active');
                    $tabContent.removeClass('is-active');
                    $tabMenu.filter('[data-number="' + tab + '"]').addClass('is-active');
                    $('#' + tab).addClass('is-active');
                }
        });



        //フォームエラーチェック、送信
        $(document).ready(function() {
            $('#js-submit').click(function(event) {
              event.preventDefault(); // フォームの送信を防止
        
            // 必須フィールドを取得
            var nameField = $('#name');
            var mailField = $('#mail');
            var phoneField = $('#phone');
            var categoryFields = $('input[name="category"]');
            var messageField = $('#message');
            var privacyCheck = $('#privacyCheck');

            // console.log('name:', nameField.val());
            // console.log('mail:', mailField.val());
            // console.log('phone:', phoneField.val());
            // console.log('category:', categoryFields.length);
            // console.log('message:', messageField.val());
            // console.log('privacyCheck:', privacyCheck.length);  // 要素の存在確認
        
            // エラーメッセージを非表示にする
            var errorElement = $('.form__error');
            errorElement.hide();
        
            // 入力フィールドのエラースタイルをリセット
            resetErrorStyles();
        
            // バリデーションフラグ
            var isValid = true;
        
            // バリデーションチェック
            if (!nameField.val().trim()) {
                setErrorStyle(nameField.closest('.form__input'));
                isValid = false;
            }
            if (!mailField.val().trim()) {
                setErrorStyle(mailField.closest('.form__input'));
                isValid = false;
            }
            if (!phoneField.val().trim()) {
                setErrorStyle(phoneField.closest('.form__input'));
                isValid = false;
            }
            if (!categoryFields.is(':checked')) {
                setErrorStyle(categoryFields.closest('.form__checkbox'));
                isValid = false;
            }
            if (!messageField.val().trim()) {
                setErrorStyle(messageField.closest('.form__textarea'));
                isValid = false;
            }
            if (!privacyCheck.is(':checked')) {
                setErrorStyle(privacyCheck.closest('.form__privacyCheck-wrapper'));
                isValid = false;
            }
        
            // エラーがあればエラーメッセージを表示
            if (!isValid) {
                errorElement.show();
            } else {
                // フォームを送信する処理をここに追加
                window.location.href = 'page-thanks.html';
            }
            });
        
            function setErrorStyle(element) {
            element.addClass('error');
            }
        
            function resetErrorStyles() {
            $('.form__input.error, .form__textarea.error, .form__checkbox.error, .form__privacyCheck-wrapper.error').removeClass('error');
            }
        });
                    
    });
});

