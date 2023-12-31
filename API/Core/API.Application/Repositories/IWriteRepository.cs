using API.Domain.Entities.Common;

namespace API.Application.Repositories
{
    public interface IWriteRepository<T> : IRepository<T> where T : BaseEntity
    {
        Task<bool> AddAsync(T model);
        Task<bool> AddRangeAsync(List<T> dataList);
        bool Update(T model);
        bool Remove(T model);
        bool RemoveRange(List<T> dataList);
        Task<bool> RemoveAsyncById(string id);
        Task<int> SaveAsync();
    }
}
