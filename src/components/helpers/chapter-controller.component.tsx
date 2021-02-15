import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled, {css} from 'styled-components';
import {Back} from '../../assets';
import {RootState} from '../../store';
import {setCurrentChapter} from '../../store/book/actions';
import {Color} from '../../store/settings/types';

interface ContainerProps {
	background: Color;
	shadow: boolean;
}

const Container = styled.div<ContainerProps>`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({background}) => background};

  ${({shadow}) => shadow && css`
    box-shadow: 0 -10px 40px 0 #00000029;
  `}
`;

const Bar = styled.div`
  width: 80%;
  height: 24px;
  border-radius: 12px;
  background: ${Color.MALACHITE}4C;
`;

interface FilledBarProps {
	fill: number;
}

const FilledBar = styled.div<FilledBarProps>`
  width: ${({fill}) => fill}%;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: end;
  background: ${Color.MALACHITE};
  color: ${Color.WHITE};
  transition: all 336ms;
`;

const StepText = styled.div`
  padding-right: 10px;
  user-select: none;
`;

interface OpenButtonProps {
	shadow: boolean;
	background: Color;
	reversed: boolean;
	disabled: boolean;
}

const ControllerButton = styled.div<OpenButtonProps>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 336ms;
  background: ${({background}) => background};
  z-index: 1;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  ${({shadow}) => shadow && css`
    box-shadow: 0 3px 20px 0 #00000029;
  `}

  ${({reversed, disabled}) => reversed && css`
    transform: scaleX(-1);

    &:hover {
      transform: scaleX(-1.05) scaleY(1.05);
    }

    ${disabled && css`
      transform: scale(-1) !important;
    `}
  `}

  ${({disabled}) => disabled && css`
    opacity: 0.5 !important;
    transform: scale(1);
  `}
`;

export const ChapterController = () => {
	const dispatch = useDispatch();
	const {
		book: {data, currentChapter},
		settings: {theme: {background, secondaryBackground, shadow, foreground}},
	} = useSelector((state: RootState) => state);

	const chapters = data?.content?.chapters?.length || 1;

	const pervDisabled = currentChapter === 0;
	const nextDisabled = currentChapter === chapters - 1;

	const onPrevClick = () => () => dispatch(setCurrentChapter(currentChapter - 1));
	const onNextClick = () => () => dispatch(setCurrentChapter(currentChapter + 1));

	return (
		<Container background={secondaryBackground} shadow={shadow}>
			<ControllerButton shadow={shadow} background={background} reversed={false}
												onClick={pervDisabled ? undefined : onPrevClick()} disabled={pervDisabled}>
				<Back color={foreground} />
			</ControllerButton>
			<Bar>
				<FilledBar fill={(currentChapter + 1) / chapters * 100}>
					<StepText>{currentChapter + 1}/{chapters}</StepText>
				</FilledBar>
			</Bar>
			<ControllerButton shadow={shadow} background={background} reversed
												onClick={nextDisabled ? undefined : onNextClick()} disabled={nextDisabled}>
				<Back color={foreground} />
			</ControllerButton>
		</Container>
	);
};
