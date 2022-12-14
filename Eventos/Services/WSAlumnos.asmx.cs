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

                if(ds.Tables["Alumnos"].Columns.Contains("idRegistro"))
                    ds.Tables["Alumnos"].Columns.Remove("idRegistro");
                if (ds.Tables["Alumnos"].Columns.Contains("idColegio"))
                    ds.Tables["Alumnos"].Columns.Remove("idColegio");
                if (ds.Tables["Alumnos"].Columns.Contains("idPadecimiento"))
                    ds.Tables["Alumnos"].Columns.Remove("idPadecimiento");
                if (ds.Tables["Alumnos"].Columns.Contains("activo"))
                    ds.Tables["Alumnos"].Columns.Remove("activo");
                if (ds.Tables["Alumnos"].Columns.Contains("fechaNacPadre"))
                    ds.Tables["Alumnos"].Columns.Remove("fechaNacPadre");

                if (ds.Tables["Alumnos"].Columns.Contains("str_Fecha_Registro"))
                    ds.Tables["Alumnos"].Columns.Remove("str_Fecha_Registro");
                if (ds.Tables["Alumnos"].Columns.Contains("str_FechaUltimoCambio"))
                    ds.Tables["Alumnos"].Columns.Remove("str_FechaUltimoCambio");
                if (ds.Tables["Alumnos"].Columns.Contains("costoLentes"))
                    ds.Tables["Alumnos"].Columns.Remove("costoLentes");


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
        public string setRegistro(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.setRegistro(obj_parametros);

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
        public string setOjos(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.setOjos(obj_parametros);

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
        public string GetRegistroByID(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.GetRegistroByID(obj_parametros);

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

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string SetEje(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetEje(obj_parametros);

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
        public string SetCostoLentes(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetCostoLentes(obj_parametros);

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
        public string SetPadecimiento(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetPadecimiento(obj_parametros);

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
        public string SetLentesEntregadosByColegio(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetLentesEntregadosByColegio(obj_parametros);

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
        public string SetInactivarReactivar(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetInactivarReactivar(obj_parametros);

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
        public string SetCheckBit(string Parametros)
        {
            string Json_Resultado = string.Empty;
            MensajeServidor ms = new MensajeServidor();

            try
            {
                JavaScriptSerializer deserializar_json = new JavaScriptSerializer();
                Dictionary<string, object> obj_parametros = deserializar_json.Deserialize<Dictionary<string, object>>(Parametros);
                DataSet ds = dat.SetCheckBit(obj_parametros);

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
