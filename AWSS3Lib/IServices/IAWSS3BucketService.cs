using System.IO;
using System.Threading.Tasks;

namespace AWSS3Lib.IServices
{
    public interface IAWSS3BucketService
    {
        Task<Stream> Get(string fileName);

        Task<string> Add(FileStream inputStream);

        Task<bool> Update(FileStream inputStream, string fileName);

        Task<bool> Delete(string fileName);
    }
}