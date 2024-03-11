namespace API.Application.RequestParameters
{
    public record Pagination
    {
        public int PageIndex { get; set; } = 0;
        public int PageSize { get; set; } = 5; 
    }
}
