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

function shop(){alert('Welcome Shop');}
function demo(){alert('Welcome Demo');}
function close(){alert('Welcome Close');}

function carg_home(){alert('Welcome Home');}
function carg_gui(){alert('Welcome Guias');}
function carg_tuto(){alert('Welcome Tutorial');}

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
    alert(valores);
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

