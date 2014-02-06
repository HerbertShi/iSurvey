var _pageSize = 10;
    var _startIndex = 0;
    var _orderName = "";
    var _orderType = "";
    function listUser() {
        $.getJSON(requestUrl.user, {
            searchCondition: "",
            pageSize: _pageSize,
            startIndex: _startIndex,
            orderName: _orderName,
            orderType: _orderType
        }, function(data) {
            if (data) {
                $("#userList tbody").empty();
                $(".pagination").hide();
                $("#listCount").html(data.listCount);
                $("#pageSize").html(_pageSize);

                var currentPage = parseInt((_startIndex + 1) / _pageSize + 1, 10);
                var pageCount = parseInt((data.listCount - 1) / _pageSize + 1, 10);
                var pageHtml = "";
                if (currentPage > 1) {
                    pageHtml += '<a href="javascript:void(0);" class="pre" pageno="' + (currentPage - 1) + '">&lt;</a>';
                }
                if (currentPage - 2 > 0) {
                    pageHtml += '<a href="javascript:void(0);" pageno="' + (currentPage - 2) + '">' + (currentPage - 2) + '</a>';
                }
                if (currentPage - 1 > 0) {
                    pageHtml += '<a href="javascript:void(0);" pageno="' + (currentPage - 1) + '">' + (currentPage - 1) + '</a>';
                }
                pageHtml += '<a href="javascript:void(0);" class="active">' + currentPage + '</a>';
                if (currentPage + 1 <= pageCount) {
                    pageHtml += '<a href="javascript:void(0);" pageno="' + (currentPage + 1) + '">' + (currentPage + 1) + '</a>';
                }
                if (currentPage + 2 <= pageCount) {
                    pageHtml += '<a href="javascript:void(0);" pageno="' + (currentPage + 2) + '">' + (currentPage + 2) + '</a>';
                }
                if (currentPage + 1 <= pageCount) {
                    pageHtml += '<a href="javascript:void(0);" class="next" pageno="' + (currentPage + 1) + '">&gt;</a>';
                }
                $(".opt").html(pageHtml);
                $(".pagination").show();

                $(data.list).each(function(index, element) {
                    _startIndex++;
                    var $tr = $("<tr></tr>");
                    if (index % 2 == 1) {
                        $tr.addClass("color");
                    }
                    $tr.append("<td>" + _startIndex + "</td>");
                    $tr.append("<td>" + element.name + "</td>");
                    $tr.append("<td>" + gender[element.gender] + "</td>");
                    $tr.append("<td>" + element.birthday + "</td>");
                    $tr.append("<td>" + codeToArea("province", element.homeLocation.split(",")[0]) + " " + codeToArea("city", element.homeLocation.split(",")[1]) + " " + codeToArea("district", element.homeLocation.split(",")[2]) + "</td>");
                    $tr.append("<td>" + codeToArea("province", element.currentLocation.split(",")[0]) + " " + codeToArea("city", element.currentLocation.split(",")[1]) + " " + codeToArea("district", element.currentLocation.split(",")[2]) + "</td>");
                    $tr.append("<td>" + (element.score || "未测试") + "</td>");
                    $tr.append("<td><a href='review.html?id=" + element.id + "'>查看答题详情</a> <a href='" + requestUrl.user + "/" + element.id + "' target='_blank'>下载简历</a></td>");
                    $tr.appendTo($("#userList tbody"));
                });
            }
        });
    }

        $(function() {
            $("#main").tmp("home.html", {
                navMenus: [{
                    name: "档案管理",
                    href: "document/index.html"
                }, {
                    name: "问卷管理",
                    href: "survey/index.html"
                }]
            }, function() {
                $("#nav").menu({
                    select: function(event, ui) {
                        $(this).find("a[role=menuitem]").removeClass("current");
                        ui.item.children("a[role=menuitem]").addClass("current");
                        switch(ui.item.attr("menuHref")) {
                            case "document/index.html":
                                $("#mainContent").tmp(ui.item.attr("menuHref"), {
                                    theads: [{
                                        name: "序号"
                                    }, {
                                        name: "姓名"
                                    }, {
                                        name: "性别"
                                    }, {
                                        name: "出生日期"
                                    }, {
                                        name: "户籍所在地"
                                    }, {
                                        name: "现居住地"
                                    }, {
                                        name: "笔试得分"
                                    }, {
                                        name: "操作"
                                    }]
                                }, function() {
                                    listUser();
                                    $("#createUser").button({
                                        icons: {
                                            primary: "ui-icon-plusthick"
                                        },
                                        text: false
                                    }).click(function(){
                                        location.href = "resume.html";
                                    });
                                });
                                break;
                            case "survey/index.html":
                                $("#mainContent").tmp(ui.item.attr("menuHref"));
                                break;
                            default:
                                break;
                        }
                    }
                });
                $("#nav").find(".ui-menu-item:first").click();
            });
        });