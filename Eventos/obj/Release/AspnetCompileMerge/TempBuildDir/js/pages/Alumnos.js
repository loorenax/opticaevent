var PAGECONTROLS;

/** Se crea un objecto que trae todos los catalogos fijos que se requieran en la captura */
var Ds = new Object();
var Contenedor_Principal_ID = 'contenedorPrincipal';
var MI_Titulo_Pagina = 'Horarios de Academias';
var Registro_ID_Seleccionado = null;
var ToolBarBasica = ``;
var fechaActual;


document.addEventListener('DOMContentLoaded', function () {


    try {
        
        PAGECONTROLS = fg_setIFRAMEControls(Contenedor_Principal_ID);
        fg_setTitlePagina();

        //PAGECONTROLS.controls.Card_Captura.style.display = 'block';
        //PAGECONTROLS.controls.Card_Captura.style.display = 'none';
        //fg_Agregar_Ventana_Abierta(PAGECONTROLS.controls.Card_Listado);


        getInit();


        //PAGECONTROLS.controls.Btn_Guardar_Captura.addEventListener('click', btnGuardarClick);

        //PAGECONTROLS.controls.Btn_Cerrar_Captura.addEventListener('click', btnCerrarClick);
        //PAGECONTROLS.controls.Btn_Close_Captura.addEventListener('click', btnCerrarClick);


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
        obj_filtros.P_idColegio = PAGECONTROLS.controls.Cmb_idColegio.value;


        var ruta = '../Services/WSAlumnos.asmx/GetList';
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
        obj_filtros.P_idColegio = PAGECONTROLS.controls.Cmb_idColegio.value;


        var ruta = '../Services/WSAlumnos.asmx/ExportList';
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

        columnas.push({
            field: 'oi', title: 'OI', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag = `
                           <input type="text" class="form-control" id="Txt_oi_${row.idRegistro}" value="${row.oi}" onchange="setOjos(${row.idRegistro});"  maxlength="3" placeholder="OI" autocomplete="off" style="text-align:center;"/>
                          `;

                return tag;
            }
        });
        columnas.push({
            field: 'od', title: 'OD', visible: true, sortable: true, width: '100', clickToSelect: false, align: 'center'
            , formatter: function (value, row, key) {

                var tag = `
                           <input type="text" class="form-control" id="Txt_od_${row.idRegistro}" value="${row.od}" onchange="setOjos(${row.idRegistro});" maxlength="3" placeholder="OD" autocomplete="off" style="text-align:center;"/>
                          `;

                return tag;
            }
        });

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

        //ToolBarBasica = `
        //            <div class="btn-group mk-btn-group" role="group" aria-label="Basic example">
        //              ${EV_BTN_NUEVO_}
        //            </div>
        //            `;

        //var tool = document.getElementsByClassName('bs-bars float-left');
        //tool[0].innerHTML = ToolBarBasica;

        //var Btn_Nuevo_Catalogo = document.getElementById('Btn_Nuevo_Catalogo');
        //Btn_Nuevo_Catalogo.addEventListener("click", btnNuevoClick);

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


function Cmb_idColegio_Change() {

    try {
        getList();
    }
    catch (e) {
        fg_mensaje_problema_tecnico(e);
    }

}
