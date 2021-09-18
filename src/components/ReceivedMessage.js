import {
  AzureKeyCredential,
  TextAnalyticsClient,
} from "@azure/ai-text-analytics";
import React, { useState, useEffect } from "react";
import { MessageTxt, PersonPic, ReceiverBubble } from "./ChatMessages";
import styled from "styled-components";

require("dotenv").config();

const StyledWordButton = styled.div`
  :hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

const NotSpecialWord = styled.div`
  padding-right: 4px;
`;

const SpecialMessageTxt = styled(MessageTxt)`
  display: flex;
`;

function RenderReceivedMessage({ text, photoURL }) {
  const [keywords, setKeywords] = useState([]);

  const key = process.env.REACT_APP_AZURE_API_TEXT_KEY_1;
  const endpoint = process.env.REACT_APP_AZURE_TEXT_ENDPOINT;
  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

  useEffect(() => {
    keyPhraseExtraction(text);
  }, [text]);

  async function searchWiki(word) {
    const headers = {
      "Content-Type": "application/json",
    };
    const searchWord = word.split(" ").join("%20");
    const page = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srlimit=1&srsearch=${searchWord}&format=json`,
      { headers }
    );
    const pageJson = await page.json();
    const pageId = pageJson.query.search[0].pageid;
    const summaryPage = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${pageId}&format=json`,
      { headers }
    );
    const summaryJson = await summaryPage.json();
    const extract = summaryJson.query.pages[`${pageId}`].extract;
    return extract;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function keyPhraseExtraction(text) {
    // const entityResults = await client.extractKeyPhrases(text);
    // return entityResults[0].keyPhrases;
    await sleep(500);
    if (text.split(" ").includes("bitcoin")) {
      setKeywords(["bitcoin"]);
    }
    return null;
  }
  if (keywords.length > 0) {
    return (
      <ReceiverBubble>
        <PersonPic src={photoURL} alt="" />
        <SpecialMessageTxt>
          {text.split(" ").map((word) => {
            if (keywords.includes(word)) {
              return <StyledWordButton>{`${word} `}</StyledWordButton>;
            } else {
              return <NotSpecialWord>{`${word} `}</NotSpecialWord>;
            }
          })}
        </SpecialMessageTxt>
      </ReceiverBubble>
    );
  }

  return (
    <ReceiverBubble>
      <PersonPic src={photoURL} alt="" />
      <MessageTxt>{text}</MessageTxt>
    </ReceiverBubble>
  );
}

export default RenderReceivedMessage;
