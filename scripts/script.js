var URL= "https://openapi.etsy.com/v2/listings/active.js?includes=Images&api_key=6f60tk5ueotsm8pbgzucea4h"




//*****************MODEL
var DataCollection = Backbone.Collection.extend({
	url: "https://openapi.etsy.com/v2/listings/active.js?api_key=6f60tk5ueotsm8pbgzucea4h",
	parse: function(rawResponse){ // the parse method is specific to Backbone and creates a direct link to the nested property on our fetched object where our main data can be found
		var parsedResponse = rawResponse.results // for example our desired array of data can be found on the docs property of the response property of the rawResponse object
		return parsedResponse; // returns the specified data location
	}
	
})
//*****************VIEW
var View = Backbone.View.extend({
	el: document.querySelector(".container"),
	_render: function(){
			this.el.innerHTML = ""
		for(var i = 0; i < this.collection.models.length; i++){
			this.el.innerHTML += "<div class = 'itemContainer'>"
			this.el.innerHTML += "<h3>" + this.collection.models[i].attributes.title + "</h3>"
			this.el.innerHTML += "<p>" + this.collection.models[i].attributes.description + "</p>"
			this.el.innerHTML += "<p>" + this.collection.models[i].attributes.tags + "</p>"
			this.el.innerHTML += "<p>" + this.collection.models[i].attributes.price + "</p>"
			this.el.innerHTML += "</div>"
		}
		// this.el.innerHTML = this.collection.models[0].attributes.price
		
		//description, price, tags, title
	},
	initialize: function(){
		console.log(this)
		console.log("making a new view")
		var boundRender = this._render.bind(this)
		this.collection.on("sync", boundRender) 
		
	}

})




//*****************CONTROLLER
var Controller = Backbone.Router.extend({
	routes: {
			"home": "handleHome",
			"search/:query": "handleSearch",
			"details/:id": "handleDetails",
			"*default": "handleDefault"
	},
	handleHome: function(){
		console.log('handling now')
		var dataCollection = new DataCollection
		var view = new View({
			collection: dataCollection
		})
		console.log('data collection before fetch',dataCollection)
		dataCollection.fetch({
     		dataType: 'jsonp'
     	})
     	console.log(dataCollection)


    },	
	handleDefault: function(){
		console.log('handling default')
		location.hash = "home"
		
	},
	initialize: function(){
		Backbone.history.start()
	}
})
var controller = new Controller()