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
                <div class="col-sm-12 col-md-5 col-lg-4">
                    <div class="input-group d-flex align-items-center">
                        <label for="Cmb_idColegio" class="mr-2">*Colegio</label>
                        <select class="form-control" id="Cmb_idColegio" onchange="Cmb_idColegio_Change();" ></select>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3 col-lg-2">
                    <button id="BtnExportar" type="button" class="btn btn-primary" onclick="BtnExportarClick();">Exportar</button>
                </div>

            </div>


            <div class="card-body">
                <table id="Grid_Listado" data-toolbar="#toolbar" data-search="true" data-advanced-search="true" data-id-table="advancedTable"  class="table table-striped table-sm"></table>
            </div>
        </div>

        <div id="Card_Captura" class="card" style="display: none;">
            <div class="card-title">
                <h4 id="tituloDetalle">Nuevo Horario</h4>
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
