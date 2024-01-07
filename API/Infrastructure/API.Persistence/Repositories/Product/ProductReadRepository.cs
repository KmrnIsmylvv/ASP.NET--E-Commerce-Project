using API.Application.Repositories;
using API.Domain.Entities;
using API.Persistence.Contexts;

namespace API.Persistence.Repositories
{
    public class ProductReadRepository : ReadRepository<Product>, IProductReadRepository
    {
        public ProductReadRepository(AppDbContext context) : base(context)
        {
        }
    }
}
