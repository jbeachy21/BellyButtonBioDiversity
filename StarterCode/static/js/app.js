function InitCharts() {

    d3.json("samples.json").then(function(data) {

        
        var subjectNames = data.names;
        var metadata = data.metadata[0];
        var sampleValues = data.samples[0].sample_values;
        var otuIds = data.samples[0].otu_ids;
        var otuLabels = data.samples[0].otu_labels;
    
        // dropdown initalization
        var dropdown = document.getElementById("selDataset");
          
        var objsize = Object.keys(subjectNames).length
         

        for (var i = 0; i<objsize; i++) {
          var option = document.createElement("OPTION");
          dropdown.appendChild(option);
          option.innerHTML = subjectNames[i];
        }
         
     
        var BarTrace = {
            x: sampleValues.slice(0,9),
            y: otuIds.slice(0,9),
            type: "bar",
            orientation: 'h',
            text: otuLabels,
             
          };
          
          var BarData = [BarTrace];
          
          var BarLayout = {
            title: "Belly Buttons",
            xaxis: { title: "Otu Ids"},
            yaxis: 
            { title: "Sample Values",
              gridwidth: 2  },
            width: 600,
            height: 600,
            config: {
              responsive: true
            },
            hoverlabel: {
              align: "right"
            }
            
          };
          
          Plotly.newPlot("bar", BarData, BarLayout, {bargap:100});


        // Demographic information 
        var sampleMetadata = d3.select("#sample-metadata");
         
        var metadataArray = Object.values(metadata);
        var keys = Object.keys(metadata);
      
        
        // sampleMetadata.append("section");
        for (var i = 0; i<metadataArray.length; i++) {
             
          sampleMetadata.append("p").text(keys[i] + ":    " +metadataArray[i]).attr("id", "metadata"+i);
            
        }
             
                
        
        // Bubble chart
        
        var Bubblesize = [sampleValues.slice(0,1)*30,sampleValues.slice(1,2)*30,sampleValues.slice(2,3)*30,
          sampleValues.slice(3,4)*30,sampleValues.slice(4,5)*30,sampleValues.slice(5,6)*30,
          sampleValues.slice(6,7)*30,sampleValues.slice(7,8)*30,sampleValues.slice(8,9)*30];
        
        var Bubbletrace = {
          x: otuIds.slice(0,9),
          y: sampleValues.slice(0,9),
          mode: 'markers',
          marker: {
            size: Bubblesize ,
            // sizeref: 2.0 * Math.max(...Bubblesize) / (desired_maximum_marker_size**2),
            sizemode: 'area',
            color: ['Brown','Red','Orange','Yellow','Green','Cyan','Blue','Indigo','Violet']
          },

        };
        
        var Bubbledata = [Bubbletrace];
        
        var Bubblelayout = {
          title: 'Marker Size',
          showlegend: false,
          height: 750,
          width: 1200,
          xaxis: { title: "Otu Ids"},
          yaxis: {title: "Sample Values"}

        };
        
        Plotly.newPlot('bubble', Bubbledata, Bubblelayout);
         
         
    })

}

function optionChanged() {
  // Prevent the page from refreshing
  // d3.event.preventDefault();

  d3.json("samples.json").then(function(data) {
 
    var OtuId = d3.select("#selDataset").node().value;
    var subjectNames = data.names;
     
    console.log("otuid: " + OtuId);

    var index = subjectNames.indexOf(OtuId);
    var metadata = data.metadata[index];
    // if (subjectNames[index] === OtuId) console.log("OtuIds are equal and index = " + index);
    var i = 0;
    var pair;
    for (const [key, value] of Object.entries(metadata)) {
      console.log(`${key}: ${value}`);
      pair = `${key}: ${value}`;
      d3.select("#metadata"+i).text("");
      d3.select("#metadata"+i).text(pair);
       
      i++;
    }
     
    changeGraphs(OtuId);
  })
   
   
 
}

 
function changeGraphs(OtuId) {
  
  var id = OtuId;

  d3.json("samples.json").then(function(data) {
    var subjectNames = Object.values(data.names);
    console.log("changeGraphs Otuid = " + id);
    var index = subjectNames.indexOf(id);
    var indexArray = [];
    var size = subjectNames.length-1;
    var LessThan = index - 10;
    var GreaterThan = index + 10;
    
    if ((~LessThan < 0 && GreaterThan < size)) {
      indexArray.push(subjectNames.slice(index, GreaterThan));
    }
    else if (LessThan < 0) {
      indexArray.push(subjectNames.slice(index, GreaterThan));
    }
    else if (GreaterThan - size < 10) {
      indexArray.push(subjectNames.slice(index - (GreaterThan - size), size+1));
    }
    else {
      indexArray.push(subjectNames.slice(index, size+1));
    }
    
    // console.log("size = " + size)
    // console.log("index = " + index);
    // console.log("GreaterThan = " +  GreaterThan);
    // console.log("LessThan = " +  LessThan);
    
    // console.log("indexArray = " + indexArray);

    
     
  })
}





InitCharts();
 