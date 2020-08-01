function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
    });
            optionChanged("940");

  })}
   
  init();
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
      var id = result.id
      var id = result.id
      var id = result.id
      var id = result.id

      PANEL.html("");
      PANEL.append("h6").text("ID : " + result.id);
      PANEL.append("h6").text("ETHNICITY : " + result.ethnicity);
      PANEL.append("h6").text("GENDER : " + result.gender);
      PANEL.append("h6").text("AGE : " + result.age);
      PANEL.append("h6").text("LOCATION : " + result.location);
      PANEL.append("h6").text("BBTYPE : " + result.bbtype);
      PANEL.append("h6").text("WFREQ : " + result.wfreq);

    });
  }
  function buildCharts(sample){
    d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    // Build a bar chart
    var y = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    var barplot =[{
      type:'bar',
      x: sample_values.slice(0,10).reverse(),
      y: y,
      text: otu_labels.slice(0,10).reverse(),
      orientation: 'h'
    }];
    var layout ={
      title: "Top 10 Bacteria Cultures Found"
    };

    Plotly.newPlot("bar", barplot, layout);

    // Build bubble chart
    
    var bubblechart = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];
    var layout = {
      title: 'Bacteria Per Sample',
      showlegend: 'false',
      xaxis: {title: 'OTD ID'},
      autosize: true,
      hovermode: "closest"

    };
    Plotly.newPlot("bubble", bubblechart, layout)
  }
  )}

  function optionChanged(newSample) {
    console.log(newSample);
    buildMetadata(newSample);
    buildCharts(newSample);
  }