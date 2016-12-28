using System;
using System.Collections.Generic;
using System.Configuration;
using JWT;

namespace DataServer
{
    public class JwtToken
    {
        private int issued;
        private int exp;

        public JwtToken()
        {
            issued = (int) Math.Round((DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds);
            exp = (int) Math.Round((DateTime.UtcNow.AddMonths(1) - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds);
        }

        public string Encode(Dictionary<string, object> payload)
        {
            //fixed payload values
            payload.Add("iss", "http://acg.io");
            payload.Add("aud", "http://acg.io");
            payload.Add("iat", issued);
            payload.Add("exp", exp);
            var token = JsonWebToken.Encode(payload, ConfigurationManager.AppSettings["jwt:cryptkey"], JwtHashAlgorithm.HS256);
            return token;
        }
    }
}