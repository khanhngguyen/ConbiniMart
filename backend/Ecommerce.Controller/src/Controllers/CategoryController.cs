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
            "https://media.istockphoto.com/id/1284690585/photo/colorful-vegetables-and-fruits-vegan-food-in-rainbow-colors.jpg?s=612x612&w=0&k=20&c=fXqp_CPaHMyfzMhjZGQG1zloNBNkVRjdYKScw3K98XQ=",
            "https://t4.ftcdn.net/jpg/01/24/76/93/360_F_124769354_BLAwXKbjl94fgA5bK8u0Dt0TyeOItBov.jpg",
            "https://media.istockphoto.com/id/544807136/photo/various-fresh-dairy-products.jpg?s=612x612&w=0&k=20&c=U5T70bi24itoTDive1CVonJbJ97ChyL2Pz1I2kOoSRo=",
            "https://media.istockphoto.com/id/157636527/photo/variety-of-fresh-canned-amp-packaged-foods-isolated-on-white.jpg?s=612x612&w=0&k=20&c=UoAsVvwBvUXT-YKrgTDAICMkNw4xDOKZGMJPfQSYXX4="
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
            public string Name { get; set; }
            public string Image { get; set; }
        }
    }
}