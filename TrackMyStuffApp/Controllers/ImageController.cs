using Amazon.S3;
using AWSS3Lib.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrackMyStuff.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : BaseController
    {
        private readonly ILogger _logger;
        private readonly IAWSS3BucketService _AWSS3BucketService;

        public ImageController(ILoggerFactory logger, IAWSS3BucketService AWSS3BucketService)
        {
            _logger = logger.CreateLogger(typeof(ImageController));
            _AWSS3BucketService = AWSS3BucketService;
        }

        [HttpGet("{fileName}")]
        public async Task<IActionResult> Get(string fileName)
        {
            try
            {
                var result = await _AWSS3BucketService.Get(fileName);
                return File(result, "image/webp");
            }
            catch (ArgumentNullException aEx)
            {
                return BadRequest(aEx.Message);
            }
            catch (AmazonS3Exception s3Ex)
            {
                _logger.LogError(s3Ex, s3Ex.Message);
                return StatusCode((int)s3Ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm(Name = "image")] IFormFile formFile)
        {
            try
            {
                var fileName = await _AWSS3BucketService.Add(formFile);

                var result = new Dictionary<string, string>
                {
                    { "fileName", fileName }
                };
                return Ok(result);
            }
            catch (ArgumentNullException aEx)
            {
                return BadRequest(aEx.Message);
            }
            catch (AmazonS3Exception s3Ex)
            {
                _logger.LogError(s3Ex, s3Ex.Message);
                return StatusCode((int)s3Ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{fileName}")]
        public async Task<IActionResult> Update(string fileName, [FromForm(Name = "image")] IFormFile formFile)
        {
            try
            {
                var result = await _AWSS3BucketService.Update(formFile, fileName);
                return Ok(result);
            }
            catch (ArgumentNullException aEx)
            {
                return BadRequest(aEx.Message);
            }
            catch (AmazonS3Exception s3Ex)
            {
                _logger.LogError(s3Ex, s3Ex.Message);
                return StatusCode((int)s3Ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{fileName}")]
        public async Task<IActionResult> Delete(string fileName)
        {
            try
            {
                var result = await _AWSS3BucketService.Delete(fileName);
                return Ok(result);
            }
            catch (ArgumentNullException aEx)
            {
                return BadRequest(aEx.Message);
            }
            catch (AmazonS3Exception s3Ex)
            {
                _logger.LogError(s3Ex, s3Ex.Message);
                return StatusCode((int)s3Ex.StatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}