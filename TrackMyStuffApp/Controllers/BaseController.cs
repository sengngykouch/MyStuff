using EFDataAccessLib.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

/*****************************************************
    BaseController allow us to inject DBContext Once. 
    Any child classes will automatically have DBContext.

 ******************************************************/

namespace TrackMyStuff.Controllers
{
    public class BaseController : ControllerBase
    {
        protected TrackMyStuffDBContext _dbContext => (TrackMyStuffDBContext)HttpContext.RequestServices.GetService(typeof(TrackMyStuffDBContext));
    }
}
