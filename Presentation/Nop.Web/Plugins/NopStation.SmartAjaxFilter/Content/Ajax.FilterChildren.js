AjaxFilterChildren = {
    init: function () {
        if (!$(".ajax-filter-section").is(':parent')) {
            $('.closeAllFilters').hide();
        }

        $.when(
            AjaxFilterChildren.resetFilters()
        ).then(
            (function getSelectedAll() {
                $(".ajaxfilter-section input:checked").each(function () {
                    var firstName = $(this).siblings("label").text().split("(")[0],
                        firstClass = $(this).attr("class");
                    AjaxFilterChildren.renderActiveFilters(firstClass, firstName);
                });
                $('.ajaxfilter-section select option:selected').each(function (i, selected) {
                    if ($(selected).val().length > 0) {
                        var firstId = $(this).parents("select").attr("id");
                        AjaxFilterChildren.listenToSelect(firstId);
                    }
                });
            })());

        $(".ajaxfilter-section select").on("click", function () {
            AjaxFilterChildren.resetFilters();
        });

        //open close title + arr rotate
        $(".filter-section .title").on("click", function () {
            $(this).siblings(".ajaxfilter-section").slideToggle("slow");
            $(this).find(".arrowHold").toggleClass("rotate");
        });
    },
    clearAll: function (clearClassName) {
        var onClickClassName = "."+clearClassName;
            if ($(onClickClassName).hasClass("open")) {
                $(".filter-section .title").each(function () {
                    $(".closeAllFilters").removeClass("open").addClass("close");
                    $(onClickClassName).removeClass("close").addClass("open").siblings(".ajaxfilter-section").slideUp("slow");
                    $(onClickClassName).find(".arrowHold").removeClass("rotate");
                });
            } else {
                $(".filter-section .title").each(function () {
                    $(onClickClassName).removeClass("close").addClass("open");
                    $(".filter-section .title").removeClass("close").addClass("open");
                    $(".ajaxfilter-section").slideDown("slow");
                    $(".filter-section .title").find(".arrowHold").addClass("rotate");
                });
            }


        // clear all click
            var priceMin = $("#min-price").val(),
                priceMax = $("#max-price").val();

            // empty set filters box
            $(".selectedOptions").html("");
            // cumulate activity to default state
            $.when(
                $(".ajaxfilter-section input:checked").each(function () {
                    $(this).prop("checked", false);
                }),

                $(".ajaxfilter-section input").each(function () {
                    $(this).prop("disabled", false);
                }),

                $('.ajaxfilter-section select').each(
                    function () {
                        $(this).find("option").removeAttr('selected').prop("disabled", false);
                        $(this).find("option:first").attr('selected', true);
                    }
                ),

                $(".square.active").removeClass("active"),
                $("#slider-range").slider("values", 0, priceMin),
                $("#slider-range").slider("values", 1, priceMax)

                // hook reset filter
            ).then(

                AjaxFilter.setFilter(''),
                AjaxFilterChildren.resetFilters(),
                $(this).hide()

            );
            // reset values in brackets
            $(".ajaxfilter-clear-price").click();

    },
    getSelected: function () {
        var priceMin = $("#min-price").val(),
            priceCurrent = $("#price-current-min").val(),
            selectedValues = [];

        $('.ajaxfilter-section select option:selected').each(function (i, selected) {
            selectedValues[i] = $(selected).val();
        });


        selectedValues = selectedValues.filter(v => v !== '');

        if (selectedValues.length > 0 || priceMin !== priceCurrent) {
            $(".clearAllfilters").show();
        }
    },
    resetFilters: function () {
        'use strict';
        var priceMin = $("#min-price").val(),
            priceCurrent = $("#price-current-min").val();

        $(".clearAllfilters").hide();

        if (priceMin !== priceCurrent) {
            $(".clearAllfilters").show();
        }

        if ($(".ajaxfilter-section input").is(':checked')) {
            $(".clearAllfilters").show();
        }
        AjaxFilterChildren.getSelected();
    },

    renderActiveFilters: function (renderClass, name) {
        //var labelFor = $("." + renderClass).attr('id').replace("square_", "");
        function removeSingleFilter() {
            var getedClass = this.name.replace("filtredBy", "");
            $(".selectedOptions input[name = 'filtredBy" + renderClass + "' ].remover").unbind("click");
            $("input." + getedClass).click();
        }
        if ($(".square." + renderClass).hasClass("active")) {
            $('<div>').attr({
                class: 'col-12 px-0 itemHolder' + renderClass,
                readonly: true,
                name: "sector" + renderClass,
                value: name
            }).appendTo('.selectedOptions');

            $('<input>').attr({
                class: 'btn btn-sm btn-secondary col-10',
                readonly: true,
                name: "filtredBy" + renderClass,
                value: name
            }).appendTo('.itemHolder' + renderClass);

            $('<input>').attr({
                class: 'btn btn-sm btn-secondary remover col-2',
                readonly: true,
                name: "filtredBy" + renderClass,
                value: 'x'
            }).appendTo('.itemHolder' + renderClass);

            $(".selectedOptions input[name = 'filtredBy" + renderClass + "' ].remover").on('click', removeSingleFilter);

        } else {
            $('.itemHolder' + renderClass).remove();

        }
    },

    listenToCheckBox: function (element, id, name) {
        $("." + id).toggleClass("active");
        AjaxFilterChildren.renderActiveFilters(id, name);
    },

    listenToSelect: function (selectId) {
        // reset filterby by select
        function removeSingleFilterSelect() {
            $.when(
                $("select option").prop("disabled", false),
                $("select#" + selectId).find("option:first").attr('selected', true)
            ).then(

                AjaxFilter.setFilter(''),
                AjaxFilter.reloadPages(''),
                AjaxFilterChildren.resetFilters(),
                $('.itemHolder' + selectId).remove()
            );
        }
        if ($('.itemHolder' + selectId).length > 0) {
            var value = $('.itemHolder' + selectId).remove();
        }
        if ($("select#" + selectId + " option:selected").val().length > 0) {

            var text = $("select#" + selectId + " option:selected").text();

            $('<div>').attr({
                class: 'col-12 px-0 itemHolder' + selectId,
                readonly: true,
                name: "sector" + selectId,
                value: name
            }).appendTo('.selectedOptions');

            $('<input>').attr({
                class: 'btn btn-sm btn-secondary col-10',
                readonly: true,
                name: "filtredBy" + selectId,
                value: text
            }).appendTo('.itemHolder' + selectId);

            $('<input>').attr({
                class: 'btn btn-sm btn-secondary remover col-2',
                readonly: true,
                name: "filtredBy" + selectId,
                value: 'x'
            }).appendTo('.itemHolder' + selectId);

            $(".selectedOptions input[name = 'filtredBy" + selectId + "' ].remover").on('click', removeSingleFilterSelect);

        } else {

            $('.itemHolder' + selectId).remove();

        }
    },
    resetFiltersOnPrice: function () {
        if ($(".ajaxfilter-section input").is(':checked')) {
            $(".clearAllfilters").show();
        } else {
            $(".clearAllfilters").hide();
            var priceMin = $("#min-price").val(),
                    priceCurrent = $("#price-current-min").val(),
                    foo = [];
             $('.ajaxfilter-section select option:selected').each(function (i, selected) {
                    foo[i] = $(selected).val();
            });
            foo = foo.filter(v => v !== '');
            if (foo.length > 0 || priceMin !== priceCurrent) {
                    $(".clearAllfilters").show();
            } else {
                    $(".clearAllfilters").hide();
            }
        }
    }
};