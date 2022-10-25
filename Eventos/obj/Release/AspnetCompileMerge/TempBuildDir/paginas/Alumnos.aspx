<%@ Page Title="" Language="C#" MasterPageFile="~/paginas/SiteMaster.Master" AutoEventWireup="true" CodeBehind="Alumnos.aspx.cs" Inherits="optica.paginas.Alumnos" %>
<%@ Import Namespace="optica.Data" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../js/pages/Alumnos.js?<% = Sezzion.codigoSession %>"></script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="contenedorPrincipal" class="container-fluid mk-height-full">
        <div hidden>
            <a id="Btn_Descargar_Reporte_Excel_Generado" href="#" target="_blank"></a>
        </div>
        <div id="Card_Listado" class="card">
            <div class="card-title">
                <h4>Cargando...</h4>
                
            </div>
            
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-5">
                    <div class="input-group d-flex align-items-center">
                        <label for="Cmb_idColegio_Filtro" class="mr-2">*Colegio</label>
                        <select class="form-control" id="Cmb_idColegio_Filtro" onchange="Cmb_idColegio_Filtro_Change();" ></select>
                    </div>
                </div>
                <div class="col-sm-12 col-md-5 col-lg-4 d-flex align-items-end">
                    <button id="BtnExportar" type="button" class="btn btn-primary" onclick="BtnExportarClick();">Exportar Colegio Seleccionado</button>
                    <button id="BtnEntregarLentesMasivo" type="button" class="btn btn-danger ml-2" onclick="BtnEntregarLentesMasivoClick();">Marcar Entrega de Lentes</button>
                </div>
                <div class="col-sm-12 col-md-2 col-lg-3 d-flex align-items-end justify-content-end">
                    <button id="BtnExportarTodo" type="button" class="btn btn-primary" onclick="BtnExportarClickTodo();">Exportar Total de Registros</button>
                </div>

            </div>


            <div class="card-body">
                <table id="Grid_Listado" data-toolbar="#toolbar" data-search="true" data-advanced-search="true" data-id-table="advancedTable"  class="table table-striped table-sm"></table>
            </div>
        </div>

        <div id="Card_Captura" class="card" style="display:none;">
            <div class="card-title">
                <h4 id="tituloDetalle">Cargando...</h4>
                <button id="Btn_Close_Captura" type="button" class="btn bg-transparent float-right"><i class="fa fa-times"></i></button>
            </div>
            <div id="Card_Captura_Body" class="card-body">
                <%-- setTemplateCaptura en el JS --%>
            </div>

            <div class="card-footer bg-transparent mb-2">
                <div class="btn-group float-right">
                    <button id="Btn_Cerrar_Captura" type="button" class="btn btn-secondary"><i class="fa fa-times"></i>Cerrar</button>
                    <button id="Btn_Guardar_Captura" type="button" class="btn btn-primary"><i class="fa fa-save"></i>Guardar</button>
                </div>
            </div>
        </div>

        <!-- /# card -->


        <div id="Seccion_Modales"></div>
       


    </div>
</asp:Content>
