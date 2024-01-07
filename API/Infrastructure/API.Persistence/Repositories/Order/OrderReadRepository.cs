using API.Application.Repositories;
using API.Domain.Entities;
using API.Persistence.Contexts;

namespace API.Persistence.Repositories
{
    public class OrderReadRepository : ReadRepository<Order>, IOrderReadRepository
    {
        public OrderReadRepository(AppDbContext context) : base(context)
        {
        }
    }
}
