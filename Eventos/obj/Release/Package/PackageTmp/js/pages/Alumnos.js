var PAGECONTROLS;

/** Se crea un objecto que trae todos los catalogos fijos que se requieran en la captura */
var Ds = new Object();
var Contenedor_Principal_ID = 'contenedorPrincipal';
var MI_Titulo_Pagina = 'Horarios de Academias';
var Registro_ID_Seleccionado = null;
var ToolBarBasica = ``;
var fechaActual;
var DtMes = [{ idMes: '01', mes: 'Enero' }
    , { idMes: '02', mes: 'Febrero' }
    , { idMes: '03', mes: 'Marzo' }
    , { idMes: '04', mes: 'Abril' }
    , { idMes: '05', mes: 'Mayo' }
    , { idMes: '06', mes: 'Junio' }
    , { idMes: '07', mes: 'Julio' }
    , { idMes: '08', mes: 'Agosto' }
    , { idMes: '09', mes: 'Septiembre' }
    , { idMes: '10', mes: 'Octubre' }
    , { idMes: '11', mes: 'Novimienbre' }
    , { idMes: '12', mes: 'Diciembre' }
];

var TipoProceso = '';

function setTemplateCaptura() {

    var tag = '';

    try {

        tag = `

                <div class="card mk-card-seccion">
                    <div class="card-title mk-card-title"></div>

                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                ${fg_Template_Select_Form_Group('idColegio', '', 'Colegio', `required`)}
                            </div>
                        </div>


                        <div class="card mk-card-seccion">
                            <div class="card-title mk-card-title">Datos del alumno</div>
                            <div class="card-body pl-4">

                                <div class="row">
                                    <div class="col-sm-12 col-md-12 col-lg-6">
                                        ${fg_Template_TextBox_Form_Group('nombreAlumno', '', 'Nombre completo del alumno', `required`)}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-4 col-lg-3">
                                        ${fg_Template_TextBox_Form_Group('grado', '', 'Grado', ``)}
                                    </div>
                                    <div class="col-sm-12 col-md-4 col-lg-3">
                                        ${fg_Template_TextBox_Form_Group('grupo', '', 'Grupo', ``)}
                                    </div>

                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_BtnChk_Form_Group('rezagado', false, 'Rezagado', ' onclick="BtnChk_rezagado_Click();"')}
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div class="card mk-card-seccion">
                            <div class="card-title mk-card-title">Datos de la persona que autoriza</div>
                            <div class="card-body pl-4">

                                <div class="row mt-4 mb-2 ">
                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('nombrePadre', '', 'Primer Nombre', `required`)}
                                    </div>
                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('segundoNombrePadre', '', 'Segundo Nombre (en caso de tener)', ``)}
                                    </div>

                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('apellidoPaternoPadre', '', 'Ap. Paterno', ` required`)}
                                    </div>
                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('apellidoMaternoPadre', '', 'Ap. Materno', ``)}
                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-4">
                                        ${fg_Template_Fecha_Nacimiento()}
                                    </div>

                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('telefonoContacto', '', 'Teléfono de contacto', `required`)}
                                   </div>
                                    <div class="col-sm-12 col-md-12 col-lg-12 text-right">

                                    </div>
                                </div>

                            </div>
                        </div>


                        <div class="card mk-card-seccion">
                            <div class="card-title mk-card-title">Evaluación</div>
                            <div class="card-body pl-4">

                                <div class="row mt-4 mb-2">
                                    <div class="col-sm-4 col-md-2 col-lg-1">
                                        ${fg_Template_TextBox_Form_Group('od', '', 'OD', ` maxlength="10" `)}
                                    </div>
                                    <div class="col-sm-4 col-md-2 col-lg-1">
                                        ${fg_Template_TextBox_Form_Group('oi', '', 'OI', ` maxlength="10" `)}
                                    </div>
                                    <div class="col-sm-4 col-md-2 col-lg-1">
                                        ${fg_Template_TextBox_Form_Group('eje', '', 'Eje', ` maxlength="10" `)}
                                    </div>

                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_BtnChk_Form_Group('lentesEntregados', false, 'Lente Entregado', ' onclick="BtnChk_lentesEntregados_Click();"')}
                                    </div>

                                </div>

                            </div>
                        </div>




                </div>

              `;

        var pnlCapturaBody = document.getElementById('Card_Captura_Body');
        pnlCapturaBody.innerHTML = tag;


        //var tagfooter = `
        //                    <div class="w-100 text-right">
        //                        <button id="Btn_Guardar_Captura" type="button" class="btn btn-success mk-btn-footer">Guardar</button>
        //                    </div>
        //                `;

        //var Card_Listado_footer = document.getElementById('Card_Listado_footer');
        //Card_Listado_footer.innerHTML = tagfooter;

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

document.addEventListener('DOMContentLoaded', function () {


    try {

        TipoProceso = fg_GetPagina();
        setTemplateCaptura();

        PAGECONTROLS = fg_setIFRAMEControls(Contenedor_Principal_ID);
        fg_setTitlePagina();

        PAGECONTROLS.controls.Card_Captura.style.display = 'block';
        PAGECONTROLS.controls.Card_Captura.style.display = 'none';
        fg_Agregar_Ventana_Abierta(PAGECONTROLS.controls.Card_Listado);


        $('#Cmb_idColegio_Filtro').select2();
        $('#Cmb_idColegio').select2();

        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes, 'idMes', 'mes', DtMes, false);


        var elementosS2 = document.getElementsByClassName('select2 select2-container select2-container--default');

        for (var i = 0; i < elementosS2.length; i++) {

            elementosS2[i].style.width = `100%`;
        }

        getInit();


        PAGECONTROLS.controls.Btn_Guardar_Captura.addEventListener('click', btnGuardarClick);

        PAGECONTROLS.controls.Btn_Cerrar_Captura.addEventListener('click', btnCerrarClick);
        PAGECONTROLS.controls.Btn_Close_Captura.addEventListener('click', btnCerrarClick);


    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

});

function getInit() {


    try {


        var obj_filtros = Object();
        obj_filtros.P_lentesEntregados = (TipoProceso == 'Alumnos' ? false : true);

        var ruta = '../Services/WSAlumnos.asmx/GetInit';
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

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idColegio_Filtro, 'idColegio', 'NOMBRECT', ds.ColegiosFiltro, false);
                    fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idColegio, 'idColegio', 'NOMBRECT', ds.Colegios, false);

                    getList();

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
function getList() {


    try {


        var obj_filtros = Object();
        obj_filtros.P_idColegio = PAGECONTROLS.controls.Cmb_idColegio_Filtro.value;
        obj_filtros.P_lentesEntregados = (TipoProceso == 'Alumnos' ? false : true);

        var ruta = '../Services/WSAlumnos.asmx/GetList';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var columnas = [], datas = [];
        Control_Grid_Activo = '#Grid_Listado';

        $(Control_Grid_Activo).bootstrapTable('destroy');


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

                    loadGrid(ds.Alumnos);

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

function BtnExportarClick() {


    try {


        var obj_filtros = Object();
        obj_filtros.P_idColegio = PAGECONTROLS.controls.Cmb_idColegio_Filtro.value;
        obj_filtros.P_lentesEntregados = (TipoProceso == 'Alumnos' ? false : true);

        var ruta = '../Services/WSAlumnos.asmx/ExportList';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var btn = document.getElementById('BtnExportar');
        var icono_inicial = fg_Cambiar_Icono_DOM(btn, _SPINNER_);

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                fg_Cambiar_Icono_DOM(btn, icono_inicial);

                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ancla = document.getElementById('Btn_Descargar_Reporte_Excel_Generado');
                    ancla.href = '..\\Archivos_Para_Descarga\\' + mensaje_servidor.Str_Respuesta_1;
                    ancla.click();



                    //var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    //loadGrid(ds.Alumnos);

                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_Cambiar_Icono_DOM(btn, icono_inicial);
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function BtnExportarClickTodo() {


    try {


        var obj_filtros = Object();
        //obj_filtros.P_idColegio = PAGECONTROLS.controls.Cmb_idColegio_Filtro.value;
        obj_filtros.P_lentesEntregados = (TipoProceso == 'Alumnos' ? false : true);


        var ruta = '../Services/WSAlumnos.asmx/ExportList';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var btn = document.getElementById('BtnExportarTodo');
        var icono_inicial = fg_Cambiar_Icono_DOM(btn, _SPINNER_);

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                fg_Cambiar_Icono_DOM(btn, icono_inicial);

                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ancla = document.getElementById('Btn_Descargar_Reporte_Excel_Generado');
                    ancla.href = '..\\Archivos_Para_Descarga\\' + mensaje_servidor.Str_Respuesta_1;
                    ancla.click();



                    //var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    //loadGrid(ds.Alumnos);

                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_Cambiar_Icono_DOM(btn, icono_inicial);
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function loadGrid(_Dt) {
    try {
        var columnas = [], datas = [];
        Control_Grid_Activo = '#Grid_Listado';

        $(Control_Grid_Activo).bootstrapTable('destroy');

        if (TipoProceso == 'Alumnos') {
            columnas.push({
                field: 'idRegistro', title: 'Opciones', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
                , formatter: function (value, row, key) {

                    var tag = fg_get_template_BtnEdit('btnEditar', 'btnEditarClick', row.idRegistro);
                    //tag += fg_get_template_BtnCancel('btnInactivarActivar', 'btnInactivarActivarClick', row.idRegistro);
                    return tag;
                }
            });

            columnas.push({
                field: 'od', title: 'OD', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_od_${row.idRegistro}" value="${row.od}" onchange="setOjos(${row.idRegistro});" maxlength="10" placeholder="OD" autocomplete="off" style="text-align:center;"/>
                          `;

                    return tag;
                }
            });
            columnas.push({
                field: 'oi', title: 'OI', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_oi_${row.idRegistro}" value="${row.oi}" onchange="setOjos(${row.idRegistro});"  maxlength="10" placeholder="OI" autocomplete="off" style="text-align:center;"/>
                          `;

                    return tag;
                }
            });
            columnas.push({
                field: 'eje', title: 'Eje', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_eje_${row.idRegistro}" value="${row.eje}" onchange="setEje(${row.idRegistro});"  maxlength="10" placeholder="Eje" autocomplete="off" style="text-align:center;"/>
                          `;

                    return tag;
                }
            });

            columnas.push({
                field: 'lentesEntregados', title: 'Lente Entregado', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
                , formatter: function (value, row, key) {

                    var tag = fg_Template_BtnChk_Form_Sin_Etiqueta(`lentesEntregados_${row.idRegistro}`, row.Lente_Entregado, `onclick="setLentesEntregados(${row.idRegistro})"`);

                    return tag;
                }
            });

        }
        else {
            columnas.push({
                field: 'od', title: 'OD', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
            });
            columnas.push({
                field: 'oi', title: 'OI', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
            });
            columnas.push({
                field: 'eje', title: 'Eje', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
            });

            columnas.push({
                field: 'lentesEntregados', title: 'Lente Entregado', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
                , formatter: function (value, row, key) {

                    return (row.lentesEntregados ? 'SI' : 'NO');
                }

            });

        }

        columnas.push({
            field: 'nombreAlumno', title: 'Nombre del alumno', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left'
        });
        columnas.push({
            field: 'nombreCompletoPadre', title: 'Nombre del padre o tutor', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left'
        });
        columnas.push({
            field: 'fechaNacPadre', title: 'Fecha de Nacimiento', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'right'
            , formatter: function (value, row, key) {

                return row.str_fechaNacPadre;
            }
        });
        columnas.push({
            field: 'telefonoContacto', title: 'Teléfono', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'right'
        });
        columnas.push({
            field: 'autorizaPrueba', title: 'Autorizó Prueba', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                return (row.autorizaPrueba ? 'SI' : 'NO');
            }

        });


        /*
        columnas.push(fg_Col_Grid_fechaUltimoCambio());
        columnas.push(fg_Col_Grid_fechaCreoRegistro());
        columnas.push(fg_Col_Grid_Activo());
        */

        $(Control_Grid_Activo).bootstrapTable({
            /*height: 650,*/
            cache: false,
            striped: true,
            pagination: true,
            smartDysplay: true,
            search: true,
            advancedSearch: true,
            searchOnEnterKey: false, //El método será ejecutado hasta que la tecla Enter sea presionada.
            /*showColumns: true,*/
            showFooter: true,

            minimunCountColumns: 2,
            clickToSelect: true,
            fixedColumns: true,

            //dataShowExport: true,
            //exportTypes: ['excel'],
            filterControl: true,
            /*showSearchClearButton: true,*/
            rowStyle: function (row, index) {
                if (row.activo == false) {
                    return {
                        css: { "background": "#fbeeee", "color": "#aba0a0" }
                    };
                }

                return {};

            },
            columns: columnas
                ? columnas
                : [{ field: _Campos_ID, title: '', width: 0, align: 'center', valign: 'bottom', sortable: true, visible: true }]
        });

        //Crearmos el grid con las columnas

        if (_Dt !== null) {
            $(Control_Grid_Activo).bootstrapTable('load', _Dt);
        }

        if (TipoProceso == 'Alumnos') {
            ToolBarBasica = `
                    <div class="btn-group mk-btn-group" role="group" aria-label="Basic example">
                      ${EV_BTN_NUEVO_}
                    </div>
                    `;

            var tool = document.getElementsByClassName('bs-bars float-left');
            tool[0].innerHTML = ToolBarBasica;

            var Btn_Nuevo_Catalogo = document.getElementById('Btn_Nuevo_Catalogo');
            Btn_Nuevo_Catalogo.addEventListener("click", btnNuevoClick);
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}


function setOjos(_idRegistro) {


    try {

        var txt_oi = document.getElementById(`Txt_oi_${_idRegistro}`);
        var txt_od = document.getElementById(`Txt_od_${_idRegistro}`);


        var obj_filtros = Object();
        obj_filtros.idRegistro = _idRegistro
        obj_filtros.P_oi = txt_oi.value;
        obj_filtros.P_od = txt_od.value;

        var ruta = '../Services/WSAlumnos.asmx/setOjos';
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

                        fg_alert_aviso_exitoso('Registro','El registro se guardo exitosamente');
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
function setInactivarReactivar() {


    try {


        var obj_filtros = Object();
        obj_filtros.P_idMenu = Registro_ID_Seleccionado;

        var ruta = '../Services/WSAlumnos.asmx/SetInactivarReactivar';
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
                        fg_alert_aviso_exitoso('Usuarios', 'El registro se actualizo correctamente.');
                        getList();
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
function setLentesEntregados(_idRegistro) {


    try {

        var obj_filtros = Object();
        obj_filtros.idRegistro = _idRegistro

        var ruta = '../Services/WSAlumnos.asmx/SetLentesEntregados';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var btn = document.getElementById(`BtnChk_lentesEntregados_${_idRegistro}`);
        var icono_inicial = fg_Cambiar_Icono_DOM(btn, _SPINNER_);

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                fg_Cambiar_Icono_DOM(btn, icono_inicial);
                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    if (fg_resultOK(ds.Result)) {

                        fg_delete_tr_row(btn);
                    }
                    else {
                        fg_Cambiar_Icono_DOM(btn, icono_inicial);
                    }
                }
                else {

                    fg_Cambiar_Icono_DOM(btn, icono_inicial);
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                fg_Cambiar_Icono_DOM(btn, icono_inicial);
                fg_mensaje_problema_tecnico(error);
            }

        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function setEje(_idRegistro) {


    try {

        var txt = document.getElementById(`Txt_eje_${_idRegistro}`);

        var obj_filtros = Object();
        obj_filtros.idRegistro = _idRegistro
        obj_filtros.eje = txt.value;

        var ruta = '../Services/WSAlumnos.asmx/SetEje';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        //var btn = document.getElementById(`BtnChk_lentesEntregados_${_idRegistro}`);
        var btn = null;
        var icono_inicial = fg_Cambiar_Icono_DOM(btn, _SPINNER_);

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                //fg_Cambiar_Icono_DOM(btn, icono_inicial);
                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    if (fg_resultOK(ds.Result)) {
                        fg_alert_aviso_exitoso('Registro', 'El registro se guardo exitosamente');
                    }
                    else {
                        //fg_Cambiar_Icono_DOM(btn, icono_inicial);
                    }
                }
                else {

                    //fg_Cambiar_Icono_DOM(btn, icono_inicial);
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                //fg_Cambiar_Icono_DOM(btn, icono_inicial);
                fg_mensaje_problema_tecnico(error);
            }

        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}


function Cmb_idColegio_Filtro_Change() {

    try {
        getList();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}




/* ===== ===== ===== Estos se vinculan hasta que carga el grid del listado principal ===== ===== =====  */
function limpiarCaptura() {

    try {
        Registro_ID_Seleccionado = null;
        fg_limpiar_controles(PAGECONTROLS.controls.Card_Captura_Body.id);
        PAGECONTROLS.controls.tituloDetalle.innerHTML = `Nuevo registro`;

        fg_ChekedUnchecked(PAGECONTROLS.controls.BtnChk_rezagado, false);
        fg_ChekedUnchecked(PAGECONTROLS.controls.BtnChk_lentesEntregados, false);



        fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = false;

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnNuevoClick() {

    try {

        limpiarCaptura();
        
        fg_Abrir_Ventana(PAGECONTROLS.controls.Card_Captura);
        //PAGECONTROLS.controls.Cmb_idColegio.value = PAGECONTROLS.controls.Cmb_idColegio_Filtro.value;
        var idColegio = PAGECONTROLS.controls.Cmb_idColegio_Filtro.value;
        $('#Cmb_idColegio').val(idColegio); // Select the option with a value of '1'
        $('#Cmb_idColegio').trigger('change'); // Notify any JS components that the value changed
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnEditarClick(_ID) {

    try {

        PAGECONTROLS.controls.tituloDetalle.innerHTML = `Cargando... `;
        limpiarCaptura();

        Registro_ID_Seleccionado = _ID;

        getRegistroByID(_ID);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function getRegistroByID(_idRegistro) {


    try {

        var obj_filtros = Object();
        obj_filtros.idRegistro = _idRegistro

        var ruta = '../Services/WSAlumnos.asmx/GetRegistroByID';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var btn = document.getElementById(`BtnEdit_${_idRegistro}`);
        var icono_inicial = fg_Cambiar_Icono_DOM(btn, _SPINNER_);

        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                //fg_Cambiar_Icono_DOM(btn, icono_inicial);
                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    var row = ds.Registro[0];
                    fg_setDataControls(PAGECONTROLS.controls.Card_Captura_Body, row);
                    PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Dia.value = row.fechaNacPadre_dd
                    PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes.value = row.fechaNacPadre_MM
                    PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Anio.value = row.fechaNacPadre_yyyy


                    $('#Cmb_idColegio').val(row.idColegio); // Select the option with a value of '1'
                    $('#Cmb_idColegio').trigger('change'); // Notify any JS components that the value changed



                    PAGECONTROLS.controls.tituloDetalle.innerHTML = `Editando - ${row.nombreAlumno}`;

                    fg_Abrir_Ventana(PAGECONTROLS.controls.Card_Captura);

                    fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, row.activo == false);
                    PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = (row.activo == false);

                }
                else {

                    fg_Cambiar_Icono_DOM(btn, icono_inicial);
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {
                //fg_Cambiar_Icono_DOM(btn, icono_inicial);
                fg_mensaje_problema_tecnico(error);
            }

        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

function setRegistro() {


    try {

        if (fg_valida_captura_seccion(PAGECONTROLS.controls.Card_Captura_Body.id)) {

            var obj_filtros = Object();
            obj_filtros = fg_Get_Object_Control_Valor(PAGECONTROLS.controls.Card_Captura_Body.id);
            obj_filtros.P_idRegistro = Registro_ID_Seleccionado;
            obj_filtros.P_fechaNacPadre = PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Dia.value
                + '-' + PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes.value
                + '-' + PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Anio.value;

            obj_filtros.rezagado = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_rezagado) == 'SI';
            obj_filtros.lentesEntregados = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_lentesEntregados) == 'SI';


            var Btn_Guardar_Captura = document.getElementById('Btn_Guardar_Captura');
            var icono_inicial = fg_Cambiar_Icono_DOM(Btn_Guardar_Captura, _SPINNER_);
            var ruta = '../Services/WSAlumnos.asmx/SetRegistro';
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

                    fg_Cambiar_Icono_DOM(Btn_Guardar_Captura, icono_inicial);

                    var mensaje_servidor = JSON.parse(datos.d);

                    if (mensaje_servidor.Estatus == _OK_) {

                        fechaActual = mensaje_servidor.Str_Fecha_Actual;

                        var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                        if (fg_resultOK(ds.Result)) {

                            Registro_ID_Seleccionado = ds.Result[0].idGenerado;
                            fg_alert_aviso_exitoso('El registro se guardo exitosamente');
                            fg_mensaje_pregunta_nuevo_registro(`El registro se guardo existosamente. <br> ¿Desea capturar otra alumno?`, 'limpiarCaptura', 'btnCerrarClick');


                        }
                    }
                    else {
                        fg_mensaje_problema_tecnico(mensaje_servidor);
                    }

                }
                , error: function (error) {

                    fg_Cambiar_Icono_DOM(Btn_Guardar_Captura, icono_inicial);
                    fg_mensaje_problema_tecnico(error);
                }

            });

        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}
function setInactivarReactivar() {


    try {


        var obj_filtros = Object();
        obj_filtros.P_idRegistro = Registro_ID_Seleccionado;

        var ruta = '../Services/WSAlumnos.asmx/SetInactivarReactivar';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var btncancel = document.getElementById(`btnInactivarActivar`);
        var icono_inicial = fg_Cambiar_Icono_DOM(btncancel, _SPINNER_);


        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                fg_Cambiar_Icono_DOM(btncancel, icono_inicial);

                var mensaje_servidor = JSON.parse(datos.d);

                if (mensaje_servidor.Estatus == _OK_) {

                    fechaActual = mensaje_servidor.Str_Fecha_Actual;

                    var ds = JSON.parse(mensaje_servidor.Str_Respuesta_1);

                    if (fg_resultOK(ds.Result)) {
                        fg_alert_aviso_exitoso('Usuarios', 'El registro se actualizo correctamente.');
                        fg_delete_tr_row(btncancel);
                        
                    }

                }
                else {
                    fg_mensaje_problema_tecnico(mensaje_servidor);
                }

            }
            , error: function (error) {

                fg_Cambiar_Icono_DOM(btncancel, icono_inicial);
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}

function btnInactivarActivarClick(_ID) {

    try {
        var dt = $('#Grid_Listado').bootstrapTable('getData');
        var row = dt.filter(x => x.idRegistro == _ID)[0];

        var msg = `Usted esta indicando ${row.activo == true ? 'INACTIVAR' : 'REACTIVAR'} ${row.nombreAlumno}.`;
        Registro_ID_Seleccionado = row.idRegistro;
        fg_mensaje_pregunta(msg, 'setInactivarReactivar', null);

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}


function BtnChk_rezagado_Click() {

    try {
        fg_BtnChk_ChekClik(PAGECONTROLS.controls.BtnChk_rezagado);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function BtnChk_lentesEntregados_Click() {

    try {
        fg_BtnChk_ChekClik(PAGECONTROLS.controls.BtnChk_lentesEntregados);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

/* ===== ===== ===== Estos se vinculan en DOMContentLoaded ===== ===== =====  */
function btnGuardarClick() {

    try {
        setRegistro();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
function btnCerrarClick() {

    try {
        fg_Cerrar_Ventana_Abierta();
        getList();

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

