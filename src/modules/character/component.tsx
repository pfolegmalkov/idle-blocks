/* eslint-disable no-alert */
import {memo, useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import {SuiMoveObject, SuiObject} from '../../sui-sdk';
import {mathInc} from '../../utils/math/inc';
import {suiProviderInstance} from '../../utils/sui/provider/instance';
import {suiWalletExecuteMoveCall} from '../../utils/sui/wallet/execute-move-call';
import {gameCharacterTypeId} from '../game/character-type-id';

type Props = {
  accountId: string;
};

type CharacterRawType = {
  experience: number;
  id: {id: string};
  stamina: number;
  strength: number;
  name: string;
};

type CharacterType = {
  experience: number;
  id: string;
  stamina: number;
  strength: number;
  name: string;
};

export const CharacterComponent = memo(({accountId}: Props) => {
  const [refetchCharacterIdsCouter, setRefetchCharacterIdsCouter] =
    useState<number>(0);
  const [refetchCharactersCouter, setRefetchCharactersCouter] =
    useState<number>(0);
  const [characterIds, setCharacterIds] = useState<string[]>([]);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  useEffect(() => {
    suiProviderInstance
      .getObjectsOwnedByAddress(accountId)
      .then((objs) => objs.filter((o) => o.type.includes(gameCharacterTypeId)))
      .then((objs) => objs.map((o) => o.objectId))
      .then(setCharacterIds);
  }, [accountId, refetchCharacterIdsCouter]);

  useEffect(() => {
    Promise.all(characterIds.map((cid) => suiProviderInstance.getObject(cid)))
      .then((cs) =>
        cs
          .map(
            (c) =>
              ((c.details as SuiObject).data as SuiMoveObject)
                .fields as CharacterRawType,
          )
          .map(({id, experience, stamina, strength, name}) => ({
            id: id.id,
            experience,
            stamina,
            strength,
            name,
          })),
      )
      .then(setCharacters);
  }, [characterIds, refetchCharactersCouter]);

  return (
    <View>
      <Button
        title="Create character"
        onPress={() => {
          suiWalletExecuteMoveCall({
            function: 'character_create',
            arguments: [prompt('enter character name') || 'Default name'],
          }).then(() => setRefetchCharacterIdsCouter(mathInc));
        }}
      />
      {characters.map((c) => (
        <View
          key={c.id}
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Text key={c.id}>Name: {c.name} | </Text>
          <Text key={c.id}>Exp: {c.experience} | </Text>
          <Text key={c.id}>Str: {c.strength} | </Text>
          <Text key={c.id}>Sta: {c.stamina}</Text>
          <View style={{flex: 1}} />
          <Button
            title="Play"
            onPress={() => {
              suiWalletExecuteMoveCall({
                function: 'play',
                arguments: [c.id],
              }).then(() => setRefetchCharactersCouter(mathInc));
            }}
          />
        </View>
      ))}
    </View>
  );
});
