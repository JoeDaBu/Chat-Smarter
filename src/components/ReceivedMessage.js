import React from "react";
import { MessageTxt, PersonPic, ReceiverBubble } from "./ChatMessages";
import styled from "styled-components";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { StyledChatImg } from "./StyledStuff";

const StyledWordButton = styled.div`
  padding-right: 4px;
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
  padding: 15px 15px;
  box-shadow: 1px 1px 2px 0.5px #0000002b;
`;

const IconContainer = styled.div`
  position: relative;
  right: 15px;
  bottom: 15px;
  background: white;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  cursor: pointer;
`;

const SentAtTxt = styled.div`
  display: flex;
  position: relative;
  top: 30px;
  margin-left: 10px;
  bottom: 0px;
  font-size: 10px;
`;

function RenderReceivedMessage({
  sentiment,
  keywords,
  text,
  photoURL,
  createdAt,
  setSelectedKeyword,
  setIsOpen,
  files,
  setIsPuppyOpen,
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

  //   function matchKeywords(keywords, word) {
  //     keywords.forEach((keyword) => {
  //       // console.log(keyword, word);
  //       // console.log(keyword.toLowerCase(), word.toLowerCase().trim());
  //       // console.log(keyword.toLowerCase().includes(word.toLowerCase().trim()));
  //       if (keyword.toLowerCase().includes(word.toLowerCase())) {
  //         console.log("What ");
  //         return true;
  //         console.log("What");
  //       }
  //     });
  //     return false;
  //   }

  return (
    <ReceiverBubble>
      <PersonPic src={photoURL} alt="" />
      <SpecialMessageTxt>
        {text &&
          text.split(" ").map((word, i) => {
            // if (keywords) {
            //   console.log(
            //     keywords
            //       .map((keyword) => keyword.toLowerCase())
            //       .includes(word.toLowerCase())
            //   );
            // }
            if (
              keywords &&
              keywords
                .map((keyword) => keyword.toLowerCase())
                .includes(word.toLowerCase())
            ) {
              return (
                <StyledWordButton
                  key={`${i} ${word}`}
                  onClick={() => handleSetKeyword(word)}
                >{`${word} `}</StyledWordButton>
              );
            } else {
              return (
                <NotSpecialWord
                  key={`${i} ${word}`}
                >{`${word} `}</NotSpecialWord>
              );
            }
          })}
        {files && files.map((file) => <StyledChatImg src={file.url} />)}
      </SpecialMessageTxt>

      {sentiment === "negative" && (
        <IconContainer onClick={() => setIsPuppyOpen(true)}>
          <SentimentDissatisfiedIcon fontSize="large" />
        </IconContainer>
      )}
      <SentAtTxt>{createdAt}</SentAtTxt>
    </ReceiverBubble>
  );
}

export default RenderReceivedMessage;
