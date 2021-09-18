import React, { useState, useEffect } from "react";
import { MessageTxt, PersonPic, ReceiverBubble } from "./ChatMessages";
import { keyPhraseExtraction } from "./AzureTextUtils";
import styled from "styled-components";

const StyledWordButton = styled.div`
  :hover {
    font-weight: bold;
    cursor: pointer;
  }
`;

const NotSpecialWord = styled.div`
  padding-right: 4px;
`;

const SpecialMessageTxt = styled.div`
  display: flex;
  border-radius: 5px;
  padding: 10px 15px;
  box-shadow: 1px 1px 2px 0 #0000002b;
`;

function RenderReceivedMessage({
  keywords,
  text,
  photoURL,
  setSelectedKeyword,
  setIsOpen,
}) {
  // const [keywords, setKeywords] = useState([]);
  //
  // useEffect(() => {
  //   keyPhraseExtraction(text, setKeywords);
  // }, [text]);

  async function searchWiki(word) {
    const searchWord = word.split(" ").join("%20");
    const page = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srlimit=1&srsearch=${searchWord}&format=json`
    );
    const pageJson = await page.json();
    const pageId = pageJson.query.search[0].pageid;
    // const altQuery = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=pageimages&pithumbsize=500&redirects=1&pageids=${pageId}&format=json`;
    const getInfoQuery = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&prop=pageimages%7Cinfo%7Cextracts&inprop=url&exintro&pithumbsize=500&redirects=1&pageids=${pageId}`;
    const summaryPage = await fetch(getInfoQuery);
    const summaryJson = await summaryPage.json();

    const info = summaryJson.query.pages[`${pageId}`];
    if (!info.thumbnail) {
      const getNewQuery = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&prop=images%7Cinfo%7Cextracts&inprop=url&imlimit=2&exintro&redirects=1&pageids=${pageId}&format=json`;
      const newSum = await fetch(getNewQuery);
      const newJson = await newSum.json();
      setSelectedKeyword(newJson.query.pages[`${pageId}`]);
    } else {
      setSelectedKeyword(info);
    }
  }

  function handleSetKeyword(keyword) {
    searchWiki(keyword);
    setIsOpen(true);
  }

  if (keywords && keywords.length > 0) {
    return (
      <ReceiverBubble>
        <PersonPic src={photoURL} alt="" />
        <SpecialMessageTxt>
          {text.split(" ").map((word) => {
            if (keywords.includes(word.toLowerCase())) {
              return (
                <StyledWordButton
                  onClick={() => handleSetKeyword(word)}
                >{`${word} `}</StyledWordButton>
              );
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
