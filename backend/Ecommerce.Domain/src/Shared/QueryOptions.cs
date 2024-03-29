using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;

namespace Ecommerce.Domain.src.Shared
{
    public class QueryOptions
    {
        public string Search { get; set; } = string.Empty;
        public string Category { get; set; } = "All";
        public string OrderBy { get; set;} = "Newest first";
        public bool OrderByDescending { get; set;} = false;
        public int PageNumber { get; set; } = 0;
        public int PageSize { get; set;} = 30;
    }
}