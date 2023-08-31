////////////////
// Navigation //
////////////////

let menuEx = [{"title":"🌌 Origin","color":"dark","link":"index.html"},{"title":"📖 Documentation","color":"warning","link":"#"}]
placeMenuButton("menuButton", menuEx)


///////////////////
// HierarchyView //
///////////////////



let k1 = `  <p class="inkTitle">Introduction: Documentation module</p>
        <!--<p id="labarum"><img src="static/img/testLogo.png"></p>-->
        <p>Personal documention regarding tools/fields used to build the experimentations showcased here. These experimentations are about some topics of interest which may vary. Currently these topics of interest revolves around:</p>
        <ul>
        <li><h2><b>Serverless solutions</b>: Some of them can actually work offline. Mainly about the topics below.</h2></li>
        <li><h2><b>Machine learning</b>: Algorithms i like to use. Concrete examples.</h2></li>
        <li><h2><b>3D modelling</b>: Building new virtual environments.</h2></li>
        </ul>
        
        
    <p>Code is hosted on <a href="#">Github</a>, including this static webpage. Solutions that requires a backend are hosted on <a href="#">Pythonanywhere</a>. Some specific interactions are done through <a href="#">Discord</a>. 
    Credits regarding works from other people I reuse here should be given in the documentation/github. Tell me if it's not the case.</p>
        <!-- This a red wine cachet ... but shh ! -->
        <!--<p class="cachet"><img src="https://i.postimg.cc/4NBYNqCR/22.png"></p>-->
        <div id="signature">Kahemka<br />Sectum Sempra @Eridu</div>`
        
        
let k2 = `  <p class="inkTitle">Serverless Solutions: Overview</p>
        <p>This section includes all resources used to build serverless applications such as <a href="#">TIPS</a>. It heavily relies on javascript as
        computations only happened in the frontend and webassembly does not seem practical.</p>
        <p><a href="#">The placement modules </a> have been developped to handle the UI/display in a "programmatic" way. It only uses vanilla javascript.</p>
        <div id="signature">Kahemka<br />Sectum Sempra @Eridu</div>`        
        
let k3 = '<p class="inkTitle">Serverless Solutions: TIPS</p>'

let k4 = '<p class="inkTitle">Machine Learning: Overview</p>'

let k5 = '<p class="inkTitle">ML/Tabular Data: Data prep</p>'

let k6 = '<p class="inkTitle">ML/Tabular Data: Data viz</p>'

let k7 = '<p class="inkTitle">ML/Tabular Data: Algorithms</p>'

let k8 = '<p class="inkTitle">ML/Generative AI: Image</p>'

let k9 = '<p class="inkTitle">ML/Generative AI: Text</p>'

let k10 = '<p class="inkTitle">ML/Course: Dauphine MIAGE</p>'

let k11 = '<p class="inkTitle">ML/Course: Sorbonne IMT&E</p>'
        
        
let exData = {"k1":k1,"k2":k2,"k3":k3,"k4":k4,"k5":k5,"k6":k6,"k7":k7,"k8":k8,"k9":k9,"k10":k10,"k11":k11};

let exSelect = {"name":"testView","viewContent":"text", "maxChoice":3,
                "storage":exData,"data":[{'label':["Introduction"],"key":"k1", "mode":"generic"},
                                         {'label':["Serverless Solutions","Overview"],"key":"k2", "mode":"generic"},
                                         {'label':["Serverless Solutions","TIPS"],"key":"k3","mode":"generic"},
                                         {'label':["Machine Learning","Overview"],"key":"k4", "mode":"generic"},
                                         {'label':["Machine Learning","Tabular Data", "Data prep"],"key":"k5","mode":"generic"},
                                         {'label':["Machine Learning","Tabular Data", "Data viz"],"key":"k6","mode":"generic"},
                                         {'label':["Machine Learning","Tabular Data", "Algorithms"],"key":"k7","mode":"generic"},
                                         {'label':["Machine Learning","Generative AI", "Image"],"key":"k8", "mode":"generic"},
                                         {'label':["Machine Learning","Generative AI", "Text"],"key":"k9", "mode":"generic"},
                                         {'label':["Machine Learning","Course","Dauphine M2 - MIAGE"],"key":"k10", "mode":"generic"},
                                         {'label':["Machine Learning","Course","Sorbonne M2 - IMT&E"],"key":"k11","mode":"generic"}]};

mainSelect = new hierarchySelectView(exSelect,exData,"choose","contain",3, ["ScrollHeight"]);
mainSelect.initSetup();

