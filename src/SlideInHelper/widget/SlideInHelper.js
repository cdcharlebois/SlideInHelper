define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "SlideInHelper/lib/jquery-1.11.2",
    "dojo/text!SlideInHelper/widget/template/SlideInHelper.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent, _jQuery, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    return declare("SlideInHelper.widget.SlideInHelper", [
        _WidgetBase, _TemplatedMixin
    ], {

        templateString: widgetTemplate,

        //modeler
        side: '',
        depth: 37,

        widgetBase: null,

        // Internal variables.
        _handles: null,
        _contextObj: null,

        constructor: function() {
            this._handles = [];
        },

        postCreate: function() {
            logger.debug(this.id + ".postCreate");
        },

        update: function(obj, callback) {

            var slider = this.widgetBase.parentElement;
            // var tab = document.createElement('div');
            var tab = this.widgetBase.nextSibling

            // tab.innerHTML = "I'm a tab!"
            // tab.style.backgroundColor = 'rebeccapurple'
            // tab.style.color = 'white'
            tab.style.display = 'inline-block'
            if (slider.nextSibling) {
                document.insertBefore(slider.nextSibling, tab)
            } else {
                slider.parentElement.appendChild(tab)
            }
            // set to inline block so we can get a proper width.
            slider.style.display = 'inline-block'

            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._setupEvents(slider, tab);
            callback();
        },

        _setupEvents: function(slider, tab) {
            var _this = this,
                width = slider.getBoundingClientRect().width
            var settings = {
                content: {
                    left: {
                        open: {
                            left: '0'
                        },
                        closed: {
                            left: '-' + width + 'px' //width of element
                        }
                    },
                    right: {
                        open: {
                            right: '0'
                        },
                        closed: {
                            right: '-' + width + 'px' // width of element
                        }
                    }
                },
                tab: {
                    left: {
                        open: {
                            left: width + 'px' //width of element
                        },
                        closed: {
                            left: '0'
                        }
                    },
                    right: {
                        open: {
                            right: width + 'px'
                        },
                        closed: {
                            right: '0'
                        }
                    }
                }
            }

            // setup
            $(slider).css({'position': 'fixed', '-webkit-transition': 'all 0.3s ease-in-out', '-moz-transition': 'all 0.3s ease-in-out', '-o-transition': 'all 0.3s ease-in-out', 'transition': 'all 0.3s ease-in-out'})
            $(tab).css({'position': 'fixed', '-webkit-transition': 'all 0.3s ease-in-out', '-moz-transition': 'all 0.3s ease-in-out', '-o-transition': 'all 0.3s ease-in-out', 'transition': 'all 0.3s ease-in-out'})

            if (_this.side == 'right') {
                $(slider).css(settings.content.right.closed)
                $(tab).css(settings.tab.right.closed)

            } else {
                $(slider).css(settings.content.left.closed)
                $(tab).css(settings.tab.left.closed)
            }

            $(tab).on('mouseenter', function(e) {
                // console.log(this)
                if (_this.side == 'right') {
                    $(slider).css(settings.content.right.open)
                    $(tab).css(settings.tab.right.open)
                } else {
                    $(slider).css(settings.content.left.open)
                    $(tab).css(settings.tab.left.open)
                }
                // $(this).css('left', '0')
            })
            $(slider).on('mouseleave', function(e) {
                // console.log(this)
                if (_this.side == 'right') {
                    $(slider).css(settings.content.right.closed)
                    $(tab).css(settings.tab.right.closed)
                } else {
                    $(slider).css(settings.content.left.closed)
                    $(tab).css(settings.tab.left.closed)
                }
                // $(this).css('left', '-75px')
            })
        }
    });
});

require(["SlideInHelper/widget/SlideInHelper"]);
