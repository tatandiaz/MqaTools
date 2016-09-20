var MqaBoard = function(){
	// constantes
    //var servidor_def = "192.168.0.18";
	var servidor_def = "localhost";
	var puerto_def = "80";
	// Private properties
	var este = this;
	var nombreApp = "ServerBeneficios";
	var servidor = servidor_def;
	var puerto = puerto_def;
	var taller = 1;
	var mesa = 0;
	var hqx = null;
	var fullUriSrv = "";
	var comentarios = {};
	var comentarios1 = {};
   	var hexPostItMorado = "#0096CB";
	var idMorado = 0;
	var tmpICheck = 0; // Es el valor que se incrementa cuando hacemos click en las pequeñas flechas de adelante y atrás
	// Public properties
	
	this.initialize = function(){
		fullUriSrv = mkFullUri();
		bindEvents();
	};

		var bindEvents = function(){
		
		var mesaHqx = jQuery.post(fullUriSrv,{ cmd : "mesas", idtaller : taller }, function(data){
			jQuery("#cpCargando").hide("slow");
			
			jQuery("#quitarTaller").hide();
			var nwN = jQuery("#p3");
			nwN.show("slow");
			
			var mkLista = "<select id=\"mesa\" class=\"CamposEntradas\">";
			var dt = data;
			for(var o in dt){
				var ob = dt[o];
				mkLista += "<option value=\"" + ob["id"] + "\">" + ob["nombre"] + "</option>";
			}
			mkLista += "</select>";
			
			var lsObj = jQuery("#capasVaciasx300_2");
			lsObj.html(mkLista);
			
			var asignarMesa = jQuery("#asignarMesa");
			asignarMesa.removeAttr('disabled');			
		})
		.fail(function() {
			jQuery("#cpCargando").hide("slow");
			var nwN = jQuery("#p1");
			nwN.show("slow");
		});
		
		var asignarServer = document.querySelector("#asignarServer");
		asignarServer.addEventListener("click", addServidor, false);
		var quitarServer = document.querySelector("#quitarServer");
		quitarServer.addEventListener("click", delServidor, false);
		var asignarTaller = document.querySelector("#asignarTaller");
		asignarTaller.addEventListener("click", addTaller, false);
		var quitarTaller = document.querySelector("#quitarTaller");
		quitarTaller.addEventListener("click", delTaller, false);
		var asignarMesa = document.querySelector("#asignarMesa");
		asignarMesa.addEventListener("click", addMesa, false);
		
		fullUriSrv = mkFullUri();
	};
	
	var mkFullUri = function(){
		return "http://" + (servidor.length > 0 ? servidor : servidor_def) + (puerto.length > 0 ? (":" + puerto) : "") + "/" + nombreApp + "/index.php";
	};
	
	var msjErr = function(){
		var oMsj = jQuery("#cpCargando"); // Msj cargando
		oMsj.show("slow");
		oMsj.html("Error: Ip incorrecta '" + (servidor.lenght > 0 ? servidor : servidor_def ) + "'");
	};
	
	var addServidor = function(){
		var p_c = jQuery("#p1");
		p_c.hide("slow");
		
		var nwN = jQuery("#p2");
		nwN.show("slow");
		
		var _servidor = document.querySelector("#servidor");
		var _puerto = document.querySelector("#puerto");
		
		servidor = _servidor.value;
		puerto = _puerto.value;
		fullUriSrv = mkFullUri();
		hqx = jQuery.post(fullUriSrv,{ cmd : "talleres" }, function(data){
			var mkLista = "<select id=\"talleres\" class=\"CamposEntradas\">";
			var dt = data;
			for(var o in dt){
				var ob = dt[o];
				mkLista += "<option value=\"" + ob["id"] + "\">" + ob["nombre"] + "</option>";
			}
			mkLista += "</select>";
			
			var lsObj = jQuery("#capasVaciasx300_1");
			lsObj.html(mkLista);
		    var asignarMesa = jQuery("#asignarTaller");
			asignarMesa.removeAttr('disabled');
		})
		.fail(function(){
			msjErr();
		});
		
	};
	
	var delServidor = function(){
		var p_c = jQuery("#p2");
		p_c.hide("slow");
		
		var nwN = jQuery("#p1");
		nwN.show("slow");
		servidor = servidor_def;
		puerto = puerto_def;
		var lsObj = jQuery("#capasVaciasx300_1");
		lsObj.html("Cargando...");
		var asignarTaller = jQuery("#asignarTaller");
		asignarTaller.attr("disabled","disabled");
	};
	
	var addTaller = function(){
		var p_c = jQuery("#p2");
		p_c.hide("slow");
		
		var nwN = jQuery("#p3");
		nwN.show("slow");
		
		var _taller = jQuery("#talleres");		
		taller = _taller.val();
		
		fullUriSrv = mkFullUri();
		hqx = jQuery.post(fullUriSrv,{ cmd : "mesas", idtaller : taller }, function(data){
			var mkLista = "<select id=\"mesa\" class=\"CamposEntradas\">";
			
			var dt = data;
			for(var o in dt){
				var ob = dt[o];
				mkLista += "<option value=\"" + ob["id"] + "\">" + ob["nombre"] + "</option>";
			}
			mkLista += "</select>";
			
			var lsObj = jQuery("#capasVaciasx300_2");
			lsObj.html(mkLista);
			
			var asignarMesa = jQuery("#asignarMesa");
			asignarMesa.removeAttr('disabled');
		})
		.fail(function(){
			msjErr();
		});
	};
	    var delTaller = function(){
		var p_c = jQuery("#p3");
		p_c.hide("slow");
		
		var nwN = jQuery("#p2");
		nwN.show("slow");
		taller = 0;
		var lsObj = jQuery("#capasVaciasx300_2");
		lsObj.html("Cargando...");
		var asignarMesa = jQuery("#asignarMesa");
		asignarMesa.removeAttr('disabled');
	};
	var crearTablas = function( objp, cats ){
		var nwCnt = objp;
		var claseCorchos = "elcorcho";
		
		var totalColumnas = 0;
		
		var tbTablero = "<table class=\"tablero\" >";
		tbTablero 		+= "	<tbody>";
		tbTablero 		+= "		<tr>";
		tbTablero 		+= "			<td style=\"height: 40px; width: 100%;\">";
		tbTablero 		+= "				&nbsp;";
		tbTablero 		+= "			</td>";
		tbTablero 		+= "		</tr>";
		tbTablero 		+= "		<tr>";
		tbTablero 		+= "			<td valign=\"top\" >";
		
		// Columnas
		var tbTmp 		 = "				<table width=\"100%\" height=\"100%\" >";
		tbTmp 		 	+= "					<tbody>";
		
		tbTmp 		 	+= "						<tr>";
		
		// Calculamos el total de columnas
		var padres = cats["1"];		
		for(var cc in padres ){
			totalColumnas++;
		}
		var anchoColumnas = Math.round( 100 / totalColumnas);
		
		// Creamos las columnas principales
		for(var cc in padres ){
			var ob = padres[cc];
			var colRgb = ob["color"];
			//LINEA PARA COLOCAR LOS CIRCULOS CON EL RESPECTIVO COLOR
			//var lacRGB = "<div class=\"circuloEstado\" style=\"background: " + colRgb + "\"></div>";
			var lacRGB = "<div class=\"circuloEstad\" style=\"background: " + colRgb + "\"></div>";
			
			
		tbTmp	 		+= "							<td valign=\"top\" align=\"center\" style=\"color: " + colRgb + "; height: 42px;\" width=\"" + anchoColumnas + "%\" >";
		tbTmp	 		+= "								" + lacRGB + "<b class=\"tituColor\">" + ob["nombre"] + "</b>";
		tbTmp           += "							</td>";
			
		}
		tbTmp += "						    </tr>";
		tbTmp += "							<img class=\"bien\" src=\"img/bien.jpg\" width=120 height=120>";
		tbTmp += "							</img>";
		tbTmp += "							<img class=\"bombillo\" src=\"img/bombillo.jpg\" width=100 height=120>";
		tbTmp += "							</img>";
		tbTmp += "							<img class=\"ejes\" src=\"img/ejes.png\" width=140 height=130>";
		tbTmp += "							</img>";
		tbTmp += "	 <div class=\"ContenedorLogos\" >";
		tbTmp += "							<img class=\"logomqa\" src=\"img/mqa_logo.png\" >";
		tbTmp += "							</img>";
		tbTmp += "							<p class=\"MarcaRegistrada\"> ® Marca regsitrada";
		tbTmp += "							</p>";
        tbTmp += "							<img class=\"logo\" src=\"img/cliente.png\" >";
        tbTmp += "							</img>";
        tbTmp += "							<img class=\"logoDT\" src=\"img/Logo_DT.png\" >";
        tbTmp += "							</img>";
        tbTmp += "	 </div>";

        		
		    // Creamos las columnas en donde se van a poner los post it
		    tbTmp+="<tr>";
		    var padres = cats["1"];
		    for(var cc in padres ){		
			var ob = padres[cc];
			var colRgb = ob["color"];
			
			// Tabla con Post it
			var tbPostIt = "<table  width=\"100%\" height=\"100%\"  >";
			tbPostIt += "<tbody>";
			tbPostIt += "<tr>";
			tbPostIt += "<th valign=\"top\" width=\"0%\">";
			tbPostIt += "<h2 class=\"subtitulo\">&nbsp;</h2>";
			tbPostIt += "<ul id=\"cat_" + ob["id"] + "\" alt=\"" + colRgb + "\" class=\"" + claseCorchos + "\"><li></li></ul>";
			tbPostIt += "</th>";
			
			if(typeof ob.hijos != 'undefined'){
				for(var hijo in ob.hijos){
					var hijoProp = ob["hijos"][hijo];
					
					tbPostIt += "<th valign=\"top\" width=\"250px\" class=\"corchopaso2\">";
                    //Subtitulo columnas
				    //tbPostIt += "<h2  class=\"subtitulo\">" + hijoProp["nombre"] + "</h2>";
				    // class=\"" + claseCorchos + "\"
					//tbPostIt += "           <ul id=\"cat_" + hijoProp["id"] + "\" alt=\"" + hijoProp["color"] + "\" class=\"" + claseCorchos + " con_comentario\" style=\"border-left: dashed 1px #000;\"><li></li></ul></th>";
					tbPostIt += "           <ul id=\"cat_" + hijoProp["id"] + "\" alt=\"" + hijoProp["color"] + "\" class=\"" + claseCorchos + " con_comentario\" ><li></li></ul></th>";
					tbPostIt += "			</th>";
    				}
			}
			tbPostIt        += "		</tr>";
			tbPostIt        += "    	    </tbody>";
			tbPostIt        += "               </table>";
			// Agrego la tabla
			tbTmp	 		+= "							<td valign=\"top\" style=\"border-right: solid 1px #000;\">";
			tbTmp	 		+= "							" + tbPostIt + "";
			tbTmp	 		+= "							</td>";
		    }
		    tbTmp 		 	+= "		</tr>";
		    tbTmp 		 	+= "			</tbody>";
	    	tbTmp 		 	+= "				</table>";
		// Se agragan las columnas
		tbTablero 		+= "		" + tbTmp;
		tbTablero 		+= "	    </td>";
		tbTablero 		+= "		</tr>";
		tbTablero 		+= "		<tr>";
        //contenedor Botones
		tbTablero       += "		<td>";
        //Boton Siguiente
		//tbTablero +="             <input id=\"ChkAde\" type=\"button\" value=\"&gt;\" class=\"btnPasos\"/>";
        //Boton Atras
		tbTablero       += "		<input id=\"btnReto\" type=\"button\" value=\"RETO\" class=\"btnAgregarReto\" style=\"display: block;\" />";
        //Boton Guardar
		tbTablero       += "		<input id=\"guardarTodo\" type=\"button\" value=\"GUARDAR\" class=\"btnSiguientes\" style=\"font-size: 16px; font-weight: bold; width: 110px; float: right; margin: 0px 0px 0px 10px; display: block;\" />";
        //Vovler Mesa
		tbTablero       += "		<input id=\"volverMesa\" type=\"button\" value=\"VOLVER\" class=\"btnSiguientes\" style=\"font-size: 16px; font-weight: bold; width: 110px; float: right; margin: 0px 0px 0px 10px;\" />";
        //postitMorado
     	tbTablero += "				<div id=\"esp\" class=\"postitMorado\" style=\"background-color: " + hexPostItMorado + "; display: block;\" ></div>";
		tbTablero 		+= "	    </td>";
		tbTablero 		+= "		</tr>";
		tbTablero 		+= "	</tbody>";
		tbTablero 		+= "</table>";
		nwCnt.append(tbTablero);
        jQuery("#btnReto").off("click");
		jQuery("#btnReto").on("click", function () {
		    agregarReto();
		});
		jQuery("#volverMesa").off("click");
		jQuery("#volverMesa").on("click", function(){
			delMesa();
		});
		jQuery("#guardarTodo").off("click");
		jQuery("#guardarTodo").on("click", function(){
			GuardarEstadisticas();
		});
		jQuery(".btnPasos").off("click");
		jQuery(".btnPasos").on("click", function(){			
			accCheck( this );
		});
		return claseCorchos;
	};
	var scrCfgAdd = function(id, pad){
		if(id == 1){
			var o = jQuery(".corchopaso2");
			o.show("fast");
			jQuery("#guardarTodo").fadeIn("fast");
		}
		else if(id == 2){
			var o = jQuery("#esp");
			o.show("fast");
			jQuery(pad).fadeOut("fast");
		}
	};
	var scrCfgDel = function(id){
		if(id == 0){
			var o = jQuery(".corchopaso2");
			o.hide("fast");
			jQuery("#guardarTodo").fadeOut("fast");
		}
		else if(id == 1){
			var o = jQuery("#esp");
			o.hide("fast");
		}
	};
		var accCheck = function(obj){
		var atr = "ChkAtr";
		var adl = "ChkAde";
		var o = jQuery(obj);
		var id = (o.attr("id"));
		
		if(id == atr){
			if( tmpICheck > 0 ){
				tmpICheck--;
				if(tmpICheck < 1){
					o.fadeOut("fast");
				}
			}
			jQuery("#" + adl).fadeIn("fast");
			scrCfgDel(tmpICheck);
		}
            if(id == adl){
			jQuery("#" + atr).fadeIn("fast");
			tmpICheck++;
			scrCfgAdd(tmpICheck, obj);
		}
	};
	    //  reto
		var agregarReto = function (id, objTxt) {
            var htmlTexto = "<div>";
            htmlTexto += "	<p id=\"titleReto\" class=\"titleReto\">" + "¿CUAL ES TU RETO?" + "</p>";
		    htmlTexto += "	<textarea class=\"TextReto\" id=\"reto\"  placeholder=\"Escribe tu reto\"></textarea>";
		    htmlTexto += "	<p align=\"right\"><input id=\"btnGuardarReto\" type=\"button\" value=\"GUARDAR\" class=\"btnGuardarReto\" /></p>";
		    htmlTexto += "  </div>";
        //  var cuerpoGlb = jQuery(document.body);
		//  var telon = cuerpoGlb.append("<div id=\"telon\" class=\"telon\">" + htmlTexto + "</div>")

		    var cuerpoGlb = jQuery(document.body);
		
		    if(!cuerpoGlb.has("#telon").length){
		        var telon = cuerpoGlb.append("<div id=\"telon\" class=\"telon\">" + htmlTexto + "</div>");
		        var txtIni = "";
		        if(typeof comentarios[id] != 'undefined'){
		            var tArea = jQuery("#reto");
		            tArea.val( comentarios[id] );
		        }
			
		        var btnAddC = jQuery("#btnGuardarReto");
		        btnAddC.on("click", function(){
		            var tArea = jQuery("#reto");
		            comentarios[id] = tArea.val(  );
		            jQuery("#telon").fadeOut("fast", function(){
		                jQuery( this ).remove();
		            });
			   
		            var masBtn = "<div alt=\"" + objTxt + "\" class=\"addComentario\"></div>";
		            masBtn += "<div alt=\"" + objTxt + "\" class=\"eliminarMorado\">X</div>";
		            jQuery("#" + objTxt).html( masBtn + comentarios[id] );
		            jQuery(".addComentario").on("click", function(){
		                var idCur = jQuery( this );
		                AgregarComentario( idCur.attr("alt") );
		            });
				
		            jQuery( ".eliminarMorado" ).on('click', function(){
		                var idBorrar = jQuery( this ).attr("alt");
		                var o = jQuery("#" + idBorrar);
		                o.fadeOut("slow",function(){
		                    jQuery(this).remove();
		                });
		            });
		        });
		    }
		};
    //fin reto
    //guardar reto
    //fin guardar reto
        var delMesa = function(){
		
		jQuery("#cpCargando").hide("slow");
		var lsPro = jQuery("#listaProcesos");
		lsPro.html();
		lsPro.hide("fast");
		
		var btnAsigMesa = jQuery("#asignarMesa");
		btnAsigMesa.show("fast");
		
		var p_c = jQuery("#p3");
		p_c.show("slow");
		
		var cnt = jQuery("#contenedor");
		cnt.fadeIn("fast");
		
		var nwCnt = jQuery("#contBoard");
		nwCnt.fadeOut("fast");
		
		mesa = 0;
		
		tmpICheck = 0;
		
		try{
			location.reload();
		}catch(e){
			console.log(e);
		}
	};
	
	var addMesa = function(){
		var esteBtn = jQuery(this);
		esteBtn.fadeOut("slow");
		
		var _mesa = jQuery("#mesa");
		mesa = _mesa.val();
		
		jQuery("#cpCargando").show("slow"); // Msj cargando
		
		fullUriSrv = mkFullUri();
		hqx = jQuery.post(fullUriSrv,{ cmd : "procesos", idmesas : mesa, idtaller: taller }, function(data){
			
			var p_c = jQuery("#p3");
			p_c.hide("slow");
			
			var cnt = jQuery("#contenedor");
			cnt.fadeOut("fast");
			
			var nwCnt = jQuery("#contBoard");
			nwCnt.fadeIn("fast");
			
			// Crear tabla
			var dtCat = data["cats"];
			var corcho = crearTablas( nwCnt, dtCat );
			
			
			// Agregar funcionalidad al post-It morado
			jQuery( "#esp" ).draggable(
					{
						connectWith: "." + corcho,
						helper: "clone",
						revert: "invalid"
					}
			);
			
			var lsPro = jQuery("#listaProcesos");
			var dt = data["proce"];
			var elUl = document.createElement("ul");
			var idUlTmp = "ulLsPro";
			elUl.setAttribute("id", idUlTmp);
			
			// Asignamos funciones a los procesos
			jQuery( elUl )
				.sortable({ revert: true })
				.droppable(
					{
						drop : function(event, ui) {
							// vuelve
						}
					}
				);
			
			for(var idPr in dt){
				var objPro = dt[ idPr ];
				var elLi = document.createElement("li");
				elLi.setAttribute("id", "pro_" + objPro["id"]);
				var txtLi = document.createTextNode(objPro["proceso"]);
				elLi.appendChild(txtLi);
				
				jQuery( elLi ).draggable(
						{
							connectWith: "." + corcho,
							//connectWith: "ul",
							//connectToSortable: "#" + idUlTmp,
							revert: "invalid",
							refreshPositions: true,
							start : function(){
								lsPro.animate({opacity: "0.2"});
							},
							stop : function(){
								lsPro.animate({opacity: "1"});
							}
						}
				);
				
				elUl.appendChild(elLi);
			}
			
			var MinCharsTit = ( "" + jQuery("#" + _mesa.attr("id") + " option:selected").text() );
			var corrChars = (MinCharsTit.length > 40) ? MinCharsTit.substring(0, 40) + "" : MinCharsTit;
			var NombreProceso = "<h2 class=\"nombreProcesoSelected\">" + corrChars + "</h2>";
			
			lsPro.html("");
			lsPro.append(NombreProceso);
			lsPro.append(elUl);
			lsPro.fadeIn("fast");
			jQuery( "ul, li" ).disableSelection();
			
			// Se agrega funcionalidad a los procesos listados
			jQuery( "." + corcho )
			.sortable({ revert: true })
			.droppable(
					{
						hoverClass: "ui-state-active",
						drop : function(event, ui) {
							var oUi = ui.draggable;
							
							if(oUi.hasClass("postitMorado")){
								var idNwMorado = oUi.attr("id") + "_" + idMorado;
								var idDel = "del" + idMorado;
								var txtComent = "";
								txtComent  = "<div alt=\"" + idNwMorado + "\" class=\"addComentario\"></div>";
								AgregarComentario( idNwMorado, idNwMorado );
								
								var htmPostIt = "<li id=\"" + idNwMorado + "\" class=\"postitEspecial\" style=\"background-color: " + hexPostItMorado + ";\" >";
								htmPostIt += txtComent;
								htmPostIt += "";
								htmPostIt += "</li>";
								var txtNwLi = jQuery(htmPostIt);
								jQuery(this).addClass("ui-state-highlight").append( txtNwLi );
								
								idMorado++;
							}
							else{
								if(!oUi.hasClass("postitEspecial")){
									oUi.hide("fast");
								
									var objUl = jQuery(this);
									var colorPostIt = objUl.attr("alt");
									var txtComent = "";
									if(objUl.hasClass( "con_comentario" )){
										txtComent = "<div alt=\"" + oUi.attr("id") + "\" class=\"addComentario\"></div>";
										AgregarComentario( oUi.attr("id") );
									}
									var htmPostIt = "<li id=\"" + oUi.attr("id") + "\" class=\"postit\" style=\"background-color: " + colorPostIt + ";\" >";
									htmPostIt += txtComent;
									htmPostIt += oUi.text();
									htmPostIt += "</li>";
									var txtNwLi = jQuery(htmPostIt);
									jQuery(this).addClass("ui-state-highlight").append( txtNwLi );
									//Si agrega datos al corcho, la persona no puede volver a seleccionar datos
									jQuery( "#volverMesa" ).hide("slow");
									
									jQuery(".addComentario").on("click", function(){
										var idCur = jQuery( this );
										AgregarComentario( idCur.attr("alt") );
									});
								}
							}
						}
					}
				)
				.sortable({
				      items: "li:not(.placeholder)",
				      sort: function() {
				    	  $( this ).removeClass( "ui-state-default" );
			    }
			});
		})
            .fail(function(){
			msjErr();
		});
	};
   	var AgregarComentario = function(id, objTxt){
		var htmlTexto 	= "<div>";
		htmlTexto += "	<p id=\"titleTelon\">" + "Anotaciones" + "</p>";
          htmlTexto += "	<textarea id=\"comentarios\"> PUNTOS DE DOLOR:  \n\n\n\n\n\n\n\n\nBENEFICIOS:</textarea>";
        /*Prueba dos TextArea (construccion)
		htmlTexto += "	<textarea id=\"comentarios\" placeholder=\"Incluye los Puntos de Dolor\"></textarea>";
		htmlTexto += "	<textarea id=\"TextBeneficios\" placeholder=\"Incluye los Beneficios\"></textarea>";
		htmlTexto += "	<textarea id=\"TextResponsable\" placeholder=\"Incluye el Responsable\"></textarea>";
		htmlTexto += "	<textarea id=\"TextCategoria\" placeholder=\"Incluye la Categoria\"></textarea>";
        Fin dos textarea
        */
		htmlTexto += "	<p align=\"right\"><input id=\"btnAddComm\" type=\"button\" value=\"AGREGAR\" class=\"btnSiguientes\" /></p>";
		htmlTexto 		+= "</div>";
		
		var cuerpoGlb = jQuery(document.body);
	
		if(!cuerpoGlb.has("#telon").length){
            var telon = cuerpoGlb.append("<div id=\"telon\" class=\"telon\">" + htmlTexto + "</div>");
            var txtIni = "";
            if(typeof comentarios[id] != 'undefined'   ){
                var tArea = jQuery("#comentarios");
                tArea.val(comentarios[id]);
	        }
        
			var btnAddC = jQuery("#btnAddComm");
			btnAddC.on("click", function(){
			    var tArea = jQuery("#comentarios");
			  

			    comentarios[id] = tArea.val();
			   
		
				
				jQuery("#telon").fadeOut("fast", function(){
					jQuery( this ).remove();    
				});
			   
				var masBtn = "<div alt=\"" + objTxt + "\" class=\"addComentario\"></div>";
				masBtn += "<div alt=\"" + objTxt + "\" class=\"eliminarMorado\">X</div>";
				
				jQuery("#" + objTxt).html( masBtn + comentarios[id] );
				
				jQuery(".addComentario").on("click", function(){
					var idCur = jQuery( this );
					AgregarComentario( idCur.attr("alt") );
				});
				
				jQuery( ".eliminarMorado" ).on('click', function(){
					var idBorrar = jQuery( this ).attr("alt");
					var o = jQuery("#" + idBorrar);
					o.fadeOut("slow",function(){
						jQuery(this).remove();
					});
				});
			});
         }
   	};





		var GuardarEstadisticas = function(){
		var dataXcorcho = {};

		var cuerpoGlb = jQuery(document.body);
		
		if(!cuerpoGlb.has("#telon").length){
			jQuery( "#telon" ).remove();
		}
		
		var htmlTexto 	= "<div>";
		htmlTexto += "	<p style=\"font-size: 26px; color:white;\" class=\"txt\">GUARDANDO...</p>";
		htmlTexto 		+= "	<p align=\"right\"><input id=\"btnAddComm\" type=\"button\" value=\"Cerrar\" class=\"btnSiguientes\" /></p>";
		htmlTexto 		+= "</div>";
		
		var telon = cuerpoGlb.append("<div id=\"telon\" class=\"telon\">" + htmlTexto + "</div>");
		var btnAddC = jQuery("#btnAddComm");
		btnAddC.on("click", function(){							
			jQuery("#telon").fadeOut("fast", function(){
				jQuery( this ).remove();
			});
		});

	 	var corchos = document.querySelectorAll(".elcorcho");
		for(var o in corchos){
			var oo = corchos[o];
			var tpCorcho = typeof oo;
			if(tpCorcho == 'object'){
				var idCat = oo.id;
				console.log( "id cat: " + idCat );
				if(typeof idCat != 'undefined'){
					var losLi = oo.querySelectorAll(".postit, .postitEspecial");
					var arrData = new Array();
					for(var p in losLi){
						var elLi = losLi[p];
						if(typeof elLi == 'object'){
							if( jQuery(elLi).is(':visible') ){
								var tpPostit = typeof elLi;
								if(tpPostit == 'object'){
									if(jQuery( elLi ).hasClass("postit") || jQuery( elLi ).hasClass("postitEspecial")){				
										var tmpTxtCom = comentarios[losLi[p].id];
										var obTxt = typeof tmpTxtCom;
										var txtCom = "";
										if(obTxt != "undefined"){
											txtCom = tmpTxtCom;
										}
										var TipoYDato = { idpro : losLi[p].id, comentario : txtCom, idmesa : mesa, idtaller : taller };
										
										arrData.push(TipoYDato);
									}
								}
							}
						}			
					}
					dataXcorcho[idCat] = arrData;
				}
			}
		}
  
		var tpGbl = typeof dataXcorcho;
		if(tpGbl == 'object'){
			var mesaHqx = jQuery.post(fullUriSrv,{ cmd : "guardar", lamesa : mesa, eltaller : taller, datos : dataXcorcho })
			.done(function( data ) {
				var txtRes = ("" + data);
				if( txtRes.length > 0 ){
					jQuery( "#telon div p.txt" ).html( data );	
				}
			})
			.fail(function() {
				jQuery( "#telon div p.txt" ).html( "No hay comunicacion con el servidor." );
			});	
		}
	};	
};