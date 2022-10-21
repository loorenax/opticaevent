using optica.Data;
using LitJson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;


namespace optica.Services
{
    /// <summary>
    /// Summary description for WSAlumnos
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WSAlumnos : System.Web.Services.WebService
    {
        Alumnos dat = new Alumnos();

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetInit(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.GetInit(obj_parametros);

                ms.Str_Respuesta_1 = JsonConvert.SerializeObject(ds);
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string GetList(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.GetList(obj_parametros);

                ms.Str_Respuesta_1 = JsonConvert.SerializeObject(ds);
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string ExportList(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.GetList(obj_parametros);

                ds.Tables["Alumnos"].Columns.Remove("idRegistro");
                ds.Tables["Alumnos"].Columns.Remove("idColegio");
                ds.Tables["Alumnos"].Columns.Remove("fechaNacPadre");
                ds.Tables["Alumnos"].Columns["str_fechaNacPadre"].ColumnName = "FechaNacPadre";

                string nombreReporte =  Utils.Crear_Excel_V2(ds.Tables["Alumnos"], "Alumnos");

                ms.Str_Respuesta_1 = nombreReporte;
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SetRegistro(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetRegistro(obj_parametros);

                ms.Str_Respuesta_1 = JsonConvert.SerializeObject(ds);
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SetLentesEntregados(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetLentesEntregados(obj_parametros);

                ms.Str_Respuesta_1 = JsonConvert.SerializeObject(ds);
                ms.Estatus = Utils._OK_;
            }
            catch (Exception Ex)
            {
                ms.Estatus = Utils._ERROR_;
                ms.Mensaje = Ex.Message;
                Utils.problems(Ex);
            }
            finally
            {
                Json_Resultado = JsonMapper.ToJson(ms);
            }

            return Json_Resultado;
        }


    }
}
