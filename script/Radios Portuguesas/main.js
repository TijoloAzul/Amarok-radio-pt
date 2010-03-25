/*#########################################################################
#                                                                         #
#   In case of any sugestion, please contact: zipizap123 @ gmail.com      #
#                                                                         #
#   Many thanks to Project ROLI (http://www.radios.pt) for the great      #
#   iniciative to broadcast portuguese small regional radios on Internet  #
#                                                                         #
#    ---------------------------------------------------------------------------------------  #
#												#
#      									#
#
#                                                                         #
#   Reused some parts of code from previous scripts made by:  #
#                                                                         #
#   Copyright                                                             #
#   (C)  2010 Zipizap <zipizap123@gmail.com> #
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
  .stationDescription						// can be html code!

Category.
  .categoryName
  .categoryImage
  .categoryHtmlDescription
  .stationsList[]
  .addStation (stationName, stationUrl, stationDescription)

  
RadiosCatalogue.
  .categoriesList
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

function RadiosCatalogue() {
  function Category (categoryName,  categoryImage){
    function Station (stationName, stationUrl, stationDescription)
    {
        this.stationName = stationName;
        this.stationUrl = stationUrl
        this.stationDescription = stationDescription;
    }
    this.categoryName=categoryName;     				//text string
    this.categoryImage = Amarok.Info.scriptPath() + "/" + categoryImage;					// filename (path relative to main.js directory )
    this.categoryHtmlDescription = "TODO HERE!!!\n" + '<img src="'+this.categoryImage+'" />';
    this.stationsList = [];
    this.addStation = function addStation (stationName, stationUrl, stationDescription) { this.stationsList.push( new Station( stationName, stationUrl, stationDescription ) ); return this;}
  }
  this.categoriesList=[];
  this.addCategory = function addCategory( categoryName,  categoryImage) 
  { 
    categoryImage=( (categoryImage=="") ?  ("icon_categoryDefault.png") : (categoryImage) ) ;
    var newCategory = new Category (categoryName,  categoryImage);
    this.categoriesList.push(newCategory);
    return newCategory;
  }
}

myRadiosCatalogue=new RadiosCatalogue();

//arr=["tmp_cat120x75.png","tmp_cat320x200.png","tmp_cat32x20.png","tmp_cat640x480.png","tmp_cat64x40.png"];
arr=["icon_categoryDefault.png","icon_script.png","icon_stationDefault.png","tmp_cat120x75.png","tmp_cat320x200.png","tmp_cat32x20.png","tmp_cat640x480.bmp","tmp_cat640x480.gif","tmp_cat640x480.jpg","tmp_cat640x480.png","tmp_cat640x480.ps","tmp_cat64x40.png", "tmp_catGigante.svg", "tmp_catGigante2.ai"];
for (var i=0; i<arr.length; i++) {
  myRadiosCatalogue.addCategory(arr[i],  arr[i])
    .addStation( "Radio Comercial", "mms://212.113.177.246/comercialcbr48", "Radio Comercial" )
    .addStation( "Antena 3","mms://195.245.168.21/antena3","Antena 3" )
    ;
}


function Service()
{
    //ScriptableServiceScript.call( this, "Radios Portuguesas", 2, "Escuta em directo as inumeras radios regionais portuguesas", "TODO: USE HTML HERE!!!Emissoes em directo das radios regionais portuguesas", false );
    ScriptableServiceScript.call( this, "Radios Portuguesas", 2, "Escuta em directo as inumeras radios regionais portuguesas", "<h2>Norwegian Mountain Trip</h2>", false );
}

function onConfigure()
{
    Amarok.alert( "Este script nao necessita de configuraçao" );
}

function onPopulating( level, callbackData, filter )
{
    if ( level == 1 ) 
    {
      /*
        level = 1
        callbackData = ""
        filter = completely ignored
      */		
      for( var cat_index=0; cat_index < myRadiosCatalogue.categoriesList.length; cat_index++)
      {
        var category=myRadiosCatalogue.categoriesList[cat_index];
        item = Amarok.StreamItem;
        item.level = 1;
        item.callbackData = cat_index;         //Caution: callbackData will be stringified - so it must not be an object or function!!!
        item.itemName = category.categoryName;
        item.playableUrl = "";
        item.infoHtml = category.categoryHtmlDescription;
        item.coverUrl = category.categoryImage;
        script.insertItem( item );
        Amarok.alert("category.categoryName="+category.categoryName+"\n"+
                              "category.categoryImage="+category.categoryImage);
      }
      script.donePopulating();
    }
    else if ( level == 0 ) 
    {
      /*
        level =0
        callbackData = index of the selected category within the array myRadiosCatalogue.categoriesList[]
        filter = completely ignored
      */
      var category=myRadiosCatalogue.categoriesList[callbackData];
      var stationsList = category.stationsList;
      /* Remembering:
        Station.
          .stationName
          .stationUrl
          .stationDescription

        Category.
          .categoryName
          .categoryImage
          .categoryHtmlDescription
          .stationsList[]
          .addStation (stationName, stationUrl, stationDescription)
          
        RadiosCatalogue.
          .categoriesList
          .addCategory (categoryName, categoryImage )
      */
      for ( var sta_index = 0; sta_index < stationsList.length; sta_index++ )
      {
        var station=stationsList[sta_index];
        item = Amarok.StreamItem;
        item.level = 0;
        item.callbackData = "";
        item.itemName = station.stationName;
        item.playableUrl = station.stationUrl;
        item.album = category.categoryName; 
        item.infoHtml = station.stationDescription;
        item.artist = "Radio-online";
        item.coverUrl = "";
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
