import {
  AzureKeyCredential,
  TextAnalyticsClient,
} from "@azure/ai-text-analytics";
require("dotenv").config();

const key = process.env.REACT_APP_AZURE_API_TEXT_KEY_1;
const endpoint = process.env.REACT_APP_AZURE_TEXT_ENDPOINT;
const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function keyPhraseExtraction(text, setKeywords) {
  // const entityResults = await client.extractKeyPhrases(text);
  // return entityResults[0].keyPhrases;
  await sleep(500);
  if (text.toLowerCase().split(" ").includes("bitcoin")) {
    setKeywords(["bitcoin"]);
  }
}

export async function summarize(text) {
  return text;
  // const documents = [text];
  // const actions = {
  //   extractSummaryActions: [
  //     { modelVersion: "latest", orderBy: "Rank", maxSentenceCount: 3 },
  //   ],
  // };
  // const poller = await client.beginAnalyzeActions(documents, actions, "en");
  //
  // poller.onProgress(() => {
  //   console.log(
  //     `Number of actions still in progress: ${
  //       poller.getOperationState().actionsInProgressCount
  //     }`
  //   );
  // });
  //
  // const resultPages = await poller.pollUntilDone();
  //
  // for await (const page of resultPages) {
  //   const extractSummaryAction = page.extractSummaryResults[0];
  //   if (!extractSummaryAction.error) {
  //     return extractSummaryAction.results[0].sentences
  //       .map((sent) => sent.text)
  //       .join(" ");
  //   }
  // }
}
