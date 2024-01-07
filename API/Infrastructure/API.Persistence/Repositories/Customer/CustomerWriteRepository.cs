using API.Application.Repositories;
using API.Domain.Entities;
using API.Persistence.Contexts;

namespace API.Persistence.Repositories
{
    public class CustomerWriteRepository : WriteRepository<Customer>, ICustomerWriteRepository
    {
        public CustomerWriteRepository(AppDbContext context) : base(context)
        {
        }
    }
}
