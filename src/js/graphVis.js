visjs.onclick = function(e) {
  console.log("click vis");
  
  //canvas based
  document.getElementById("svgGraph").style.display = "none";
  //document.getElementById("containerGraph").style.display = "initial";
  
  initGraph();
  renderGraphVis();
}

function renderGraphVis() {
  var graphNodes = [],
      graphEdges = [];
      
  // create an array with nodes
  for(key in node_keys){
    graphNodes.push({'id': key});
  }

  // create an array with edges
  var edgesArray = [];
  //undirected graph
  if(und_edges_keys.length > 0) {
    edgesArray = und_edges_keys;
  } else { //directed graph
    edgesArray = dir_edges_keys;
  }
  
  for(var i = 0; i < edgesArray.length; i++) {
    splitEdge = edgesArray[i].split("_");    
    graphEdges.push(
      { from: splitEdge[0], to: splitEdge[1] }
    );
  }
  
  // create a network
  var container = document.getElementById('containerGraph');
  var data = {
    nodes: new vis.DataSet(graphNodes),
    edges: new vis.DataSet(graphEdges)
  };
  var options = {
    //width: '100%',
    //height: '580px',
    layout: {
      improvedLayout: false //for networks larger than 100 nodes
    },
    physics: {
      stabilization: {
        enabled: true,
        iterations: 10
      }
    },
    nodes: {
      shape: 'dot'
    }
  };
  var network = new vis.Network(container, data, options);
}