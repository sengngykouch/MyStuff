using Amazon.S3;
using AWSS3Lib.IAWS_S3;
using AWSS3Lib.IServices;
using Microsoft.AspNetCore.Http;
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
                if (string.IsNullOrEmpty(fileName))
                {
                    throw new ArgumentNullException("FileName must not be null.");
                }

                return await _AWSS3BucketHelper.Get(fileName);
            }
            catch (AmazonS3Exception)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<string> Add(IFormFile fileStream)
        {
            try
            {
                if (fileStream == null)
                {
                    throw new ArgumentNullException("FormFile must not be null.");
                }

                var fileExtension = Path.GetExtension(fileStream.FileName);
                var fileName = $"{DateTime.Now.Ticks}{fileExtension}";

                var result = await _AWSS3BucketHelper.Add(fileStream.OpenReadStream(), fileName);

                if (result)
                {
                    return fileName;
                }
                else
                {
                    return null;
                }
            }
            catch (AmazonS3Exception)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Update(IFormFile inputStream, string fileName)
        {
            try
            {
                if (inputStream == null || string.IsNullOrEmpty(fileName))
                {
                    throw new ArgumentNullException("FormFile or fileName must not be null");
                }

                return await _AWSS3BucketHelper.Update(inputStream.OpenReadStream(), fileName);
            }
            catch (AmazonS3Exception)
            {
                throw;
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
                if (string.IsNullOrEmpty(fileName))
                {
                    throw new ArgumentNullException("FileName must not be null.");
                }

                return await _AWSS3BucketHelper.Delete(fileName);
            }
            catch (AmazonS3Exception)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}