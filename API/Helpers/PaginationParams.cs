namespace API.Helpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pagesSize = 10;
        public int PageSize
        {
            get => _pagesSize;
            set => _pagesSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}