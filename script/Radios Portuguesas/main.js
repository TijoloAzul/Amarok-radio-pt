/*#########################################################################
#                                                                         #
#   In case of any sugestion, please contact: zipizap123 @ gmail.com      #
#                                                                         #
#   Many thanks to Project ROLI (http://www.radios.pt) for the great      #
#   iniciative to broadcast portuguese small regional radios on Internet  #
#                                                                         #
#    ---------------------------------------------------------------------------------------  #
#                                                                         #
#   Simple script shamelessly recopied from:                              #
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

function Station( name, url, description )
{
    this.name = name;
    this.url = url;
    this.description = description;
}
categories = new Object;

//categories["nome-da-categoria"]=new Array (
//    new Station( "nome-estacao1","url-estacao1" ,"descricao-estacao1" ),
//    new Station( "nome-estacao2","url-estacao2" ,"descricao-estacao2" ),
//    new Station( "nome-estacao3","url-estacao3" ,"descricao-estacao3" )  //NOTA: a ultima estacao da categoria, nao termina com uma virgula no final da linha!
//)


categories["27 radios: nacionais ou recomendadas ou interessantes"]=new Array (
    new Station( "Radio Clube Portugues","http://radioclube.clix.pt/asx/estrangeiro/rcp96.asx" ,"Radio Clube Portugues" ),
    new Station( "Rádio Oxigénio", "mms://stream.radio.com.pt/ROLI-ENC-498", "Rádio Oxigénio, Freq: 102.6, Distrito: Lisboa, Concelho: Oeiras"),
    new Station( "Best Rock Fm" ,"http://bestrock.clix.pt/asx/estrangeiro/bestrockfm96.asx" ,"Best Rock Fm"),
    new Station( "RUC - Rádio Universidade de Coimbra", "http://www.ruc.pt/listen-hi.m3u", "RUC - Rádio Universidade de Coimbra, Freq: 107.9, Distrito: Coimbra, Concelho: Coimbra"),
    new Station( "Radio Cidade FM", "http://cidadefm.clix.pt/asx/estrangeiro/cidade96.asx", "Radio Cidade FM"),
    new Station( "Radio Comercial", "mms://212.113.177.246/comercialcbr48", "Radio Comercial"),
    new Station( "Antena 1","mms://195.245.168.21/antena1","Antena 1"),
    new Station( "Antena 2","http://195.245.168.21/antena2","Antena 2"),
    new Station( "Antena 3","mms://195.245.168.21/antena3","Antena 3"),
    new Station( "RDP África","http://195.245.168.21/rdpafrica","RDP África"),
    new Station( "RDP Internacional","http://195.245.168.21/rdpi","RDP Internacional"),
    new Station( "RDP Madeira - Antena 1","http://195.245.168.21/rdpmad","RDP Madeira - Antena 1"),
    new Station( "RDP Madeira - Antena 3","http://195.245.168.21/ant3mad","RDP Madeira - Antena 3"),
    new Station( "RDP Açores - Antena 1","http://195.245.168.21/acores_a1","RDP Açores - Antena 1"),
    new Station( "Rádio Lusitânia","mms://195.245.168.21/lusitania","Rádio Lusitânia"),
    new Station( "RFM","http://www.rfm.pt/live/streamnew_rfm.asx","RFM"),
    new Station( "RFM 80s","http://www.rfm.pt/live/newstream_80srfm_ok.asx","RFM 80s"),
    new Station( "RFM Clubbing","http://www.rfm.pt/live/stream_rfm_clubbing.asx","RFM Clubbing"),
    new Station( "RFM Oceano Pacifico","http://www.rfm.pt/live/stream_rfm_op.asx","RFM Oceano Pacifico"),
    new Station( "Renascença","http://www.rr.pt/live/stream_rr_new.asx","Renascença"),
    new Station( "Mega FM","http://www.mega.fm/live/streammegafm_new.asx","Mega FM"),
    new Station( "Radio Sim","http://www.radiosim.pt/live/newstream_sim.asx","Radio Sim"),
    new Station( "TSF","http://www.tsf.pt/tsfdirecto.asx","TSF"),
    new Station( "TSF Açores","mms://stream.radio.com.pt/ROLI-ENC-243","TSF Açores"),
    new Station( "TSF Madeira","mms://stream.radio.com.pt/ROLI-ENC-244","TSF Madeira"),
    new Station( "Radio Radar","mms://stream.radio.com.pt/ROLI-ENC-201","Radio Radar"),
    new Station( "Capital","mms://stream.radio.com.pt/ROLI-ENC-134","Capital")
);


categories["Açores"]=new Array (
    new Station("Rádio Canal", "mms://stream.radio.com.pt/ROLI-ENC-466", "Rádio Canal, Freq: 100.5, Distrito: Açores, Concelho: Calheta (São Jorge)"),
    new Station("Rádio Antena Nove", "mms://stream.radio.com.pt/ROLI-ENC-219", "Rádio Antena Nove, Freq: 91.3, Distrito: Açores, Concelho: Horta"),
    new Station("Rádio Pico", "mms://stream.radio.com.pt/ROLI-ENC-420", "Rádio Pico, Freq: 100.2, Distrito: Açores, Concelho: Madalena"),
    new Station("Rádio Atlântida", "mms://stream.radio.com.pt/ROLI-ENC-505", "Rádio Atlântida, Freq: 106.3, Distrito: Açores, Concelho: Ponta Delgada"),
    new Station("Rádio Comercial dos Açores", "mms://stream.radio.com.pt/ROLI-ENC-243", "Rádio Comercial dos Açores, Freq: 99.4, Distrito: Açores, Concelho: Ponta Delgada"),
    new Station("Rádio Nova ", "mms://stream.radio.com.pt/ROLI-ENC-421", "Rádio Nova Cidade, Freq: 105.5, Distrito: Açores, Concelho: Ribeira Grande"),
    new Station("Rádio Graciosa", "mms://stream.radio.com.pt/ROLI-ENC-429", "Rádio Graciosa, Freq: 107.9, Distrito: Açores, Concelho: Santa Cruz da Graciosa"),
    new Station("Rádio Lumena", "mms://stream.radio.com.pt/ROLI-ENC-439", "Rádio Lumena, Freq: 107.1, Distrito: Açores, Concelho: Velas"),
    new Station("Rádio Clube Asas do Atlântico", "mms://stream.radio.com.pt/ROLI-ENC-235", "Rádio Clube Asas do Atlântico, Freq: 103.2, Distrito: Açores, Concelho: Vila do Porto")
);
categories["Aveiro"]=new Array (
    new Station("Rádio Botaréu", "mms://stream.radio.com.pt/ROLI-ENC-065", "Rádio Botaréu, Freq: 100, Distrito: Aveiro, Concelho: Águeda"),
    new Station("Rádio Soberania", "mms://stream.radio.com.pt/ROLI-ENC-101", "Rádio Soberania, Freq: 99.3, Distrito: Aveiro, Concelho: Águeda"),
    new Station("Rádio Regional de Arouca", "mms://stream.radio.com.pt/ROLI-ENC-068", "Rádio Regional de Arouca, Freq: 103.2, Distrito: Aveiro, Concelho: Arouca"),
    new Station("Rádio Aveiro FM", "mms://stream.radio.com.pt/ROLI-ENC-115", "Rádio Aveiro FM, Freq: 96.5, Distrito: Aveiro, Concelho: Aveiro"),
    new Station("Rádio Voz da Ria", "mms://stream.radio.com.pt/ROLI-ENC-102", "Rádio Voz da Ria, Freq: 90.2, Distrito: Aveiro, Concelho: Estarreja"),
    new Station("Rádio Terra Nova", "mms://stream.radio.com.pt/ROLI-ENC-404", "Rádio Terra Nova, Freq: 105, Distrito: Aveiro, Concelho: Ílhavo"),
    new Station("RCP FM", "mms://stream.radio.com.pt/ROLI-ENC-064", "RCP FM, Freq: 92.6, Distrito: Aveiro, Concelho: Mealhada"),
    new Station("Rádio AV FM", "mms://stream.radio.com.pt/ROLI-ENC-501", "Rádio AV FM, Freq: 98.7, Distrito: Aveiro, Concelho: Ovar"),
    new Station("Rádio Águia Azul", "mms://stream.radio.com.pt/ROLI-ENC-447", "Rádio Águia Azul, Freq: 87.6, Distrito: Aveiro, Concelho: Santa Maria da Feira"),
    new Station("Rádio Clube da Feira", "mms://stream.radio.com.pt/ROLI-ENC-090", "Rádio Clube da Feira, Freq: 104.7, Distrito: Aveiro, Concelho: Santa Maria da Feira"),
    new Station("Rádio Regional Sanjoanense", "mms://stream.radio.com.pt/ROLI-ENC-117", "Rádio Regional Sanjoanense, Freq: 88.1, Distrito: Aveiro, Concelho: São João da Madeira"),
    new Station("Vagos FM", "mms://stream.radio.com.pt/ROLI-ENC-410", "Vagos FM, Freq: 88.8, Distrito: Aveiro, Concelho: Vagos")
);
categories["Beja"]=new Array (
    new Station("TLA Rádio", "mms://stream.radio.com.pt/ROLI-ENC-071", "TLA Rádio, Freq: 92.6, Distrito: Beja, Concelho: Aljustrel"),
    new Station("Rádio Pax", "mms://stream.radio.com.pt/ROLI-ENC-484", "Rádio Pax, Freq: 101.4, Distrito: Beja, Concelho: Beja"),
    new Station("Rádio Voz da Planície", "mms://stream.radio.com.pt/ROLI-ENC-441", "Rádio Voz da Planície, Freq: 104.5, Distrito: Beja, Concelho: Beja"),
    new Station("Rádio Castrense", "mms://stream.radio.com.pt/ROLI-ENC-431", "Rádio Castrense, Freq: 93, Distrito: Beja, Concelho: Castro Verde"),
    new Station("Rádio Singa", "mms://stream.radio.com.pt/ROLI-ENC-487", "Rádio Singa, Freq: 104, Distrito: Beja, Concelho: Ferreira do Alentejo"),
    new Station("Rádio Vidigueira", "mms://stream.radio.com.pt/ROLI-ENC-059", "Rádio Vidigueira, Freq: 90, Distrito: Beja, Concelho: Vidigueira")
);
categories["Braga"]=new Array (
    new Station("Rádio Cávado FM", "mms://stream.radio.com.pt/ROLI-ENC-409", "Rádio Cávado FM, Freq: 102.4, Distrito: Braga, Concelho: Barcelos"),
    new Station("Rádio Barcelos", "mms://stream.radio.com.pt/ROLI-ENC-104", "Rádio Barcelos, Freq: 91.9, Distrito: Braga, Concelho: Barcelos"),
    new Station("Rádio Clube do Minho", "mms://stream.radio.com.pt/ROLI-ENC-504", "Rádio Clube do Minho, Freq: 92,9, Distrito: Braga, Concelho: Braga"),
    new Station("Rádio Antena Minho", "mms://stream.radio.com.pt/ROLI-ENC-464", "Rádio Antena Minho, Freq: 106, Distrito: Braga, Concelho: Braga"),
    new Station("Rádio Universitária do Minho", "mms://stream.radio.com.pt/ROLI-ENC-098", "Rádio Universitária do Minho, Freq: 97.5, Distrito: Braga, Concelho: Braga"),
    new Station("Rádio Santiago", "mms://stream.radio.com.pt/ROLI-ENC-443", "Rádio Santiago, Freq: 98, Distrito: Braga, Concelho: Guimarães"),
    new Station("Rádio nove3cinco", "mms://stream.radio.com.pt/ROLI-ENC-040", "Rádio nove3cinco, Freq: 93.5, Distrito: Braga, Concelho: Póvoa de Lanhoso"),
    new Station("Rádio Alto Ave", "mms://stream.radio.com.pt/ROLI-ENC-093", "Rádio Alto Ave, Freq: 91.6, Distrito: Braga, Concelho: Vieira do Minho"),
    new Station("Digital FM", "mms://stream.radio.com.pt/ROLI-ENC-175", "Digital FM, Freq: 105, Distrito: Braga, Concelho: Vila Nova de Famalicão"),
    new Station("Rádio Cidade Hoje", "mms://stream.radio.com.pt/ROLI-ENC-119", "Rádio Cidade Hoje, Freq: 94, Distrito: Braga, Concelho: Vila Nova de Famalicão")
);
categories["Bragança"]=new Array (
    new Station("Rádio Bragançana", "mms://stream.radio.com.pt/ROLI-ENC-428", "Rádio Bragançana, Freq: 89.2 90.0 , Distrito: Bragança, Concelho: Bragança"),
    new Station("Rádio Ansiães", "mms://stream.radio.com.pt/ROLI-ENC-419", "Rádio Ansiães, Freq: 98.1, Distrito: Bragança, Concelho: Carrazeda de Ansiães"),
    new Station("Rádio Terra Quente", "mms://stream.radio.com.pt/ROLI-ENC-402", "Rádio Terra Quente, Freq: 105.2 105.5, Distrito: Bragança, Concelho: Mirandela")
);
categories["Castelo Branco"]=new Array (
    new Station("Rádio Caria", "mms://stream.radio.com.pt/ROLI-ENC-024", "Rádio Caria, Freq: 102.5, Distrito: Castelo Branco, Concelho: Belmonte"),
    new Station("Rádio Beira Interior", "mms://stream.radio.com.pt/ROLI-ENC-462", "Rádio Beira Interior, Freq: 92, Distrito: Castelo Branco, Concelho: Castelo Branco"),
    new Station("Radio Clube da Covilhã", "mms://stream.radio.com.pt/ROLI-ENC-018", "Radio Clube da Covilhã, Freq: 95.6, Distrito: Castelo Branco, Concelho: Covilhã"),
    new Station("Rádio Jornal do Fundão", "mms://stream.radio.com.pt/ROLI-ENC-205", "Rádio Jornal do Fundão, Freq: 100, Distrito: Castelo Branco, Concelho: Fundão"),
    new Station("Rádio Cova da Beira", "mms://stream.radio.com.pt/ROLI-ENC-467", "Rádio Cova da Beira, Freq: 92.5, Distrito: Castelo Branco, Concelho: Fundão"),
    new Station("Rádio Clube de Monsanto", "mms://stream.radio.com.pt/ROLI-ENC-424", "Rádio Clube de Monsanto, Freq: 98.7 107.8, Distrito: Castelo Branco, Concelho: Idanha-a-Nova"),
    new Station("Rádio Condestável", "mms://stream.radio.com.pt/ROLI-ENC-427", "Rádio Condestável, Freq: 91.3 92.7 107.0, Distrito: Castelo Branco, Concelho: Sertã")
);
categories["Coimbra"]=new Array (
    new Station("Rádio Clube de Arganil", "mms://stream.radio.com.pt/ROLI-ENC-502", "Rádio Clube de Arganil, Freq: 88.5, Distrito: Coimbra, Concelho: Arganil"),
    new Station("Rádio Regional do Centro", "mms://stream.radio.com.pt/ROLI-ENC-146", "Rádio Regional do Centro, Freq: 96.2, Distrito: Coimbra, Concelho: Condeixa-a-Nova"),
    new Station("Rádio Boa Nova", "mms://stream.radio.com.pt/ROLI-ENC-509", "Rádio Boa Nova, Freq: 100.2, Distrito: Coimbra, Concelho: Oliveira do Hospital"),
    new Station("RUC - Rádio Universidade de Coimbra", "http://www.ruc.pt/listen-hi.m3u", "RUC - Rádio Universidade de Coimbra, Freq: 107.9, Distrito: Coimbra, Concelho: Coimbra")
);
categories["Évora"]=new Array (
    new Station("Rádio Diana FM", "mms://stream.radio.com.pt/ROLI-ENC-460", "Rádio Diana FM, Freq: 94.1, Distrito: Évora, Concelho: Évora"),
    new Station("Rádio Telefonia do Alentejo", "mms://stream.radio.com.pt/ROLI-ENC-062", "Rádio Telefonia do Alentejo, Freq: 103.2, Distrito: Évora, Concelho: Évora"),
    new Station("RNA - Montemor", "mms://stream.radio.com.pt/ROLI-ENC-454", "RNA - Montemor, Freq: 101.3, Distrito: Évora, Concelho: Montemor-o-Novo"),
    new Station("RC Alentejo", "mms://stream.radio.com.pt/ROLI-ENC-120", "RC Alentejo, Freq: 96.2, Distrito: Évora, Concelho: Mourão"),
    new Station("Rádio Granada FM", "mms://stream.radio.com.pt/ROLI-ENC-079", "Rádio Granada FM, Freq: 100.1, Distrito: Évora, Concelho: Vendas Novas"),
    new Station("Rádio Campanário", "mms://stream.radio.com.pt/ROLI-ENC-425", "Rádio Campanário, Freq: 90.6, Distrito: Évora, Concelho: Vila Viçosa")
);
categories["Faro"]=new Array (
    new Station("Solar Rádio", "mms://stream.radio.com.pt/ROLI-ENC-137", "Solar Rádio, Freq: 94, Distrito: Faro, Concelho: Albufeira"),
    new Station("Rádio Maré Alta", "mms://stream.radio.com.pt/ROLI-ENC-406", "Rádio Maré Alta, Freq: 102.9, Distrito: Faro, Concelho: Aljezur"),
    new Station("Rádio Universitária do Algarve", "mms://stream.radio.com.pt/ROLI-ENC-198", "Rádio Universitária do Algarve, Freq: 102.7, Distrito: Faro, Concelho: Faro"),
    new Station("Rádio Lagoa", "mms://stream.radio.com.pt/ROLI-ENC-488", "Rádio Lagoa, Freq: 99.4, Distrito: Faro, Concelho: Lagoa (Algarve)"),
    new Station("Rádio Foia", "mms://stream.radio.com.pt/ROLI-ENC-163", "Rádio Foia, Freq: 97.1, Distrito: Faro, Concelho: Monchique"),
    new Station("Rádio Atlântico FM", "mms://stream.radio.com.pt/ROLI-ENC-174", "Rádio Atlântico FM, Freq: 92.2, Distrito: Faro, Concelho: Olhão"),
    new Station("Alvor FM", "mms://stream.radio.com.pt/ROLI-ENC-469", "Alvor FM, Freq: 90.1, Distrito: Faro, Concelho: Portimão"),
    new Station("Rádio Costa D'Oiro", "mms://stream.radio.com.pt/ROLI-ENC-189", "Rádio Costa D'Oiro, Freq: 106.5, Distrito: Faro, Concelho: Portimão"),
    new Station("Algarve FM", "mms://stream.radio.com.pt/ROLI-ENC-455", "Algarve FM, Freq: 91.8 92.4 93.7, Distrito: Faro, Concelho: Silves"),
    new Station("Rádio Horizonte Algarve", "mms://stream.radio.com.pt/ROLI-ENC-458", "Rádio Horizonte Algarve, Freq: 96.9 106.8, Distrito: Faro, Concelho: Tavira"),
    new Station("Gilão FM", "mms://stream.radio.com.pt/ROLI-ENC-143", "Gilão FM, Freq: 94.8, Distrito: Faro, Concelho: Tavira")
);
categories["Guarda"]=new Array (
    new Station("Rádio Antena Livre Gouveia", "mms://stream.radio.com.pt/ROLI-ENC-456", "Rádio Antena Livre Gouveia, Freq: 89.6, Distrito: Guarda, Concelho: Gouveia"),
    new Station("Rádio Altitude", "mms://stream.radio.com.pt/ROLI-ENC-034", "Rádio Altitude, Freq: 90.9, Distrito: Guarda, Concelho: Guarda"),
    new Station("Rádio Clube da Meda", "mms://stream.radio.com.pt/ROLI-ENC-493", "Rádio Clube da Meda, Freq: 96.6, Distrito: Guarda, Concelho: Meda"),
    new Station("Rádio Elmo", "mms://stream.radio.com.pt/ROLI-ENC-463", "Rádio Elmo, Freq: 99.1, Distrito: Guarda, Concelho: Pinhel"),
    new Station("Rádio Bandarra", "mms://stream.radio.com.pt/ROLI-ENC-477", "Rádio Bandarra, Freq: 92.1, Distrito: Guarda, Concelho: Trancoso")
);
categories["Leiria"]=new Array (
    new Station("Benedita FM", "mms://stream.radio.com.pt/ROLI-ENC-461", "Benedita FM, Freq: 88.1, Distrito: Leiria, Concelho: Alcobaça"),
    new Station("Rádio Cister", "mms://stream.radio.com.pt/ROLI-ENC-453", "Rádio Cister, Freq: 95.5, Distrito: Leiria, Concelho: Alcobaça"),
    new Station("Rádio Vida Nova ", "mms://stream.radio.com.pt/ROLI-ENC-061", "Rádio Vida Nova , Freq: 105.5, Distrito: Leiria, Concelho: Ansião"),
    new Station("Rádio Batalha", "mms://stream.radio.com.pt/ROLI-ENC-491", "Rádio Batalha, Freq: 104.8, Distrito: Leiria, Concelho: Batalha"),
    new Station("Rádio 94.8 FM", "mms://stream.radio.com.pt/ROLI-ENC-450", "Rádio 94.8 FM, Freq: 94.8, Distrito: Leiria, Concelho: Bombarral"),
    new Station("Rádio Caldas", "mms://stream.radio.com.pt/ROLI-ENC-418", "Rádio Caldas, Freq: 103.1, Distrito: Leiria, Concelho: Caldas da Rainha"),
    new Station("Rádio 94.0 FM", "mms://stream.radio.com.pt/ROLI-ENC-200", "Rádio 94.0 FM, Freq: 94, Distrito: Leiria, Concelho: Leiria"),
    new Station("Radio Clube Marinhense", "mms://stream.radio.com.pt/ROLI-ENC-452", "Radio Clube Marinhense, Freq: 96, Distrito: Leiria, Concelho: Marinha Grande"),
    new Station("Rádio Litoral Oeste", "mms://stream.radio.com.pt/ROLI-ENC-417", "Rádio Litoral Oeste, Freq: 91, Distrito: Leiria, Concelho: Óbidos"),
    new Station("102 FM Rádio", "mms://stream.radio.com.pt/ROLI-ENC-486", "102 FM Rádio, Freq: 102, Distrito: Leiria, Concelho: Peniche"),
    new Station("Rádio Cardal", "mms://stream.radio.com.pt/ROLI-ENC-167", "Rádio Cardal, Freq: 87.6, Distrito: Leiria, Concelho: Pombal"),
    new Station("Rádio D. Fuas", "mms://stream.radio.com.pt/ROLI-ENC-503", "Rádio D. Fuas, Freq: 100.1, Distrito: Leiria, Concelho: Porto de Mós")
);
categories["Lisboa"]=new Array (
    new Station("Rádio Voz de Alenquer", "mms://stream.radio.com.pt/ROLI-ENC-479", "Rádio Voz de Alenquer, Freq: 93.5, Distrito: Lisboa, Concelho: Alenquer"),
    new Station("Rádio Vida FM 97.1", "mms://stream.radio.com.pt/ROLI-ENC-482", "Rádio Vida FM 97.1, Freq: 97.1, Distrito: Lisboa, Concelho: Arruda dos Vinhos"),
    new Station("Rádio Marginal", "mms://stream.radio.com.pt/ROLI-ENC-499", "Rádio Marginal, Freq: 98.1, Distrito: Lisboa, Concelho: Cascais"),
    new Station("Europa Lisboa", "mms://stream.radio.com.pt/ROLI-ENC-069", "Europa Lisboa, Freq: 90.4, Distrito: Lisboa, Concelho: Lisboa"),
    new Station("RNA - Rádio Nova Antena", "mms://stream.radio.com.pt/ROLI-ENC-496", "RNA - Rádio Nova Antena, Freq: 92, Distrito: Lisboa, Concelho: Loures"),
    new Station("Rádio Horizonte FM", "mms://stream.radio.com.pt/ROLI-ENC-436", "Rádio Horizonte FM, Freq: 92.8, Distrito: Lisboa, Concelho: Loures"),
    new Station("Rádio Orbital", "mms://stream.radio.com.pt/ROLI-ENC-401", "Rádio Orbital, Freq: 101.9, Distrito: Lisboa, Concelho: Loures"),
    new Station("Rádio Clube da Lourinhã", "mms://stream.radio.com.pt/ROLI-ENC-432", "Rádio Clube da Lourinhã, Freq: 99, Distrito: Lisboa, Concelho: Lourinhã"),
    new Station("Rádio Oxigénio", "mms://stream.radio.com.pt/ROLI-ENC-498", "Rádio Oxigénio, Freq: 102.6, Distrito: Lisboa, Concelho: Oeiras"),
    new Station("Rádio Clube de Sintra", "mms://stream.radio.com.pt/ROLI-ENC-445", "Rádio Clube de Sintra, Freq: 91.2, Distrito: Lisboa, Concelho: Sintra"),
    new Station("Rádio Oásis", "mms://stream.radio.com.pt/ROLI-ENC-052", "Rádio Oásis, Freq: 106.4, Distrito: Lisboa, Concelho: Sobral Monte Agraço"),
    new Station("RADIOESTE", "mms://stream.radio.com.pt/ROLI-ENC-416", "RADIOESTE, Freq: 97.8 FM, Distrito: Lisboa, Concelho: Torres Vedras"),
    new Station("Ultra FM", "mms://stream.radio.com.pt/ROLI-ENC-506 ", "Ultra FM, Freq: 88.2, Distrito: Lisboa, Concelho: Vila Franca de Xira")
);
categories["Madeira"]=new Array (
    new Station("Rádio Calheta", "mms://stream.radio.com.pt/ROLI-ENC-229", "Rádio Calheta, Freq: 98.8, Distrito: Madeira, Concelho: Calheta (Madeira)"),
    new Station("Posto Emissor do Funchal FM", "mms://stream.radio.com.pt/ROLI-ENC-426", "Posto Emissor do Funchal FM, Freq:  , Distrito: Madeira, Concelho: Funchal"),
    new Station("Rádio TSF Madeira", "mms://stream.radio.com.pt/ROLI-ENC-244", "Rádio TSF Madeira, Freq: 100, Distrito: Madeira, Concelho: Funchal"),
    new Station("106.8 - Rádio Clube da Madeira", "mms://stream.radio.com.pt/ROLI-ENC-481", "106.8 - Rádio Clube da Madeira, Freq: 106.8, Distrito: Madeira, Concelho: Funchal"),
    new Station("Rádio Jornal da Madeira", "mms://stream.radio.com.pt/ROLI-ENC-238", "Rádio Jornal da Madeira, Freq: 88.8, Distrito: Madeira, Concelho: Funchal"),
    new Station("Posto Emissor do Funchal OM", "mms://stream.radio.com.pt/ROLI-ENC-422", "Posto Emissor do Funchal OM, Freq: OM 1530, Distrito: Madeira, Concelho: Funchal"),
    new Station("Rádio Santana FM", "mms://stream.radio.com.pt/ROLI-ENC-188", "Rádio Santana FM, Freq: 92.5, Distrito: Madeira, Concelho: Santana")
);
categories["Portalegre"]=new Array (
    new Station("Rádio Elvas", "mms://stream.radio.com.pt/ROLI-ENC-494", "Rádio Elvas, Freq: 91.5, Distrito: Portalegre, Concelho: Elvas"),
    new Station("Rádio Tempos Livres", "mms://stream.radio.com.pt/ROLI-ENC-010", "Rádio Tempos Livres, Freq: 96, Distrito: Portalegre, Concelho: Ponte de Sor"),
    new Station("Rádio Portalegre", "mms://stream.radio.com.pt/ROLI-ENC-030", "Rádio Portalegre, Freq: 100.5, Distrito: Portalegre, Concelho: Portalegre")
);
categories["Porto"]=new Array (
    new Station("Rádio Felgueiras", "mms://stream.radio.com.pt/ROLI-ENC-459", "Rádio Felgueiras, Freq: 92.2, Distrito: Porto, Concelho: Felgueiras"),
    new Station("Rádio Lidador", "mms://stream.radio.com.pt/ROLI-ENC-160", "Rádio Lidador, Freq: 94.3, Distrito: Porto, Concelho: Maia"),
    new Station("Rádio Clube Matosinhos", "mms://stream.radio.com.pt/ROLI-ENC-435", "Rádio Clube Matosinhos, Freq: 91, Distrito: Porto, Concelho: Matosinhos"),
    new Station("Rádio Clube Paços de Ferreira", "mms://stream.radio.com.pt/ROLI-ENC-073", "Rádio Clube Paços de Ferreira, Freq: 101.8, Distrito: Porto, Concelho: Paços de Ferreira"),
    new Station("Rádio Jornal FM", "mms://stream.radio.com.pt/ROLI-ENC-507", "Rádio Jornal FM, Freq: 103.6, Distrito: Porto, Concelho: Paredes"),
    new Station("Rádio Clube de Penafiel", "mms://stream.radio.com.pt/ROLI-ENC-476", "Rádio Clube de Penafiel, Freq: 91.8, Distrito: Porto, Concelho: Penafiel"),
    new Station("Rádio Festival do Norte", "mms://stream.radio.com.pt/ROLI-ENC-007", "Rádio Festival do Norte, Freq: 94.8, Distrito: Porto, Concelho: Porto"),
    new Station("Rádio Nova", "mms://stream.radio.com.pt/ROLI-ENC-152", "Rádio Nova, Freq: 98.9, Distrito: Porto, Concelho: Porto"),
    new Station("Rádio Onda Viva", "mms://stream.radio.com.pt/ROLI-ENC-161", "Rádio Onda Viva, Freq: 96.1, Distrito: Porto, Concelho: Póvoa de Varzim"),
    new Station("Nova Rádio Voz de Stº Tirso", "mms://stream.radio.com.pt/ROLI-ENC-039", "Nova Rádio Voz de Stº Tirso, Freq: 98.4, Distrito: Porto, Concelho: Santo Tirso"),
    new Station("Rádio Trofa", "mms://stream.radio.com.pt/ROLI-ENC-472", "Rádio Trofa, Freq: 107.8, Distrito: Porto, Concelho: Trofa"),
    new Station("Rádio Linear", "mms://stream.radio.com.pt/ROLI-ENC-449", "Rádio Linear, Freq: 104.6, Distrito: Porto, Concelho: Vila do Conde"),
    new Station("Rádio Nova Era", "mms://stream.radio.com.pt/ROLI-ENC-478", "Rádio Nova Era, Freq: 101,3, Distrito: Porto, Concelho: Vila Nova de Gaia")
);
categories["Santarém"]=new Array (
    new Station("Rádio Tágide", "mms://stream.radio.com.pt/ROLI-ENC-442", "Rádio Tágide, Freq: 96.7, Distrito: Santarém, Concelho: Abrantes"),
    new Station("Rádio Antena Livre", "mms://stream.radio.com.pt/ROLI-ENC-176", "Rádio Antena Livre, Freq: 89.7, Distrito: Santarém, Concelho: Abrantes"),
    new Station("RCA Ribatejo - Rádio Comercial de Almeirim", "mms://stream.radio.com.pt/ROLI-ENC-413", "RCA Ribatejo - Rádio Comercial de Almeirim, Freq: 96.9 104.0, Distrito: Santarém, Concelho: Almeirim"),
    new Station("Rádio 100", "mms://stream.radio.com.pt/ROLI-ENC-415", "Rádio 100, Freq: 107.8, Distrito: Santarém, Concelho: Alpiarça"),
    new Station("ÍRIS FM", "mms://stream.radio.com.pt/ROLI-ENC-180", "ÍRIS FM, Freq: 91.4, Distrito: Santarém, Concelho: Benavente"),
    new Station("Rádio Cartaxo", "mms://stream.radio.com.pt/ROLI-ENC-178", "Rádio Cartaxo, Freq: 102.9, Distrito: Santarém, Concelho: Cartaxo"),
    new Station("Rádio Bonfim", "mms://stream.radio.com.pt/ROLI-ENC-414", "Rádio Bonfim, Freq: 104.9, Distrito: Santarém, Concelho: Chamusca"),
    new Station("Rádio Voz do Sorraia", "mms://stream.radio.com.pt/ROLI-ENC-511", "Rádio Voz do Sorraia, Freq: 94.7, Distrito: Santarém, Concelho: Coruche"),
    new Station("Emissor Regional do Zêzere", "mms://stream.radio.com.pt/ROLI-ENC-457", "Emissor Regional do Zêzere, Freq: 102.7, Distrito: Santarém, Concelho: Ferreira do Zêzere"),
    new Station("Hiper FM", "mms://stream.radio.com.pt/ROLI-ENC-411", "Hiper FM, Freq: 104.6, Distrito: Santarém, Concelho: Rio Maior"),
    new Station("Rádio Marinhais", "mms://stream.radio.com.pt/ROLI-ENC-473", "Rádio Marinhais, Freq: 102.5, Distrito: Santarém, Concelho: Salvaterra de Magos"),
    new Station("Rádio Pernes", "mms://stream.radio.com.pt/ROLI-ENC-423", "Rádio Pernes, Freq: 101.7 105.5, Distrito: Santarém, Concelho: Santarém"),
    new Station("Torres Novas FM", "mms://stream.radio.com.pt/ROLI-ENC-475", "Torres Novas FM, Freq: 100.8, Distrito: Santarém, Concelho: Torres Novas")
);
categories["Setúbal"]=new Array (
    new Station("Rádio Capital", "mms://stream.radio.com.pt/ROLI-ENC-495", "Rádio Capital, Freq: 100.8 102.7, Distrito: Setúbal, Concelho: Almada"),
    new Station("Rádio Radar", "mms://stream.radio.com.pt/ROLI-ENC-497", "Rádio Radar, Freq: 97.8, Distrito: Setúbal, Concelho: Almada"),
    new Station("Rádio Clube de Grândola", "mms://stream.radio.com.pt/ROLI-ENC-474", "Rádio Clube de Grândola, Freq: 91.3, Distrito: Setúbal, Concelho: Grândola"),
    new Station("Tropical FM", "mms://stream.radio.com.pt/ROLI-ENC-480", "Tropical FM, Freq: 95.3, Distrito: Setúbal, Concelho: Moita"),
    new Station("Antena Miróbriga", "mms://stream.radio.com.pt/ROLI-ENC-136", "Antena Miróbriga, Freq: 102.7, Distrito: Setúbal, Concelho: Santiago do Cacém"),
    new Station("Rádio Seixal", "mms://stream.radio.com.pt/ROLI-ENC-412", "Rádio Seixal, Freq: 87.6, Distrito: Setúbal, Concelho: Seixal"),
    new Station("Rádio Baía", "mms://stream.radio.com.pt/ROLI-ENC-193", "Rádio Baía, Freq: 98.7, Distrito: Setúbal, Concelho: Seixal"),
    new Station("Sesimbra FM", "mms://stream.radio.com.pt/ROLI-ENC-444", "Sesimbra FM, Freq: 103.9, Distrito: Setúbal, Concelho: Sesimbra"),
    new Station("Rádio Voz de Setúbal", "mms://stream.radio.com.pt/ROLI-ENC-233", "Rádio Voz de Setúbal, Freq: 100.6, Distrito: Setúbal, Concelho: Setúbal"),
    new Station("Rádio Jornal de Setúbal", "mms://stream.radio.com.pt/ROLI-ENC-126", "Rádio Jornal de Setúbal, Freq: 88.6, Distrito: Setúbal, Concelho: Setúbal"),
    new Station("Rádio Sines", "mms://stream.radio.com.pt/ROLI-ENC-485", "Rádio Sines, Freq: 95.9, Distrito: Setúbal, Concelho: Sines")
);
categories["Viana do Castelo"]=new Array (
    new Station("Rádio Valdevez", "mms://stream.radio.com.pt/ROLI-ENC-508", "Rádio Valdevez, Freq: 96.4, Distrito: Viana do Castelo, Concelho: Arcos de Valdevez"),
    new Station("Rádio Ecos da Raia", "mms://stream.radio.com.pt/ROLI-ENC-434", "Rádio Ecos da Raia, Freq: 92.8, Distrito: Viana do Castelo, Concelho: Monção"),
    new Station("Rádio Barca", "mms://stream.radio.com.pt/ROLI-ENC-483", "Rádio Barca, Freq: 99.6, Distrito: Viana do Castelo, Concelho: Ponte da Barca"),
    new Station("Rádio Ondas do Lima", "mms://stream.radio.com.pt/ROLI-ENC-407", "Rádio Ondas do Lima, Freq: 95, Distrito: Viana do Castelo, Concelho: Ponte de Lima"),
    new Station("Rádio Valença", "mms://stream.radio.com.pt/ROLI-ENC-433", "Rádio Valença, Freq: 91.7, Distrito: Viana do Castelo, Concelho: Valença"),
    new Station("Rádio Popular Afifense", "mms://stream.radio.com.pt/ROLI-ENC-471", "Rádio Popular Afifense, Freq: 87.6, Distrito: Viana do Castelo, Concelho: Viana do Castelo"),
    new Station("Geice FM", "mms://stream.radio.com.pt/ROLI-ENC-448", "Geice FM, Freq: 90.8, Distrito: Viana do Castelo, Concelho: Viana do Castelo"),
    new Station("Rádio Alto Minho", "mms://stream.radio.com.pt/ROLI-ENC-403", "Rádio Alto Minho, Freq: 97, Distrito: Viana do Castelo, Concelho: Viana do Castelo"),
    new Station("Rádio Cultural de Cerveira", "mms://stream.radio.com.pt/ROLI-ENC-451", "Rádio Cultural de Cerveira, Freq: 93.6, Distrito: Viana do Castelo, Concelho: Vila Nova de Cerveira")
);
categories["Vila Real"]=new Array (
    new Station("Rádio Juventude Salesiana", "mms://stream.radio.com.pt/ROLI-ENC-492", "Rádio Juventude Salesiana, Freq: 90.2, Distrito: Vila Real, Concelho: Alijó"),
    new Station("Rádio Fórum Boticas", "mms://stream.radio.com.pt/ROLI-ENC-446", "Rádio Fórum Boticas, Freq: 103.9, Distrito: Vila Real, Concelho: Boticas"),
    new Station("Rádio Larouco", "mms://stream.radio.com.pt/ROLI-ENC-489", "Rádio Larouco, Freq: 93.5, Distrito: Vila Real, Concelho: Chaves"),
    new Station("Rádio Montalegre/ A Voz do Barroso", "mms://stream.radio.com.pt/ROLI-ENC-156", "Rádio Montalegre/ A Voz do Barroso, Freq: 97.5, Distrito: Vila Real, Concelho: Montalegre"),
    new Station("Rádio Santa Marta", "mms://stream.radio.com.pt/ROLI-ENC-438", "Rádio Santa Marta, Freq:  , Distrito: Vila Real, Concelho: Santa Marta de Penaguião"),
    new Station("Universidade FM", "mms://stream.radio.com.pt/ROLI-ENC-405", "Universidade FM, Freq: 104.3, Distrito: Vila Real, Concelho: Vila Real"),
    new Station("Rádio Voz do Marão", "mms://stream.radio.com.pt/ROLI-ENC-109", "Rádio Voz do Marão, Freq: 96.3, Distrito: Vila Real, Concelho: Vila Real")
);
categories["Viseu"]=new Array (
    new Station("Rádio Centro FM", "mms://stream.radio.com.pt/ROLI-ENC-490", "Rádio Centro FM, Freq: 101.4, Distrito: Viseu, Concelho: Carregal do Sal"),
    new Station("Rádio Limite", "mms://stream.radio.com.pt/ROLI-ENC-408", "Rádio Limite, Freq: 89, Distrito: Viseu, Concelho: Castro Daire"),
    new Station("Rádio Montemuro", "mms://stream.radio.com.pt/ROLI-ENC-500", "Rádio Montemuro, Freq: 87.8, Distrito: Viseu, Concelho: Cinfães"),
    new Station("Rádio Voz de Mangualde", "mms://stream.radio.com.pt/ROLI-ENC-046", "Rádio Voz de Mangualde, Freq: 107.1, Distrito: Viseu, Concelho: Mangualde"),
    new Station("Rádio Riba-Távora", "mms://stream.radio.com.pt/ROLI-ENC-165", "Rádio Riba-Távora, Freq: 90.5, Distrito: Viseu, Concelho: Moimenta da Beira"),
    new Station("Rádio Estação Diária de Viseu", "mms://stream.radio.com.pt/ROLI-ENC-430", "Rádio Estação Diária de Viseu, Freq: 96.8, Distrito: Viseu, Concelho: Nelas"),
    new Station("Rádio Lafões", "mms://stream.radio.com.pt/ROLI-ENC-088", "Rádio Lafões, Freq: 93, Distrito: Viseu, Concelho: São Pedro do Sul"),
    new Station("Rádio Sátão", "mms://stream.radio.com.pt/ROLI-ENC-468", "Rádio Sátão, Freq: 89.9, Distrito: Viseu, Concelho: Sátão"),
    new Station("Douro FM", "mms://stream.radio.com.pt/ROLI-ENC-437", "Douro FM, Freq: 91.4, Distrito: Viseu, Concelho: Tabuaço"),
    new Station("Emissora das Beiras", "mms://stream.radio.com.pt/ROLI-ENC-465", "Emissora das Beiras, Freq: 91.2, Distrito: Viseu, Concelho: Tondela"),
    new Station("Rádio Escuro", "mms://stream.radio.com.pt/ROLI-ENC-510", "Rádio Escuro, Freq: 98, Distrito: Viseu, Concelho: Vila Nova de Paiva")
);

{//Code for category Images
  images = new Object;

    //---Comments---
    //One image for each category (not for each station)
    //The images are 96x60 pixels, giff files (other formats/sizes should also be accepted, to be tested)
    //The following code should serve as a template to be easily modified (and uncommented):


  //The code for the images of Radios Portuguesas (doing it...):
  //~ images["27 radios: nacionais ou recomendadas ou interessantes"]="image_category_XX.gif";
  //~ images["Açores"]="image_category_XX.gif";
  //~ images["Aveiro"]="image_category_XX.gif";
  //~ images["Beja"]="image_category_XX.gif";
  //~ images["Braga"]="image_category_XX.gif";
  //~ images["Bragança"]="image_category_XX.gif";
  //~ images["Castelo Branco"]="image_category_XX.gif";
  //~ images["Coimbra"]="image_category_XX.gif";
  //~ images["Évora]="image_category_XX.gif";
  //~ images["Faro"]="image_category_XX.gif";
  //~ images["Guarda"]="image_category_XX.gif";
  //~ images["Leiria"]="image_category_XX.gif";
  //~ images["Lisboa"]="image_category_XX.gif";
  //~ images["Madeira"]="image_category_XX.gif";
  //~ images["Portalegre"]="image_category_XX.gif";
  //~ images["Porto"]="image_category_XX.gif";
  //~ images["Santarém"]="image_category_XX.gif";
  //~ images["Setúbal"]="image_category_XX.gif";
  //~ images["Viana do Castelo"]="image_category_XX.gif";
  //~ images["Vila Real"]="image_category_XX.gif";
  //~ images["Viseu"]="image_category_XX.gif";

}

function RadiosPortuguesas()
{
    ScriptableServiceScript.call( this, "Radios Portuguesas", 2, "Escuta em directo as inumeras radios regionais portuguesas", "Emissoes em directo das radios regionais portuguesas", false );
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
			for( att in categories )
			{
        {//Code to take care of category Images existence/inexistence
          var categoryCover = (!(typeof images[att] === 'undefined')) ? (Amarok.Info.scriptPath() + "/" + images[att]) : (Amarok.Info.scriptPath() + "/" + "icon_categoryDefault.png");
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
          var stationCover = (!(typeof images[callbackData] === 'undefined')) ? (Amarok.Info.scriptPath() + "/" + images[callbackData]) : (Amarok.Info.scriptPath() + "/" + "icon_stationDefault.png");
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

script = new RadiosPortuguesas();
script.populate.connect( onPopulating );
script.customize.connect( onCustomize );
