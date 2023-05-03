import React from "react";
import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  position: relative;
  width: 10em;
  padding: 2;
  overflow: hidden;

  .container {
	width: 100%;
	height: 100%;
	margin: 0 auto;

	/* important part */
	display: grid;
	place-items: center;
	grid-template-areas: "inner-div";
  }
  
  .inner {
	height: 100%;
	width: 100%;
	/* important part */
	grid-area: inner-div;
  }

  #text {
	margin-top: 1.2rem;
  }

  #google_translate_element {
    display: inline-block;
	height: 100%;
	opacity: 0.0;
  }
`;

/**
 * Returns button for google translate
 */
const GoogleTranslate = () => {
	return (
		<StyledButton colorScheme="primary">
			<div class="container">
				<div class ="inner" id="google_translate_element"> </div>
				<div class ="inner" id="text"> Translate</div>
			</div>
		</StyledButton>
	);
};

export default GoogleTranslate;

