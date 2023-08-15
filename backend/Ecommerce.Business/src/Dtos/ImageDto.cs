using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ecommerce.Business.src.Dtos
{
    public class ImageCreateDto
    {
        public string Link { get; set; }
    }

    public class ImageReadDto
    {
        public string Link { get; set; }
    }

    public class ProductImageReadDto
    {
        public string Link { get; set; } 
    }

    public class ProductImageCreateDto
    {
        public string Link { get; set; } 
    }

    public class UserImageReadDto
    {
        public string Link { get; set;}
    }

    public class UserImageCreateDto
    {
        public string Link { get; set;}
    }
}
