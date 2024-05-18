import React from 'react'
import $ from 'jquery';

function BtnLoader(event, status) {
    var defaultStatus = $(event.target).find('.btn-spin-status').attr('data-status');

    if(status == 'show'){
        $(event.target).find('.btn-spin').parent().addClass('disabled');
        $(event.target).find('.btn-spin').addClass('show');
        $(event.target).find('.btn-spin-status').html("Loading...");
    }
    
    if(status == 'hide'){
        $(event.target).find('.btn-spin').parent().removeClass('disabled');
        $(event.target).find('.btn-spin').removeClass('show');
        $(event.target).find('.btn-spin-status').html(defaultStatus);
    }
}

export {BtnLoader}
