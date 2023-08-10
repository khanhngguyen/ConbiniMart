using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Domain.src.Shared
{
    public class QueryOptions
    {
        public string Search { get; set; } = string.Empty;
        public string OrderBy { get; set;} = "UpdatedAt";
        public bool OrderByDescending { get; set;} = false;
        public int PageNumber { get; set; } = 0;
        public int PageSize { get; set;} = 10;
    }
}