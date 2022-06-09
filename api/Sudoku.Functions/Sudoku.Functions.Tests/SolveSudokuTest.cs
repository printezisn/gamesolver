using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Sudoku.Functions.Tests;

public class SolveSudokuTest
{
    private Mock<HttpRequest> _httpRequest = new Mock<HttpRequest>();
    private Mock<ILogger> _logger = new Mock<ILogger>();

    [Fact]
    public async Task TestRunWithMissingRequestBody()
    {
        using var stream = new MemoryStream();
        _httpRequest.Setup(r => r.Body).Returns(stream);

        var result = await SolveSudoku.Run(_httpRequest.Object, _logger.Object) as BadRequestResult;

        Assert.NotNull(result);
    }

    [Fact]
    public async Task TestRunWithInvalidInput()
    {
        using var stream = new MemoryStream();
        using var streamWriter = new StreamWriter(stream);

        streamWriter.Write("1");
        streamWriter.Flush();
        stream.Seek(0, SeekOrigin.Begin);

        _httpRequest.Setup(r => r.Body).Returns(stream);

        var result = await SolveSudoku.Run(_httpRequest.Object, _logger.Object) as BadRequestResult;

        Assert.NotNull(result);
    }

    [Fact]
    public async Task TestRunWithValidInput()
    {
        using var stream = new MemoryStream();
        using var streamWriter = new StreamWriter(stream);

        streamWriter.Write(JsonSerializer.Serialize(new int?[81]));
        streamWriter.Flush();
        stream.Seek(0, SeekOrigin.Begin);

        _httpRequest.Setup(r => r.Body).Returns(stream);

        var result = await SolveSudoku.Run(_httpRequest.Object, _logger.Object) as OkObjectResult;

        Assert.NotNull(result);
        Assert.True(result?.Value?.GetType()?.GetProperty("success")?.GetValue(result?.Value) as bool?);
        Assert.NotNull(result?.Value?.GetType()?.GetProperty("solution")?.GetValue(result?.Value));
    }
}