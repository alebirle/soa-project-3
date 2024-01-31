using GameMicroservice.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace GameMicroservice.Repository;

public class WordRepository(IMongoDatabase db) : IWordRepository
{
    private readonly IMongoCollection<Word> _col = db.GetCollection<Word>(Word.DocumentName);

    public Word GetWord()
    {
        var test = _col.Find(w => w.Id != null).FirstOrDefault();
        var word = _col.Find(w => w.Date != null && w.Date.Value.Date == DateTime.Today.Date).FirstOrDefault();

        if (word is null)
        {
            var random = new Random();
            var words = new List<string>() { "speak", "stick", "paste", "earth", "glove" };
            int index = random.Next(words.Count);

            word = new()
            {
                ChosenWord = words[index],
                Date = DateTime.Today,
            };
            _col.InsertOne(word);
        }

        return word;
    }
}
