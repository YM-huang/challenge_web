/*!
 * iCheck v0.9.1, http://git.io/uhUPMA
 * =================================
 * Powerful jQuery plugin for checkboxes and radio buttons customization
 *
 * (c) 2013 Damir Foy, http://damirfoy.com
 * MIT Licensed
 */
(function (c) {
    var g = "iCheck", e = g + "-helper", q = "checkbox", a = "radio", s = "checked", x = "un" + s, i = "disabled",
        h = "determinate", b = "in" + h, r = "update", t = "type", d = "click", w = "touchbegin.i touchend.i",
        p = "addClass", f = "removeClass", l = "trigger", z = "label", o = "cursor",
        n = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini/i.test(navigator.userAgent);
    c.fn[g] = function (N, E) {
        var J = ":" + q + ", :" + a, L = c(), B = function (O) {
            O.each(function () {
                var P = c(this);
                if (P.is(J)) {
                    L = L.add(P)
                } else {
                    L = L.add(P.find(J))
                }
            })
        };
        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(N)) {
            N = N.toLowerCase();
            B(this);
            return L.each(function () {
                if (N == "destroy") {
                    u(this, "ifDestroyed")
                } else {
                    v(c(this), true, N)
                }
                if (c.isFunction(E)) {
                    E()
                }
            })
        } else {
            if (typeof N == "object" || !N) {
                var F = c.extend({checkedClass: s, disabledClass: i, indeterminateClass: b, labelHover: true}, N),
                    G = F.handle, I = F.hoverClass || "hover", M = F.focusClass || "focus",
                    K = F.activeClass || "active", C = !!F.labelHover, H = F.labelHoverClass || "hover",
                    D = ("" + F.increaseArea).replace("%", "") | 0;
                if (G == q || G == a) {
                    J = ":" + G
                }
                if (D < -50) {
                    D = -50
                }
                B(this);
                return L.each(function () {
                    u(this);
                    var X = c(this), Q = this, O = Q.id, R = -D + "%", Y = 100 + (D * 2) + "%", S = {
                            position: "absolute",
                            top: R,
                            left: R,
                            display: "block",
                            width: Y,
                            height: Y,
                            margin: 0,
                            padding: 0,
                            background: "#fff",
                            border: 0,
                            opacity: 0
                        }, T = n ? {position: "absolute", visibility: "hidden"} : D ? S : {
                            position: "absolute",
                            opacity: 0
                        }, U = Q[t] == q ? F.checkboxClass || "i" + q : F.radioClass || "i" + a,
                        V = c(z + '[for="' + O + '"]').add(X.closest(z)),
                        W = X.wrap('<div class="' + U + '"/>')[l]("ifCreated").parent().append(F.insert),
                        P = c('<ins class="' + e + '"/>').css(S).appendTo(W);
                    X.data(g, {o: F, s: X.attr("style")}).css(T);
                    !!F.inheritClass && W[p](Q.className);
                    !!F.inheritID && O && W.attr("id", g + "-" + O);
                    W.css("position") == "static" && W.css("position", "relative");
                    v(X, true, r);
                    if (V.length) {
                        V.on(d + ".i mouseenter.i mouseleave.i " + w, function (ab) {
                            var Z = ab[t], aa = c(this);
                            if (!Q[i]) {
                                if (Z == d) {
                                    v(X, false, true)
                                } else {
                                    if (C) {
                                        if (/ve|nd/.test(Z)) {
                                            W[f](I);
                                            aa[f](H)
                                        } else {
                                            W[p](I);
                                            aa[p](H)
                                        }
                                    }
                                }
                                if (n) {
                                    ab.stopPropagation()
                                } else {
                                    return false
                                }
                            }
                        })
                    }
                    X.on(d + ".i focus.i blur.i keyup.i keydown.i keypress.i", function (ab) {
                        var aa = ab[t], Z = ab.keyCode;
                        if (aa == d) {
                            return false
                        } else {
                            if (aa == "keydown" && Z == 32) {
                                if (!(Q[t] == a && Q[s])) {
                                    if (Q[s]) {
                                        y(X, s)
                                    } else {
                                        k(X, s)
                                    }
                                }
                                return false
                            } else {
                                if (aa == "keyup" && Q[t] == a) {
                                    !Q[s] && k(X, s)
                                } else {
                                    if (/us|ur/.test(aa)) {
                                        W[aa == "blur" ? f : p](M)
                                    }
                                }
                            }
                        }
                    });
                    P.on(d + " mousedown mouseup mouseover mouseout " + w, function (ab) {
                        var aa = ab[t], Z = /wn|up/.test(aa) ? K : I;
                        if (!Q[i]) {
                            if (aa == d) {
                                v(X, false, true)
                            } else {
                                if (/wn|er|in/.test(aa)) {
                                    W[p](Z)
                                } else {
                                    W[f](Z + " " + K)
                                }
                                if (V.length && C && Z == I) {
                                    V[/ut|nd/.test(aa) ? f : p](H)
                                }
                            }
                            if (n) {
                                ab.stopPropagation()
                            } else {
                                return false
                            }
                        }
                    })
                })
            } else {
                return this
            }
        }
    };

    function v(B, F, E) {
        var C = B[0];
        D = /er/.test(E) ? b : /bl/.test(E) ? i : s, active = E == r ? {
            checked: C[s],
            disabled: C[i],
            indeterminate: B.attr(b) == "true" || B.attr(h) == "false"
        } : C[D];
        if (/^(ch|di|in)/.test(E) && !active) {
            k(B, D)
        } else {
            if (/^(un|en|de)/.test(E) && active) {
                y(B, D)
            } else {
                if (E == r) {
                    for (var D in active) {
                        if (active[D]) {
                            k(B, D, true)
                        } else {
                            y(B, D, true)
                        }
                    }
                } else {
                    if (!F || E == "toggle") {
                        if (!F) {
                            B[l]("ifClicked")
                        }
                        if (active) {
                            if (C[t] !== a) {
                                y(B, D)
                            }
                        } else {
                            k(B, D)
                        }
                    }
                }
            }
        }
    }

    function k(J, D, B) {
        var G = J[0], L = J.parent(), K = D == s, C = D == b, M = C ? h : K ? x : "enabled", F = m(G, M + j(G[t])),
            I = m(G, D + j(G[t]));
        if (G[D] !== true) {
            if (!B && D == s && G[t] == a && G.name) {
                var E = J.closest("form"), H = 'input[name="' + G.name + '"]';
                H = E.length ? E.find(H) : c(H);
                H.each(function () {
                    if (this !== G && c.data(this, g)) {
                        y(c(this), D)
                    }
                })
            }
            if (C) {
                G[D] = true;
                if (G[s]) {
                    y(J, s, "force")
                }
            } else {
                if (!B) {
                    G[D] = true
                }
                if (K && G[b]) {
                    y(J, b, false)
                }
            }
            A(J, K, D, B)
        }
        if (G[i] && !!m(G, o, true)) {
            L.find("." + e).css(o, "default")
        }
        L[p](I || m(G, D));
        L[f](F || m(G, M) || "")
    }

    function y(H, D, B) {
        var F = H[0], J = H.parent(), I = D == s, C = D == b, K = C ? h : I ? x : "enabled", E = m(F, K + j(F[t])),
            G = m(F, D + j(F[t]));
        if (F[D] !== false) {
            if (C || !B || B == "force") {
                F[D] = false
            }
            A(H, I, K, B)
        }
        if (!F[i] && !!m(F, o, true)) {
            J.find("." + e).css(o, "pointer")
        }
        J[f](G || m(F, D) || "");
        J[p](E || m(F, K))
    }

    function u(C, D) {
        if (c.data(C, g)) {
            var B = c(C);
            B.parent().html(B.attr("style", c.data(C, g).s || "")[l](D || ""));
            B.off(".i").unwrap();
            c(z + '[for="' + C.id + '"]').add(B.closest(z)).off(".i")
        }
    }

    function m(C, D, B) {
        if (c.data(C, g)) {
            return c.data(C, g).o[D + (B ? "" : "Class")]
        }
    }

    function j(B) {
        return B.charAt(0).toUpperCase() + B.slice(1)
    }

    function A(C, D, E, B) {
        if (!B) {
            if (D) {
                C[l]("ifToggled")
            }
            C[l]("ifChanged")[l]("if" + j(E))
        }
    }
})(jQuery);