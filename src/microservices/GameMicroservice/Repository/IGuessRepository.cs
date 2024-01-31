using GameMicroservice.Model;

namespace GameMicroservice.Repository;

public interface IGuessRepository
{
    public void AddGuess(Guess guess);
}
