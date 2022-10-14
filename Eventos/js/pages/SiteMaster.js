var Rol = 'Parents';
var DashName = '';
var Permisos = {
    Parents: { Logout: 'Login.aspx' }
    , Admin: { Logout: 'Administrador.aspx' }
}

var DtAlumnosContacto = null;


var ParentsMenu = [
    { Url: 'HistoriaClinica.aspx', Icono: 'ti-write', Descrpcion: 'Historia Clínica' }
    ,
    { Url: 'HuskyPass.aspx', Icono: 'ti-shield', Descrpcion: 'Husky Pass' }
    ,
    { Url: 'HorariosAcademiasAlumnos.aspx', Icono: 'ti-book', Descrpcion: 'Academias' }
    ,
    { Url: 'CardPool.aspx', Icono: 'ti-receipt', Descrpcion: 'Car Pool' }
];


document.addEventListener('DOMContentLoaded', function () {

    try {


        getConexion();

        var btnCPSave = document.getElementById('btnCPSave');
        btnCPSave.addEventListener('click', btnCPSave_Click);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }


});

function getConexion() {


    try {

        if (localStorage.getItem('Login') == _OK_) {

            var obj_filtros = Object();
            obj_filtros.P_Url = location.pathname;
            var ruta = '../Services/WSSeguridad.asmx/GetConexion';
            var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

            $.ajax({
                type: 'POST',
                url: ruta,
                data: $data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                success: function (datos) {

                    var mensaje_servidor = JSON.parse(datos.d);

                    if (mensaje_servidor.Estatus == _OK_) {

                        //fechaActual = mensaje_servidor.Str_Fecha_Actual;
                        localStorage.setItem('fechaActual', mensaje_servidor.Str_Fecha_Actual);

                        var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                        Rol = ds.Rol;
                        //DashName = ds.DashName;
                        //var nombreDashboard = document.getElementById('nombreDashboard');
                        //nombreDashboard.innerHTML = DashName;

                        var infoNombreUsuario = document.getElementById('infoNombreUsuario');
                        infoNombreUsuario.innerHTML = ds.nombreCompleto;

                        var infoCP = document.getElementById('infoCP');
                        infoCP.innerHTML = `${ds.nombreCompleto}`;

                        localStorage.setItem('str_dtAccesos', mensaje_servidor.Str_Respuesta_3);
                        var dtAccesos = JSON.parse(mensaje_servidor.Str_Respuesta_3);

                        cargarMenus(dtAccesos);

                    }
                    else {
                        location.href = _PAGINA_LOGIN_;
                        fg_mensaje_problema_tecnico(mensaje_servidor);
                        
                    }

                }
                , error: function (error) {
                    fg_mensaje_problema_tecnico(error);
                }
            });
        }
        else {

            location.href = _PAGINA_LOGIN_;
            fg_mensaje_aviso_restriccion('No ha iniciado sesión correctamente');
            
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function Salir() {
    /*location.href = Permisos[Rol].Logout;*/

    localStorage.removeItem('Login');
    location.href = _PAGINA_LOGIN_;
}

function cargarMenusRespaldo() {
    try {

        var ulBarraMenu = document.getElementById('BarraMenu');
        var ilOpcion = '<li class="label">Menú</li>';
        if (Rol == 'Parents') {

            ParentsMenu.forEach(m => {
                ilOpcion += fg_getTempleOpcionMenu(m.Url, m.Icono, m.Descrpcion);
            });
        }
        else {
            ilOpcion = '';
            AdminMenu.forEach(n => {

                //ilOpcion += `<li class="label">${n.Nodo}</li>`;
                n.Opciones.forEach(m => {
                    ilOpcion += fg_getTempleOpcionMenu(m.Url, m.Icono, m.Descrpcion);
                });

                ilOpcion = `
                            <li class="">
                                <a class="sidebar-sub-toggle">
                                    <i class="ti-layout-menu-v"></i> ${n.Nodo}
                                    <span class="sidebar-collapse-icon ti-angle-down"></span>
                                </a>
                                <ul style="display: none;">
                                    ${ilOpcion}
                                </ul>
                            </li>
                            `;

            });
        }


        ulBarraMenu.innerHTML = ilOpcion;

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function cargarMenus(_dt) {
    try {

        var menusParent = new Array();
        _dt.forEach(a => {

            if (menusParent.length == 0) {
                menusParent.push(a);
            }
            else {

                var busca = menusParent.filter(x => x.idMenuParent == a.idMenuParent);
                if (busca.length == 0) {
                    menusParent.push(a);
                }
            }
        })



        var tagMenu = '';
        menusParent.forEach(p => {


            var tagMenuParent = '';
            var tagopciones = '';
            var menus = _dt.filter(a => a.idMenuParent == p.idMenuParent);
            dataFilterTag = p.nombreMenu.toLowerCase().split(' ').join('_');

            menus.forEach(a => {
                tagopciones += fg_getTempleOpcionMenu(a.url, a.icono, a.nombreMenu);
            });

            tagMenuParent = `
                            <li class="">
                                <a class="sidebar-sub-toggle">
                                    <i class="${p.iconoParent}"></i> ${p.nombreMenuParent}
                                    <span class="sidebar-collapse-icon ti-angle-down"></span>
                                </a>
                                <ul style="display: none;">
                                    ${tagopciones}
                                </ul>
                            </li>


							`;
            tagMenu += tagMenuParent;

        })

        var ulBarraMenu = document.getElementById('BarraMenu');
        ulBarraMenu.innerHTML = tagMenu;

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function btnCPSave_Click() {


    try {

        var obj_filtros = Object();
        obj_filtros = fg_Get_Object_Control_Valor('MCP_Body');


        var ruta = '../Services/WSSeguridad.asmx/ChangePassword';
            var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

            $.ajax({
                type: 'POST',
                url: ruta,
                data: $data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                cache: false,
                success: function (datos) {

                    var mensaje_servidor = JSON.parse(datos.d);

                    if (mensaje_servidor.Estatus == _OK_) {

                        var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                        if (fg_resultOK(ds.Result)) {

                            location.href = _PAGINA_LOGIN_;
                        }
                    }


                }
                , error: function (error) {
                    fg_mensaje_problema_tecnico(error);
                }
            });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}


function IrCambiarModal() {
    $('#modal_Cambiar_Password').modal('show');
}





/*************   AVISOS *****************/

function SM_getAvisos() {

    try {
        var obj_filtros = Object();

        var ruta = '../Services/WSFamilia.asmx/GetAvisosByUsuario';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });
        parent.DtAlumnosContacto = null;

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    //fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);
                    SM_mostrarAvisos(ds.Avisos);
                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function SM_mostrarAvisos(_dt) {

    var tag = '';
    try {

        if (_dt.length > 0) {
            var tagItems = '';
            _dt.forEach(x => {

                var tagbtn = fg_get_template_BtnCancel('BtnCancelar_Aviso', 'SM_BtnCancelar_Aviso_Click', x.idAviso);
                tagItems += `
                        <div class="media">
                            <div class="media-body">
                                ${tagbtn}
                                <h4 class="media-heading color-primary">${x.aviso}</h4>
                                <p>Fecha de envio: ${x.strfechaEnvio} &nbsp;&nbsp;&nbsp; Por: ${x.nombreUsuarioEnvia}</p>
                                <p class="comment-date"></p>
                            </div>
                        </div>
                        `;
            });
            var tag = `
                    <div class="card">
                                <div class="card-title">
                                    <h5>Avisos pendientes de leer </h5>

                                </div>
                                <div class="recent-comment m-t-15">
                                    ${tagItems}
                                </div>
                            </div>

                   `;
        }


        var ListAvisos = document.getElementById('ListAvisos');
        ListAvisos.innerHTML = tag;
        if (_dt.length == 0) {
            ListAvisos.style.display = 'none';
        }
        else {
            ListAvisos.style.display = '';
        }
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function SM_BtnCancelar_Aviso_Click(_idAviso) {

    try {

        var obj_filtros = Object();
        obj_filtros.P_idAviso = _idAviso;

        var ruta = '../Services/WSFamilia.asmx/SetQuitaAviso';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    if (fg_resultOK(ds.Result)) {
                        fg_alert_aviso_exitoso('Car Pool Amigo', `El Car Pool ${obj_filtros.P_carPoolAmigo} se vinculo exitosamente.`);
                        SM_getAvisos();

                    }
                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}