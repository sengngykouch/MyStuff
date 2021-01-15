using System.IO;
using System.Threading.Tasks;

namespace AWSS3Lib.IAWS_S3
{
    public interface IAWSS3BucketHelper
    {
        Task<Stream> Get(string fileName);

        Task<bool> Add(Stream inputStream, string fileName);

        Task<bool> Update(Stream inputStrea, string fileName);

        Task<bool> Delete(string fileName);
    }
}