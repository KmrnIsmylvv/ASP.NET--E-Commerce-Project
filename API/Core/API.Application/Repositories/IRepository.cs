using API.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}
