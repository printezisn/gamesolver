using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Sudoku.Solver;

namespace Sudoku.Functions
{
    public static class SolveSudoku
    {
        [FunctionName("SolveSudoku")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            if (string.IsNullOrWhiteSpace(requestBody))
            {
                return new BadRequestResult();
            }

            int?[] arr = null;

            try
            {
                arr = JsonSerializer.Deserialize<int?[]>(requestBody);
            }
            catch (Exception ex)
            {
                log.LogError(ex, "Parsing state");
                return new BadRequestResult();
            }

            var state = new State(arr).Solve();
            if (state == null)
            {
                return new OkObjectResult(new { success = false });
            }

            return new OkObjectResult(new { success = true, solution = state.ToString() });
        }
    }
}
