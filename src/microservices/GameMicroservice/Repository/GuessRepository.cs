using GameMicroservice.Model;
using MongoDB.Driver;

namespace GameMicroservice.Repository;

public class GuessRepository(IMongoDatabase db) : IGuessRepository
{
    private readonly IMongoCollection<Guess> _col = db.GetCollection<Guess>(Guess.DocumentName);

    public void AddGuess(Guess guess)
    {
        var existingGuess = _col.Find(g => g.UserId == guess.UserId).FirstOrDefault();
        if (existingGuess == null)
        {
            _col.InsertOne(guess);
        }
    }
}
