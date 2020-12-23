using Amazon.S3;
using Amazon.S3.Model;
using AWSS3Lib.IAWS_S3;
using AWSS3Lib.Models;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace AWSS3Lib.AWS_S3
{
    public class AWSS3BucketHelper : IAWSS3BucketHelper
    {
        private readonly AWSServiceConfiguration _config;
        private readonly IAmazonS3 _amazonS3;

        public AWSS3BucketHelper(IOptions<AWSServiceConfiguration> config)
        {
            _config = config.Value;
            _amazonS3 = new AmazonS3Client(_config.Access, _config.SecretyKey);
        }

        public async Task<Stream> Get(string fileName)
        {
            try
            {
                var request = new GetObjectRequest()
                {
                    BucketName = _config.BucketName,
                    Key = fileName
                };
                var response = await _amazonS3.GetObjectAsync(request);

                if (response.HttpStatusCode == HttpStatusCode.OK)
                {
                    return response.ResponseStream;
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

        public async Task<bool> Add(Stream inputStream, string fileName)
        {
            try
            {
                var request = new PutObjectRequest()
                {
                    InputStream = inputStream,
                    BucketName = _config.BucketName,
                    Key = fileName
                };

                var response = await _amazonS3.PutObjectAsync(request);

                if (response.HttpStatusCode == HttpStatusCode.OK)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Update(Stream inputStream, string oldFileName)
        {
            try
            {
                var result = await this.Add(inputStream, oldFileName);
                return result;
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
                var response = await _amazonS3.DeleteObjectAsync(_config.BucketName, fileName);
                if (response.HttpStatusCode == HttpStatusCode.NoContent)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}