using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ecommerce.Domain.src.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controller.src.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CategoryController : ControllerBase
    {
        // private readonly string[] _categories = new []
        // {
        //     "Food", "Clothes", "Shoes", "Books", "Electronics", "Others"
        // };
        private List<CategoryDisplay> _categoriesList = new List<CategoryDisplay>();
        private readonly string[] _images = new []
        {
            "https://img.freepik.com/free-photo/front-view-vegetable_140725-103355.jpg?w=1800&t=st=1697198481~exp=1697199081~hmac=5564cf62d976b08ca6e986cee187c3fb0073a3317e9f10352d2d57b36518689e",
            "https://img.freepik.com/free-photo/frozen-food-table-arrangement_23-2148969458.jpg?w=1380&t=st=1697198453~exp=1697199053~hmac=6b963476698b6a9209d9e868204ad1750145eec8568a7e729a959e79528973f3",
            "https://img.freepik.com/free-photo/close-up-organic-milk-with-gourmet-cheese_23-2148610557.jpg?w=1800&t=st=1697198506~exp=1697199106~hmac=caf5f0610ec6f39e7bf6a91276335c71b5a00f22023b7aa1235966c97acd20bc",
            "https://img.freepik.com/free-photo/view-table-with-articles-food-family_1398-5025.jpg?w=1800&t=st=1697198539~exp=1697199139~hmac=b31d156fbadc7edbcc435126a1f0cd16c825433df297f3d39e37a2374f556d31"
        };

        [HttpGet]
        [ProducesResponseType(statusCode: 200)]
        public async Task<ActionResult<IEnumerable<Category>>> GetAll()
        {
            List<Category> categories = Enum.GetValues(typeof(Category)).Cast<Category>().ToList();
            foreach (var category in categories)
            {
                _categoriesList.Add(new CategoryDisplay
                {
                    Name = category.ToString()
                });
            }
            for (int i = 0; i < _images.Count(); i++)
            {
                _categoriesList[i].Image = _images[i];
            }
            return Ok(_categoriesList);
        }

        private class CategoryDisplay
        {
            public string Name { get; set; }  = default!;
            public string Image { get; set; } = default!;
        }
    }
}