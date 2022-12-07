using gyak11_12.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gyak11_12.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public IActionResult MindegyHogyHivjak()
        {
            HajosContext context = new HajosContext();
            var kérdések = from x in context.Questions select x.Question1;

            return Ok(kérdések);
        }

        [HttpGet]
        [Route("questions/count")]
        public int M4() //Tetszőleges metódusnév
        {
            HajosContext context = new HajosContext();
            int kérdésekSzáma = context.Questions.Count();

            return kérdésekSzáma;
        }

        [HttpGet]
        [Route("questions/{sorszam}")]
        public ActionResult SpecificKerdes(int sorszam)
        {
            HajosContext context = new HajosContext();
            var kerdes = (from x in context.Questions
                          where x.QuestionId == sorszam
                          select x).FirstOrDefault();

            if(kerdes == null) return BadRequest("Nincs ilyen sorszámú kérdés");

            return new JsonResult(kerdes);
        }
    }
}
