using Microsoft.ApplicationBlocks.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


namespace optica.Data
{
    public class Alumnos
    {
        Cnxn cnxn = new Cnxn();

        /// <summary>
        /// Trae el listado inicial del catalogo
        /// y los catalogos fijos que se requieran en la captura
        /// </summary>
        /// <param name="_DyParametros"></param>
        /// <returns></returns>
        public DataSet GetInit(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "optica_getColegio";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Colegios";


            return ds;
        }

        /// <summary>
        /// Se trae el listado inicial del catalogo
        /// </summary>
        /// <param name="_DyParametros"></param>
        /// <returns></returns>
        public DataSet GetList(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "optica_getAlumnos";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Alumnos";

            return ds;
        }

        /// <summary>
        /// Se encarga de hacer Insert y Update
        /// </summary>
        /// <param name="_DyParametros"></param>
        /// <returns></returns>
        public DataSet SetRegistro(Dictionary<string, object> _DyParametros)
        {
            DataSet ds = new DataSet();
            string spname = "optica_setValoresOjos";
            Dictionary<string, object> dyparametros = cnxn.SetFormatDyDatos(_DyParametros, spname);
            SqlParameter[] sqlparameters = cnxn.getSQLParameters(dyparametros);

            ds = SqlHelper.ExecuteDataset(Cnxn.sCon, spname, sqlparameters);

            ds.Tables[0].TableName = "Result";

            return ds;
        }



    }
}