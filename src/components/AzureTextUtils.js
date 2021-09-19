import {
  AzureKeyCredential,
  TextAnalyticsClient,
} from "@azure/ai-text-analytics";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
require("dotenv").config();

const key = process.env.REACT_APP_AZURE_API_TEXT_KEY_1;
const endpoint = process.env.REACT_APP_AZURE_TEXT_ENDPOINT;
const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));
const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({
    inHeader: {
      "Ocp-Apim-Subscription-Key": process.env.REACT_APP_AZURE_API_CV_KEY_1,
    },
  }),
  process.env.REACT_APP_AZURE_CV_ENDPOINT
);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getOCR(imageURL) {
  const printedResult = await readTextFromURL(computerVisionClient, imageURL);
  console.log(printedResult);
  return printedResult;
}

export async function getImageFeatures(imageURL) {
  const tags = (
    await computerVisionClient.analyzeImage(imageURL, {
      visualFeatures: ["Tags"],
    })
  ).tags;
  const tagsText = tags.map((tag) => tag.name).join(" ");
  console.log(tagsText);
  return tagsText;
}

async function readTextFromURL(client, url) {
  // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
  let result = await client.read(url);
  // Operation ID is last path segment of operationLocation (a URL)
  let operation = result.operationLocation.split("/").slice(-1)[0];

  // Wait for read recognition to complete
  // result.status is initially undefined, since it's the result of read
  while (result.status !== "succeeded") {
    await sleep(500);
    result = await client.getReadResult(operation);
  }
  return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
}

export async function keyPhraseExtraction(text) {
  // if (!text || text.length < 5) return [""];
  // const entityResults = await client.extractKeyPhrases(text);
  // return entityResults[0].keyPhrases;
  // await sleep(500);
  if (text.toLowerCase().includes(".")) {
    const entityResults = await client.recognizeEntities([text]);
    console.log(entityResults);
    return entityResults[0].entities
      .filter(
        (enty) =>
          enty.category !== "DateTime" && enty.category !== "PhoneNumber"
      )
      .map((enty) => enty.text);
  }
  return [""];
}

export async function analyzeSentiment(text) {
  await sleep(500);
  if (!text.includes(".")) return "neutral";

  const sentimentInput = [text];
  const sentimentResult = await client.analyzeSentiment(sentimentInput);
  const scores = sentimentResult[0].confidenceScores;
  if (scores.positive >= scores.neutral && scores.positive >= scores.negative)
    return "positive";
  else if (
    scores.negative >= scores.neutral &&
    scores.negative >= scores.positive
  )
    return "negative";
  return "neutral";
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
