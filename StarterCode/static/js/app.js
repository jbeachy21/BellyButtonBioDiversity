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
          x: otuIds,
          y: sampleValues,
          text: otuLabels,
          mode: 'markers',
          marker: {
            size: sampleValues ,
            // sizeref: 2.0 * Math.max(...Bubblesize) / (desired_maximum_marker_size**2),
            // sizemode: 'area',
            color: ['Brown','Red','Orange','Yellow','Green','Cyan','Blue','Indigo','Violet']
          },

        };
        
        var Bubbledata = [Bubbletrace];
        
        var Bubblelayout = {
          title: 'Marker Size',
          margin: {t:0 },
          
          
          xaxis: { title: "Otu Ids"},
          margin : {t: 30},
          yaxis: {title: "Sample Values"},
          hovermode: 'closest'
          

        };
        
        Plotly.newPlot('bubble', Bubbledata, Bubblelayout);
         
         
    })

}

function optionChanged(DropdownId) {
  // Prevent the page from refreshing
  // d3.event.preventDefault();

  d3.json("samples.json").then(function(data) {
 
    var OtuId = d3.select("#selDataset").node().value;
    var subjectNames = data.names;
    var sampleValues = data.samples;
    var filteredSamples = sampleValues.filter(element => element.id === DropdownId)[0];

    var index = subjectNames.indexOf(OtuId);
    // var bigbox = d3.select("#sample-metadata"); 
    // bigbox.html("");
    // Object.entries(filteredSamples).forEach(([key, value] )=> 
    // {bigbox.append("h6").text(`${key}: ${value}`)});

    var metadata = data.metadata[index];
    
    var i = 0;
    var pair;
    // Change metadata
    for (const [key, value] of Object.entries(metadata)) {
      // console.log(`${key}: ${value}`);
      pair = `${key}: ${value}`;
      d3.select("#metadata"+i).text("");
      d3.select("#metadata"+i).text(pair);
       
      i++;
    }


    var BarTrace = {
      x: filteredSamples.sample_values,
      y: filteredSamples.otu_ids,
      type: "bar",
      orientation: 'h',
      text: filteredSamples.otu_labels,
       
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


    var Bubbletrace = {
      x: filteredSamples.otu_ids,
      y: filteredSamples.sample_values,
      text: filteredSamples.otu_labels,
      mode: 'markers',
      marker: {
        size: filteredSamples.sample_values ,
        // sizeref: 2.0 * Math.max(...Bubblesize) / (desired_maximum_marker_size**2),
        // sizemode: 'area',
        color: ['Brown','Red','Orange','Yellow','Green','Cyan','Blue','Indigo','Violet']
      },

    };
    
    var Bubbledata = [Bubbletrace];
    
    var Bubblelayout = {
      title: 'Marker Size',
      margin: {t:0 },
      
      
      xaxis: { title: "Otu Ids"},
      margin : {t: 30},
      yaxis: {title: "Sample Values"},
      hovermode: 'closest'
      

    };
    
    Plotly.newPlot('bubble', Bubbledata, Bubblelayout);




     
  })
}

 


InitCharts();

 
 