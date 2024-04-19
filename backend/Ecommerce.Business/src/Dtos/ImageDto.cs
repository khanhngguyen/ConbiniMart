using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Business.src.Dtos
{
    public class ImageCreateDto
    {
        public string Link { get; set; }  = default!;
    }

    public class ImageReadDto
    {
        public string Link { get; set; }  = default!;
    }

    public class ProductImageReadDto
    {
        public string Link { get; set; } = default!;
    }

    public class ProductImageCreateDto
    {
        public string Link { get; set; } = default!;
    }

    public class UserImageReadDto
    {
        public string Link { get; set;}  = default!;
    }

    public class UserImageCreateDto
    {
        public string Link { get; set;} = default!;
    }
}
