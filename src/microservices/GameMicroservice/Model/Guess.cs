using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace GameMicroservice.Model;

public class Guess
{
    public static readonly string DocumentName = nameof(Guess);

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; init; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string? UserId { get; init; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string? WordId { get; init; }
    public string? GuessedWord { get; init; }
    public int? AttemptNo { get; init; }
}
