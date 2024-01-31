using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace GameMicroservice.Model;

public class Word
{
    public static readonly string DocumentName = nameof(Word);

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; init; }
    public string? ChosenWord { get; init; }
    public DateTime? Date { get; init; }
}
