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
            "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?w=1800&t=st=1693387006~exp=1693387606~hmac=5e7108c28fe45554ff458a1f35da62e946a729360a2d82dce46ecb3dadc789cb",
            "https://img.freepik.com/free-photo/close-up-clothes-hanging-rack_171337-7196.jpg?w=1800&t=st=1693387035~exp=1693387635~hmac=91068147dd26af8dc185dbb68e4b5ad75c2f8efe82ef703b0cbb3d06b20b583c",
            "https://img.freepik.com/premium-photo/variety-summer-women-s-shoes-sneakers-sandals-roman-sandals-slippers-light-background-top-view_624178-494.jpg",
            "https://img.freepik.com/free-photo/top-view-books-arrangement_23-2148882754.jpg?t=st=1693387191~exp=1693387791~hmac=fdfbbc33149453b05cbcaec75b95e9765f7f4a3fd3448a1dacad13a912e31778",
            "https://img.freepik.com/premium-photo/gamer-workspace_127657-18683.jpg?w=1800",
            "https://img.freepik.com/free-photo/flat-lay-natural-self-care-products-composition_23-2148990019.jpg?w=1800&t=st=1693387292~exp=1693387892~hmac=34abaaf8372ef05d6276ff55024558743e0acec5ad360eb7dac68370c9848287"
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