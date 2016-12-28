using Common.Utils.Nancy;
using DataServer.Logic;

namespace DataServer.Modules
{
    public class UserModule : BaseModule
    {
        public UserModule() : base("api/user")
        {
            Post["/login"] = _ =>
            {
                var ip = Request.UserHostAddress;

                var model = ValidateRequest<UserLoginRequest>();
                var response = UserLogic.Login(model);
                return this.Success(response, new TokenMetaData(new JwtToken().Encode(new UserJwtModel() {UserId = response.UserId}.ToJwtPayload())));
            };
            Post["/register"] = _ =>
            {
                var model = ValidateRequest<UserRegisterRequest>();
                var response = UserLogic.Register(model);
                return this.Success(response, new TokenMetaData(new JwtToken().Encode(new UserJwtModel() { UserId = response.UserId }.ToJwtPayload())));
            };
        }

    }
}