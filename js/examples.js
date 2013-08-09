$(document).ready(function() {
  $('.example-Stations .typeahead').typeahead([{
    name: 'Velib',
    remote: {
                // Parametered query to ArcGIS Online to retrieve the targeted feature as a Json response
                // Using COLLATE in the SQL syntax allows not to worry about casing and accents
                url: 'http://services.arcgis.com/d3voDfTFbHOCRwVR/arcgis/rest/services/stations/FeatureServer/0/query?where=name+like+%27%25%QUERY%25%27+COLLATE+SQL_Latin1_General_Cp437_CI_AI&outFields=objectid,name,address&orderByFields=name&returnGeometry=false&f=json',
                // The filter function is there built the typeahead dataset from the ArcGIS JSon response
                filter: function(data){
                  retour = [];
                  $.each(data.features, function(index, value) {
                    retour.push({value: value.attributes.name, tokens: value.attributes.name.split(' '), objectid: value.attributes.objectid, address: value.attributes.address});
                  });
                  return retour;
                }
              },
    template: [                                                                 
      '<p class="dataset">Velib</p>',                              
      '<p class="name">{{value}}</p>',                                      
      '<p class="description">{{address}}</p>'                         
      ].join(''),
    engine: Hogan,                                                               
    limit: 8
  },
  {
    name: 'Autolib',
    remote: {
                url: 'http://services.arcgis.com/d3voDfTFbHOCRwVR/arcgis/rest/services/Stations_Autolib/FeatureServer/0/query?where=identifiant_autolib+like+%27%25%QUERY%25%27+COLLATE+SQL_Latin1_General_Cp437_CI_AI&outFields=FID,identifiant_autolib,Adresse&orderByFields=name&returnGeometry=false&f=json',
                filter: function(data){
                  retour = [];
                  $.each(data.features, function(index, value) {
                    retour.push({value: value.attributes.identifiant_autolib, tokens: value.attributes.identifiant_autolib.split(' '), objectid: value.attributes.FID, address: value.attributes.Adresse});
                  });
                  return retour;
                }
              },
    template: [                                                                 
      '<p class="dataset">Autolib</p>',                              
      '<p class="name">{{value}}</p>',                                      
      '<p class="description">{{address}}</p>'                         
      ].join(''),
    engine: Hogan,                                                               
    limit: 8
  }]);


  // Those 2 events are there to demonstrate how to get the resulting user's choice and start to do something usefull with it...
  $('.example-Stations .typeahead').bind('typeahead:selected', function(obj, datum, dataset) {        
        alert("Origine : menu de sélection \nDataset : " + dataset + "\nobjectid : " + JSON.stringify(datum.objectid));
  });

  $('.example-Stations .typeahead').bind('typeahead:autocompleted', function(obj, datum, dataset) {        
        alert("Origine : autocomplétion \nDataset : " + dataset + "\nobjectid : " + JSON.stringify(datum.objectid));
  });
});
