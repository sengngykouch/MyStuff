using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace AWSS3Lib.IServices
{
    public interface IAWSS3BucketService
    {
        Task<Stream> Get(string fileName);

        Task<string> Add(IFormFile inputStream);

        Task<bool> Update(IFormFile inputStream, string fileName);

        Task<bool> Delete(string fileName);
    }
}