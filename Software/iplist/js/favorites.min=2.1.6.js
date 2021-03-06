function favorites_after_button_submit(t, e, a, o) {
}

function favorites_after_initial_load(t) {
}

var Favorites = Favorites || {};
Favorites.Utilities = function () {
    var t = this, e = jQuery;
    t.isFavorite = function (t, a) {
        var o = !1;
        return e.each(a, function (e, a) {
            a.post_id === parseInt(t) && (o = !0), parseInt(a.post_id) === t && (o = !0)
        }), o
    }, t.objectLength = function (t) {
        var e, a = 0;
        for (e in t) t.hasOwnProperty(e) && a++;
        return a
    }, t.siteIndex = function (t) {
        for (var e = 0; e < Favorites.userFavorites.length; e++) if (Favorites.userFavorites[e].site_id === parseInt(t)) return e
    }, t.getThumbnail = function (t, e) {
        var a = t.thumbnails;
        if (void 0 === a || 0 == a.length) return !1;
        var o = a[e];
        return void 0 !== o && (o || !1)
    }
}, (Favorites = Favorites || {}).Formatter = function () {
    var t = this, e = jQuery;
    t.addFavoriteCount = function (t, e) {
        return Favorites.jsData.button_options.include_count ? (e <= 0 && (e = 0), t += ' <span class="simplefavorite-button-count">' + e + "</span>") : t
    }, t.decrementAllCounts = function () {
        for (var t = e(".simplefavorite-button.active.has-count"), a = 0; a < t.length; a++) {
            var o = e(t)[a], i = e(o).find(".simplefavorite-button-count"), s = e(i).text() - 1;
            e(o).attr("data-favoritecount", s)
        }
    }
}, (Favorites = Favorites || {}).ButtonOptionsFormatter = function () {
    var t = this, e = jQuery;
    t.options = Favorites.jsData.button_options, t.formatter = new Favorites.Formatter, t.format = function (e, a) {
        t.options.custom_colors && t.colors(e, a), t.html(e, a)
    }, t.html = function (a, o) {
        var i = e(a).attr("data-favoritecount"), s = t.options.button_type, r = "";
        return "custom" === t.options.button_type ? (o && e(a).html(t.formatter.addFavoriteCount(Favorites.jsData.favorited, i)), o || e(a).html(t.formatter.addFavoriteCount(Favorites.jsData.favorite, i)), t.applyIconColor(a, o), void t.applyCountColor(a, o)) : o ? (r += '<i class="' + s.icon_class + '"></i> ', r += s.state_active, void e(a).html(t.formatter.addFavoriteCount(r, i))) : (r += '<i class="' + s.icon_class + '"></i> ', r += s.state_default, e(a).html(t.formatter.addFavoriteCount(r, i)), t.applyIconColor(a, o), void t.applyCountColor(a, o))
    }, t.colors = function (a, o) {
        if (t.options.custom_colors) {
            if (o) return (i = t.options.active).background_active && e(a).css("background-color", i.background_active), i.border_active && e(a).css("border-color", i.border_active), void (i.text_active && e(a).css("color", i.text_active));
            var i = t.options.default;
            i.background_default && e(a).css("background-color", i.background_default), i.border_default && e(a).css("border-color", i.border_default), i.text_default && e(a).css("color", i.text_default), t.boxShadow(a)
        }
    }, t.boxShadow = function (a) {
        t.options.box_shadow || (e(a).css("box-shadow", "none"), e(a).css("-webkit-box-shadow", "none"), e(a).css("-moz-box-shadow", "none"))
    }, t.applyIconColor = function (a, o) {
        t.options.custom_colors && (o && t.options.active.icon_active && e(a).find("i").css("color", t.options.active.icon_active), !o && t.options.default.icon_default && e(a).find("i").css("color", t.options.default.icon_default))
    }, t.applyCountColor = function (a, o) {
        t.options.custom_colors && (o && t.options.active.count_active ? e(a).find(Favorites.selectors.count).css("color", t.options.active.count_active) : !o && t.options.default.count_default && e(a).find(Favorites.selectors.count).css("color", t.options.default.count_default))
    }
}, (Favorites = Favorites || {}).NonceGenerator = function () {
    var t = this, e = jQuery;
    return t.bindEvents = function () {
        e(document).ready(function () {
            Favorites.jsData.dev_mode && (console.log("Favorites Localized Data"), console.log(Favorites.jsData)), t.getNonce()
        })
    }, t.getNonce = function () {
        "" !== Favorites.jsData.cache_enabled ? e.ajax({
            url: Favorites.jsData.ajaxurl,
            type: "POST",
            datatype: "json",
            data: {
                action: Favorites.formActions.nonce,
                logged_in: Favorites.jsData.logged_in,
                user_id: Favorites.jsData.user_id
            },
            success: function (t) {
                Favorites.jsData.nonce = t.nonce, Favorites.jsData.dev_mode && console.log("Nonce successfully generated: " + t.nonce), e(document).trigger("favorites-nonce-generated", [t.nonce])
            }
        }) : Favorites.jsData.nonce = favorites_data.nonce
    }, t.bindEvents()
}, (Favorites = Favorites || {}).UserFavorites = function () {
    var t = this, e = jQuery;
    return t.initialLoad = !1, t.bindEvents = function () {
        e(document).on("favorites-nonce-generated", function () {
            t.initalLoad = !0, t.getFavorites()
        })
    }, t.getFavorites = function () {
        e.ajax({
            url: Favorites.jsData.ajaxurl,
            type: "POST",
            datatype: "json",
            data: {
                action: Favorites.formActions.favoritesarray,
                logged_in: Favorites.jsData.logged_in,
                user_id: Favorites.jsData.user_id
            },
            success: function (a) {
                Favorites.jsData.dev_mode && (console.log("The current user favorites were successfully loaded."), console.log(a)), Favorites.userFavorites = a.favorites, e(document).trigger("favorites-user-favorites-loaded", [t.initalLoad]), e(document).trigger("favorites-update-all-buttons"), t.initalLoad && favorites_after_initial_load(Favorites.userFavorites)
            },
            error: function (t) {
                Favorites.jsData.dev_mode && (console.log("The was an error loading the user favorites."), console.log(t))
            }
        })
    }, t.bindEvents()
}, (Favorites = Favorites || {}).Clear = function () {
    var t = this, e = jQuery;
    return t.activeButton, t.utilities = new Favorites.Utilities, t.formatter = new Favorites.Formatter, t.bindEvents = function () {
        e(document).on("click", Favorites.selectors.clear_button, function (a) {
            a.preventDefault(), t.activeButton = e(this), t.clearFavorites()
        }), e(document).on("favorites-updated-single", function () {
            t.updateClearButtons()
        }), e(document).on("favorites-user-favorites-loaded", function () {
            t.updateClearButtons()
        })
    }, t.clearFavorites = function () {
        t.loading(!0);
        var a = e(t.activeButton).attr("data-siteid");
        e.ajax({
            url: Favorites.jsData.ajaxurl,
            type: "post",
            datatype: "json",
            data: {
                action: Favorites.formActions.clearall,
                nonce: Favorites.jsData.nonce,
                siteid: a,
                logged_in: Favorites.jsData.logged_in,
                user_id: Favorites.jsData.user_id
            },
            success: function (o) {
                Favorites.jsData.dev_mode && (console.log("Favorites list successfully cleared."), console.log(o)), Favorites.userFavorites = o.favorites, t.formatter.decrementAllCounts(), t.loading(!1), t.clearSiteFavorites(a), e(document).trigger("favorites-cleared", [t.activeButton, o.old_favorites]), e(document).trigger("favorites-update-all-buttons")
            },
            error: function (t) {
                Favorites.jsData.dev_mode && (console.log("There was an error clearing the favorites list."), console.log(t))
            }
        })
    }, t.loading = function (a) {
        if (a) return e(t.activeButton).addClass(Favorites.cssClasses.loading), void e(t.activeButton).attr("disabled", "disabled");
        e(t.activeButton).removeClass(Favorites.cssClasses.loading)
    }, t.updateClearButtons = function () {
        for (var a, o, i = 0; i < e(Favorites.selectors.clear_button).length; i++) {
            a = e(Favorites.selectors.clear_button)[i], o = e(a).attr("data-siteid");
            for (var s = 0; s < Favorites.userFavorites.length; s++) Favorites.userFavorites[s].site_id === parseInt(o) && (t.utilities.objectLength(Favorites.userFavorites[s].posts) > 0 ? e(a).attr("disabled", !1) : e(a).attr("disabled", "disabled"))
        }
    }, t.clearSiteFavorites = function (t) {
        e.each(Favorites.userFavorites, function (e, a) {
            this.site_id === parseInt(t) && (Favorites.userFavorites[e].posts = {})
        })
    }, t.bindEvents()
}, (Favorites = Favorites || {}).Lists = function () {
    var t = this, e = jQuery;
    return t.utilities = new Favorites.Utilities, t.buttonFormatter = new Favorites.ButtonOptionsFormatter, t.bindEvents = function () {
        e(document).on("favorites-update-all-lists", function () {
            t.updateAllLists()
        }), e(document).on("favorites-updated-single", function () {
            t.updateAllLists()
        }), e(document).on("favorites-cleared", function () {
            t.updateAllLists()
        }), e(document).on("favorites-user-favorites-loaded", function () {
            t.updateAllLists()
        })
    }, t.updateAllLists = function () {
        for (var a = 0; a < Favorites.userFavorites.length; a++) for (var o = e(Favorites.selectors.list + '[data-siteid="' + Favorites.userFavorites[a].site_id + '"]'), i = 0; i < e(o).length; i++) {
            var s = e(o)[i];
            t.updateSingleList(s)
        }
    }, t.updateSingleList = function (a) {
        var o = e(a).attr("data-userid"), i = e(a).attr("data-siteid"), s = e(a).attr("data-includelinks"),
            r = e(a).attr("data-includebuttons"), n = e(a).attr("data-includethumbnails"),
            d = e(a).attr("data-thumbnailsize"), c = e(a).attr("data-includeexcerpts"), u = e(a).attr("data-posttypes"),
            v = e(a).attr("data-nofavoritestext");
        e.ajax({
            url: Favorites.jsData.ajaxurl,
            type: "post",
            dataType: "json",
            data: {
                action: Favorites.formActions.favoritelist,
                nonce: Favorites.jsData.nonce,
                userid: o,
                siteid: i,
                include_links: s,
                include_buttons: r,
                include_thumbnails: n,
                thumbnail_size: d,
                include_excerpt: c,
                no_favorites: v,
                post_types: u,
                user_id_current: Favorites.jsData.user_id,
                logged_in: Favorites.jsData.logged_in
            },
            success: function (o) {
                Favorites.jsData.dev_mode && (console.log("Favorites list successfully retrieved."), console.log(e(a)), console.log(o));
                var i = e(o.list);
                e(a).replaceWith(i), t.removeButtonLoading(i), e(document).trigger("favorites-list-updated", [i])
            },
            error: function (t) {
                Favorites.jsData.dev_mode && (console.log("There was an error updating the list."), console.log(a), console.log(t))
            }
        })
    }, t.removeButtonLoading = function (a) {
        var o = e(a).find(Favorites.selectors.button);
        e.each(o, function () {
            t.buttonFormatter.format(e(this), !1), e(this).removeClass(Favorites.cssClasses.active), e(this).removeClass(Favorites.cssClasses.loading)
        })
    }, t.removeInvalidListItems = function (a, o) {
        var i = e(a).find("li[data-postid]");
        e.each(i, function (a, i) {
            var s = e(this).attr("data-postid");
            t.utilities.isFavorite(s, o) || e(this).remove()
        })
    }, t.bindEvents()
}, (Favorites = Favorites || {}).Button = function () {
    var t = this, e = jQuery;
    return t.activeButton, t.allButtons, t.authenticated = !0, t.formatter = new Favorites.Formatter, t.data = {}, t.bindEvents = function () {
        e(document).on("click", Favorites.selectors.button, function (a) {
            a.preventDefault(), t.activeButton = e(this), t.setAllButtons(), t.submitFavorite()
        })
    }, t.setAllButtons = function () {
        var a = e(t.activeButton).attr("data-postid");
        t.allButtons = e('button[data-postid="' + a + '"]')
    }, t.setData = function () {
        t.data.post_id = e(t.activeButton).attr("data-postid"), t.data.site_id = e(t.activeButton).attr("data-siteid"), t.data.status = e(t.activeButton).hasClass("active") ? "inactive" : "active"
    }, t.submitFavorite = function () {
        t.loading(!0), t.setData(), e.ajax({
            url: Favorites.jsData.ajaxurl,
            type: "post",
            dataType: "json",
            data: {
                action: Favorites.formActions.favorite,
                nonce: Favorites.jsData.nonce,
                postid: t.data.post_id,
                siteid: t.data.site_id,
                status: t.data.status,
                logged_in: Favorites.jsData.logged_in,
                user_id: Favorites.jsData.user_id
            },
            success: function (a) {
                if (Favorites.jsData.dev_mode && (console.log("The favorite was successfully saved."), console.log(a)), "unauthenticated" === a.status) return Favorites.authenticated = !1, t.loading(!1), t.data.status = "inactive", e(document).trigger("favorites-update-all-buttons"), void e(document).trigger("favorites-require-authentication", [t.data]);
                Favorites.userFavorites = a.favorites, t.loading(!1), t.resetButtons(), e(document).trigger("favorites-updated-single", [a.favorites, t.data.post_id, t.data.site_id, t.data.status]), e(document).trigger("favorites-update-all-buttons"), favorites_after_button_submit(a.favorites, t.data.post_id, t.data.site_id, t.data.status)
            },
            error: function (t) {
                Favorites.jsData.dev_mode && (console.log("There was an error saving the favorite."), console.log(t))
            }
        })
    }, t.resetButtons = function () {
        var a = parseInt(e(t.activeButton).attr("data-favoritecount"));
        e.each(t.allButtons, function () {
            if ("inactive" === t.data.status) return a <= 0 && (a = 1), e(this).removeClass(Favorites.cssClasses.active), e(this).attr("data-favoritecount", a - 1), void e(this).find(Favorites.selectors.count).text(a - 1);
            e(this).addClass(Favorites.cssClasses.active), e(this).attr("data-favoritecount", a + 1), e(this).find(Favorites.selectors.count).text(a + 1)
        })
    }, t.loading = function (a) {
        a ? e.each(t.allButtons, function () {
            e(this).attr("disabled", "disabled"), e(this).addClass(Favorites.cssClasses.loading), e(this).html(t.addLoadingIndication())
        }) : e.each(t.allButtons, function () {
            e(this).attr("disabled", !1), e(this).removeClass(Favorites.cssClasses.loading)
        })
    }, t.addLoadingIndication = function (e) {
        return "1" !== Favorites.jsData.indicate_loading ? e : "active" === t.data.status ? Favorites.jsData.loading_text + Favorites.jsData.loading_image_active : Favorites.jsData.loading_text + Favorites.jsData.loading_image
    }, t.bindEvents()
}, (Favorites = Favorites || {}).ButtonUpdater = function () {
    var t = this, e = jQuery;
    return t.utilities = new Favorites.Utilities, t.formatter = new Favorites.Formatter, t.buttonFormatter = new Favorites.ButtonOptionsFormatter, t.activeButton, t.data = {}, t.bindEvents = function () {
        e(document).on("favorites-update-all-buttons", function () {
            t.updateAllButtons()
        }), e(document).on("favorites-list-updated", function (e, a) {
            t.updateAllButtons(a)
        })
    }, t.updateAllButtons = function (a) {
        for (var o = void 0 === typeof a && "" !== a ? e(a).find(Favorites.selectors.button) : e(Favorites.selectors.button), i = 0; i < e(o).length; i++) t.activeButton = e(o)[i], Favorites.authenticated && t.setButtonData(), Favorites.authenticated && t.utilities.isFavorite(t.data.postid, t.data.site_favorites) ? (t.buttonFormatter.format(e(t.activeButton), !0), e(t.activeButton).addClass(Favorites.cssClasses.active), e(t.activeButton).removeClass(Favorites.cssClasses.loading), e(t.activeButton).find(Favorites.selectors.count).text(t.data.favorite_count)) : (t.buttonFormatter.format(e(t.activeButton), !1), e(t.activeButton).removeClass(Favorites.cssClasses.active), e(t.activeButton).removeClass(Favorites.cssClasses.loading), e(t.activeButton).find(Favorites.selectors.count).text(t.data.favorite_count))
    }, t.setButtonData = function () {
        t.data.postid = e(t.activeButton).attr("data-postid"), t.data.siteid = e(t.activeButton).attr("data-siteid"), t.data.favorite_count = e(t.activeButton).attr("data-favoritecount"), t.data.site_index = t.utilities.siteIndex(t.data.siteid), t.data.site_favorites = Favorites.userFavorites[t.data.site_index].posts, t.data.favorite_count <= 0 && (t.data.favorite_count = 0)
    }, t.bindEvents()
}, (Favorites = Favorites || {}).TotalCount = function () {
    var t = this, e = jQuery;
    return t.bindEvents = function () {
        e(document).on("favorites-updated-single", function () {
            t.updateTotal()
        }), e(document).on("favorites-cleared", function () {
            t.updateTotal()
        }), e(document).on("favorites-user-favorites-loaded", function () {
            t.updateTotal()
        })
    }, t.updateTotal = function () {
        for (var t = 0; t < e(Favorites.selectors.total_favorites).length; t++) {
            for (var a = e(Favorites.selectors.total_favorites)[t], o = parseInt(e(a).attr("data-siteid")), i = e(a).attr("data-posttypes").split(","), s = 0, r = 0; r < Favorites.userFavorites.length; r++) {
                var n = Favorites.userFavorites[r];
                n.site_id === o && e.each(n.posts, function () {
                    "all" !== e(a).attr("data-posttypes") ? -1 !== e.inArray(this.post_type, i) && s++ : s++
                })
            }
            e(a).text(s)
        }
    }, t.bindEvents()
}, (Favorites = Favorites || {}).PostFavoriteCount = function () {
    var t = this, e = jQuery;
    return t.bindEvents = function () {
        e(document).on("favorites-updated-single", function (e, a, o, i, s) {
            if ("active" === s) return t.updateCounts();
            t.decrementSingle(o, i)
        }), e(document).on("favorites-cleared", function (e, a, o) {
            t.updateCounts(o, !0)
        })
    }, t.updateCounts = function (t, a) {
        void 0 !== t && "" !== t || (t = Favorites.userFavorites), void 0 !== a && "" !== a || (a = !1);
        for (var o = 0; o < e("[" + Favorites.selectors.post_favorite_count + "]").length; o++) {
            var i = e("[" + Favorites.selectors.post_favorite_count + "]")[o],
                s = parseInt(e(i).attr(Favorites.selectors.post_favorite_count)), r = e(i).attr("data-siteid");
            "" === r && (r = "1");
            for (var n = 0; n < t.length; n++) {
                var d = t[n];
                d.site_id === parseInt(r) && e.each(d.posts, function () {
                    if (this.post_id === s) {
                        if (a) {
                            var t = parseInt(this.total) - 1;
                            return void e(i).text(t)
                        }
                        e(i).text(this.total)
                    }
                })
            }
        }
    }, t.decrementSingle = function (t, a) {
        for (var o = 0; o < e("[" + Favorites.selectors.post_favorite_count + "]").length; o++) {
            var i = e("[" + Favorites.selectors.post_favorite_count + "]")[o],
                s = e(i).attr(Favorites.selectors.post_favorite_count), r = e(i).attr("data-siteid");
            if ("" === r && (r = "1"), r === a && s === t) {
                var n = parseInt(e(i).text()) - 1;
                e(i).text(n)
            }
        }
    }, t.bindEvents()
}, (Favorites = Favorites || {}).RequireAuthentication = function () {
    var t = this, e = jQuery;
    return t.bindEvents = function () {
        e(document).on("favorites-require-authentication", function () {
            Favorites.jsData.dev_mode && console.log("Unauthenticated user was prevented from favoriting."), Favorites.jsData.authentication_redirect ? t.redirect() : t.openModal()
        }), e(document).on("click", ".simplefavorites-modal-backdrop", function (e) {
            t.closeModal()
        }), e(document).on("click", "[" + Favorites.selectors.close_modals + "]", function (e) {
            e.preventDefault(), t.closeModal()
        })
    }, t.redirect = function () {
        window.location = Favorites.jsData.authentication_redirect_url
    }, t.openModal = function () {
        t.buildModal(), setTimeout(function () {
            e("[" + Favorites.selectors.modals + "]").addClass("active")
        }, 10)
    }, t.buildModal = function () {
        if (!(e("[" + Favorites.selectors.modals + "]").length > 0)) {
            var t = '<div class="simplefavorites-modal-backdrop" ' + Favorites.selectors.modals + "></div>";
            t += '<div class="simplefavorites-modal-content" ' + Favorites.selectors.modals + ">", t += '<div class="simplefavorites-modal-content-body">', t += Favorites.jsData.authentication_modal_content, t += "</div>\x3c!-- .simplefavorites-modal-content-body --\x3e", t += "</div>\x3c!-- .simplefavorites-modal-content --\x3e", e("body").prepend(t)
        }
    }, t.closeModal = function () {
        e("[" + Favorites.selectors.modals + "]").removeClass("active"), e(document).trigger("favorites-modal-closed")
    }, t.bindEvents()
}, jQuery(document).ready(function () {
    new Favorites.Factory
}), (Favorites = Favorites || {}).selectors = {
    button: ".simplefavorite-button",
    list: ".favorites-list",
    clear_button: ".simplefavorites-clear",
    total_favorites: ".simplefavorites-user-count",
    modals: "data-favorites-modal",
    close_modals: "data-favorites-modal-close",
    count: ".simplefavorite-button-count",
    post_favorite_count: "data-favorites-post-count-id"
}, Favorites.cssClasses = {loading: "loading", active: "active"}, Favorites.jsData = {
    ajaxurl: favorites_data.ajaxurl,
    nonce: null,
    favorite: favorites_data.favorite,
    favorited: favorites_data.favorited,
    include_count: favorites_data.includecount,
    indicate_loading: favorites_data.indicate_loading,
    loading_text: favorites_data.loading_text,
    loading_image_active: favorites_data.loading_image_active,
    loading_image: favorites_data.loading_image,
    cache_enabled: favorites_data.cache_enabled,
    authentication_modal_content: favorites_data.authentication_modal_content,
    authentication_redirect: favorites_data.authentication_redirect,
    authentication_redirect_url: favorites_data.authentication_redirect_url,
    button_options: favorites_data.button_options,
    dev_mode: favorites_data.dev_mode,
    logged_in: favorites_data.logged_in,
    user_id: favorites_data.user_id
}, Favorites.userFavorites = null, Favorites.authenticated = !0, Favorites.formActions = {
    nonce: "favorites_nonce",
    favoritesarray: "favorites_array",
    favorite: "favorites_favorite",
    clearall: "favorites_clear",
    favoritelist: "favorites_list"
}, Favorites.Factory = function () {
    var t = this;
    jQuery;
    return t.build = function () {
        new Favorites.NonceGenerator, new Favorites.UserFavorites, new Favorites.Lists, new Favorites.Clear, new Favorites.Button, new Favorites.ButtonUpdater, new Favorites.TotalCount, new Favorites.PostFavoriteCount, new Favorites.RequireAuthentication
    }, t.build()
};