using API.Application.DTOs.Products;
using API.Application.Repositories;
using API.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly IProductReadRepository _productReadRepository;
        readonly IProductWriteRepository _productWriteRepository;

        public ProductsController(IProductReadRepository productReadRepository, IProductWriteRepository productWriteRepository)
        {
            _productReadRepository = productReadRepository;
            _productWriteRepository = productWriteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(_productReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            return Ok(await _productReadRepository.GetByIdAsync(id, false));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductDTO model)
        {
          

            await _productWriteRepository.AddAsync(new()
            {
                Name = model.Name,
                Price = model.Price,
                Stock = model.Stock
            });

            await _productWriteRepository.SaveAsync();

            return Ok();
        }

        [HttpPut()]
        public async Task<IActionResult> UpdateProduct(UpdateProductDTO model)
        {
            Product product = await _productReadRepository.GetByIdAsync(model.Id);

            product.Name = model.Name;
            product.Price = model.Price;
            product.Stock = model.Stock;

            await _productWriteRepository.SaveAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            await _productWriteRepository.RemoveAsyncById(id);

            await _productWriteRepository.SaveAsync();

            return Ok();

        }
    }
}
