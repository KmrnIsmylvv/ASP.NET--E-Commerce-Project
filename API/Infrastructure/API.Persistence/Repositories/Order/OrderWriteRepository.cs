using API.Application.Repositories;
using API.Domain.Entities;
using API.Persistence.Contexts;

namespace API.Persistence.Repositories
{
    public class OrderWriteRepository : WriteRepository<Order>, IOrderWriteRepository
    {
        public OrderWriteRepository(AppDbContext context) : base(context)
        {
        }
    }
}
