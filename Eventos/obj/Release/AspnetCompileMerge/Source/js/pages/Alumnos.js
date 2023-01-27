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
var DtPadecimientos;
var DtAlumnos;
var DtColegiosFiltro;
var DtColegios;
var idUltimoColegioCapturado;

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
                                        ${fg_Template_TextBox_Form_Group('nombreAlumno', '', 'Nombre completo del alumno', ``)}
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

                                <div class="row">
                                    <div class="col-sm-12 col-md-2 col-lg-1">
                                        <div class="form-group">
                                            <label for="Txt_folioRegistro">Folio Registro</label>
                                            <div class="d-flex justify-content-between">
                                                <input type="text" class="form-control" id="Txt_str_registroPasado" value="" autocomplete="off" style="text-align:center;width:50px;" readonly>
                                                <input type="number" class="form-control" id="Txt_folioRegistro" value="" autocomplete="off" style="text-align:center;width:auto;">
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>


                        <div class="card mk-card-seccion">
                            <div class="card-title mk-card-title">Datos de la persona que autoriza</div>
                            <div class="card-body pl-4">

                                <div class="row mt-4 mb-2 ">
                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('nombrePadre', '', 'Primer Nombre', ``)}
                                    </div>
                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('segundoNombrePadre', '', 'Segundo Nombre (en caso de tener)', ``)}
                                    </div>

                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('apellidoPaternoPadre', '', 'Ap. Paterno', ` `)}
                                    </div>
                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('apellidoMaternoPadre', '', 'Ap. Materno', ``)}
                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-4">
                                        ${fg_Template_Fecha_Nacimiento()}
                                    </div>

                                    <div class="col-sm-4 col-md-4 col-lg-2">
                                        ${fg_Template_TextBox_Form_Group('telefonoContacto', '', 'Teléfono de contacto', ``)}
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
                                    <div class="col-sm-12 col-md-6 col-lg-6 p-5">

                                        <div class="card mk-card-grupo">
                                            <div class="card-title ">Ojo Derecho</div>
                                            <div class="card-body pl-4">

                                                <div class="row mb-2">
                                                    <div class="col-sm-4 col-md-2 col-lg-1">
                                                        ${fg_Template_TextBox_Form_Group('od', '', 'OD', ` maxlength="10" `)}
                                                    </div>

                                                    <div class="col-sm-6 col-md-5 col-lg-5">
                                                        ${fg_Template_TextBox_Form_Group('odESF', '', 'ESF', ` maxlength="100" `)}
                                                    </div>
                                                    <div class="col-sm-6 col-md-5 col-lg-5">
                                                        ${fg_Template_TextBox_Form_Group('odCIL', '', 'CIL', ` maxlength="100" `)}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>

                                    <div class="col-sm-12 col-md-6 col-lg-6 p-5">

                                        <div class="card mk-card-grupo">
                                            <div class="card-title">Ojo Izquierdo</div>
                                            <div class="card-body pl-4">

                                                <div class="row mb-2">
                                                    <div class="col-sm-4 col-md-2 col-lg-1">
                                                        ${fg_Template_TextBox_Form_Group('oi', '', 'OI', ` maxlength="10" `)}
                                                    </div>
                                                    <div class="col-sm-6 col-md-5 col-lg-5">
                                                        ${fg_Template_TextBox_Form_Group('oiESF', '', 'ESF', ` maxlength="100" `)}
                                                    </div>
                                                    <div class="col-sm-6 col-md-5 col-lg-5">
                                                        ${fg_Template_TextBox_Form_Group('oiCIL', '', 'CIL', ` maxlength="100" `)}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>

                                </div>


                                <div class="row mt-4 mb-2">
                                    <div class="col-sm-4 col-md-2 col-lg-1">
                                        ${fg_Template_TextBox_Form_Group('eje', '', 'Eje', ` maxlength="10" `)}
                                    </div>

                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_BtnChk_Form_Group('sinDetalle', false, 'Sin Detalle', ' onclick="BtnChk_Padecimiento_Click(this);"')}
                                    </div>
                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_BtnChk_Form_Group('miopia', false, 'Miopía', ' onclick="BtnChk_Padecimiento_Click(this);"')}
                                    </div>
                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_BtnChk_Form_Group('astigmatismo', false, 'Astigmatismo', ' onclick="BtnChk_Padecimiento_Click(this);"')}
                                    </div>
                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_BtnChk_Form_Group('hipermetropia', false, 'Hipermetropía', ' onclick="BtnChk_Padecimiento_Click(this);"')}
                                    </div>
                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_BtnChk_Form_Group('casoEspecial', false, 'Caso especial', ' onclick="BtnChk_Padecimiento_Click(this);"')}
                                    </div>

                                </div>


                                <div class="row mt-4 mb-2">
                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_BtnChk_Form_Group('lentesEntregados', false, 'Lente Entregado', ' onclick="BtnChk_lentesEntregados_Click();"')}
                                    </div>

                                    <div class="col-sm-6 col-md-3 col-lg-2 text-center">
                                        ${fg_Template_TextBoxNum_Form_Group('folioBeneficiario', false, 'Folio de Beneficiario', '')}
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

                    if (TipoProceso == 'Alumnos') {
                        DtColegiosFiltro = ds.ColegiosFiltro;
                        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idColegio_Filtro, 'idColegio', 'NOMBRECT', ds.ColegiosFiltro, false);
                    }
                    else {
                        fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idColegio_Filtro, 'idColegio', 'NOMBRECT', ds.ColegiosFiltroLentesEntregados, false);
                    }

                    DtColegios = ds.Colegios;
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
function getList(_Btn) {


    try {


        var obj_filtros = Object();
        obj_filtros.P_idColegio = PAGECONTROLS.controls.Cmb_idColegio_Filtro.value;
        obj_filtros.P_lentesEntregados = (TipoProceso == 'Alumnos' ? false : true);

        var ruta = '../Services/WSAlumnos.asmx/GetList';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var columnas = [], datas = [];
        Control_Grid_Activo = '#Grid_Listado';

        $(Control_Grid_Activo).bootstrapTable('destroy');


        var btnactivo = _Btn;
        var iconoInicial = fg_Cambiar_Icono_DOM(btnactivo, _SPINNER_);


        $.ajax({
            type: 'POST',
            url: ruta,
            data: $data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            cache: false,
            success: function (datos) {

                fg_Cambiar_Icono_DOM(btnactivo, iconoInicial);

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

                fg_Cambiar_Icono_DOM(btnactivo, iconoInicial);
                fg_mensaje_problema_tecnico(error);
            }
        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}


function BtnRecargarClick() {
    getList(PAGECONTROLS.controls.BtnRecargar);
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
        }
        columnas.push({
            field: 'folioRegistro', title: 'Folio Registro', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left', filterControl: 'input'
        });

        columnas.push({
            field: 'folioBeneficiario', title: 'Folio Beneficiario', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left', filterControl: 'input'
        });


        if (TipoProceso == 'Alumnos') {

            columnas.push({
                field: 'od', title: 'OD', visible: true, sortable: true, width: '300', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_od_${row.idRegistro}" value="${row.od}" onchange="setOjos(${row.idRegistro});" maxlength="10" placeholder="OD" autocomplete="off" style="text-align:center;width:120px;"/>
                          `;

                    return tag;
                }
            });

            columnas.push({
                field: 'odESF', title: 'ESF', visible: true, sortable: true, width: '300', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_odESF_${row.idRegistro}" value="${row.odESF}" onchange="setOjos(${row.idRegistro});" maxlength="100" placeholder="OD ESF" autocomplete="off" style="text-align:center;width:120px;"/>
                          `;

                    return tag;
                }
            });

            columnas.push({
                field: 'odCIL', title: 'CIL', visible: true, sortable: true, width: '300', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_odCIL_${row.idRegistro}" value="${row.odCIL}" onchange="setOjos(${row.idRegistro});" maxlength="100" placeholder="OD CIL" autocomplete="off" style="text-align:center;width:120px;"/>
                          `;

                    return tag;
                }
            });



            columnas.push({
                field: 'oi', title: 'OI', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_oi_${row.idRegistro}" value="${row.oi}" onchange="setOjos(${row.idRegistro});"  maxlength="10" placeholder="OI" autocomplete="off" style="text-align:center;width:120px;"/>
                          `;

                    return tag;
                }
            });

            columnas.push({
                field: 'oiESF', title: 'ESF', visible: true, sortable: true, width: '300', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_oiESF_${row.idRegistro}" value="${row.oiESF}" onchange="setOjos(${row.idRegistro});" maxlength="100" placeholder="OD ESF" autocomplete="off" style="text-align:center;width:120px;"/>
                          `;

                    return tag;
                }
            });

            columnas.push({
                field: 'oiCIL', title: 'CIL', visible: true, sortable: true, width: '300', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_oiCIL_${row.idRegistro}" value="${row.oiCIL}" onchange="setOjos(${row.idRegistro});" maxlength="100" placeholder="OD CIL" autocomplete="off" style="text-align:center;width:120px;"/>
                          `;

                    return tag;
                }
            });







            columnas.push({
                field: 'eje', title: 'Eje', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = `
                           <input type="text" class="form-control" id="Txt_eje_${row.idRegistro}" value="${row.eje}" onchange="setEje(${row.idRegistro});"  maxlength="10" placeholder="Eje" autocomplete="off" style="text-align:center;width:120px;"/>
                          `;

                    return tag;
                }
            });

            columnas.push({
                field: 'lentesEntregados', title: 'Lente Entregado', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = fg_Template_BtnChk_Form_Sin_Etiqueta(`lentesEntregados_${row.idRegistro}`, row.Lente_Entregado, `onclick="setLentesEntregados(${row.idRegistro})"`);

                    return tag;
                }
            });
            //columnas.push({
            //    field: 'costoLentes', title: 'Costo Lentes', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'center'
            //    , formatter: function (value, row, key) {

            //        var tag = `
            //               <input type="number" class="form-control" id="Txt_costoLentes_${row.idRegistro}" value="${row.costoLentes}" onchange="setcostoLentes(${row.idRegistro});" maxlength="10" placeholder="Costo" autocomplete="off" style="text-align:center;width:120px;"/>
            //              `;
            //        return tag;
            //    }
            //});


            // ------------ PADECIMIENTOS ---------------
            columnas.push({
                field: 'sinDetalle', title: 'Sin Detalle', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = fg_Template_BtnChk_Form_Sin_Etiqueta(`sinDetalle_${row.idRegistro}`, row.sinDetalle, `onclick="setCheckBit('sinDetalle', ${row.idRegistro})"`);

                    return tag;
                }
            });
            columnas.push({
                field: 'miopia', title: 'Miopía', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = fg_Template_BtnChk_Form_Sin_Etiqueta(`miopia_${row.idRegistro}`, row.miopia, `onclick="setCheckBit('miopia', ${row.idRegistro})"`);

                    return tag;
                }
            });
            columnas.push({
                field: 'astigmatismo', title: 'Astigmatismo', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = fg_Template_BtnChk_Form_Sin_Etiqueta(`astigmatismo_${row.idRegistro}`, row.astigmatismo, `onclick="setCheckBit('astigmatismo', ${row.idRegistro})"`);

                    return tag;
                }
            });
            columnas.push({
                field: 'hipermetropia', title: 'Hipermetropia', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', searchable: true, filterControl: 'input', searchFormatter:false
                , formatter: function (value, row, key) {

                    var tag = fg_Template_BtnChk_Form_Sin_Etiqueta(`hipermetropia_${row.idRegistro}`, row.hipermetropia, `onclick="setCheckBit('hipermetropia', ${row.idRegistro})"`);
                    return tag;
                }
            });
            columnas.push({
                field: 'casoEspecial', title: 'Caso Especial', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    var tag = fg_Template_BtnChk_Form_Sin_Etiqueta(`casoEspecial_${row.idRegistro}`, row.casoEspecial, `onclick="setCheckBit('casoEspecial', ${row.idRegistro})"`);

                    return tag;
                }
            });

        }
        else {
            columnas.push({
                field: 'od', title: 'OD', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input'
            });
            columnas.push({
                field: 'oi', title: 'OI', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input'
            });
            columnas.push({
                field: 'eje', title: 'Eje', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input'
            });

            columnas.push({
                field: 'lentesEntregados', title: 'Lente Entregado', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', filterControl: 'input', searchFormatter: false
                , formatter: function (value, row, key) {

                    return (row.lentesEntregados ? 'SI' : 'NO');
                }

            });

        }


        columnas.push({
            field: 'nombreAlumno', title: 'Nombre del alumno', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left', filterControl: 'input', searchFormatter: false
            , formatter: function (value, row, key) {

                var tag = `<div class="mk-td-block">${row.nombreAlumno}</div>`;
                return tag;
            }
        });
        columnas.push({
            field: 'nombreCompletoPadre', title: 'Nombre del padre o tutor', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left', filterControl: 'input'
        });
        columnas.push({
            field: 'fechaNacPadre', title: 'Fecha de Nacimiento', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'right', filterControl: 'input', searchFormatter: false
            , formatter: function (value, row, key) {

                return row.str_fechaNacPadre;
            }
        });
        columnas.push({
            field: 'telefonoContacto', title: 'Teléfono', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'right', filterControl: 'input'
        });
        columnas.push({
            field: 'autorizaPrueba', title: 'Autorizó Prueba', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center', searchable: true, filterControl: 'input'
            , formatter: function (value, row, key) {

                return (row.autorizaPrueba ? 'SI' : 'NO');
            }

        });
        columnas.push({
            field: 'fechaCreoRegistro', title: 'Fecha Crea Registro', visible: true, sortable: true, width: '300', clickToSelect: false, align: 'right', filterControl: 'input'
            , formatter: function (value, row, key) {

                var tag = `<div class="mk-td-block">${row.str_Fecha_Registro}</div>`;
                return tag;
            }
        });
        columnas.push({
            field: 'usuarioCreo', title: 'Usuario Creo', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left', filterControl: 'input'
        });
        columnas.push({
            field: 'fechaUltimoCambio', title: 'Fecha Ult. Modificación', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'right', filterControl: 'input'
            , formatter: function (value, row, key) {

                var tag = `<div class="mk-td-block">${row.str_FechaUltimoCambio}</div>`;
                return tag;
            }
        });
        columnas.push({
            field: 'usuarioModifico', title: 'Usuario Modificó', visible: true, sortable: true, width: '200', clickToSelect: false, align: 'left', filterControl: 'input'
        });


        /*
        columnas.push(fg_Col_Grid_fechaUltimoCambio());
        columnas.push(fg_Col_Grid_fechaCreoRegistro());
        columnas.push(fg_Col_Grid_Activo());
        */
        var alto = fg_redimensionarGridPrincipal();
        $(Control_Grid_Activo).bootstrapTable({
            /*height: alto,*/
            cache: false,
            striped: true,
            pagination: true,
            smartDysplay: true,
            search: false,
            /*advancedSearch: true,*/
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

            //_Dt.forEach(x => {
            //    var cmb = document.getElementById(`Cmb_idPadecimiento_${x.idRegistro}`);
            //    if (cmb != null) {
            //        fg_cargar_combo_from_List(cmb, 'idPadecimiento', 'padecimiento', DtPadecimientos, true);

            //        if (x.idPadecimiento != null) {
            //            cmb.value = x.idPadecimiento;
            //        }
            //        else {
            //            cmb.value = '';
            //        }
                    
            //    }
            //});
        }

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}


function setOjos(_idRegistro) {


    try {

        var txt_oi = document.getElementById(`Txt_oi_${_idRegistro}`);
        var txt_oiESF = document.getElementById(`Txt_oiESF_${_idRegistro}`);
        var txt_oiCIL = document.getElementById(`Txt_oiCIL_${_idRegistro}`);


        var txt_od = document.getElementById(`Txt_od_${_idRegistro}`);
        var txt_odESF = document.getElementById(`Txt_odESF_${_idRegistro}`);
        var txt_odCIL = document.getElementById(`Txt_odCIL_${_idRegistro}`);



        var obj_filtros = Object();
        obj_filtros.idRegistro = _idRegistro;

        obj_filtros.P_oi = txt_oi.value;
        obj_filtros.P_oiESF = txt_oiESF.value;
        obj_filtros.P_oiCIL = txt_oiCIL.value


        obj_filtros.P_od = txt_od.value;
        obj_filtros.P_odESF = txt_odESF.value;
        obj_filtros.P_odCIL = txt_odCIL.value


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
function setcostoLentes(_idRegistro) {


    try {

        var txt = document.getElementById(`Txt_costoLentes_${_idRegistro}`);

        var obj_filtros = Object();
        obj_filtros.idRegistro = _idRegistro
        obj_filtros.costoLentes = txt.value;

        var ruta = '../Services/WSAlumnos.asmx/SetCostoLentes';
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
function setPadecimiento(_idRegistro) {


    try {

        var cmb = document.getElementById(`Cmb_idPadecimiento_${_idRegistro}`);
        cmb.disabled = true;

        var obj_filtros = Object();
        obj_filtros.idRegistro = _idRegistro
        obj_filtros.idPadecimiento = cmb.value;

        var ruta = '../Services/WSAlumnos.asmx/SetPadecimiento';
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
                cmb.disabled = false;
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
                cmb.disabled = false;
                //fg_Cambiar_Icono_DOM(btn, icono_inicial);
                fg_mensaje_problema_tecnico(error);
            }

        });

    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }
}


function setCheckBit(_Campo, _idRegistro) {


    try {

        var obj_filtros = Object();
        obj_filtros.Campo = _Campo;
        obj_filtros.idRegistro = _idRegistro;

        var ruta = '../Services/WSAlumnos.asmx/SetCheckBit';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var btn = document.getElementById(`BtnChk_${_Campo}_${_idRegistro}`);
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

                        fg_BtnChk_ChekClik(btn);
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

        PAGECONTROLS.controls.Txt_str_registroPasado.hidden = true;

        fg_disable_controls_group(PAGECONTROLS.controls.Card_Captura_Body, false);
        PAGECONTROLS.controls.Btn_Guardar_Captura.disabled = false;

        var idColegio = PAGECONTROLS.controls.Cmb_idColegio_Filtro.value;
        $('#Cmb_idColegio').val(idColegio); // Select the option with a value of '1'
        $('#Cmb_idColegio').trigger('change'); // Notify any JS components that the value changed

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

                    PAGECONTROLS.controls.Txt_str_registroPasado.hidden = !(row.str_registroPasado == 'P');

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
            if (
                !fg_isEmptyOrNull(PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Dia.value)
                && !fg_isEmptyOrNull(PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes.value)
                && !fg_isEmptyOrNull(PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Anio.value)
            ) {
                obj_filtros.P_fechaNacPadre = PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Dia.value
                    + '-' + PAGECONTROLS.controls.Cmb_Fecha_Nacimiento_Mes.value
                    + '-' + PAGECONTROLS.controls.Txt_Fecha_Nacimiento_Anio.value;

            }


            obj_filtros.rezagado = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_rezagado) == 'SI';
            obj_filtros.lentesEntregados = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_lentesEntregados) == 'SI';

            obj_filtros.sinDetalle = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_sinDetalle) == 'SI';
            obj_filtros.miopia = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_miopia) == 'SI';
            obj_filtros.astigmatismo = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_astigmatismo) == 'SI';
            obj_filtros.hipermetropia = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_hipermetropia) == 'SI';
            obj_filtros.casoEspecial = fg_BtnChk_Get_Value(PAGECONTROLS.controls.BtnChk_casoEspecial) == 'SI';


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

                            idUltimoColegioCapturado = obj_filtros.idColegio;

                            var buscaColegio = DtColegiosFiltro.filter(x => x.idColegio == idUltimoColegioCapturado);
                            if (buscaColegio.length == 0) {

                                var colegioSeleccionado = DtColegios.filter(x => x.idColegio == idUltimoColegioCapturado);

                                DtColegiosFiltro.push(colegioSeleccionado[0]);
                            }


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
function BtnChk_Padecimiento_Click(_Btn) {

    try {
        fg_BtnChk_ChekClik(_Btn);
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

function setLentesEntregadosByColegio() {


    try {

        var obj_filtros = Object();
        obj_filtros.idColegio = PAGECONTROLS.controls.Cmb_idColegio_Filtro.value;

        var ruta = '../Services/WSAlumnos.asmx/SetLentesEntregadosByColegio';
        var $data = JSON.stringify({ 'Parametros': JSON.stringify(obj_filtros) });

        var btn = document.getElementById(`BtnEntregarLentesMasivo`);
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
                        fg_alert_aviso_exitoso('Lentes Entregados', `Se actualizarón ${ds.Result[0].registrosActualizados}`);
                        getList();
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
function BtnEntregarLentesMasivoClick() {

    try {
        var colegio = PAGECONTROLS.controls.Cmb_idColegio_Filtro.options[PAGECONTROLS.controls.Cmb_idColegio_Filtro.selectedIndex].text;
        var msg = `Usted está indicando marcar la entrega de lentes de todos los alumnos del colegio: ${colegio}`;
        fg_mensaje_pregunta(msg, 'setLentesEntregadosByColegio', null);
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

        if (idUltimoColegioCapturado != null) {
            fg_cargar_combo_from_List(PAGECONTROLS.controls.Cmb_idColegio_Filtro, 'idColegio', 'NOMBRECT', DtColegiosFiltro, false);
            $('#Cmb_idColegio_Filtro').val(idUltimoColegioCapturado); // Select the option with a value of '1'
            $('#Cmb_idColegio_Filtro').trigger('change'); // Notify any JS components that the value changed
            getList();
        }

        idUltimoColegioCapturado = null;

        fg_Cerrar_Ventana_Abierta();


    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}

