using AWSS3Lib.IAWS_S3;
using AWSS3Lib.IServices;
using System;
using System.IO;
using System.Threading.Tasks;

namespace AWSS3Lib.Services
{
    public class AWSS3BucketService : IAWSS3BucketService
    {
        private readonly IAWSS3BucketHelper _AWSS3BucketHelper;

        public AWSS3BucketService(IAWSS3BucketHelper AWSS3BucketHelper)
        {
            _AWSS3BucketHelper = AWSS3BucketHelper;
        }

        public async Task<Stream> Get(string fileName)
        {
            try
            {
                return await _AWSS3BucketHelper.Get(fileName);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<string> Add(FileStream fileStream)
        {
            try
            {
                var fileExtension = Path.GetExtension(fileStream.Name);
                var fileName = $"{DateTime.Now.Ticks}{fileExtension}";

                var result = await _AWSS3BucketHelper.Add(fileStream, fileName);

                if (result)
                {
                    return fileName;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Update(FileStream inputStream, string fileName)
        {
            try
            {
                return await _AWSS3BucketHelper.Update(inputStream, fileName);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Delete(string fileName)
        {
            try
            {
                return await _AWSS3BucketHelper.Delete(fileName);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}