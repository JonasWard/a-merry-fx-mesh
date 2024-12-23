import { IntDataEntry } from 'url-safe-bitpacking/dist/types';
import { BASE_64_TEXT } from '../../modelDefinition/types/indexText';
import { Input } from 'antd';
import React from 'react';
import { DataEntryFactory } from 'url-safe-bitpacking';
import { AttributeNames } from '../../modelDefinition/enums/attributeNames';
import { getText } from '../../webgl/helpermethods';

export const TextAreaEntry: React.FC<{
  text: { s: IntDataEntry; v: { Text: IntDataEntry }[] };
  updateEntry: (dataEntry: IntDataEntry | IntDataEntry[]) => void;
}> = ({ text, updateEntry }) => {
  const s = getText(text);

  const updateValues = (e: { target: { value: string } }) => {
    const internalNameTemplateA = `_${text.s.name}_${text.s.name}_${text.s.name}_`;
    const internalNameTemplateB = `_${text.s.name}`;

    // first entry to update
    const updateEntries: IntDataEntry[] = [{ ...text.s, value: e.target.value.length }];

    for (let i = 0; i < e.target.value.length; i++) {
      const index = BASE_64_TEXT.indexOf(e.target.value[i]);
      const dataEntry = DataEntryFactory.createInt(index > -1 ? index : 63, 0, 63, AttributeNames.Text); // 0 = 63
      dataEntry.internalName = `${internalNameTemplateA}${i}${internalNameTemplateB}`;
      updateEntries.push(dataEntry);
    }

    updateEntry(updateEntries);
  };

  return (
    <>
      <Input.TextArea rows={8} key='text' value={s} onChange={updateValues} status={text.s.max === text.s.value ? 'warning' : undefined} />
      {text.s.max === text.s.value ? <div style={{ color: '#f1ab08', padding: 4, textAlign: 'center' }}>Max character count ({text.s.max}) reached</div> : null}
    </>
  );
};
