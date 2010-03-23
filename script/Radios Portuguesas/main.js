/*#########################################################################
#                                                                         #
#   In case of any sugestion, please contact: zipizap123 @ gmail.com      #
#                                                                         #
#   Many thanks to Project ROLI (http://www.radios.pt) for the great      #
#   iniciative to broadcast portuguese small regional radios on Internet  #
#                                                                         #
#    ---------------------------------------------------------------------------------------  #
#                                                                         #
#   Simple script shamelessly recopied and adapted from:                              #
#                                                                         #
#   Copyright                                                             #
#                                                                         #
#   (C)  2009 Àlvar Cuevas i Fajardo <alvar@cuevas.cat>                   #
#   (C)  2008 Eirik Johansen Bjørgan  <eirikjbj@gmail.com>                #
#   (C)  2007, 2008 Nikolaj Hald Nielsen  <nhnFreespirit@gmail.com>       #
#   (C)  2008 Peter ZHOU <peterzhoulei@gmail.com>                         #
#   (C)  2008 Mark Kretschmann <kretschmann@kde.org>                      #
#                                                                         #
#   This program is free software; you can redistribute it and/or modify  #
#   it under the terms of the GNU General Public License as published by  #
#   the Free Software Foundation; either version 2 of the License, or     #
#   (at your option) any later version.                                   #
#                                                                         #
#   This program is distributed in the hope that it will be useful,       #
#   but WITHOUT ANY WARRANTY; without even the implied warranty of        #
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         #
#   GNU General Public License for more details.                          #
#                                                                         #
#   You should have received a copy of the GNU General Public License     #
#   along with this program; if not, write to the                         #
#   Free Software Foundation, Inc.,                                       #
#   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.         #
##########################################################################*/

Importer.loadQtBinding("qt.core");
Importer.loadQtBinding("qt.gui");


/*
__Amarok service info:
http://amarok.kde.org/wiki/Development/Scripted_Services_Tutorial_2.0

*/

/*
-------------------- new objects
Station.
  .stationName
  .stationUrl
  .stationDescription

Category.
	.categoryName
  .categoryImage
  .stationsList[]
  .addStation (stationName, stationUrl, stationDescription)

	
List.
  .addCategory (categoryName, categoryImage )

---------------------- old objects
categories.
  ."categ1-name"[]
    [x] = station
  ."categ2-name"[]
    [x] = station
    
images.
  ."categ1-name" = "categ1-image.gif"
  ."categ2-name" = "categ2-image.gif"
  
*/

function RadioCatalogue() {
	function Category (categoryName,  categoryImage){
		function Station (stationName, stationUrl, stationDescription)
		{
				this.stationName = stationName;
				this.stationUrl = stationUrl
				this.stationDescription = stationDescription;
		}
		this.categoryName=categoryName;     				//text string
		this.categoryImage = categoryImage;					// filename (path relative to main.js directory )
		this.stationsList = [];
		this.addStation = function addStation (stationName, stationUrl, stationDescription) { this.stationsList.push( new Station( stationName, stationUrl, stationDescription ) ); return this;}
	}
	this.categoriesList=[];
	this.addCategory = function addCategory( categoryName,  categoryImage) 
	{ 
		var newCategory = new Category (categoryName,  categoryImage);
		this.categoriesList.push(newCategory);
		return newCategory;
	}
}
myRadioCatalogue=new RadioCatalogue();


myRadioCatalogue.addCategory(
				"27 radios: nacionais ou recomendadas ou interessantes",  
				"img_1.png" 
		)
		.addStation( "Radio Comercial", "mms://212.113.177.246/comercialcbr48", "Radio Comercial" )
		.addStation( "Antena 3","mms://195.245.168.21/antena3","Antena 3" )
			
	


{//Code for category Images
    //---Comments---
    //One image for each category (not for each station)
    //The images are 96x60 pixels, giff files (other formats/sizes should also be accepted, to be tested)
    //The following code should serve as a template to be easily modified (and uncommented):
}

function Service()
{
    //ScriptableServiceScript.call( this, "Radios Portuguesas", 2, "Escuta em directo as inumeras radios regionais portuguesas", "TODO: USE HTML HERE!!!Emissoes em directo das radios regionais portuguesas", false );
    ScriptableServiceScript.call( this, "Radios Portuguesas", 2, "Escuta em directo as inumeras radios regionais portuguesas", "<h2>Norwegian Mountain Trip</h2>", false );
    Amarok.debug( "ok." );
}

function onConfigure()
{
    Amarok.alert( "Este script nao necessita de configuraçao" );
}

function onPopulating( level, callbackData, filter )
{
    if ( level == 1 ) 
    {
			for( var cat_index=0; cat_index < myRadioCatalogue.categoriesList.length; cat_index++)
			{
				var category=myRadioCatalogue.categoriesList[cat_index];
        {//Code to take care of category Images existence/inexistence
          var categoryCover = ((typeof images[att] === 'undefined')) ?  (Amarok.Info.scriptPath() + "/" + "icon_categoryDefault.png") : (Amarok.Info.scriptPath() + "/" + images[att]);
        }
				Amarok.debug ("Adicionando categoria: " + att);
				item = Amarok.StreamItem;
				item.level = 1;
				item.callbackData = att;
				item.itemName = att;
				item.playableUrl = "";
				item.infoHtml = "";
				item.coverUrl = categoryCover;
				script.insertItem( item );
			}
			script.donePopulating();
    }
    else if ( level == 0 ) 
    {
			Amarok.debug( " Recompilando emissoras..." );
			var stationArray = categories[callbackData];
			for ( i = 0; i < stationArray.length; i++ )
			{
        {//Code to take care of station Images existence/inexistence
          var stationCover = ((typeof images[callbackData] === 'undefined')) ? (Amarok.Info.scriptPath() + "/" + "icon_stationDefault.png") : (Amarok.Info.scriptPath() + "/" + images[callbackData]);
        }
        item = Amarok.StreamItem;
				item.level = 0;
				item.callbackData = "";
				item.itemName = stationArray[i].name;
				item.playableUrl = stationArray[i].url;
				item.album = stationArray[i].name; // callbackData;
				item.infoHtml = stationArray[i].description;
				item.artist = "Radio-online";
				item.coverUrl = stationCover;
				script.insertItem( item );
			}
			script.donePopulating();
    }
}

function onCustomize() {
    var currentDir = Amarok.Info.scriptPath() + "/";
    var iconPixmap = new QPixmap(currentDir+"icon_script.png");
    script.setIcon(iconPixmap);
}

Amarok.configured.connect( onConfigure );
script = new Service();
script.populate.connect( onPopulating );
script.customize.connect( onCustomize );
