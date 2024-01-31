using GameMicroservice.Model;
using GameMicroservice.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameMicroservice.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GuessController(IGuessRepository guessRepository) : ControllerBase
{
    [HttpPost]
    [Authorize]
    public IActionResult Post([FromBody] Guess guess)
    {
        guessRepository.AddGuess(guess);
        return Ok();
    }
}
