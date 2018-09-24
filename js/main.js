$(document).ready(function() {

    //Старт Ajax функции
    setTimeout(runAjax, 5);

    //Массив с данными записей сообщества VK
    var countID = ['offset=12', 'offset=24', 'offset=36',
        'offset=48', 'offset=60', 'offset=72',
        'offset=84', 'offset=96', 'offset=108',
        'offset=120', 'offset=132', 'offset=144',
        'offset=156', 'offset=168', 'offset=180',
        'offset=196', 'offset=204', 'offset=216',
        'offset=228', 'offset=240', 'offset=252'
    ];


    //Бесконечный скроллинг
    var page = false;
    
    $(window).scroll(function() {
        if (($(window).height() + $(window).scrollTop() >= $(document).height() -100) && !page) {
            // console.log($(window).height() + " " +  $(window).scrollTop() + " " + $(document).height());
            	loadCount(1);
            $(".load").fadeIn(500, function() {

            });
            if ($(this).scrollTop() > 1000){
            	$('.load').fadeOut();
            }
        };

    });


    //Счетчик для подгрузки данных из массива
    var count = 0;
    function loadCount(x) {
        for (var i = count; i < count + x; i++) {
            if (i > countID.length - 1)
                return;
            else
                runAjax(countID[i]);
        
        }
        count += x;
        // console.log(count);
    }


    //Ajax запрос для получения данных с API_VK
    var answer, output = ' ';

    function runAjax(id) {

        $.ajax({
            url: 'https://api.vk.com/method/wall.get?&owner_id=-33191158&domain=summerday&access_token=3195e9e93195e9e93115aff35931c30219331953195e9e9697cc67864e1f0c35fe7c074&count=12&' + id + '&v=5.85',
            method: 'GET',
            dataType: 'JSONP',
            success: function(response) {
                answer = response;
                // console.log(response);
                answer.response.items.forEach(function(item) {

                    if ((item.text != 'undefined') && (item.text !== ' ')) {

                        output += '<div id="entry"><p id="textvk">' + item.text + '</p>';
                        output += '<div id="original"><a href="https://vk.com/fact?w=wall-33191158_' + item.id + '">Ссылка на оригинальную запись</a></div>';

                        if (item.attachments !== undefined) {

                            //Перебор данных из массива, полученного со стены сообщества, для поиска контента
                            for (var i = 0, length1 = item.attachments.length; i < length1; i++) {

                                if (item.attachments[i].type == 'photo') {

                                    // console.log(item.attachments[i]);
                                    output += '<img heigth=310px width=310px src="' + item.attachments[i].photo.sizes[4].url + '">';
                                }
                                if (item.attachments[i].type == 'video') {
                                    output += '<img heigth=320px width=320px src="' + item.attachments[i].video.photo_320 + '">';
                                }
                                if (item.attachments[i].type == 'link') {
                                    output += '<img heigth=320px width=320px src="' + item.attachments[i].link.photo.sizes[4].url + '">';
                                }
                                if (item.attachments[i].type == 'doc') {
                                    output += '<img heigth=320px width=320px src="' + item.attachments[i].doc.url + '">';
                                }

                            }
                        }
                        output += '<div class="load"></div></div>';

                    }

                });
                //DIV_обертка для данных получаемых из VK
                $('#wrapper').html(output);

            },
            error: function(error) {
                console.log(error);
            }
        });
    }


});
