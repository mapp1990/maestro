/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function insert_master(){

    var msj = '<div class="alert alert-warning" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>';
    var error = 0;
    var valores;

    if(document.getElementById('usr').value == ''){

        if(document.getElementById('user').value == ''){
            msj = msj + " - Debe llenar el campo Usuario para iniciar sesion.<br>";
            error ++;
        } 

        if(document.getElementById('pass').value == ''){
            msj = msj + " - Debe llenar el campo Contraseña para iniciar sesion.<br>";
            error ++;
        }
    }

    if(error != 0){
        
        msj = msj + '</div>';

        jQuery.ajax({
            type: 'POST',
            dataType :  'html',
            success: jQuery('#msj_login').html(msj)
        });

    }else{
        
        if(document.getElementById('usr').value == ''){

            valores = 'user=' + document.getElementById('user').value + '&pass='+document.getElementById('pass').value;

            document.getElementById("theme-options").style.visibility = "visible";
            document.getElementById('usr').value = document.getElementById('user').value;
            document.getElementById('psw').value = document.getElementById('pass').value;
        
        }else
            valores = 'user=' + document.getElementById('usr').value + '&pass=' +  document.getElementById('psw').value;

        jQuery.ajax({
            url:'http://www.maestrobursatil.com/star_sesion_app.php',
            type:'POST',
            data:valores,
            dataType:'html',
            success:function(data){
                jQuery("#content").html(data);
                navigator.vibrate(100);
            }
        });

        jQuery(document).ready(function() {
            jQuery('input:text').focus(
            function(){
                jQuery(this).css({'background-color' : '#FFFFEEE'});
            });

            jQuery('input:text').blur(
            function(){
                jQuery(this).css({'background-color' : '#DFD8D1'});
            });
        });
    }
}

function new_register(){

    var msj = '<div class="alert alert-warning" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>';
    msj = msj + "Los siguientes campos son obligatorios para realizar el registro:<ul>";

    var error = 0;

    if(document.getElementById('name').value == ''){
        msj = msj + "<li>Nombre.</li>";
        error ++;
    } 

    if(document.getElementById('user').value == ''){
        msj = msj + "<li>Usuario.</li>";
        error ++;
    } 

    if(document.getElementById('pass').value == ''){
        msj = msj + "<li>Contraseña.</li>";
        error ++;
    } 

    if(document.getElementById('c_pass').value == ''){
        msj = msj + "<li>Confirmación Contraseña.</li>";
        error ++;
    } 

    if(document.getElementById('mail').value == ''){
        msj = msj + "<li>Email.</li>";
        error ++;
    } else{

        email = document.getElementById('mail').value;       
        re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
        
        if(re.exec(email))
            email = document.getElementById('mail').value;
            
        else {
            var msj = '<div class="alert alert-warning" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>';
            msj = msj + 'Advertencia! <br> La dirección de email es incorrecta.<br>';
            ++ error;
        }

    }
    msj = msj + "</ul></div>";
    
    if(error != 0){

        jQuery.ajax({
            type: 'POST',
            dataType :  'html',
            success: jQuery('#msj_register').html(msj)
        });  

    }else{

        var valores = 'nombre_user=' + document.getElementById('name').value + '&usuario=' + document.getElementById('user').value + '&cedula=' + document.getElementById('pass').value + '&email=' + document.getElementById('mail').value + '&estab=0';

        jQuery.ajax({
            url:'http://www.maestrobursatil.com/templates/master_admin/html/new_user.php',
            type:'POST',
            data:valores,
            dataType:'html',
            success:function(data){
                jQuery("#msj_register").html(data);
            }
        });        
    }
}

function profile(){

    var valores = 'usr=' + document.getElementById('usr').value + '&psw=' + document.getElementById('psw').value;
    
    jQuery.ajax({
            url:'http://www.maestrobursatil.com/data_profile.php',
            type:'POST',
            data:valores,
            dataType:'html',
            success:function(data){
                jQuery("#content").html(data);
                navigator.vibrate(100);
            }
        });
}

function edit_user(){

    var cambio = 0;

    var user = document.getElementById('usr').value;
    var pass = document.getElementById('psw').value;

    if(document.getElementById('name').value != ''){ ++ cambio; }

    if(document.getElementById('user').value != ''){ 
        user = document.getElementById('user').value;
        ++ cambio; 
    }

    if(document.getElementById('email').value != ''){ 

        email = document.getElementById('email').value;       
        re=/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
        
        if(re.exec(email))
            ++ cambio;
        else {
            var msj = '<div class="alert alert-warning" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>';
            msj = msj + 'Advertencia! <br> La dirección de email es incorrecta.<br>';
            ++ error;
        } 
    }

   // if(document.getElementById('pass').value != ''){ ++ cambio; }

    if(cambio == 0){ 

        var error_edit = '<h6 class="head-title animated bounceInDown animation-delay-8" style="font-size: 1.5em; margin-top:200px">No se realizo ningún cambio.</h6>';
        error_edit = error_edit + '<a href="index.html"><img style="margin-top:20px" src="img/icon_int_master.png" alt="" class="aligncenter animated bounceIn animation-delay-5 btn-master"></a>';

         jQuery.ajax({
            type: 'POST',
            dataType :  'html',
            success: jQuery('#content').html(error_edit)
        });  
    }
    else{

        var valores = 'usr=' + document.getElementById('usr').value + '&psw=' + document.getElementById('psw').value + '&new_name=' + document.getElementById('name').value + '&new_user=' + document.getElementById('user').value + '&new_email=' + document.getElementById('email').value;

        jQuery.ajax({
                url:'http://www.maestrobursatil.com/edit_profile.php',
                type:'POST',
                data:valores,
                dataType:'html',
                success:function(data){
                   jQuery("#content").html(data);
                    navigator.vibrate(100);
                    document.getElementById('usr').value = user;
                }
        });
    }
}

function onDeviceReady() {
    console.log(navigator.camera);
}

function cam_profile(){
    document.addEventListener("deviceready", onDeviceReady, false);
}

function shop(){

    var valores = 'usr=' + document.getElementById('usr').value + '&psw=' + document.getElementById('psw').value;

    jQuery.ajax({
        url:'http://www.maestrobursatil.com/carg_parrilla.php',
        type:'POST',
        data:valores,
        dataType:'html',
        success:function(data){
            jQuery("#content").html(data);
        }
    });
    
    alert('Welcome Shop');
}
function demo(){alert('Welcome Demo');}
function close(){alert('Welcome Close');}

function carg_home(){alert('Welcome Home');}
function carg_gui(){alert('Welcome Guias');}

function carg_tuto(){

    var valores = 'usr=' + document.getElementById('usr').value + '&psw=' + document.getElementById('psw').value;
    
    jQuery.ajax({
        url:'http://www.maestrobursatil.com/app_tuto.php',
        type:'POST',
        data:valores,
        dataType:'html',
        success:function(data){
            jQuery("#content").html(data);
            navigator.vibrate(100);
        }
    });
}

function tutorial_sel(id_tuto){

    var valores = 'usr=' + document.getElementById('usr').value + '&psw=' + document.getElementById('psw').value + '&id_tuto=' + id_tuto;
    
    jQuery.ajax({
        url:'http://www.maestrobursatil.com/app_tuto_pru.php',
        type:'POST',
        data:valores,
        dataType:'html',
        success:function(data){
            jQuery("#content").html(data);
            navigator.vibrate(100);
        }
    });
}

function cal_test(id_preg){

    var id_content = '#div_resul'+id_preg;
    var id_rcor = 'resp_corr_'+id_preg;
    var id_expli = 'expli_'+id_preg;
    
    var correcta = document.getElementById(id_rcor).value;
    var explica = document.getElementById(id_expli).value;
    var contesta = 0; 

    var resp = 'Pregunta no Contestada.';

    var check = new Array();
    check[1] = 'chA_'+id_preg;
    check[2] = 'chB_'+id_preg;
    check[3] = 'chC_'+id_preg;
    check[4] = 'chD_'+id_preg;

    for(var i = 1; i<check.length; ++i){
        if(document.getElementById(check[i]).checked == true){
            if(document.getElementById(check[i]).value === correcta){
                resp = 'Respuesta Correcta.';
            }else resp = 'Respuesta Incorrecta.';
        } 
    }

    var msj = '<div><br><h4>'+ resp +'</h4>';
    msj = msj + '<h5>Explicación:</h5>';
    msj = msj + '<p>' + explica + '</p>';
    msj = msj + '</div>';

    //alert(msj);

    jQuery.ajax({
        type: 'POST',
        dataType :  'html',
        success: jQuery(id_content).html(msj)
    }); 
}

function carg_exa(){

    var valores = 'usr=' + document.getElementById('usr').value + '&psw=' + document.getElementById('psw').value;
    
    jQuery.ajax({
        url:'http://www.maestrobursatil.com/app_simu.php',
        type:'POST',
        data:valores,
        dataType:'html',
        success:function(data){
            jQuery("#content").html(data);
            navigator.vibrate(100);
        }
    });
}

function simulador_sel(id_simu){

    var valores = 'usr=' + document.getElementById('usr').value + '&psw=' + document.getElementById('psw').value + '&id_simu=' + id_simu;
    
    jQuery.ajax({
        url:'http://www.maestrobursatil.com/app_simu_pru.php',
        type:'POST',
        data:valores,
        dataType:'html',
        success:function(data){
            jQuery("#content").html(data);
            navigator.vibrate(100);
        }
    });
}

function stop(id_usu, estab, preg, rep_cor, mot_ter, id_exa, id_tem, name_tem){

    jQuery("#countdown_dashboard").stopCountDown();
    
    var pregunta = preg;
    var n_contes = 0;
    var rep_usu = new Array();
    
    for(var i = 0; i < pregunta.length; ++i){
        
        if(pregunta[i] != '[' && pregunta[i] != ']' && pregunta[i] != '"' && pregunta[i] != ','){
            if(document.getElementById('chA_' + pregunta[i]).checked == true){++n_contes; rep_usu[i] = 1;}
            else if(document.getElementById('chB_' + pregunta[i]).checked == true){++n_contes; rep_usu[i] = 2;}
            else if(document.getElementById('chC_' + pregunta[i]).checked == true){++n_contes; rep_usu[i] = 3;}
            else if(document.getElementById('chD_' + pregunta[i]).checked == true){++n_contes; rep_usu[i] = 4;}
            else rep_usu[i] = 0;
        }
    }
    
    var hor = jQuery("#hor1").text().charAt(1) + jQuery("#hor2").text().charAt(1);
    var min = jQuery("#min1").text().charAt(1) + jQuery("#min2").text().charAt(1);
    var seg = jQuery("#seg1").text().charAt(1) + jQuery("#seg2").text().charAt(1);
    
    var time = hor + ":" + min + ":" + seg;
    
    var valores =   'id_usu=' + id_usu +
                    '&estab=' + estab +
                    '&ids_preg=' + JSON.stringify(preg) + 
                    '&rep_usu=' + JSON.stringify(rep_usu) +
                    '&rep_cor=' + JSON.stringify(rep_cor) +
                    '&mot_ter=' + mot_ter +
                    '&n_contes=' + n_contes +
                    '&id_exa=' + id_exa +
                    '&id_tem=' + JSON.stringify(id_tem) +
                    '&name_tem=' + JSON.stringify(name_tem) +
                    '&time=' + time;
    
    jQuery.ajax({
        url:"http://www.maestrobursatil.com/app_cal_simu.php",
        type: "POST",
        dataType :  "html" , 
        data: valores,
        success: function ( data ){
            jQuery("#content").html(data);
            navigator.vibrate(100);
        }
    });
}

/* Modulo de compra y Venta de los productos */

function add_car(id, pop){
    
    id_pop = '#' + pop + id;
    id_a = pop + id;
    
    if(pop == 'pop_gui_')tp = 1;
    else if(pop == 'pop_tut_')tp = 2;
    else if(pop == 'pop_simu_')tp = 3;
    else if(pop == 'pop_full_')tp = 4;
    
    if(document.getElementById('car_produc').value != ''){
        document.getElementById(id_a).href = '#';
        var car = document.getElementById('car_produc').value;
        document.getElementById('car_produc').value = car + '::' + tp + ',' + id;
        
    }else{
        document.getElementById(id_a).href = '#';
        document.getElementById('car_produc').value = tp + ',' + id;
    }
    
    jQuery(function() {
        jQuery(id_pop).popover({
            html : true,
            content: '<p>Productor Agregado a su carro de compras.<p>',
            delay: { show: 500, hide: 100 }
        });
    });

    setTimeout(function() {
        $(id_pop).popover('hide');
    },5000);
}

function car(user){
    
    var valores = "productos=" + document.getElementById('car_produc').value + "&user=" + user;
    
    jQuery.ajax({
        url:"http://www.maestrobursatil.com/templates/protostar/html/carro.php",
        type: "POST",
        dataType :  "html", 
        data: valores,
        success: function ( data ){
            jQuery("#car-conte").html(data);
        }
    });
}

function dve_car(){
    
    var valores = 'productos=' + document.getElementById('car_produc').value;
    
    jQuery.ajax({
        url:"http://www.maestrobursatil.com/templates/protostar/html/app_shop.php",
        type: "POST",
        dataType :  "html",
        data: valores,
        success: function ( data ){
            jQuery("#car-conte").html(data);
        }
    });
}

function env_payu(v_tot, user){

    var valores = 'productos=' + document.getElementById('car_produc').value + '&user=' + user + '&valor=' + v_tot;
    
    jQuery.ajax({
        url:"http://www.maestrobursatil.com/templates/protostar/html/app_hab_pro.php",
        type: "POST",
        dataType :  "html", 
        data: valores,
        success: function ( data ){
            jQuery("#div_pag").html(data);
            
            jQuery.ajax({
                url:"/pagos/envio.php",
                type: "POST",
                dataType :  "html", 
                data: valores,
                success: function ( data ){
                    jQuery("#div_pag").html(data);
                }
            });
        }
    });
    //alert(valores + 'En un momento sera dirijido a nuestra pasarela de pagos.' + v_tot);

}

function env_payuuu(v_tot, user, envio){
    
    var msj = 'Los datos de Dirección y Teléfono de contacto son necesarios para garantizar el envio de su producto. <br>';
    var error = 0;
    var dir = '';
    var tel = '';

    if(envio == 1){

        if(document.getElementById('dir_env').value == '' || document.getElementById('tel_contac').value == ''){ error ++; }

        if(error > 0 ){
            alerta_error = '<div class="alert alert-warning" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>'+ msj +'</div>';

            jQuery.ajax({
                type: 'POST',
                dataType :  'html',
                success: jQuery('#mensaje_comp').html(alerta_error)
            });

        }

        dir = document.getElementById('dir_env').value;
        tel = document.getElementById('tel_contac').value;
    }

    if(error == 0){

        var valores = 'productos=' + document.getElementById('car_produc').value + '&user=' + user + '&valor=' + v_tot + '&envio=' + envio + '&dir=' + dir + '&tel=' + tel;

        jQuery.ajax({
            url:"http://www.maestrobursatil.com/templates/protostar/html/app_hab_pro.php",
            type: "POST",
            dataType :  "html", 
            data: valores,
            success: function ( data ){
                jQuery("#div_pag").html(data);  
                        
                jQuery.ajax({
                    url:"http://www.maestrobursatil.com/pagos/app_envio_pr.php",
                    type: "POST",
                    dataType :  "html", 
                    data: valores,
                    success: function ( data ){
                        jQuery("#div_pag").html(data);
                    }
                });
            }
        });
    }
    //alert(valores + 'En un momento sera dirijido a nuestra pasarela de pagos.' + v_tot);

}

