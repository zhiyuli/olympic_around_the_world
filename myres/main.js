<script type="text/javascript">
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');



closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};



var overlay = new ol.Overlay({
  element: container
});


var projection = ol.proj.get('EPSG:3857');


var rasterLayer = new ol.layer.Tile({
  source: new ol.source.BingMaps({
	imagerySet: 'Aerial',
    			key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
	crossOrigin: 'anonymous'
  })
});
      



var us_states_vec= new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,				
		url: 'myres/kml/us_states.kml'
	})		
});

var slc_2002_torch= new ol.layer.Vector({
	source: new ol.source.KML({
		projection: projection,				
		url: 'myres/kml/torch.kml'
	})		
});

                        

var vector_summer = new ol.layer.Vector({
                        source: new ol.source.KML({
                        projection: projection,
                        url: 'myres/kml/summer.kml'
                        })
                        });
                        
var vector_winter = new ol.layer.Vector({
                        source: new ol.source.KML({
                        projection: projection,
                        url: 'myres/kml/winter.kml'
                        })
                        });                        		
var vector_relay_route = new ol.layer.Vector({
                        source: new ol.source.KML({
                        projection: projection,
                        url: 'myres/kml/relay_route.kml'
                        })
                        });		

var map = new ol.Map({
  layers: [rasterLayer, us_states_vec, slc_2002_torch, vector_summer, vector_winter,vector_relay_route],
  overlays: [overlay],
  target: 'map',
  view: new ol.View({
    center: ol.proj.transform([34.59, 31.59], 'EPSG:4326', 'EPSG:3857'),
    zoom: 2
  })
});


map.on('click', function(evt) {
  
  //Try to get a feature at the point of interest
  var feature = map.forEachFeatureAtPixel(evt.pixel,
	  function(feature, layer) {
		return feature;
	  },null, function(layer) {
  return (layer === vector_summer) || (layer === vector_winter);
});
	  
	 
	  
  //if we found a feature then create and show the popup.
  if (feature) {
	var geometry = feature.getGeometry();
	var coord = geometry.getCoordinates();
	overlay.setPosition(coord);
	var displaycontent = feature.get('description');
	content.innerHTML = displaycontent;
  }
});
</script>