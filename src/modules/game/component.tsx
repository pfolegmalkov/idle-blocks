import {useEffect, useReducer, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Circle, Rect, Svg} from 'react-native-svg';
import {suiWalletExecuteMoveCall} from '../../utils/sui/wallet/execute-move-call';
import {CharacterComponent} from '../character/component';
import {gamePackageId} from './package-id';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Bullet = () => {
  const [removed, setRemoved] = useState(false);
  const progress = useSharedValue(0);
  useEffect(() => {
    const duration = 1000;
    progress.value = withTiming(1, {duration, easing: Easing.exp});
    setTimeout(() => setRemoved(true), duration);
  }, [progress]);

  const circleProps = useAnimatedProps(() => {
    return {cx: 15 + 230 * progress.value, r: 2 + 5 * progress.value};
  });
  if (removed) {
    return null;
  }
  return (
    <AnimatedCircle
      animatedProps={circleProps}
      cy={20}
      fill="blue"
      onPress={() => null}
    />
  );
};

type BulletType = {id: number};

type State = {
  bullets: BulletType[];
};

const initialState = {
  bullets: [],
};

type ActionType = {
  type: 'TICK';
};

const reducer = (state: State, action: ActionType): State => {
  if (action.type === 'TICK') {
    const newBullets = [...state.bullets];
    if (newBullets.length > 10) {
      newBullets.shift();
    }
    return {
      ...state,
      bullets: [...newBullets, {id: Math.random()}],
    };
  }

  return state;
};

type Props = {accountId: string};

export const GameComponent = ({accountId}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setInterval(() => dispatch({type: 'TICK'}), 1000);
  }, []);

  return (
    <>
      <CharacterComponent accountId={accountId} />
      <Svg
        viewBox="0 0 300 100"
        style={{backgroundColor: 'lightgreen', transform: [{scaleY: -1}]}}
      >
        <Rect x={10} width={15} height={40} fill="lightyellow" />
        <>
          {state.bullets.map((bullet) => (
            <Bullet key={bullet.id} />
          ))}
        </>
      </Svg>
    </>
  );
};
