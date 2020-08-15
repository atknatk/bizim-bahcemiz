
var quickViewApi = function () {
};

quickViewApi.prototype.viewProductDetails = function (options) {
    var config = $.extend({
        data: {},
        success: function () {
        },
        error: function () {
        }
    }, options);
   
    $.apiCall({
        type: 'POST',
        data: config.data,
        url: '/quickview_product_details',
        success: function (reponse) {
            $("#quick-view-modal").html(reponse.html);
            $(document).trigger("hide-ajax-loading");

            $("#quick-view-btn").magnificPopup({
                items: {
                    src: '#quick-view-modal',
                    type: 'inline'
                },
                callbacks: {

                    open: function () {
                        $(".thumbnails img").on("click", function () {
                            $(".thumbnails img").removeClass("active");
                            $(this).addClass("active");
                            $(".largeImg").attr("src", $(this).attr("data-src"));
                        });

                        $(".tabs-product-details").tabs();

                        $('.quickViewPictureThumbSlider').slick({
                            speed: 500,
                            dots: false,
                            infinite: true,
                            slidesToShow: 4,
                            slidesToScroll: 4
                        });

                        //Accepted bank list
                        $('.accepted-bank-list').slick({
                            speed: 500,
                            dots: false,
                            infinite: true,
                            slidesToShow: 5,
                            slidesToScroll: 5
                        });

                        //related & also bough products slider
                        $('.related-products-list').slick({
                            dots: false,
                            infinite: true,
                            speed: 500,
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4
                                }
                            }, {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                }
                            }, {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }, {
                                breakpoint: 360,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }]

                        });
                        $('.recently-viewed-list').slick({
                            dots: false,
                            infinite: true,
                            speed: 500,
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4
                                }
                            }, {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                }
                            }, {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }, {
                                breakpoint: 360,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }]

                        });

                        $('.also-purchased-list').slick({
                            dots: false,
                            infinite: true,
                            speed: 500,
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            responsive: [{
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4
                                }
                            }, {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3
                                }
                            }, {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }, {
                                breakpoint: 360,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }]
                        });
                    },
                },
                preloader: true
            });

            $(".mfp-close").on("click", function () {
                $("#quick-view-modal").html("");               
                $('.related-products-list, .recently-viewed-list, .also-purchased-list, .quickViewPictureThumbSlider, .accepted-bank-list').slick('unslick');
            });
            $("#quick-view-btn").click();
        }
    });
};

var api = new quickViewApi();