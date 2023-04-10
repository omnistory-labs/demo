import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styled from "styled-components";

export function Bell() {
  return (
    <StyledPlayer>
      <AudioPlayer autoPlay loop src="https://omnitalk.io/media/bell2.mp3" />
    </StyledPlayer>
  );
}

export function Ringing() {
  return (
    <StyledPlayer>
      <AudioPlayer autoPlay loop src="https://omnitalk.io/media/ring2.mp3" />
    </StyledPlayer>
  );
}

const StyledPlayer = styled.div`
  position: absolute;
  opacity: 0;
`;
