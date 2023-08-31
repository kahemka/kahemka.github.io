 // Navigation Placement
    let menuEx = [{"title":"🌌 Origin","color":"dark","link":"#"}]
    placeMenuButton("menuButton", menuEx)
    
    // Honeycomb menu Placement
    let honeyEx = [{"title":"Docs","desc":"Personal documentation","img":"static/img/book.JPG","link":"Docs.html"},
                   {"title":"3D Exp","desc":"Gallery: 3D modelling experimentation","img":"static/img/3d.jpg","link":"#"},
                   {"title":"IArt","desc":"Gallery: Generative AI","img":"static/img/iart.JPG","link":"#"},
                   {"title":"Bots","desc":"Serverless games/bots","img":"static/img/game.JPG","link":"#"},
                   {"title":"TIPS","desc":"Tabular Insight Platform Services","img":"static/img/tips.JPG","link":"#"},
                   {"title":"Cloud","desc":"Using servers in the ☁️","img":"static/img/servers.JPG","link":"#"},
                   ]  
    placeHoneycomb("hexaGrid",honeyEx);