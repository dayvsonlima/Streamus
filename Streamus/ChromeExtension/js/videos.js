﻿define(['video', 'programState'], function (Video, programState) {

    var Videos = Backbone.Collection.extend({
        model: Video,
        save: function (callback) {
            var self = this;
            $.ajax({
                type: 'POST',
                url: programState.getBaseUrl() + 'Video/SaveVideos',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(self),
                success: function (data) {
                    chrome.extension.getBackgroundPage().VideoManager.cache(data);

                    if (callback) {
                        callback(data);
                    }
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    });

    return function(config) {
        var videos = new Videos(config);
        return videos;
    };
});