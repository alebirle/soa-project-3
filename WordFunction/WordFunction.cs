using System;
using System.Collections.Generic;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;

namespace WordFunction;

public class WordGenerator
{
    private readonly ILogger _logger;

    public WordGenerator(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<WordGenerator>();
    }

    [FunctionName("WordGenerator")]
    public void Run([TimerTrigger("0 0 6 * * *"
            #if DEBUG
                , RunOnStartup=true
            #endif
            )]TimerInfo myTimer)
    {
        _logger.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");

        if (myTimer.ScheduleStatus is not null)
        {
            _logger.LogInformation($"Next timer schedule at: {myTimer.ScheduleStatus.Next}");
        }

        var random = new Random();
        var words = new List<string>() { "speak", "stick", "paste", "tears", "glove" };
        int index = random.Next(words.Count);
        var word = words[index];

        _logger.LogInformation($"Today's word is: {word}");
    }
}
