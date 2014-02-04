Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

function imagePreview(sourceId, targetId) {
    /*if (typeof FileReader === 'undefined') {
        alert('Your browser does not support FileReader...');
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.getElementById(targetId);
        img.src = this.result;
    };
    reader.readAsDataURL(document.getElementById(sourceId).files[0]);*/
    var files = $("#" + sourceId).get(0).files;
    if (files.length > 0) {
        var data = new FormData();
        for (i = 0; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        $.ajax({
            type: "POST",
            url: requestUrl.upload,
            contentType: false,
            processData: false,
            data: data,
            success: function(results) {
                if (results) {
                    $("#" + targetId).attr("src", requestUrl.upload + "/" + results);
                }
            }
        });
    }
}

function codeToArea(areaType, areaCode) {
    var result = "";
    $(areaData[areaType]).each(function() {
        if (this.code == areaCode) {
            result = this.name;
        }
    });
    return result;
}

var requestUrl = {
    survey: "api/mysurvey", //问卷列表
    upload: "api/upload", //上传
    user: "api/user", //用户
    test:"api/test" //测试
};

var survey_status ={
    "0":"未启用",
    "1":"已启用"
}

var examination_type ={
    "0":"趣味问卷",
    "1":"试用问卷",
    "2":"商务问卷"
}

var gender ={
    "m":"男",
    "f":"女"
}

;
(function($) {
    $.fn.extend({
        tmp: function(url, data) {
            var _this = this;
            $('<div></div>').load(url, function() {
                $(_this).empty();
                $(this).tmpl(data).appendTo($(_this));
            });
        }
    });
})(jQuery);