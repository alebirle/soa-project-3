using GameMicroservice.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameMicroservice.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WordController(IWordRepository wordRepository) : ControllerBase
{
    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var word = wordRepository.GetWord();
        return Ok(word);
    }
}
