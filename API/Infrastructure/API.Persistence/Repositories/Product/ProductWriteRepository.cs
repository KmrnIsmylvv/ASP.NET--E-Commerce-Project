using API.Application.Repositories;
using API.Domain.Entities;
using API.Persistence.Contexts;

namespace API.Persistence.Repositories
{
    public class ProductWriteRepository : WriteRepository<Product>, IProductWriteRepository
    {
        public ProductWriteRepository(AppDbContext context) : base(context)
        {
        }
    }
}
