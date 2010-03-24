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

function dObj(obj, identBase) {
    /*This function:
      - will return a string with a tree representation of obj
      
      identBase is an optional string, that wil be used as a sufix in all lines 

      Example:
        function O(){
         this.name="a O object instance";
        }
        Tree={
          a1:"A",
          a2:new O(),
          a3: {
            b1:true,
            b2: [
              "b2_0", 
              "b2_1", 
              false,
              {
                c1:"C1",
                c2: [ 0,1,2,3]
              }
            ]
          },
          a4 : null,
          a5 : "last"
        };

        Tree.
          .a1 = "A"
          .a2 = 2
          .a3.
            .b1 = true
            .b2[]
              [0] = "b2_0"
              [1] = "b2_1"
              [2] = false
              [3].
                .c1 = "C1"
                .c2[]
                  [0] = 0
                  [1] = 1
                  [2] = 2
                  [3] = 3
          .a4 = <null>
          .a5 = "last"
      */
    var identBase = ( (typeof identBase == "undefined")? "" : identBase );  
    var identChild=identBase+"  ";
    var thisFunc=arguments.callee;
    var txt = "";
    /*
        Tree.                     identBase
          .b1 = "B1"           identChild
    */
    function fillTxt(arg) {
      /*
      This function will only modify the outer variable "txt" and return nothing.
      
      Uses outer variables:
        txt, obj, identChild, thisFunc()
      */
      switch (arg) {
        case "null" : {
          txt = " = ("+typeof obj+") <null>\n";
          break;
        }
        case "array" : {
          txt+= "[]\n";
          for ( i=0; i<obj.length; i++) 
            txt += identChild + "["+i+"]"+ thisFunc(obj[i],identChild);
          break;
        }
        case "object" : {
          txt += ". ("+obj.constructor.name+")\n";
          for (prop in obj)
            txt += identChild + "."+prop+ thisFunc(obj[prop],identChild);
          break;
        }
        case "function" : {
          /*Note: in case function has object properties they will be shown, and in those cases, it will
          always appear the ".prototype" property, even if it was untouched - it just appears nonetheless.
          */
          txt+=" = function "+obj.name+"()";
          { // If it has user-defined object-properties, then 
            var count=0;
            for (prop_i in obj)
              if (prop_i!="prototype")
                count++;
            if (count > 0) 
              fillTxt("object");
            else
              txt+="\n";
          }
          break;
        }
        case "string" : {
          txt+= ' = ('+typeof obj+') "' + obj +'"\n';
          break;
        }
        default : {
          txt+= " = ("+typeof obj+") " + obj +"\n";
          break;
        }
      }
    } // end fillTxt()
    switch (typeof obj) {
      /*
      Type 	Result
      Undefined 	"undefined"
      Null 	"object"
      Boolean 	"boolean"
      Number 	"number"
      String 	"string"
      Host object (provided by the JS environment) 	Implementation-dependent
      Function object (implements [[Call]] in ECMA-262 terms) 	"function"
      E4X XML object 	"xml"
      E4X XMLList object 	"xml"
      Any other object 	"object"
      */
      case "object" : {
        // Array, object, Null
        if (obj === null) { 
          fillTxt("null");
          break;
        }
        if (obj instanceof Array) {
          fillTxt("array");
          break;
        }
        /*else, a normal object*/ {
          fillTxt("object");
          break;
        }
      }
      case "function" : {
        fillTxt("function");
        break;
      }
      case "string" : {
        fillTxt("string");
        break;
      }
      default : {
        fillTxt("abything-else");
        break;
      }
    } // end switch
    return txt;
} // end of dObj


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
  .stationsList[]
  .addStation (stationName, stationUrl, stationDescription)

	
RadioCatalogue.
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
		categoryImage=( (categoryImage=="") ?  (Amarok.Info.scriptPath() + "/" + "icon_categoryDefault.png") : (categoryImage) ) ;
		var newCategory = new Category (categoryName,  categoryImage);
		this.categoriesList.push(newCategory);
		return newCategory;
	}
}

myRadioCatalogue=new RadioCatalogue();

arr=["tmp_cat120x75.png","tmp_cat320x200.png","tmp_cat32x20.png","tmp_cat640x480.png","tmp_cat64x40.png"];

for (var i=0; i<arr.length; i++) {
	myRadioCatalogue.addCategory(arr[i],  arr[i]).addStation( "Radio Comercial", "mms://212.113.177.246/comercialcbr48", "Radio Comercial" ).addStation( "Antena 3","mms://195.245.168.21/antena3","Antena 3" );
  Amarok.alert("myRadioCatalogue.categoriesList[myRadioCatalogue.categoriesList.length-1]="+dObj(myRadioCatalogue.categoriesList[myRadioCatalogue.categoriesList.length-1],""));
}


	//myRadioCatalogue.addCategory("tmp_cat120x75.png","tmp_cat120x75.png").addStation( "Radio Comercial", "mms://212.113.177.246/comercialcbr48", "Radio Comercial" );
	//Amarok.alert("myRadioCatalogue.categoriesList.length="+myRadioCatalogue.categoriesList.length);


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
				level =1
				callbackData = ""
				filter = completely ignored
			*/		
			for( var cat_index=0; cat_index < myRadioCatalogue.categoriesList.length; cat_index++)
			{
				var category=myRadioCatalogue.categoriesList[cat_index];
				Amarok.alert("category="+dObj(category,""));
				Amarok.debug ("Adicionando categoria: " + att);
				item = Amarok.StreamItem;
				item.level = 1;
				item.callbackData = category;
				item.itemName = category.categoryName;
				item.playableUrl = "";
				item.infoHtml = "";
				item.coverUrl = category.categoryImage;
				Amarok.alert("IT GOT HERE ALSO!!!");

				script.insertItem( item );
			}
			script.donePopulating();
    }
    else if ( level == 0 ) 
    {
			/*
				level =0
				callbackData = Category-instance
				filter = completely ignored
			*/
			Amarok.debug( " Recompilando emissoras..." );
			var stationsList = callbackData.stationsList;
			for ( var sta_index = 0; sta_index < stationsList.length; sta_index++ )
			{
				var station=stationsList[sta_index];
/*
Station.
  .stationName
  .stationUrl
  .stationDescription

Category.
	.categoryName
  .categoryImage
  .stationsList[]
  .addStation (stationName, stationUrl, stationDescription)
	
RadioCatalogue.
	.categoriesList
  .addCategory (categoryName, categoryImage )
*/
        item = Amarok.StreamItem;
				item.level = 0;
				item.callbackData = "";
				item.itemName = station.stationName;
				item.playableUrl = station.stationUrl;
				item.album = callbackData.categoryName; 
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
