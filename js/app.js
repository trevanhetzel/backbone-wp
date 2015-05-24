var ApplicationRouter = Backbone.Router.extend({
    initialize: function (el) {
        this.el = el;

        // Single page template
        this.pageView = new view({template: '#page'});

        // 404 template
        this.notFoundView = new view({template: '#notfound'});
    },

    // Define front-end routes
    routes: {
        '':
            function () {
                this.setActiveEntry('#!beanie-baby');
                this.getPageContent(11, this.pageView);
            },

        '!beanie-baby':
            function () {
                this.setActiveEntry('#!beanie-baby');
                this.getPageContent(11, this.pageView);
            },

        '!98-degrees':
            function () {
                this.setActiveEntry('#!98-degrees');
                this.getPageContent(13, this.pageView);
            },

        '!warheads':
            function () {
                this.setActiveEntry('#!warheads');
                this.getPageContent(5, this.pageView);
            },

        '!friends':
            function () {
                this.setActiveEntry('#!friends');
                this.getPageContent(7, this.pageView);
            },

        '!aol':
            function () {
                this.setActiveEntry('#!aol');
                this.getPageContent(9, this.pageView);
            },

        '*else':
            function () {
                this.switchView(this.notFoundView);
            }
    },

    currentView: null,

    // Switch out views
    switchView: function (view, data) {
        if (this.currentView) {
            this.currentView.remove();
        }

        this.el.html(view.el);
        view.render(data);
        this.currentView = view;
    },

    // Handle active navigation
    setActiveEntry: function (url) {
        $('nav li').css({'font-weight': 'normal'});
        $("nav li a[href='" + url + "']").parents('li').css({'font-weight': 'bold'});
    },

    // Fetch the actual content from WP API
    getPageContent: function (pageID, view) {
        var self = this;

        page.fetch({
            data: $.param({ type: 'page', 'filter[page_id]': pageID }),
            processData: true,
            success: function (result) {
                var page = result.toJSON();

                self.switchView(view, page[0]);
            }
        })
    }
});

// Render views
var view = Backbone.View.extend({
    initialize: function (options) {
        this.template = options.template;
    },

    render: function (data) {
        var content = _.template($(this.template).html()),
            vars = {data: data},
            html = content(vars);

        $(this.el).html(html);
    }
});

// Pages collection
var pageCollection = Backbone.Collection.extend({
    url: '/wp-json/posts'
});

var page = new pageCollection();

// Kick off router
var router = new ApplicationRouter($('#content'));

// Use history API
Backbone.history.start();