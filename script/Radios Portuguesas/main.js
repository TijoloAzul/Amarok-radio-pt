/*#########################################################################
#                                                                         #
#   In case of any sugestion, please contact: zipizap123 (at) gmail.com   #
#                                                                         #
#   Many thanks to Project ROLI (http://www.radios.pt) for the great      #
#   iniciative to broadcast portuguese small regional radios on Internet  #
#                                                                         #
#                                                                         #
#                                                                         #
# ----------------------------------------------------------------------- #
#                                                                         #
#                                                                         #
#                                                                         #
#                                                                         #
#   Reused some parts of code from previous scripts made by:              #
#                                                                         #
#   Copyright                                                             #
#   (C)  2010 Zipizap <zipizap123@gmail.com>                              #
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


/* Usefull references about Amarok Services, Qt, QtScripts, Javascript, ...
  
  __Amarok Service info
  http://amarok.kde.org/wiki/Development/Scripting_HowTo_2.0
  http://amarok.kde.org/wiki/Development/Scripted_Services_Tutorial_2.0 (outdated)

  __Qts
  http://pepper.troll.no/s60prereleases/doc/qtscript.html
  http://doc.trolltech.com/4.6/qfile.html#details

  __QtScripts
  http://amarok.kde.org/qtscriptbindings/index.html
  http://amarok.kde.org/qtscriptbindings/qxmlsimplereader.html
    
  __Javascripts (QtScript uses Javascript 1-5)
  https://developer.mozilla.org/en/JavaScript/Reference
  http://www.explainth.at/downloads/jsquick.pdf

*/



/* --- function ReadTextFile(file)
  Arguments:
    file (String)
      The full filename of a text file
      Ex: "/tmp/tmp.txt"
  
  Returns:
    text_from_file (String)
      A String containing the full text read from the file
      The String may have severall lines (Javascript supports multiline strings)
  
  Usage:
    var txt = ReadTextFile("/tmp/myfile.txt");

  
  NOTE1: "Importing" code from .js files  
    If you want to "import" the code of a javascript file into the program, you can:
        eval(ReadTextFile("MyJavascriptFileWithCode.js"))
    And the javascript code within the file will be evaluated in the actual context.
    The "import" uses <<eval>> which works but is not a good practice, so be aware of what 
    code you "import", you don't want to import any errors :)
  
  NOTE2: "Importing" data from .json files
    In a similar way, we can "import" data from a JSON file into an object:
       eval("var JSON_obj="+ReadTextFile("MyJsonFileWithData.json")
       //Now the JSON_obj variable will contain the data read from the JSON filename.
       //You can use JSON_obj to to access the data of the .json file
       Object.keys(JSON_obj)    //this will show the name of the properties of the JSON_obj
       JSON_obj.someproperty    //this will read the value of the propertie named "someproperty"
      
   This form of "importing" a .json file, also uses <<eval>> and although it works, it's not a good practice
   So be carefull with what you import :)
    
*/
function ReadTextFile(file) {
  Importer.loadQtBinding("qt.core");
  var tmpFile = new QFile(file);
  tmpFile.open(QIODevice.ReadOnly); 
  var tmpTxtStr = new QTextStream(tmpFile);
  var text_from_file = tmpTxtStr.readAll();
  tmpFile.close();
  return text_from_file;
  /* to debug the returned results, use:
    //Create a file in /tmp/tmp.txt
    Amarok.alert(ReadTextFile("/tmp/tmp.txt")
  */
}

/* --- function ImportJsonFile(json_file)
  Arguments:
    json_file (String)
      The full filename of a json file
      Ex: "/tmp/tmp.json"
  
  Returns:
    (Object) 
      An Object containing the content read from the json_file
  
  Usage:
    var my_JSON_obj = ImportJsonFile("/tmp/myJsonFile.json");
  
  NOTE: About the "import" method
    See the notes of the function ReadTextFile - the method used involves <<eval>>, so be 
    carefull not to "import" errors that will make the entire script fail.
*/
function ImportJsonFile(json_file) {
  eval("var JSON_obj = " + ReadTextFile(json_file));
  return JSON_obj;
  /* to debug the returned results, use:
    //Create a file in /tmp/tmp.json
    var JSON_obj = ImportJsonFile("/tmp/tmp.json");
    Object.keys(JSON_obj);
  */
}

/* --- function ScriptBaseDir()
  Arguments:
    None

  Returns:
    ScriptFullPath (String)
      A String with the full-path to the current location of this Service Script
      There is *no* trailing-slash.
      Ex: "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas"
  
  Usage:
    var the_dir = ScriptBaseDir();
    >> the_dir = "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas"
  
*/
function ScriptBaseDir() {  
  var ScriptFullPath = Amarok.Info.scriptPath();
  return ScriptFullPath;
}

/* --- function ListDirectories(fullPath,patternFilter)
  Arguments:
    fullPath (String)
      A String indicating a full-path, from where the directories will be listed

    patternFilter (String)
      A pattern used to filter the returned results.
      Typical shell wildcards as '*' and '?' can be used
      To return all the results, use as patternFilter "*"
      Ex: "Category*" , "The ? number"
      
  Returns:
    arr_directoriesFullPath (Array of Strings)
      An Array of String(s) with the full-path of each directory present inside the fullPath. Symbolic links to directories are also returned.
      There is *no* trailing-slash returned in the arr_directoriesFullPath
      Ex: [ "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/.", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/..", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/Category.Castelo Branco", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/Category.Porto", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/Defaults" ]
  
  
  
  Example:
    var arr_directoriesFullPath = ListDirectories(ScriptBaseDir(),"*");
    >> arr_directoriesFullPath =
          [ "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/.", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/..", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/Category.Castelo Branco", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/Category.Porto", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/Defaults" ]
    
  
*/
function ListDirectories(fullPath,patternFilter) {
  Importer.loadQtBinding("qt.core");
  var arr_directoriesFullPath = []
  var qd_base = new QDir(fullPath);
  qd_base.setFilter(QDir.Dirs);
  var arr_dirs = qd_base.entryList([patternFilter]);
    for (index in arr_dirs) {arr_directoriesFullPath[index] = qd_base.absoluteFilePath(arr_dirs[index])}
    //arr_directoriesFullPath is now filled
  return arr_directoriesFullPath;
  /* to debug the returned results, use:
    var arr = ListDirectories("/home/paulo/tmp","*link*")
    for (i in arr) {Amarok.alert(arr[i])}
  */
}

/* --- function ListFiles(fullPath,patternFilter)
  Arguments:
    fullPath (String)
      A String indicating a full-path, from where the directories will be listed

    patternFilter (String)
      A pattern used to filter the returned results.
      Typical shell wildcards as '*' and '?' can be used
      To return all the results, use as patternFilter "*"
      Ex: "Category.*.data.json" , "Track.*.data.json"
      
  Returns:
    arr_filesFullPath (Array of Strings)
      An Array of String(s) with the full-path of each file present inside the fullPath. Symbolic links to files are also returned.
      There is *no* trailing-slash returned in the arr_filesFullPath
      Ex: [ "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/main.js",
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/script.spec",
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/RadioService.data.json", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/RadioService.image.png",
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/RadioService.info.html" ]
  
  Example:
    var arr_filesFullPath = ListFiles("/tmp","*");
    >> arr_filesFullPath = 
          [ "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/main.js",
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/script.spec",
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/RadioService.data.json", 
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/RadioService.image.png",
            "/home/paulo/.kde/share/apps/amarok/scripts/Radios Portuguesas/RadioService.info.html" ]
  
*/
function ListFiles(fullPath,patternFilter) {
  Importer.loadQtBinding("qt.core");
  var arr_filesFullPath = []
  var qd_base = new QDir(fullPath);
  qd_base.setFilter(QDir.Files);
  var arr_files = qd_base.entryList([patternFilter]);
    for (index in arr_files) {arr_filesFullPath[index] = qd_base.absoluteFilePath(arr_files[index])}
    //arr_filesFullPath is now filled
  return arr_filesFullPath;
  /* to debug the returned results, use:
    var arr = ListFiles("/home/paulo/tmp","*link*")
    for (i in arr) {Amarok.alert(arr[i])}
  */
}



/* code test-box


*/


/* Resume of RadioService object
RadioService.
  .serviceName
  .serviceSlogan
  .serviceHtmlDescription
  .serviceImageFullPath
  .serviceNoConfigMessage
  .categoriesList
  .addCategory (categoryName, categoryImageFileFullPath, categoryHtmlDescription)

  Category.
    .categoryName
    .categoryImageFileFullPath
    .categoryHtmlDescription
    .stationsList[]
    .addStation (stationName, stationUrl, stationHtmlDescription)

    Station.
      .stationName
      .stationUrl
      .stationHtmlDescription            // can be html code!

*/
//TODO: check and cleanup the following object's code
function RadioService(serviceName,serviceSlogan,serviceHtmlDescription,serviceImageFileFullPath,serviceNoConfigMessage) {
  this.serviceName = serviceName;                         //ex: "Radios Portuguesas"
  this.serviceSlogan = serviceSlogan;                     //ex: "Escuta em directo as inumeras radios regionais portuguesas"
  this.serviceHtmlDescription = serviceHtmlDescription;   //ex: '<iframe src="http://amarokradiosscript.blogspot.com/"></iframe>';
  this.serviceImageFullPath = serviceImageFileFullPath    //ex: "/xxx/.../xxx/RadioService.image.png"            
  this.serviceNoConfigMessage = serviceNoConfigMessage;   //ex: "Este script nao necessita de configuraçao"
  function Category (categoryName,  categoryImageFileFullPath, categoryHtmlDescription){
    function Station (stationName, stationUrl, stationHtmlDescription)
    {
        this.stationName = stationName;
        this.stationUrl = stationUrl;
        this.stationHtmlDescription = stationHtmlDescription;
    }
    this.categoryName=categoryName;                           
    this.categoryImageFileFullPath=categoryImageFileFullPath;
    this.categoryHtmlDescription = categoryHtmlDescription;
    this.stationsList = [];
    this.addStation = function addStation (stationName, stationUrl, stationHtmlDescription) { this.stationsList.push( new Station( stationName, stationUrl, stationHtmlDescription ) ); return this;}
  }
  this.categoriesList=[];
  this.addCategory = function addCategory( categoryName,  categoryImageFileFullPath, categoryHtmlDescription) 
  { 
    var newCategory = new Category (categoryName,  categoryImageFileFullPath, categoryHtmlDescription);
    this.categoriesList.push(newCategory);
    return newCategory;
  }
}

/* TODO!!!
Examples:
  var serviceName                 = "Radios Portuguesas";
  var serviceSlogan               = "Escuta em directo as inumeras radios regionais portuguesas";
  var serviceHtmlDescription      = '<iframe src="http://amarokradiosscript.blogspot.com/"></iframe>';
  var serviceImage                = "RadioService.image.png";
  var serviceNoConfigMessage      = "Este script nao necessita de configuraçao";


var serviceHtml_File            = ListFiles(ScriptBaseDir(),"RadioService.info.html")[0];
var serviceImageFileFullPath    = ListFiles(ScriptBaseDir(),"RadioService.image.*")[0];
var serviceDataFile             = ListFiles(ScriptBaseDir(),"RadioService.data.json")[0];
var serviceDataJson             = ImportJsonFile(serviceDataFile);

var serviceName                 = serviceDataJson.Name;
var serviceSlogan               = serviceDataJson.Slogan;
var serviceHtmlDescription      = ReadTextFile(serviceHtml_File);
var serviceNoConfigMessage      = serviceDataJson.NoConfigMessage

var myRadioService=new RadioService(serviceName,
                                    serviceSlogan,
                                    serviceHtmlDescription,
                                    serviceImageFileFullPath,
                                    serviceNoConfigMessage);
*/

arr=["NoImageCategory","icon_categoryDefault.png","icon_script.png","icon_stationDefault.png","tmp_cat120x75.png","tmp_cat320x200.png","tmp_cat32x20.png","tmp_cat640x480.bmp","tmp_cat640x480.gif","tmp_cat640x480.jpg","tmp_cat640x480.png","tmp_cat640x480.ps","tmp_cat64x40.png", "tmp_catGigante.svg", "tmp_catGigante2.ai"];
for (var i=0; i<arr.length; i++) {
  myRadioService.addCategory(arr[i],  "Images/Categories/" + arr[i])
    .addStation( "Radio Comercial", "mms://212.113.177.246/comercialcbr48", "Radio Comercial" )
    .addStation( "Antena 3","mms://195.245.168.21/antena3","Antena 3" )
    ;
}
/*
  Fill in like this:

  myRadioService.addCategory("Write here the category name", "path/to/category/image/relative/to/main.js")
    .addStation( "Radio Comercial", "mms://212.113.177.246/comercialcbr48", "Radio Comercial" )
    .addStation( "Antena 3","mms://195.245.168.21/antena3","Antena 3" )
    ;
  myRadioService.addCategory("Write here the category name", "path/to/category/image/relative/to/main.js")
    .addStation( "Radio Comercial", "mms://212.113.177.246/comercialcbr48", "Radio Comercial" )
    .addStation( "Antena 3","mms://195.245.168.21/antena3","Antena 3" )
    ;
*/


/*############################################################################################
# The remaining lines have automatic code, that will simply use the variable: myRadioService #
# So you should not change them (unless you want to improve all this code :) )               #
############################################################################################*/


function Service()
{
    var serviceName=myRadioService.serviceName; 
    var serviceSlogan=myRadioService.serviceSlogan; 
    var serviceHtmlDescription=myRadioService.serviceHtmlDescription; 
    ScriptableServiceScript.call( this, serviceName, 2, serviceSlogan, serviceHtmlDescription, false );
}

function onConfigure()
{
    Amarok.alert( myRadioService.serviceNoConfigMessage ); // "This script does not need configuration"
}

function onPopulating( level, callbackData, filter )
{
  /* Remembering:
  RadioService.
    .serviceName
    .serviceSlogan
    .serviceHtmlDescription
    .serviceImageFullPath
    .serviceNoConfigMessage
    .categoriesList
    .addCategory (categoryName, categoryImageFileFullPath, categoryHtmlDescription)

    Category.
      .categoryName
      .categoryImageFileFullPath
      .categoryHtmlDescription
      .stationsList[]
      .addStation (stationName, stationUrl, stationHtmlDescription)

      Station.
        .stationName
        .stationUrl
        .stationHtmlDescription            // can be html code!


  */
    if ( level == 1 ) 
    {
      /*
        level = 1
        callbackData = ""
        filter = completely ignored
      */    
      for( var cat_index=0; cat_index < myRadioService.categoriesList.length; cat_index++)
      {
        var category=myRadioService.categoriesList[cat_index];
        item = Amarok.StreamItem;
        item.level = 1;
        item.callbackData = cat_index;         //Caution: callbackData will be stringified - so it must not be an object or function!!!
        item.itemName = category.categoryName;
        item.playableUrl = "";                 //It is a category, so it will not play any URL by itself (Stations have a playable url, but not categories)
        item.infoHtml = category.categoryHtmlDescription;
        //TODO: check next line...
        item.coverUrl = (category.categoryImage=="")?(Amarok.Info.scriptPath() + "/Images/defaults/icon_categoryDefault.png"):(category.categoryImage);
        script.insertItem( item );
        { // debugs
          /*
          Amarok.alert("category.categoryName="+category.categoryName+"\n"+
                    "category.categoryImage="+category.categoryImage);
          */
        }
      }
      script.donePopulating();
    }
    else if ( level == 0 ) 
    {
      /*
        level =0
        callbackData = index of the selected category within the array myRadioService.categoriesList[]
        filter = completely ignored
      */
      var category=myRadioService.categoriesList[callbackData];
      var stationsList = category.stationsList;
      for ( var sta_index = 0; sta_index < stationsList.length; sta_index++ )
      {
        var station=stationsList[sta_index];
        item = Amarok.StreamItem;
        item.level = 0;
        item.callbackData = "";
        item.itemName = station.stationName;
        item.playableUrl = station.stationUrl;
        item.album = category.categoryName; 
        item.infoHtml = station.stationHtmlDescription;
        item.artist = "Radio-online";
        //TODO: check next line
        item.coverUrl = Amarok.Info.scriptPath() + "/Images/defaults/icon_stationDefault.png";
        script.insertItem( item );
      }
      script.donePopulating();
    }
}

function onCustomize() {
    var iconPixmap = new QPixmap(myRadioService.serviceImageFullPath);
    script.setIcon(iconPixmap);
}

Amarok.configured.connect( onConfigure );
script = new Service();
script.populate.connect( onPopulating );
script.customize.connect( onCustomize );
